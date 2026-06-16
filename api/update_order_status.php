<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$data = get_json_input();
$allowed = ['accepted', 'rejected', 'preparing', 'ready', 'collected'];
if (empty($data['order_id']) || !in_array($data['status'] ?? '', $allowed, true)) {
    json_response(['success' => false, 'message' => 'Valid order_id and status are required'], 422);
}

$stmt = $pdo->prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
$stmt->execute([$data['status'], (int) $data['order_id']]);

json_response(['success' => true]);
