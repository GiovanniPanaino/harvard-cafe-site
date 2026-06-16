<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$stmt = $pdo->query('SELECT * FROM function_enquiries ORDER BY CASE WHEN status = "pending" THEN 0 ELSE 1 END, created_at DESC');
json_response(['success' => true, 'enquiries' => $stmt->fetchAll()]);
