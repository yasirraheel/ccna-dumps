<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

// Load .env
$envPath = __DIR__ . '/.env';
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
$jwtSecret = $env['JWT_SECRET'] ?? 'ccna_dumps_production_secret_key_2026';

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed", "details" => $e->getMessage()]);
    exit;
}

// Request path parsing
$requestUri = $_SERVER['REQUEST_URI'];
$basePath = parse_url($requestUri, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$body = json_decode(file_get_contents('php://input'), true) ?? [];

// Helper to generate simple token
function createToken($user, $secret) {
    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode([
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'exp' => time() + (30 * 86400)
    ]));
    $sig = hash_hmac('sha256', "$header.$payload", $secret, true);
    $signature = base64_encode($sig);
    return "$header.$payload.$signature";
}

function verifyToken($token, $secret) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    list($header, $payload, $signature) = $parts;
    $validSig = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    if ($signature !== $validSig) return false;
    $data = json_decode(base64_decode($payload), true);
    if (!$data || !isset($data['id'])) return false;
    if (isset($data['exp']) && $data['exp'] < time()) return false;
    return $data;
}

function sendHostingerEmail($to, $subject, $htmlMessage, $env) {
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Cisco CCNA Exam Prep <ccna-dumps@hassanagro.com>\r\n";
    $headers .= "Reply-To: ccna-dumps@hassanagro.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    @mail($to, $subject, $htmlMessage, $headers);
}

// Route matching
// 1. Health check
if (preg_match('#^/api/health#', $basePath)) {
    echo json_encode(["status" => "ok", "database" => "connected", "server" => "Hostinger PHP 8.3", "time" => date('c')]);
    exit;
}

// 2. Auth: Register
if (preg_match('#^/api/auth/register#', $basePath) && $method === 'POST') {
    $name = trim($body['name'] ?? '');
    $email = strtolower(trim($body['email'] ?? ''));
    $password = $body['password'] ?? '';

    if (!$name || !$email || !$password) {
        http_response_code(400);
        echo json_encode(["error" => "Name, email, and password are required."]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existing = $stmt->fetch();

    $otp = (string)rand(100000, 999999);
    $expires = time() + (15 * 60);
    $hash = password_hash($password, PASSWORD_BCRYPT);

    if ($existing) {
        if ($existing['is_verified']) {
            http_response_code(409);
            echo json_encode(["error" => "An account with this email already exists. Please log in."]);
            exit;
        }
        $update = $pdo->prepare("UPDATE users SET name = ?, password_hash = ?, verification_code = ?, verification_expires_at = ? WHERE email = ?");
        $update->execute([$name, $hash, $otp, $expires * 1000, $email]);
    } else {
        $userId = 'usr_' . time() . '_' . substr(md5(rand()), 0, 6);
        $insert = $pdo->prepare("INSERT INTO users (id, name, email, password_hash, is_verified, verification_code, verification_expires_at) VALUES (?, ?, ?, ?, 0, ?, ?)");
        $insert->execute([$userId, $name, $email, $hash, $otp, $expires * 1000]);
    }

    $html = "<div style='font-family:sans-serif;padding:20px;background:#0f172a;color:#fff;'><h2>CCNA Exam Simulator Verification</h2><p>Hello $name,</p><p>Your verification OTP code is:</p><h1 style='color:#10b981;'>$otp</h1><p>Valid for 15 minutes.</p></div>";
    sendHostingerEmail($email, "CCNA Exam - Email Verification Code: $otp", $html, $env);

    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Verification code sent to $email.", "email" => $email, "isVerified" => false]);
    exit;
}

// 3. Auth: Verify Email
if (preg_match('#^/api/auth/verify-email#', $basePath) && $method === 'POST') {
    $email = strtolower(trim($body['email'] ?? ''));
    $code = trim($body['code'] ?? '');

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "Account not found with this email."]);
        exit;
    }

    if ($user['is_verified'] || $user['verification_code'] === $code) {
        $pdo->prepare("UPDATE users SET is_verified = 1, verification_code = NULL, verification_expires_at = NULL WHERE id = ?")->execute([$user['id']]);
        $token = createToken($user, $jwtSecret);
        echo json_encode([
            "success" => true,
            "message" => "Email verified successfully!",
            "token" => $token,
            "user" => ["id" => $user['id'], "name" => $user['name'], "email" => $user['email'], "isVerified" => true]
        ]);
        exit;
    }

    http_response_code(400);
    echo json_encode(["error" => "Invalid verification code."]);
    exit;
}

// 4. Auth: Resend Code
if (preg_match('#^/api/auth/resend-code#', $basePath) && $method === 'POST') {
    $email = strtolower(trim($body['email'] ?? ''));
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "Account not found."]);
        exit;
    }

    $otp = (string)rand(100000, 999999);
    $expires = (time() + 900) * 1000;
    $pdo->prepare("UPDATE users SET verification_code = ?, verification_expires_at = ? WHERE id = ?")->execute([$otp, $expires, $user['id']]);

    $html = "<div style='font-family:sans-serif;padding:20px;background:#0f172a;color:#fff;'><h2>CCNA Exam Simulator Code</h2><p>Your OTP code is:</p><h1 style='color:#10b981;'>$otp</h1></div>";
    sendHostingerEmail($email, "CCNA Exam - Resent Code: $otp", $html, $env);

    echo json_encode(["success" => true, "message" => "Verification code sent to $email."]);
    exit;
}

// 5. Auth: Login
if (preg_match('#^/api/auth/login#', $basePath) && $method === 'POST') {
    $email = strtolower(trim($body['email'] ?? ''));
    $password = $body['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid email or password."]);
        exit;
    }

    if (!$user['is_verified']) {
        $otp = (string)rand(100000, 999999);
        $expires = (time() + 900) * 1000;
        $pdo->prepare("UPDATE users SET verification_code = ?, verification_expires_at = ? WHERE id = ?")->execute([$otp, $expires, $user['id']]);
        $html = "<div style='font-family:sans-serif;padding:20px;background:#0f172a;color:#fff;'><h2>Verify Your CCNA Account</h2><p>Your OTP code is:</p><h1 style='color:#10b981;'>$otp</h1></div>";
        sendHostingerEmail($email, "Verify Your CCNA Account - Code: $otp", $html, $env);

        http_response_code(403);
        echo json_encode(["error" => "Email not verified.", "needsVerification" => true, "email" => $email]);
        exit;
    }

    $token = createToken($user, $jwtSecret);
    echo json_encode([
        "success" => true,
        "message" => "Login successful!",
        "token" => $token,
        "user" => ["id" => $user['id'], "name" => $user['name'], "email" => $user['email'], "isVerified" => true]
    ]);
    exit;
}

// 6. Auth: Current user (me)
if (preg_match('#^/api/auth/me#', $basePath)) {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$auth && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    if (preg_match('/Bearer\s+(.*)$/i', $auth, $matches)) {
        $decoded = verifyToken($matches[1], $jwtSecret);
        if ($decoded) {
            $stmt = $pdo->prepare("SELECT id, name, email, is_verified, created_at FROM users WHERE id = ?");
            $stmt->execute([$decoded['id']]);
            $u = $stmt->fetch();
            if ($u) {
                echo json_encode(["user" => ["id" => $u['id'], "name" => $u['name'], "email" => $u['email'], "isVerified" => (bool)$u['is_verified'], "createdAt" => $u['created_at']]]);
                exit;
            }
        }
    }
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// 7. Auth: Forgot password
if (preg_match('#^/api/auth/forgot-password#', $basePath) && $method === 'POST') {
    $email = strtolower(trim($body['email'] ?? ''));
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        $otp = (string)rand(100000, 999999);
        $expires = (time() + 900) * 1000;
        $pdo->prepare("UPDATE users SET reset_token = ?, reset_expires_at = ? WHERE id = ?")->execute([$otp, $expires, $user['id']]);
        $html = "<div style='font-family:sans-serif;padding:20px;background:#0f172a;color:#fff;'><h2>CCNA Password Reset</h2><p>Your password reset OTP code is:</p><h1 style='color:#ef4444;'>$otp</h1></div>";
        sendHostingerEmail($email, "CCNA Exam - Password Reset Code: $otp", $html, $env);
    }

    echo json_encode(["success" => true, "message" => "Password reset code sent if account exists."]);
    exit;
}

// 8. Auth: Reset password
if (preg_match('#^/api/auth/reset-password#', $basePath) && $method === 'POST') {
    $email = strtolower(trim($body['email'] ?? ''));
    $code = trim($body['code'] ?? '');
    $newPassword = $body['newPassword'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && $user['reset_token'] === $code && strlen($newPassword) >= 6) {
        $hash = password_hash($newPassword, PASSWORD_BCRYPT);
        $pdo->prepare("UPDATE users SET password_hash = ?, reset_token = NULL, reset_expires_at = NULL, is_verified = 1 WHERE id = ?")->execute([$hash, $user['id']]);
        echo json_encode(["success" => true, "message" => "Password reset successful!"]);
        exit;
    }

    http_response_code(400);
    echo json_encode(["error" => "Invalid reset code or password."]);
    exit;
}

// 9. Questions API
if (preg_match('#^/api/questions#', $basePath)) {
    $rows = $pdo->query("SELECT * FROM questions ORDER BY id ASC")->fetchAll();
    $formatted = array_map(function($r) {
        $opts = json_decode($r['options'] ?? '[]', true) ?? [];
        $correct = json_decode($r['correct_option'] ?? '[]', true) ?? [];
        $dragDrop = json_decode($r['drag_drop_data'] ?? 'null', true);
        return [
            'id' => (int)$r['id'],
            'type' => $r['type'] ?? ($dragDrop ? 'drag_drop' : 'multiple_choice'),
            'questionNo' => $r['question_no'],
            'question' => $r['question'],
            'options' => $opts,
            'correctOption' => is_array($correct) ? $correct : [$correct],
            'dragDropData' => $dragDrop,
            'points' => (int)($r['points'] ?? 10),
            'cliSnippet' => $r['cli_snippet'],
            'exhibitImage' => $r['exhibit_image']
        ];
    }, $rows);
    echo json_encode(["questions" => $formatted]);
    exit;
}

// 10. Exam History API
if (preg_match('#^/api/history#', $basePath)) {
    if ($method === 'POST') {
        $b = $body;
        $id = $b['id'] ?? ('exam_' . time());
        $stmt = $pdo->prepare("INSERT INTO exam_attempts 
            (id, user_id, user_email, candidate_name, bank_name, score, max_score, percentage, passed, total_questions, time_spent_seconds, exam_date, questions, answers, flagged_questions, revealed_questions, settings, exam_mode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            user_id=VALUES(user_id), user_email=VALUES(user_email), candidate_name=VALUES(candidate_name), score=VALUES(score),
            percentage=VALUES(percentage), passed=VALUES(passed), answers=VALUES(answers), settings=VALUES(settings)");
        $stmt->execute([
            $id,
            $b['userId'] ?? null,
            isset($b['userEmail']) ? strtolower($b['userEmail']) : null,
            $b['candidateName'] ?? 'Candidate',
            $b['bankName'] ?? 'CCNA Exam',
            $b['score'] ?? 0,
            $b['maxScore'] ?? 1000,
            $b['percentage'] ?? 0,
            !empty($b['passed']) ? 1 : 0,
            $b['totalQuestions'] ?? 0,
            $b['timeSpentSeconds'] ?? 0,
            $b['date'] ?? (time() * 1000),
            json_encode($b['questions'] ?? []),
            json_encode($b['answers'] ?? []),
            json_encode($b['flaggedQuestions'] ?? []),
            json_encode($b['revealedQuestions'] ?? []),
            json_encode($b['settings'] ?? []),
            $b['examMode'] ?? 'study'
        ]);
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Exam saved to MySQL", "examId" => $id]);
        exit;
    }

    if ($method === 'GET') {
        $userId = $_GET['userId'] ?? null;
        $userEmail = isset($_GET['userEmail']) ? strtolower($_GET['userEmail']) : null;
        if (!$userId && !$userEmail) {
            echo json_encode(["history" => []]);
            exit;
        }
        $query = "SELECT * FROM exam_attempts WHERE " . ($userId ? "user_id = ?" : "user_email = ?") . " ORDER BY exam_date DESC LIMIT 50";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$userId ?: $userEmail]);
        $rows = $stmt->fetchAll();
        $formatted = array_map(function($r) {
            return [
                'id' => $r['id'],
                'userId' => $r['user_id'],
                'userEmail' => $r['user_email'],
                'candidateName' => $r['candidate_name'],
                'bankName' => $r['bank_name'],
                'score' => (int)$r['score'],
                'maxScore' => (int)$r['max_score'],
                'percentage' => (float)$r['percentage'],
                'passed' => (bool)$r['passed'],
                'totalQuestions' => (int)$r['total_questions'],
                'timeSpentSeconds' => (int)$r['time_spent_seconds'],
                'date' => (float)$r['exam_date'],
                'questions' => json_decode($r['questions'] ?? '[]', true),
                'answers' => json_decode($r['answers'] ?? '[]', true),
                'flaggedQuestions' => json_decode($r['flagged_questions'] ?? '[]', true),
                'revealedQuestions' => json_decode($r['revealed_questions'] ?? '[]', true),
                'settings' => json_decode($r['settings'] ?? '{}', true),
                'examMode' => $r['exam_mode']
            ];
        }, $rows);
        echo json_encode(["history" => $formatted]);
        exit;
    }

    if ($method === 'DELETE') {
        if (preg_match('#/api/history/([^/]+)#', $basePath, $m)) {
            $pdo->prepare("DELETE FROM exam_attempts WHERE id = ?")->execute([$m[1]]);
        } else {
            $userId = $_GET['userId'] ?? null;
            if ($userId) $pdo->prepare("DELETE FROM exam_attempts WHERE user_id = ?")->execute([$userId]);
        }
        echo json_encode(["success" => true, "message" => "History deleted"]);
        exit;
    }
}

// 11. Saved Sessions API
if (preg_match('#^/api/sessions#', $basePath)) {
    if ($method === 'POST') {
        $s = $body;
        $stmt = $pdo->prepare("INSERT INTO saved_sessions 
            (id, user_id, user_email, candidate_name, bank_name, exam_mode, q_index, points, seconds_remaining, time_spent_seconds, questions, answers, flagged_questions, revealed_questions, question_notes, settings, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            user_id=VALUES(user_id), user_email=VALUES(user_email), q_index=VALUES(q_index), points=VALUES(points),
            seconds_remaining=VALUES(seconds_remaining), answers=VALUES(answers), flagged_questions=VALUES(flagged_questions),
            revealed_questions=VALUES(revealed_questions), question_notes=VALUES(question_notes), settings=VALUES(settings), updated_at=VALUES(updated_at)");
        $stmt->execute([
            $s['id'],
            $s['userId'] ?? null,
            isset($s['userEmail']) ? strtolower($s['userEmail']) : null,
            $s['candidateName'] ?? 'Candidate',
            $s['bankName'] ?? 'CCNA Exam',
            $s['examMode'] ?? 'study',
            $s['index'] ?? 0,
            $s['points'] ?? 0,
            $s['secondsRemaining'] ?? 7200,
            $s['timeSpentSeconds'] ?? 0,
            json_encode($s['questions'] ?? []),
            json_encode($s['answers'] ?? []),
            json_encode($s['flaggedQuestions'] ?? []),
            json_encode($s['revealedQuestions'] ?? []),
            json_encode($s['questionNotes'] ?? []),
            json_encode($s['settings'] ?? []),
            $s['updatedAt'] ?? (time() * 1000)
        ]);
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Session saved", "sessionId" => $s['id']]);
        exit;
    }

    if ($method === 'GET') {
        $userId = $_GET['userId'] ?? null;
        $userEmail = isset($_GET['userEmail']) ? strtolower($_GET['userEmail']) : null;
        if (!$userId && !$userEmail) {
            echo json_encode(["sessions" => []]);
            exit;
        }
        $query = "SELECT * FROM saved_sessions WHERE " . ($userId ? "user_id = ?" : "user_email = ?") . " ORDER BY updated_at DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$userId ?: $userEmail]);
        $rows = $stmt->fetchAll();
        $formatted = array_map(function($r) {
            return [
                'id' => $r['id'],
                'userId' => $r['user_id'],
                'userEmail' => $r['user_email'],
                'candidateName' => $r['candidate_name'],
                'bankName' => $r['bank_name'],
                'examMode' => $r['exam_mode'],
                'index' => (int)$r['q_index'],
                'points' => (int)$r['points'],
                'secondsRemaining' => (int)$r['seconds_remaining'],
                'timeSpentSeconds' => (int)$r['time_spent_seconds'],
                'questions' => json_decode($r['questions'] ?? '[]', true),
                'answers' => json_decode($r['answers'] ?? '[]', true),
                'flaggedQuestions' => json_decode($r['flagged_questions'] ?? '[]', true),
                'revealedQuestions' => json_decode($r['revealed_questions'] ?? '[]', true),
                'questionNotes' => json_decode($r['question_notes'] ?? '{}', true),
                'settings' => json_decode($r['settings'] ?? '{}', true),
                'updatedAt' => (float)$r['updated_at']
            ];
        }, $rows);
        echo json_encode(["sessions" => $formatted]);
        exit;
    }

    if ($method === 'DELETE') {
        if (preg_match('#/api/sessions/([^/]+)#', $basePath, $m)) {
            $pdo->prepare("DELETE FROM saved_sessions WHERE id = ?")->execute([$m[1]]);
        }
        echo json_encode(["success" => true, "message" => "Session deleted"]);
        exit;
    }
}

// 12. Notes API
if (preg_match('#^/api/notes#', $basePath)) {
    if ($method === 'GET') {
        $userId = $_GET['userId'] ?? null;
        $userEmail = isset($_GET['userEmail']) ? strtolower($_GET['userEmail']) : null;
        $stmt = $pdo->prepare("SELECT * FROM candidate_notes WHERE user_id = ? OR user_email = ?");
        $stmt->execute([$userId, $userEmail]);
        $rows = $stmt->fetchAll();
        $notes = [];
        foreach ($rows as $r) {
            $notes[$r['question_id']] = $r['note_text'];
        }
        echo json_encode(["notes" => $notes, "list" => $rows]);
        exit;
    }

    if ($method === 'POST') {
        $b = $body;
        $stmt = $pdo->prepare("INSERT INTO candidate_notes (user_id, user_email, candidate_name, question_id, question_no, note_text)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE note_text=VALUES(note_text), question_no=VALUES(question_no)");
        $stmt->execute([
            $b['userId'] ?? null,
            isset($b['userEmail']) ? strtolower($b['userEmail']) : null,
            $b['candidateName'] ?? 'Candidate',
            $b['questionId'],
            $b['questionNo'] ?? ("Question #" . $b['questionId']),
            $b['noteText'] ?? ''
        ]);
        echo json_encode(["success" => true, "message" => "Note saved"]);
        exit;
    }
}

// Fallback
echo json_encode(["message" => "CCNA Exam API", "endpoint" => $basePath]);
