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

$pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

echo "--- SAVED SESSIONS ---\n";
$rows = $pdo->query("SELECT id, user_email, bank_name, q_index, points, updated_at, questions, answers FROM saved_sessions")->fetchAll();
foreach ($rows as $r) {
    $qs = json_decode($r['questions'] ?? '[]', true) ?: [];
    $ans = json_decode($r['answers'] ?? '[]', true) ?: [];
    $totalQ = count($qs);
    $answered = count(array_filter($ans, function($v) { return $v !== null && $v !== ''; }));
    echo "ID: {$r['id']} | User: {$r['user_email']} | Bank: {$r['bank_name']} | Index: {$r['q_index']} | Answered: $answered / $totalQ\n";
}

echo "\n--- EXAM ATTEMPTS (aasikhan2624) ---\n";
$attempts = $pdo->query("SELECT id, bank_name, score, max_score, percentage, passed, exam_date FROM exam_attempts WHERE user_email = 'aasikhan2624@gmail.com' ORDER BY exam_date DESC")->fetchAll();
foreach ($attempts as $a) {
    echo "Attempt ID: {$a['id']} | Bank: {$a['bank_name']} | Score: {$a['score']}/{$a['max_score']} | Pct: {$a['percentage']}% | Passed: {$a['passed']} | Date: {$a['exam_date']}\n";
}
