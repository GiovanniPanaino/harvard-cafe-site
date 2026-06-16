<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$data = get_json_input();
$missing = validate_required($data, ['customer_name', 'customer_phone', 'event_date', 'guest_count', 'function_type']);
if ($missing) {
    json_response(['success' => false, 'message' => 'Name, phone, event date, guest count, and function type are required'], 422);
}

$stmt = $pdo->prepare('INSERT INTO function_enquiries (customer_name, customer_phone, customer_email, event_date, guest_count, function_type, budget_range, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "pending")');
$stmt->execute([
    trim($data['customer_name']),
    trim($data['customer_phone']),
    $data['customer_email'] ?? null,
    $data['event_date'],
    (int) $data['guest_count'],
    $data['function_type'],
    $data['budget_range'] ?? null,
    $data['notes'] ?? null,
]);
$enquiryId = (int) $pdo->lastInsertId();
upsert_customer($pdo, trim($data['customer_name']), trim($data['customer_phone']), $data['customer_email'] ?? null, 'function_enquiry');

json_response(['success' => true, 'enquiry_id' => $enquiryId]);
