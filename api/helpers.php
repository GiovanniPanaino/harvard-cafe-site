<?php
declare(strict_types=1);

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function get_json_input(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    return is_array($data) ? $data : [];
}

function validate_required(array $data, array $fields): array
{
    $missing = [];
    foreach ($fields as $field) {
        if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
            $missing[] = $field;
        }
    }
    return $missing;
}

function generate_order_number(): string
{
    return 'HC-' . date('ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));
}

function upsert_customer(PDO $pdo, string $name, string $phone, ?string $email, string $source): void
{
    $stmt = $pdo->prepare('SELECT id FROM customers WHERE phone = ? LIMIT 1');
    $stmt->execute([$phone]);
    $existing = $stmt->fetch();

    if ($existing) {
        $update = $pdo->prepare('UPDATE customers SET name = ?, email = COALESCE(NULLIF(?, ""), email), source = ? WHERE id = ?');
        $update->execute([$name, $email ?? '', $source, $existing['id']]);
        return;
    }

    $insert = $pdo->prepare('INSERT INTO customers (name, phone, email, source) VALUES (?, ?, ?, ?)');
    $insert->execute([$name, $phone, $email, $source]);
}
