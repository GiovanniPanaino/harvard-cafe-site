<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$status = $_GET['status'] ?? '';
$params = [];
$sql = 'SELECT * FROM orders';
if ($status !== '') {
    $sql .= ' WHERE status = ?';
    $params[] = $status;
}
$sql .= ' ORDER BY CASE WHEN status = "pending" THEN 0 ELSE 1 END, created_at DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$orders = $stmt->fetchAll();

$itemStmt = $pdo->prepare('SELECT id, order_id, menu_item_id, item_name, qty, unit_price_cents, line_total_cents FROM order_items WHERE order_id = ?');
foreach ($orders as &$order) {
    $itemStmt->execute([$order['id']]);
    $order['items'] = $itemStmt->fetchAll();
}

json_response(['success' => true, 'orders' => $orders]);
