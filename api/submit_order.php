<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST required'], 405);
}

$data = get_json_input();
$missing = validate_required($data, ['customer_name', 'customer_phone', 'collection_time']);
if ($missing || empty($data['items']) || !is_array($data['items'])) {
    json_response(['success' => false, 'message' => 'Name, phone, collection time, and items are required'], 422);
}

try {
    $pdo->beginTransaction();
    $subtotal = 0;
    $orderItems = [];

    $menuStmt = $pdo->prepare('SELECT id, name, price_cents FROM menu_items WHERE id = ? AND available = 1 LIMIT 1');
    foreach ($data['items'] as $item) {
        $qty = max(1, (int) ($item['qty'] ?? 1));
        $menuStmt->execute([(int) ($item['menu_item_id'] ?? 0)]);
        $menuItem = $menuStmt->fetch();
        if (!$menuItem) {
            throw new RuntimeException('One or more menu items are unavailable');
        }
        $lineTotal = (int) $menuItem['price_cents'] * $qty;
        $subtotal += $lineTotal;
        $orderItems[] = [$menuItem['id'], $menuItem['name'], $qty, $menuItem['price_cents'], $lineTotal];
    }

    $orderNumber = generate_order_number();
    $insert = $pdo->prepare('INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, collection_time, notes, status, payment_method, subtotal_cents) VALUES (?, ?, ?, ?, ?, ?, "pending", ?, ?)');
    $insert->execute([
        $orderNumber,
        trim($data['customer_name']),
        trim($data['customer_phone']),
        $data['customer_email'] ?? null,
        $data['collection_time'],
        $data['notes'] ?? null,
        $data['payment_method'] ?? 'Pay on collection',
        $subtotal,
    ]);
    $orderId = (int) $pdo->lastInsertId();

    $itemInsert = $pdo->prepare('INSERT INTO order_items (order_id, menu_item_id, item_name, qty, unit_price_cents, line_total_cents) VALUES (?, ?, ?, ?, ?, ?)');
    foreach ($orderItems as $orderItem) {
        $itemInsert->execute([
            $orderId,
            $orderItem[0],
            $orderItem[1],
            $orderItem[2],
            $orderItem[3],
            $orderItem[4],
        ]);
    }

    upsert_customer($pdo, trim($data['customer_name']), trim($data['customer_phone']), $data['customer_email'] ?? null, 'takeaway_order');
    $pdo->commit();

    json_response(['success' => true, 'order_id' => $orderId, 'order_number' => $orderNumber]);
} catch (Throwable $exception) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    json_response(['success' => false, 'message' => $exception->getMessage()], 500);
}
