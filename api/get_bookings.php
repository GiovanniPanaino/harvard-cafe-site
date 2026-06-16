<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$status = $_GET['status'] ?? '';
$params = [];
$sql = 'SELECT * FROM bookings';
if ($status !== '') {
    $sql .= ' WHERE status = ?';
    $params[] = $status;
}
$sql .= ' ORDER BY CASE WHEN status = "pending" THEN 0 ELSE 1 END, booking_date DESC, booking_time DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
json_response(['success' => true, 'bookings' => $stmt->fetchAll()]);
