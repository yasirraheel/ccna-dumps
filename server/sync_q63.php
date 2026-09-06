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
    $q = "Refer to the exhibit. Inter-VLAN routing is configured on SW1. Client A is running Linux as an OS in VLAN 10 with a default gateway IP 10.0.0.1 but cannot ping client B in VLAN 20 running Windows. What action must be taken to verify that client A has the correct IP settings? (Choose one answer)";
    $opts = json_encode([
        "A. Run the ipconfig command on client A and ensure that the IP address is within the host range of 10.0.0.1 - 10.255.254.",
        "B. Run the ifconfig command on client A to confirm that the subnet mask is set to 255.255.128.0.",
        "C. Run the ifconfig command on client A to confirm that its IP and subnet mask fall within 255.255.0.0.",
        "D. Run the ipconfig command on client A to confirm that the correct 10.0.0.1 default gateway is used."
    ]);
    $corr = json_encode([2]);
    $stmt = $pdo->prepare("UPDATE questions SET question = ?, options = ?, correct_option = ? WHERE id = 98 OR question_no = ?");
    $stmt->execute([$q, $opts, $corr, "Question #63"]);
    echo "Synced Question #63 in MySQL. Rows affected: " . $stmt->rowCount() . "\n";
} catch (Exception $e) {
    echo "Error updating MySQL: " . $e->getMessage() . "\n";
}
