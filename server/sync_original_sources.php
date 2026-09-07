<?php
$envFile = dirname(__DIR__) . '/.env';
$env = [];
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line === '' || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($k, $v) = explode('=', $line, 2);
            $env[trim($k)] = trim($v);
        }
    }
}
$dbHost = $env['DB_HOST'] ?? 'localhost';
$dbUser = $env['DB_USER'] ?? 'u181781564_ccna_dumps';
$dbPass = $env['DB_PASSWORD'] ?? 'C4XMT0a@a>';
$dbName = $env['DB_NAME'] ?? 'u181781564_ccna_dumps';

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    // Check if original_source_image column exists
    $cols = $pdo->query("SHOW COLUMNS FROM questions LIKE 'original_source_image'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE questions ADD COLUMN original_source_image VARCHAR(255) NULL AFTER exhibit_image");
        echo "Added column 'original_source_image' to questions table.\n";
    } else {
        echo "Column 'original_source_image' already exists.\n";
    }

    $stmt = $pdo->prepare("UPDATE questions SET original_source_image = ? WHERE question_no = ?");
    $updatedCount = 0;

    for ($i = 1; $i <= 207; $i++) {
        $imagePath = 'original_sources/' . $i . '.webp';
        $qNo = 'Question #' . $i;
        $stmt->execute([$imagePath, $qNo]);
        $updatedCount += $stmt->rowCount();
    }

    // Set null for drag and drop
    $pdo->exec("UPDATE questions SET original_source_image = NULL WHERE question_no LIKE 'Drag & Drop%'");

    echo "Sync completed. Total questions updated: $updatedCount / 207\n";
} catch (Exception $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
