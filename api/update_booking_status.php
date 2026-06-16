<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$data = get_json_input();
$allowed = ['accepted', 'rejected', 'suggested_time'];
if (empty($data['booking_id']) || !in_array($data['status'] ?? '', $allowed, true)) {
    json_response(['success' => false, 'message' => 'Valid booking_id and status are required'], 422);
}

$stmt = $pdo->prepare('UPDATE bookings SET status = ?, staff_note = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
$stmt->execute([$data['status'], $data['staff_note'] ?? null, (int) $data['booking_id']]);

json_response(['success' => true]);
