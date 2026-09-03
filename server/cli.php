<?php
$envPath = __DIR__ . '/../.env';
$env = [];
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $val) = explode('=', $line, 2);
            $env[trim($key)] = trim($val);
        }
    }
}

$dbHost = $env['DB_HOST'] ?? 'localhost';
$dbUser = $env['DB_USER'] ?? 'u181781564_ccna_dumps';
$dbPass = $env['DB_PASSWORD'] ?? 'C4XMT0a@a>';
$dbName = $env['DB_NAME'] ?? 'u181781564_ccna_dumps';

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    echo "=== USERS MATCHING 'saad' ===\n";
    $stmt = $pdo->query("SELECT id, name, email, is_verified, verification_code, verification_expires_at, created_at FROM users WHERE name LIKE '%saad%' OR email LIKE '%saad%'");
    $users = $stmt->fetchAll();
    print_r($users);

    echo "\n=== ALL RECENT USERS ===\n";
    $stmt2 = $pdo->query("SELECT id, name, email, is_verified, verification_code, verification_expires_at, created_at FROM users ORDER BY created_at DESC LIMIT 5");
    $all = $stmt2->fetchAll();
    print_r($all);
} catch (Exception $e) {
    echo "DB Error: " . $e->getMessage() . "\n";
}
