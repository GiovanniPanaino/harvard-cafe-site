<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$stmt = $pdo->query('SELECT id, title, description, price_cents, image_path, special_date FROM daily_specials WHERE active = 1 ORDER BY special_date DESC, id DESC LIMIT 8');
json_response(['success' => true, 'specials' => $stmt->fetchAll()]);
