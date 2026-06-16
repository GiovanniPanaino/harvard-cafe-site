<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$data = get_json_input();
$missing = validate_required($data, ['customer_name', 'customer_phone', 'booking_date', 'booking_time', 'guests']);
if ($missing) {
    json_response(['success' => false, 'message' => 'Name, phone, date, time, and guests are required'], 422);
}

$stmt = $pdo->prepare('INSERT INTO bookings (customer_name, customer_phone, customer_email, booking_date, booking_time, guests, seating_preference, occasion, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "pending")');
$stmt->execute([
    trim($data['customer_name']),
    trim($data['customer_phone']),
    $data['customer_email'] ?? null,
    $data['booking_date'],
    $data['booking_time'],
    (int) $data['guests'],
    $data['seating_preference'] ?? null,
    $data['occasion'] ?? null,
    $data['notes'] ?? null,
]);
$bookingId = (int) $pdo->lastInsertId();
upsert_customer($pdo, trim($data['customer_name']), trim($data['customer_phone']), $data['customer_email'] ?? null, 'booking');

json_response(['success' => true, 'booking_id' => $bookingId]);
