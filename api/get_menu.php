<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/helpers.php';

$categories = $pdo->query('SELECT id, name, description, sort_order FROM menu_categories WHERE active = 1 ORDER BY sort_order, name')->fetchAll();
$items = $pdo->query('SELECT id, category_id, name, description, price_cents, image_path, available, featured, sort_order FROM menu_items WHERE available = 1 ORDER BY sort_order, name')->fetchAll();

json_response(['success' => true, 'categories' => $categories, 'items' => $items]);
