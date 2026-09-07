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

    // 1. Fix Question #175: Correct Option is Router D (index 3)
    $corr175 = json_encode([3]);
    $stmt175 = $pdo->prepare("UPDATE questions SET correct_option = ? WHERE id = 119 OR question_no = ?");
    $stmt175->execute([$corr175, "Question #175"]);
    echo "Synced Question #175 in MySQL. Rows affected: " . $stmt175->rowCount() . "\n";

    // 2. Fix Question #179: Replace mismatched question text and options with exact original dump
    $q179_text = "What is a characteristic of encryption in wireless networks? (Choose one answer)";
    $q179_opts = json_encode([
        "A. identifies an access point on a WLAN",
        "B. encodes plain text into cipher text",
        "C. eliminates network piggybacking",
        "D. uses ciphers to authenticate"
    ]);
    $q179_corr = json_encode([1]);
    $stmt179 = $pdo->prepare("UPDATE questions SET question = ?, options = ?, correct_option = ?, original_source_image = 'original_sources/179.webp' WHERE id = 128 OR question_no = ?");
    $stmt179->execute([$q179_text, $q179_opts, $q179_corr, "Question #179"]);
    echo "Synced Question #179 in MySQL. Rows affected: " . $stmt179->rowCount() . "\n";

    // 3. Update any active saved sessions
    $sessions = $pdo->query("SELECT id, questions FROM saved_sessions")->fetchAll();
    foreach ($sessions as $s) {
        $qs = json_decode($s['questions'] ?? '[]', true);
        $changed = false;
        if (is_array($qs)) {
            foreach ($qs as &$q) {
                if (isset($q['questionNo']) && $q['questionNo'] === 'Question #175') {
                    $q['correctOption'] = [3];
                    $changed = true;
                }
                if (isset($q['questionNo']) && $q['questionNo'] === 'Question #179') {
                    $q['question'] = $q179_text;
                    $q['options'] = [
                        "A. identifies an access point on a WLAN",
                        "B. encodes plain text into cipher text",
                        "C. eliminates network piggybacking",
                        "D. uses ciphers to authenticate"
                    ];
                    $q['correctOption'] = [1];
                    $q['originalSourceImage'] = "original_sources/179.webp";
                    $changed = true;
                }
            }
        }
        if ($changed) {
            $up = $pdo->prepare("UPDATE saved_sessions SET questions = ? WHERE id = ?");
            $up->execute([json_encode($qs), $s['id']]);
        }
    }

    // 4. Update past attempts
    $attempts = $pdo->query("SELECT id, questions FROM exam_attempts")->fetchAll();
    foreach ($attempts as $a) {
        $qs = json_decode($a['questions'] ?? '[]', true);
        $changed = false;
        if (is_array($qs)) {
            foreach ($qs as &$q) {
                if (isset($q['questionNo']) && $q['questionNo'] === 'Question #175') {
                    $q['correctOption'] = [3];
                    $changed = true;
                }
                if (isset($q['questionNo']) && $q['questionNo'] === 'Question #179') {
                    $q['question'] = $q179_text;
                    $q['options'] = [
                        "A. identifies an access point on a WLAN",
                        "B. encodes plain text into cipher text",
                        "C. eliminates network piggybacking",
                        "D. uses ciphers to authenticate"
                    ];
                    $q['correctOption'] = [1];
                    $q['originalSourceImage'] = "original_sources/179.webp";
                    $changed = true;
                }
            }
        }
        if ($changed) {
            $up = $pdo->prepare("UPDATE exam_attempts SET questions = ? WHERE id = ?");
            $up->execute([json_encode($qs), $a['id']]);
        }
    }
    echo "Updated saved_sessions and exam_attempts for Question #175 and Question #179.\n";

} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
    exit(1);
}
