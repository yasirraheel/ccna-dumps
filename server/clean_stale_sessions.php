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
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    echo "=== Cleaning Stale / Finished Sessions in MySQL ===\n";

    $delAttempts = $pdo->exec("DELETE s FROM saved_sessions s INNER JOIN exam_attempts ea ON s.id = ea.id");
    echo "1. Deleted sessions already present in exam_attempts: $delAttempts\n";

    $rows = $pdo->query("SELECT id, user_email, questions, answers, q_index FROM saved_sessions")->fetchAll();
    $deletedCount = 0;
    foreach ($rows as $r) {
        $qs = json_decode($r['questions'] ?? '[]', true) ?: [];
        $ans = json_decode($r['answers'] ?? '[]', true) ?: [];
        $totalQ = count($qs);
        $answered = count(array_filter($ans, function($v) { return $v !== null && $v !== ''; }));

        if ($totalQ > 0 && $answered >= $totalQ) {
            $pdo->prepare("DELETE FROM saved_sessions WHERE id = ?")->execute([$r['id']]);
            echo "   Deleted completed session: {$r['id']} ({$r['user_email']}, $answered/$totalQ answered)\n";
            $deletedCount++;
        }
    }
    echo "2. Deleted sessions with 100% answered questions: $deletedCount\n";

    $remaining = $pdo->query("SELECT COUNT(*) FROM saved_sessions")->fetchColumn();
    echo "Remaining active in-progress sessions: $remaining\n";
    echo "=== Done ===\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
