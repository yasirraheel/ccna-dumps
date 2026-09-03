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

function sendSmtpEmail($to, $subject, $htmlBody, $env) {
    $host = $env['SMTP_HOST'] ?? 'smtp.hostinger.com';
    $port = (int)($env['SMTP_PORT'] ?? 465);
    $user = $env['SMTP_USER'] ?? 'ccna-dumps@hassanagro.com';
    $pass = $env['SMTP_PASS'] ?? 'z?Y3:HBBa6^';
    $from = $env['SMTP_FROM'] ?? 'ccna-dumps@hassanagro.com';

    $server = ($port == 465 ? "ssl://" : "") . $host;
    echo "Connecting to $server:$port...\n";
    $socket = fsockopen($server, $port, $errno, $errstr, 15);
    if (!$socket) {
        return ["success" => false, "error" => "Could not connect to SMTP server: $errstr ($errno)"];
    }

    $read = function() use ($socket) {
        $response = "";
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) == " ") break;
        }
        return $response;
    };

    $write = function($cmd) use ($socket, $read) {
        echo ">>> " . (strpos($cmd, 'AUTH') === false && strlen($cmd) < 50 ? trim($cmd) : "[REDACTED/DATA]") . "\n";
        fputs($socket, $cmd . "\r\n");
        $res = $read();
        echo "<<< " . trim($res) . "\n";
        return $res;
    };

    $banner = $read();
    echo "<<< " . trim($banner) . "\n";

    $write("EHLO localhost");
    $write("AUTH LOGIN");
    $write(base64_encode($user));
    $resAuth = $write(base64_encode($pass));

    if (substr($resAuth, 0, 3) !== '235') {
        fclose($socket);
        return ["success" => false, "error" => "SMTP Authentication failed: $resAuth"];
    }

    $write("MAIL FROM: <$user>");
    $resRcpt = $write("RCPT TO: <$to>");
    if (substr($resRcpt, 0, 3) !== '250') {
        fclose($socket);
        return ["success" => false, "error" => "RCPT TO failed: $resRcpt"];
    }

    $write("DATA");

    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: Cisco CCNA Exam Prep <$user>",
        "Reply-To: $user",
        "To: <$to>",
        "Subject: $subject",
        "Date: " . date("r"),
        "X-Mailer: CCNA Exam Prep Engine"
    ];

    $emailData = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.";
    $resData = $write($emailData);
    $write("QUIT");
    fclose($socket);

    if (substr($resData, 0, 3) === '250') {
        return ["success" => true, "message" => "Email sent successfully via Hostinger SMTP!"];
    }
    return ["success" => false, "error" => "DATA failed: $resData"];
}

echo "Testing SMTP to saadmaqbool7861@gmail.com...\n";
$testOtp = "849201";
$html = "<h2>CCNA Exam Simulator Verification Code</h2><p>Your OTP Code is: <b>$testOtp</b></p>";
$result = sendSmtpEmail('saadmaqbool7861@gmail.com', "CCNA Exam - Verification Code: $testOtp", $html, $env);
print_r($result);

