<?php
// One-time content sync for Question #172's WLC explanation.
$envFile = dirname(__DIR__) . '/.env';
$env = [];
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) continue;
        [$key, $value] = explode('=', $line, 2);
        $env[trim($key)] = trim($value);
    }
}

$dbHost = $env['DB_HOST'] ?? 'localhost';
$dbUser = $env['DB_USER'] ?? 'u181781564_ccna_dumps';
$dbPass = $env['DB_PASSWORD'] ?? 'C4XMT0a@a>';
$dbName = $env['DB_NAME'] ?? 'u181781564_ccna_dumps';

$explanation = <<<'HTML'
<div class="explanation-rich-content">
  <div class="expl-card concept-card">
    <div class="section-title-concept">📌 Core Concept: Cisco WLC Virtual Interface Roles</div>
    <p>A Cisco Wireless LAN Controller separates its work across logical interfaces. The management interface handles administration, the AP-manager interface handles CAPWAP communication with access points, dynamic interfaces represent client VLANs, and the virtual interface provides controller-wide services.</p>
    <p>That distinction matters because a DHCP request begins as a Layer 2 broadcast. A broadcast from a wireless client cannot cross a routed boundary by itself, so the WLC needs one logical address to act as the relay endpoint and to support services that must work across client VLANs.</p>
  </div>

  <div class="expl-card correct-card">
    <h4 class="section-title-correct">✓ Why the Correct Answer (Option B) is Correct:</h4>
    <ul>
      <li><span class="opt-tag correct">Option B</span> <strong>virtual</strong>: The WLC <strong>Virtual Interface</strong> uses a nonroutable, fictitious address such as <code>1.1.1.1</code> (or a documentation address such as <code>192.0.2.1</code>). It is not a normal client gateway and should not be routed through the network.</li>
      <li>When a wireless client sends a DHCP broadcast, the WLC receives it from the client WLAN and relays it toward the configured DHCP server. The virtual interface supplies the controller-side Layer 3 identity for that process.</li>
      <li>The same interface also supports controller-wide functions such as Web Authentication redirection and mobility management. Therefore, <strong>virtual</strong> is the interface associated with DHCP relay in this question.</li>
    </ul>
  </div>

  <div class="expl-card incorrect-card">
    <h4 class="section-title-incorrect">✗ Why Other Options are Incorrect:</h4>
    <ul>
      <li><span class="opt-tag wrong">Option A</span> <strong>service</strong>: The service interface is used for out-of-band management, initial setup, and recovery. It is not the controller-wide client DHCP relay identity.</li>
      <li><span class="opt-tag wrong">Option C</span> <strong>distribution</strong>: The distribution system is the wired network path that carries traffic between the WLC and the rest of the infrastructure. It is not a logical WLC service interface used for DHCP relay.</li>
      <li><span class="opt-tag wrong">Option D</span> <strong>AP-manager</strong>: The AP-manager interface supports Layer 3 CAPWAP discovery and tunnel termination between lightweight APs and the WLC. It does not provide the virtual interface's DHCP relay and WebAuth functions.</li>
    </ul>
  </div>

  <div class="expl-card tip-card">
    <h4 class="section-title-tip">💡 CCNA Exam Tip:</h4>
    <p>Remember the role: <strong>Virtual = controller-wide services</strong> (DHCP relay, WebAuth redirection, and mobility). <strong>AP-manager = AP/CAPWAP communication</strong>; <strong>service = out-of-band management</strong>.</p>
  </div>
</div>
HTML;

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    $stmt = $pdo->prepare('UPDATE questions SET explanation = ? WHERE id = ? OR question_no = ?');
    $stmt->execute([$explanation, 104, 'Question #172']);
    echo "Updated Question #172 explanation. Rows affected: {$stmt->rowCount()}\n";
} catch (Throwable $error) {
    fwrite(STDERR, "Explanation sync failed: {$error->getMessage()}\n");
    exit(1);
}
