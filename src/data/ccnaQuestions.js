export const ccnaQuestions = [
    {
        "id": 14,
        "questionNo": "Question #1",
        "question": "Which IPsec mode provides encapsulation and encryption of the entire original IP packet on a site-to-site VPN? (Choose one answer)",
        "options": [
            "A. aggressive",
            "B. tunnel",
            "C. transport",
            "D. main"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/1.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: IPsec Modes (RFC 4301)</div>\n    <p>IPsec operates in two distinct operational modes: <strong>Tunnel mode</strong> and <strong>Transport mode</strong>. The selection determines what portion of the original IP packet is encrypted and whether a new IP header is appended.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>tunnel</strong>: In Tunnel mode, the <strong>entire original IP packet</strong> (including original IP header and payload) is encrypted and encapsulated inside a brand new IP header. This mode is the standard for <strong>site-to-site VPNs</strong> because it securely carries private internal subnets (RFC 1918) across the public Internet.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>aggressive</strong>: Aggressive mode is an IKE Phase 1 negotiation mode (using 3 packets instead of Main mode's 6), not an IPsec packet encapsulation mode.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>transport</strong>: Transport mode encrypts only the Layer 4+ payload while leaving the original IP header unencrypted and visible. It is used for end-to-end host-to-host communications, not site-to-site gateway tunnels.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>main</strong>: Main mode is an IKE Phase 1 exchange mode designed to protect peer identities, not an IPsec data transfer encapsulation mode.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Tunnel Mode</strong> = Entire packet encrypted + New IP header added (Site-to-Site VPNs).<br/><strong>Transport Mode</strong> = Payload only encrypted + Original IP header preserved (Host-to-Host).</p>\n  </div>\n</div>"
    },
    {
        "id": 35,
        "questionNo": "Question #2",
        "question": "Refer to the exhibit. The static routes were implemented on the border router. What is the next hop IP address for a ping sent to 172.16.153.154 from the border router? (Choose one answer)",
        "options": [
            "A. 10.56.22.23",
            "B. 10.65.34.19",
            "C. 10.35.47.17",
            "D. 10.12.13.14"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/2.png",
        "originalSourceImage": "original_sources/2.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match (LPM) Routing</div>\n    <p>When forwarding an IP packet, a router examines all matching routes in its routing table and selects the path with the <strong>most specific prefix (longest subnet mask)</strong>, regardless of administrative distance or metric.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>10.35.47.17</strong>:\n        <ul>\n          <li>Target destination: <code>172.16.153.154</code>.</li>\n          <li><code>172.16.153.153 255.255.255.255</code> (/32) does NOT match (it only matches host .153).</li>\n          <li><code>172.16.153.0 255.255.255.0</code> (/24) covers range <code>172.16.153.0 – 172.16.153.255</code>, which <strong>matches</strong>!</li>\n          <li><code>172.16.0.0 255.255.0.0</code> (/16) and <code>172.0.0.0 255.0.0.0</code> (/8) also match, but have shorter prefix lengths (/16 and /8).</li>\n          <li>Under Longest Prefix Match, <strong>/24 beats /16 and /8</strong>. The next hop for <code>172.16.153.0/24</code> is <strong>10.35.47.17</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>10.56.22.23</strong>: Next hop for <code>172.16.0.0/16</code>, which is less specific than the /24 route.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>10.65.34.19</strong>: Next hop for host route <code>172.16.153.153/32</code>. Since the destination is .154, this route does not match.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>10.12.13.14</strong>: Next hop for <code>172.0.0.0/8</code>, the least specific matching prefix.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Routing Table Order of Precedence: <strong>1. Longest Prefix Match (Subnet Mask)</strong> &gt; 2. Administrative Distance (AD) &gt; 3. Metric.</p>\n  </div>\n</div>"
    },
    {
        "id": 4,
        "questionNo": "Question #3",
        "question": "What is the difference between the TCP and UDP protocols? (Choose one answer)",
        "options": [
            "A. TCP identifies devices by their MAC addresses, and UDP identifies devices by their IP address.",
            "B. TCP ensures ordered, reliable data delivery, and UDP offers low latency and high throughput.",
            "C. TCP manages multicast and broadcast data transfers, and UDP only handles unicast communications.",
            "D. TCP discovers neighboring devices on a local network segment, and UDP prevents Layer 2 switching loops."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/3.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 4 Transport Protocols (TCP vs. UDP)</div>\n    <p>Transmission Control Protocol (TCP, RFC 793) and User Datagram Protocol (UDP, RFC 768) represent two contrasting approaches to data delivery across an IP network.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span>: <strong>TCP ensures ordered, reliable data delivery</strong> by utilizing a 3-way handshake (SYN, SYN-ACK, ACK), sequence numbers, acknowledgments, and retransmissions. <strong>UDP offers low latency and high throughput</strong> through a lightweight, connectionless mechanism without transmission overhead or retransmissions.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: MAC addressing operates at Layer 2 (Data Link) and IP addressing operates at Layer 3 (Network). Both TCP and UDP operate at Layer 4 (Transport) and use port numbers.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: UDP handles broadcast and multicast traffic (e.g., DHCP, IPTV, RIPv2), whereas TCP is strictly point-to-point unicast.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Neighbor discovery is handled by ARP/NDP/CDP/LLDP (Layers 2/3), and loop prevention is handled by Spanning Tree Protocol (STP, Layer 2), not Layer 4 protocols.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>TCP = Reliable, connection-oriented, sequenced, 20-byte header.<br/>UDP = Unreliable (best-effort), connectionless, low latency, 8-byte header.</p>\n  </div>\n</div>"
    },
    {
        "id": 8,
        "questionNo": "Question #4",
        "question": "What is a service that is provided by a wireless controller? (Choose one answer)",
        "options": [
            "A. It manages interference in a dense network",
            "B. It provides Layer 3 routing between wired and wireless devices.",
            "C. It mitigates threats from the internet.",
            "D. It issues IP addresses to wired devices."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/4.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Wireless LAN Controller (WLC) Capabilities</div>\n    <p>A Wireless LAN Controller centralizes the management, configuration, and RF optimization of Lightweight Access Points (LAPs) across the enterprise.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>It manages interference in a dense network</strong>: Cisco WLCs execute <strong>Radio Resource Management (RRM)</strong>, including Dynamic Channel Assignment (DCA) and Transmit Power Control (TPC), to continuously detect RF interference, mitigate channel overlap, and optimize wireless coverage.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Layer 3 inter-VLAN routing is performed by core/distribution switches or routers, not standard WLC central functions.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Internet threat mitigation is handled by perimeter firewalls (Cisco Firepower), Next-Gen Firewalls, and IPS systems.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Issuing IP addresses to wired enterprise endpoints is handled by central DHCP servers or Layer 3 switches.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Cisco RRM features on a WLC: Dynamic Channel Assignment (DCA), Transmit Power Control (TPC), Coverage Hole Detection (CHD), and CleanAir RF interference mitigation.</p>\n  </div>\n</div>"
    },
    {
        "id": 2,
        "questionNo": "Question #5",
        "question": "What is the purpose of classifying network traffic in QoS? (Choose one answer)",
        "options": [
            "A. writes the class identifier of a packet to a dedicated field in the packet header",
            "B. configures traffic-matching rules on network devices",
            "C. services traffic according to its class",
            "D. identifies the type of traffic that will receive a particular treatment"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/5.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: QoS Modular Architecture (Classification vs. Marking)</div>\n    <p>Cisco Modular QoS CLI (MQC) partitions quality of service operations into logical stages: <strong>Classification</strong>, <strong>Marking</strong>, and <strong>Congestion Management / Queuing</strong>.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>identifies the type of traffic that will receive a particular treatment</strong>: Classification is the fundamental process of inspecting incoming packets using criteria (ACLs, NBAR, DSCP/CoS values, protocols) to identify and categorize traffic into distinct classes.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Writing or modifying the class identifier in the packet header (such as DSCP or CoS) is defined as <strong>Marking</strong> (Coloring).</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Configuring rules is the administrative setup of class maps, but not the operational purpose of classification itself.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Servicing traffic according to its class is <strong>Queuing / Scheduling</strong> (e.g., Low Latency Queuing - LLQ).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>QoS Lifecycle: <strong>1. Classify</strong> (identify traffic) &rarr; <strong>2. Mark</strong> (tag packet header with DSCP/CoS) &rarr; <strong>3. Queue & Schedule</strong> (prioritize or shape).</p>\n  </div>\n</div>"
    },
    {
        "id": 40,
        "questionNo": "Question #6",
        "question": "Refer to the exhibit. Which minimum configuration items are needed to enable Secure Shell version 2 access to R15? (Choose one answer)",
        "options": [
            "A. Router(config)#crypto key generate rsa general-keys modulus 1024\nRouter(config)#ip ssh version 2\nRouter(config-line)#line vty 0 15\nRouter(config-line)#transport input ssh\nRouter(config)#ip ssh logging events\nR15(config)#ip ssh stricthostkeycheck",
            "B. Router(config)#ip domain-name cisco.com\nRouter(config)#crypto key generate rsa general-keys modulus 1024\nRouter(config)#ip ssh version 2\nRouter(config-line)#line vty 0 15\nRouter(config-line)#transport input all\nRouter(config)#ip ssh logging events",
            "C. Router(config)#hostname R15\nR15(config)#crypto key generate rsa general-keys modulus 1024\nR15(config-line)#line vty 0 15\nR15(config-line)#transport input ssh\nR15(config)#ip ssh source-interface fa0/0\nR15(config)#ip ssh stricthostkeycheck",
            "D. Router(config)#hostname R15\nR15(config)#ip domain-name cisco.com\nR15(config)#crypto key generate rsa general-keys modulus 1024\nR15(config)#ip ssh version 2\nR15(config-line)#line vty 0 15\nR15(config-line)#transport input ssh"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/6.png",
        "originalSourceImage": "original_sources/6.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Secure Shell (SSHv2) Requirements</div>\n    <p>To establish secure SSHv2 administrative access on a Cisco router, several foundational cryptographic and system parameters must be configured in sequence.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>:\n        <ul>\n          <li><code>hostname R15</code>: Must change default name 'Router' before generating RSA keys.</li>\n          <li><code>ip domain-name cisco.com</code>: Required to formulate the router's Fully Qualified Domain Name (FQDN) for the RSA key pair.</li>\n          <li><code>crypto key generate rsa general-keys modulus 1024</code>: Generates the RSA key pair (modulus &ge; 768 bits is required for SSHv2; 1024 or higher recommended).</li>\n          <li><code>ip ssh version 2</code>: Enforces SSH version 2.</li>\n          <li><code>line vty 0 15</code> &rarr; <code>transport input ssh</code>: Disables insecure Telnet and restricts incoming management sessions to SSH.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Lacks <code>hostname</code> and <code>ip domain-name</code>, which causes key generation to fail with error <em>\"% Please define a domain-name first\"</em>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Uses <code>transport input all</code> (allowing unencrypted Telnet) and fails to set a unique hostname.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Omits <code>ip domain-name</code> and <code>ip ssh version 2</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>SSH Prerequisites Mnemonic: <strong>Host, Domain, Crypto, VTY</strong>.<br/>(1. Hostname &rarr; 2. IP domain-name &rarr; 3. Crypto key generate &rarr; 4. Transport input ssh).</p>\n  </div>\n</div>"
    },
    {
        "id": 20,
        "questionNo": "Question #7",
        "question": "How does machine learning strengthen the security measures of the network? (Choose one answer)",
        "options": [
            "A. It enforces password complexity requirements.",
            "B. It controls VPN access permissions.",
            "C. It manages firewall rule sets.",
            "D. It improves real-time threat detection."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/7.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: AI & Machine Learning in Network Security</div>\n    <p>Modern network security integrates Machine Learning (ML) algorithms (e.g., Cisco Encrypted Traffic Analytics, Secure Network Analytics) to detect threats without requiring static signature matching.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>It improves real-time threat detection</strong>: ML models analyze normal behavioral baselines across network telemetry (NetFlow/IPFIX, packet timing, TLS fingerprinting) and flag anomalous deviations, zero-day attacks, and lateral movement in real time.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Password complexity is enforced statically through local authentication or active directory group policies.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: VPN access permissions are dictated by AAA/RADIUS policies and security group access controls.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Firewall rule sets are managed by security administrators or policy orchestration engines.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Signature-based security detects <em>known</em> threats. <strong>Machine Learning / Behavioral Analytics</strong> detects <em>unknown / zero-day</em> threats through anomaly detection.</p>\n  </div>\n</div>"
    },
    {
        "id": 26,
        "questionNo": "Question #8",
        "question": "How do AAA operations compare regarding user identification, user services, and access control? (Choose one answer)",
        "options": [
            "A. Authentication identifies users, and accounting tracks user services.",
            "B. Authentication enforces resource access and accounting identifies a user's credentials.",
            "C. Authentication manages user permissions, and authorization monitors user activities.",
            "D. Authentication records user activities, and accounting validates user credentials."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/8.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: The AAA Security Framework (RFC 2865, RFC 1492)</div>\n    <p>The AAA framework establishes three distinct architectural pillars for administrative and user network access control: <strong>Authentication</strong>, <strong>Authorization</strong>, and <strong>Accounting</strong>.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span>: <strong>Authentication identifies users</strong> (proves identity via credentials like username/password or certificates), and <strong>accounting tracks user services</strong> (records commands executed, session duration, and data consumed).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Inverts the roles; Authorization enforces resource access, while Authentication validates credentials.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Confuses Authorization (managing permissions) with Authentication, and Accounting (auditing) with Authorization.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Swaps the definitions of Authentication and Accounting.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Triple-A Formula:<br/>• <strong>Authentication</strong> = \"Who are you?\"<br/>• <strong>Authorization</strong> = \"What are you allowed to do?\"<br/>• <strong>Accounting</strong> = \"What did you do and for how long?\"</p>\n  </div>\n</div>"
    },
    {
        "id": 44,
        "questionNo": "Question #9",
        "question": "Refer to the exhibit. A network engineer configures the Cisco WLC to authenticate local wireless clients against a RADIUS server. Which action completes this configuration? (Choose one answer)",
        "options": [
            "A. Enable the Support for CoA option.",
            "B. Disable the Server Status option.",
            "C. Enable the Network User option.",
            "D. Enable the Management option."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/9.png",
        "originalSourceImage": "original_sources/9.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC RADIUS Server Roles</div>\n    <p>On a Cisco Wireless LAN Controller, external RADIUS authentication servers can be scoped for distinct functions: authenticating wireless network clients or authenticating administrative management sessions.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>Enable the Network User option</strong>: In the Cisco WLC GUI (under <em>Security &gt; RADIUS &gt; Authentication</em>), enabling the <strong>Network User</strong> checkbox designates this RADIUS server for authenticating end-user wireless clients (802.1X/EAP, MAC filtering).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Support for CoA (Change of Authorization, RFC 5176) allows dynamic posture/quarantine state changes from ISE, but is not required to activate basic client authentication.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Disabling Server Status shuts down communication with the RADIUS server entirely.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: The Management checkbox restricts the RADIUS server solely to administrative logins to the WLC GUI/CLI.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>WLC RADIUS Server Scopes: <strong>Network User</strong> = Wireless Clients (WLANs). <strong>Management</strong> = IT Admin login to WLC.</p>\n  </div>\n</div>"
    },
    {
        "id": 5,
        "questionNo": "Question #10",
        "question": "Which interface condition is occurring in this output? (Choose one answer)",
        "options": [
            "A. duplex mismatch",
            "B. queueing",
            "C. high throughput",
            "D. bad NIC"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": "Router# show interfaces GigabitEthernet0/1\nGigabitEthernet0/1 is up, line protocol is up\n  Hardware is Gigabit Ethernet, address is 000c.29eb.1234 (bia 000c.29eb.1234)\n  Internet address is 10.1.1.1/24\n  MTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,\n     reliability 255/255, txload 1/255, rxload 1/255\n  Encapsulation ARPA, loopback not set\n  Keepalive set (10 sec)\n  Half-duplex, 100Mb/s, media type is RJ45\n  output flow-control is unsupported, input flow-control is unsupported\n  ARP type: ARPA, ARP Timeout 04:00:00\n  Last input 00:00:02, output 00:00:01, output hang never\n  Last clearing of \"show interface\" counters never\n  Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0\n  Queueing strategy: fifo\n  Output queue: 0/40 (size/max)\n  5 minute input rate 1000 bits/sec, 2 packets/sec\n  5 minute output rate 2000 bits/sec, 3 packets/sec\n     145823 packets input, 10245892 bytes, 0 no buffer\n     Received 412 broadcasts (0 IP multicasts)\n     0 runts, 0 giants, 0 throttles\n     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n     0 watchdog, 0 multicast, 0 pause input\n     185291 packets output, 15478923 bytes, 0 underruns\n     0 output errors, 8421 collisions, 2 interface resets\n     8421 late collisions, 2415 deferred, 0 lost carrier, 0 no carrier",
        "exhibitImage": null,
        "originalSourceImage": "original_sources/10.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Ethernet Duplex Mismatch & Collisions</div>\n    <p>Full-Duplex Ethernet transmits and receives simultaneously without collisions. Half-Duplex Ethernet uses CSMA/CD where collisions within the first 64 bytes (the slot time) are normal. However, <strong>late collisions</strong> occur only when a transmission collision happens after the first 64 bytes.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>duplex mismatch</strong>: The output displays <code>Half-duplex, 100Mb/s</code> alongside <strong>8421 late collisions</strong>. A late collision occurs when one end of the link is configured for Half-Duplex (sensing carrier) and the opposite peer is set to Full-Duplex (transmitting anytime without carrier sense), causing packets to collide mid-frame.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>queueing</strong>: Output drops and input drops are both 0 (<code>Total output drops: 0</code>), indicating queues are not overflowing.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>high throughput</strong>: The 5-minute data rate is only 1000–2000 bits/sec (2–3 packets/sec), which is near-zero utilization.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>bad NIC</strong>: CRC, frame, and overrun errors are all 0 (<code>0 CRC, 0 frame</code>), indicating the physical transceiver and cabling framing are intact.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>On Cisco IOS: <strong>Late Collisions &gt; 0</strong> almost universally signals a <strong>Duplex Mismatch</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 15,
        "questionNo": "Question #11",
        "question": "An abnormally high number of syslog messages are generated by a device with the debug process turned on. Which action prevents debug messages from being sent via syslog while allowing other messages? (Choose one answer)",
        "options": [
            "A. Turn off the logging monitor in global configuration mode.",
            "B. Disable logging to the console.",
            "C. Set the logging trap severity level to informational.",
            "D. Use an access list to filter out the syslog messages."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/11.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Syslog Severity Levels & Logging Traps (RFC 5424)</div>\n    <p>Cisco IOS classifies system messages into 8 severity levels (0 to 7). The <code>logging trap &lt;level&gt;</code> global command limits which messages are transmitted to an external syslog server.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>Set the logging trap severity level to informational</strong>:\n        <ul>\n          <li>Severity levels: 0 (Emergencies) through 6 (Informational) and 7 (Debugging).</li>\n          <li>Setting <code>logging trap informational</code> (or level 6) forwards levels 0, 1, 2, 3, 4, 5, and 6 to the syslog server while <strong>filtering out level 7 (Debugging)</strong>. This stops flood of debug messages from reaching syslog while retaining all standard operational events.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: <code>no logging monitor</code> controls terminal line output (Telnet/SSH sessions), having no effect on remote syslog server transmissions.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: <code>no logging console</code> disables messages on the physical console port only.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Standard or extended ACLs filter transit and control packets by IP/port, but cannot inspect and parse internal syslog severity levels inside generated packets.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Syslog Trap Hierarchy: <code>logging trap &lt;level&gt;</code> forwards that severity level and all <em>numerically lower (more severe)</em> levels. Level 6 (Informational) excludes Level 7 (Debugging).</p>\n  </div>\n</div>"
    },
    {
        "id": 27,
        "questionNo": "Question #12",
        "question": "A new user account must meet the following requirements:\n* It must be configured in the local database.\n* The username is engineer2.\n* It must use the strongest password configurable.\n\nWhich command must be configured? (Choose one answer)",
        "options": [
            "A. username engineer2 privilege 1 password 7 test2021",
            "B. username engineer2 algorithm-type scrypt secret test2021",
            "C. username engineer2 secret 5 password $1$b1u$KZbs1Pyh4QzwXyZ",
            "D. username engineer2 secret 4 $1$b1u$KZbs1Pyh4QzwXyZ"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/12.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Password Encryption & Hashing Algorithms</div>\n    <p>Cisco IOS supports multiple hashing algorithms for local user credentials. Older types (Type 0, Type 7, Type 5) have known cryptographic vulnerabilities, whereas modern IOS XE provides next-generation password hashing.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>username engineer2 algorithm-type scrypt secret test2021</strong>:\n        <ul>\n          <li><strong>scrypt</strong> (Type 9) is a memory-hard key derivation function specifically engineered to resist hardware-accelerated (ASIC/GPU) brute-force attacks.</li>\n          <li>It represents the <strong>strongest configurable algorithm</strong> in Cisco IOS/IOS XE.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Uses <code>password 7</code> (Type 7), which is a reversible Vigen&egrave;re-based obfuscation that can be decrypted instantly with online tools.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Invalid syntax mixing <code>secret 5</code> with the keyword <code>password</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Type 4 uses SHA-256 with known implementation weaknesses and is deprecated by Cisco.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Cisco Password Types: <strong>Type 7</strong> (Weakest, reversible) &rarr; <strong>Type 5</strong> (MD5 secret) &rarr; <strong>Type 8</strong> (PBKDF2 SHA-256) &rarr; <strong>Type 9 / scrypt</strong> (Strongest).</p>\n  </div>\n</div>"
    },
    {
        "id": 9,
        "questionNo": "Question #13",
        "question": "Which AP mode provides a wireless connection between two network segments? (Choose one answer)",
        "options": [
            "A. local",
            "B. bridge",
            "C. root",
            "D. FlexConnect"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/13.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Lightweight AP Operational Modes</div>\n    <p>Cisco Access Points can operate in multiple specialized modes depending on whether they serve client traffic, act as sensors, or extend wired network segments.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>bridge</strong>: In Bridge mode (Mesh), the AP acts as a dedicated wireless bridge (Point-to-Point or Point-to-Multipoint) connecting two or more distant wired network segments across buildings or campus locations without laying physical cables.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>local</strong>: Default mode where the AP broadcasts BSSIDs, handles wireless client association, and tunnels all client data via CAPWAP to the WLC.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>root</strong>: Autonomous AP operating role, not a standard controller-based AP mode for bridging buildings.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>FlexConnect</strong>: Designed for branch deployments, allowing local switching of client traffic while maintaining centralized control plane management.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>AP Modes: <strong>Local</strong> (regular client access), <strong>FlexConnect</strong> (branch local switching), <strong>Bridge</strong> (wireless bridging between segments), <strong>Sniffer</strong> (packet capture), <strong>Monitor</strong> (location & rogue detection).</p>\n  </div>\n</div>"
    },
    {
        "id": 17,
        "questionNo": "Question #14",
        "question": "Which technology allows multiple operating systems to run on a single physical server? (Choose one answer)",
        "options": [
            "A. virtualization",
            "B. application hosting",
            "C. cloud computing",
            "D. containers"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/14.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Server Virtualization & Hypervisors</div>\n    <p>Virtualization abstracts physical computing hardware (CPU, RAM, storage, network adapters) using a software layer known as a hypervisor (Type 1 bare-metal or Type 2 hosted).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>virtualization</strong>: Server virtualization enables multiple distinct virtual machines (VMs), each running its own independent operating system (e.g., Linux, Windows Server), to execute concurrently on a single physical host hardware platform.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>application hosting</strong>: Refers to running applications inside routers/switches (e.g. Cisco IOx), not the foundational multi-OS virtualization platform.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>cloud computing</strong>: An operational and consumption model (IaaS, PaaS, SaaS) that utilizes virtualization as an underlying component, but is not the specific hardware abstraction technology itself.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>containers</strong>: Containers (Docker) share the host's underlying OS kernel and isolate user-space libraries; they cannot run completely different independent operating systems.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Virtual Machines (VMs)</strong> = Separate virtual hardware + individual guest OS.<br/><strong>Containers</strong> = Shared host OS kernel + isolated app bins/libs.</p>\n  </div>\n</div>"
    },
    {
        "id": 6,
        "questionNo": "Question #15",
        "question": "What is the main difference between traditional networks and controller-based networking? (Choose one answer)",
        "options": [
            "A. Controller-based networks are a closed ecosystem, and traditional networks take advantage of programmability.",
            "B. Controller-based networks increase Total Cost of Ownership for the company, and traditional networks require less investment.",
            "C. Controller-based networks provide a framework for innovation, and traditional networks create efficiency.",
            "D. Controller-based networks are open for application requests, and traditional networks operate manually."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/15.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Traditional vs. Controller-Based (SDN) Networking</div>\n    <p>Traditional networking relies on a distributed control plane where each router/switch must be configured individually. Controller-based networking separates the control plane into a centralized software controller.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>: <strong>Controller-based networks are open for application requests</strong> through Northbound REST APIs that allow software applications to programmatically interact with the network, whereas <strong>traditional networks operate manually</strong> via hop-by-hop CLI commands and individual device configurations.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Reverses the reality; controller-based networks are open and programmable, while traditional networks are proprietary and manual.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Controller-based networking reduces Total Cost of Ownership (TCO) through automation and centralized policy deployment.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Programmability and agility are the primary drivers of innovation in controller-based networks.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>SDN Key Shift: Distributed Control Plane (Traditional / CLI) &rarr; Centralized Control Plane + Programmable Northbound REST APIs (Controller-based).</p>\n  </div>\n</div>"
    },
    {
        "id": 28,
        "questionNo": "Question #16",
        "question": "Refer to the exhibit. Site A was recently connected to site B over a new single-mode fiber path. Users at site A report intermittent connectivity issues with applications hosted at site B. What is the reason for the problem? (Choose one answer)",
        "options": [
            "A. The wrong cable type was used to make the connection.",
            "B. An incorrect type of transceiver has been inserted into a device on the link.",
            "C. Heavy usage is causing high latency.",
            "D. Physical network errors are being transmitted between the two sites."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/16.png",
        "originalSourceImage": "original_sources/16.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Optical Transceiver Specifications (SFP-SR vs. SFP-LR)</div>\n    <p>Fiber optic links require matched transceivers suited to the physical cable type and transmission distance. Single-Mode Fiber (SMF) uses long wavelengths (1310 nm or 1550 nm), while Multi-Mode Fiber (MMF) uses 850 nm.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>An incorrect type of transceiver has been inserted into a device on the link</strong>:\n        <ul>\n          <li>The link distance between Site A and Site B is <strong>7 KM</strong> over <strong>single-mode fiber (SMF)</strong>.</li>\n          <li>Site B correctly uses <code>SFP-LR</code> (Long Reach, rated for 1310 nm SMF up to 10 km).</li>\n          <li>Site A has an <code>SFP-SR</code> transceiver (Short Reach, 850 nm, rated only for MMF up to ~300 meters).</li>\n          <li>An SFP-SR transceiver cannot drive optical signals over 7 km of single-mode fiber, causing extreme attenuation and intermittent packet loss.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Single-mode fiber is the correct medium for a 7 km distance; the failure is the mismatched optic transceiver.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Traffic counters show ~26 Mbps on a 10 Gbps port (~0.26% load), so heavy usage is not the cause.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Vague distractor that fails to pinpoint the evident <code>SFP-SR</code> vs <code>SFP-LR</code> mismatch shown in the command output.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>SFP-SR</strong> = Short Reach, 850 nm, Multimode Fiber (max 300–400m).<br/><strong>SFP-LR</strong> = Long Reach, 1310 nm, Single-mode Fiber (up to 10km).</p>\n  </div>\n</div>"
    },
    {
        "id": 16,
        "questionNo": "Question #17",
        "question": "How is AI used to identify issues within network traffic? (Choose one answer)",
        "options": [
            "A. It exclusively predicts device malfunctions.",
            "B. It makes ethical judgments on private data surveillance.",
            "C. It guarantees zero packet loss in the network.",
            "D. It analyzes patterns for anomaly detection."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/17.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Network Telemetry & AI Pattern Recognition</div>\n    <p>Artificial Intelligence in Network Operations (AIOps / Cisco AI Network Analytics) analyzes continuous telemetry data to uncover hidden issues that traditional threshold-based monitoring misses.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>It analyzes patterns for anomaly detection</strong>: AI models establish dynamic baselines of normal traffic patterns (KPIs, packet rates, RF metrics) and apply machine learning algorithms to detect anomalies, network degradation, and security deviations.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: AI addresses a broad range of networking challenges (RF optimization, rogue detection, policy violations), not exclusively device hardware malfunctions.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: AI performs algorithmic pattern recognition and statistical correlation, not ethical or subjective judgments.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: No software or AI can guarantee zero packet loss across physical networks.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>AI's core strength in networking: <strong>Dynamic Baselining + Anomaly Detection</strong> without manual threshold tuning.</p>\n  </div>\n</div>"
    },
    {
        "id": 18,
        "questionNo": "Question #18",
        "question": "How does WPA3 improve security? (Choose one answer)",
        "options": [
            "A. It uses RC4 for encryption.",
            "B. It uses SAE for authentication.",
            "C. It uses TKIP for encryption.",
            "D. It uses a 4-way handshake for authentication."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/18.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WPA3 Security Enhancements & SAE (RFC 7664)</div>\n    <p>Wi-Fi Protected Access 3 (WPA3) was designed to replace WPA2 and resolve its architectural vulnerabilities (such as susceptibility to offline dictionary attacks and the KRACK exploit).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>It uses SAE for authentication</strong>: WPA3-Personal replaces the vulnerable Pre-Shared Key (PSK) 4-way handshake with <strong>Simultaneous Authentication of Equals (SAE)</strong> (based on the Dragonfly key exchange). SAE provides <strong>Forward Secrecy</strong> and completely neutralizes offline dictionary attacks.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: RC4 was an insecure cipher used in WEP and TKIP; it is completely obsolete and prohibited in WPA3.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: TKIP was a temporary workaround introduced in WPA (2003); WPA3 uses robust AES-CCMP or GCMP ciphers.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: The standard 4-way handshake is the WPA2 mechanism that SAE replaces in WPA3.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>WPA2-Personal uses <strong>PSK</strong> (vulnerable to offline brute force).<br/>WPA3-Personal uses <strong>SAE (Dragonfly handshake)</strong> with built-in Forward Secrecy.</p>\n  </div>\n</div>"
    },
    {
        "id": 19,
        "questionNo": "Question #19",
        "question": "In which ways does a spine-and-leaf architecture allow for scalability in a network when additional access ports are required? (Choose one answer)",
        "options": [
            "A. A leaf switch is added with connections to every spine switch.",
            "B. A leaf switch is added with a single connection to a core spine switch.",
            "C. A spine switch is added with at least 40 GB uplinks.",
            "D. A spine switch and a leaf switch are added with redundant connections between them."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/19.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Spine-and-Leaf (Clos) Fabric Topology</div>\n    <p>Spine-and-leaf architecture is the standard design for modern data centers. It delivers predictable, low-latency east-west traffic flow across a non-blocking fabric.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>A leaf switch is added with connections to every spine switch</strong>: In a spine-and-leaf fabric, all endpoints (servers, storage) connect to leaf switches. To scale access port capacity, a new leaf switch is added and must be uplinked to <strong>every single spine switch</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Uplinking to only one spine violates Clos architecture, creates an oversubscription bottleneck, and introduces a single point of failure.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Adding spine switches scales aggregate fabric throughput/bandwidth, but does not provide access ports for servers.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Leaves never connect to other leaves, and spines never connect to other spines.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Spine-and-Leaf Rules:<br/>1. Every Leaf connects to EVERY Spine.<br/>2. Spines never connect to Spines.<br/>3. Leaves never connect to Leaves.<br/>4. Every endpoint is exactly 2 hops away.</p>\n  </div>\n</div>"
    },
    {
        "id": 48,
        "questionNo": "Question #20",
        "question": "Refer to the exhibit. An engineer is updating the management access configuration of switch SW1 to allow secured, encrypted remote configuration. Which two commands or command sequences must the engineer apply to the switch? (Choose two answers)",
        "options": [
            "A. SW1(config)#line vty 0 15\nSW1(config-line)#transport input ssh",
            "B. SW1(config)#username NEW secret R3mote123",
            "C. SW1(config)#interface f0/1\nSW1(config-if)#switchport mode trunk",
            "D. SW1(config)#enable secret ccnaTest123",
            "E. SW1(config)#crypto key generate rsa"
        ],
        "correctOption": [
            0,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/20.png",
        "originalSourceImage": "original_sources/20.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Secure VTY Remote Access</div>\n    <p>Securing remote access requires encrypting management sessions via SSH and ensuring administrative privilege elevation is protected with a secret password.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A and D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <code>SW1(config)#line vty 0 15</code> &rarr; <code>SW1(config-line)#transport input ssh</code>: Disables plaintext Telnet and enforces encrypted SSH sessions for all virtual terminal lines.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <code>SW1(config)#enable secret ccnaTest123</code>: The running configuration shows user <code>CCNA</code> has default <code>privilege 1</code>. Without an <code>enable secret</code> configured, the switch will reject any attempt to enter privileged EXEC mode (<code>enable</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Creating an extra username does not secure existing VTY lines from Telnet interception.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Configuring trunking on FastEthernet0/1 is a data-plane VLAN configuration unrelated to VTY security.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: The exhibit explicitly shows the RSA key pair has already been generated (<code>Key name: SW1.CCNA-test</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>If an IOS switch has <code>login local</code> on VTY lines and users have privilege 1, they CANNOT run privileged commands without an <code>enable secret</code> set!</p>\n  </div>\n</div>"
    },
    {
        "id": 21,
        "questionNo": "Question #21",
        "question": "Refer to the exhibit. A network engineer is configuring a WLAN to use a WPA2 PSK and allow only specific clients to join. Which two actions must be taken to complete the process? (Choose two answers)",
        "options": [
            "A. Enable the OSEN Policy option.",
            "B. Enable the MAC Filtering option.",
            "C. Enable the 802.1X option for Authentication Key Management.",
            "D. Enable the CCKM option for Authentication Key Management.",
            "E. Enable the WPA2 Policy option."
        ],
        "correctOption": [
            1,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/21.png",
        "originalSourceImage": "original_sources/21.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC Layer 2 WLAN Security Policies</div>\n    <p>WLANs on a Cisco WLC can combine encryption ciphers (WPA2-PSK) with Layer 2 access control mechanisms like MAC filtering to restrict associations.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options B and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Enable the MAC Filtering option</strong>: Restricts association so that only client devices with explicitly authorized MAC addresses in the local database or RADIUS server are allowed to connect.</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>Enable the WPA2 Policy option</strong>: Under WPA+WPA2 Parameters, checking the WPA2 Policy box enables WPA2 protection with AES-CCMP encryption.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: OSEN (Online Signup) is used exclusively for Hotspot 2.0 / Wi-Fi Certified Passpoint deployments.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: 802.1X is for Enterprise authentication via a RADIUS server, which conflicts with the requirement to use a Pre-Shared Key (PSK).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: CCKM is legacy Cisco Centralized Key Management for rapid re-authentication, not PSK policy.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To restrict WLAN associations to known hardware addresses: Check <strong>MAC Filtering</strong>.<br/>To enable WPA2: Check <strong>WPA2 Policy</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 1,
        "questionNo": "Question #22",
        "question": "Which technology is appropriate for communication between an SDN controller and applications running over the network? (Choose one answer)",
        "options": [
            "A. NETCONF",
            "B. OpenFlow",
            "C. REST API",
            "D. Southbound API"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/22.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SDN Architecture & Application Programming Interfaces (APIs)</div>\n    <p>Software-Defined Networking (SDN) segregates communications into Northbound (applications to controller) and Southbound (controller to physical network devices).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>REST API</strong>: Communication between an SDN controller and upper-layer business applications uses <strong>Northbound APIs</strong>, which are universally implemented as <strong>RESTful APIs</strong> (HTTP/HTTPS exchanging JSON or XML payloads).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>NETCONF</strong>: A Southbound protocol (RFC 6241) used by the controller to program network devices via SSH and XML.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>OpenFlow</strong>: A Southbound protocol used by the controller to program flow forwarding tables in network switches.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Southbound API</strong>: Points downwards toward network forwarding elements, not upwards toward application software.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Northbound API (REST API)</strong> = Controller &harr; Business Applications.<br/><strong>Southbound API (OpenFlow, NETCONF, RESTCONF)</strong> = Controller &harr; Network Switches/Routers.</p>\n  </div>\n</div>"
    },
    {
        "id": 37,
        "questionNo": "Question #23",
        "question": "Refer to the exhibit. HQ C needs to use a configuration that:\n• handles up to 150,000 concurrent connections\n• minimizes consumption of public IP addresses\n\nWhich configuration meets the requirements? (Choose one answer)",
        "options": [
            "A. ip pool NATPOOL 209.165.201.1 209.165.201.5 netmask 255.255.255.248\nip nat inside source list HQC interface GigabitEthernet0/0 overload",
            "B. ip pool NATPOOL 209.165.200.225 209.165.200.226 netmask 255.255.255.252\nip nat outside source list HQC pool NATPOOL overload",
            "C. ip nat pool NATPOOL 209.165.201.1 209.165.201.248 netmask 255.255.255.248\nip nat outside source list HQC pool NATPOOL overload",
            "D. ip nat pool NATPOOL 209.165.201.1 209.165.201.3 netmask 255.255.255.248\nip nat inside source list HQC pool NATPOOL overload"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/23.png",
        "originalSourceImage": "original_sources/23.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: NAT Overload (PAT) Capacity & Pool Sizing</div>\n    <p>NAT Overload (Port Address Translation) multiplexes outgoing sessions using 16-bit Layer 4 port numbers. Each public IPv4 address supports roughly 60,000 usable translation sessions.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>ip nat pool NATPOOL 209.165.201.1 209.165.201.3 netmask 255.255.255.248</strong>:\n        <ul>\n          <li><strong>Port Math:</strong> 150,000 concurrent sessions / ~60,000 ports per IP ≈ 2.5 → minimum 3 public IP addresses required.</li>\n          <li><strong>Pool Allocation:</strong> Range <code>.1 to .3</code> allocates exactly 3 addresses from the assigned /29 subnet (209.165.201.0/29), supporting up to 3 × ~64,000 ≈ 192,000 concurrent connections while minimizing address consumption.</li>\n          <li><strong>Syntax:</strong> Correctly uses <code>ip nat inside source list HQC pool NATPOOL overload</code>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Uses invalid syntax (<code>ip pool</code> instead of <code>ip nat pool</code>) and overloads onto a single interface IP (209.165.200.225), limiting capacity to ~60,000 sessions (fails the 150,000 requirement).</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Uses invalid syntax (<code>ip pool</code>), specifies <code>ip nat outside source</code> (wrong direction), and uses the point-to-point /30 subnet.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Specifies <code>ip nat outside source</code> (wrong direction) and uses <code>.248</code> as the end IP, which is the subnet mask boundary rather than 3 usable addresses.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>1 Public IP = ~60,000 PAT sessions. When an exam question specifies 150,000 concurrent connections, a single IP cannot handle it—you must calculate the minimum pool size (3 IPs).</p>\n  </div>\n</div>"
    },
    {
        "id": 36,
        "questionNo": "Question #24",
        "question": "In what way does a network supervisor reduce maintenance costs while maintaining network integrity on a traditionally managed network? (Choose one answer)",
        "options": [
            "A. They automate change-management processes that verify issue resolution.",
            "B. They use automation to centralize network-management tasks.",
            "C. They employ additional network administrators to proactively manage the network.",
            "D. They limit the use of diagnostic tools to only critical situations."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/24.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Network Automation in Traditional Infrastructure</div>\n    <p>Automation tools (e.g., Python, Ansible, Netmiko) can be introduced into traditionally managed networks to eliminate manual CLI human error and reduce ongoing operational maintenance costs.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>They use automation to centralize network-management tasks</strong>: By scripting and orchestrating routine configuration backups, software compliance checks, and mass changes from a centralized automation station, organizations significantly reduce manual maintenance labor while enforcing network integrity.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Automating change approval workflows handles ticketing, but doesn't manage or configure the network devices themselves.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Hiring additional administrators increases operational expenditure (OPEX) rather than reducing maintenance costs.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Restricting diagnostic tools degrades visibility and delays incident detection, undermining network integrity.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Network automation's primary business driver: <strong>Reduce OPEX (operational maintenance costs)</strong> and eliminate configuration drift/human error.</p>\n  </div>\n</div>"
    },
    {
        "id": 29,
        "questionNo": "Question #25",
        "question": "What is the function of a DNS zone transfer? (Choose one answer)",
        "options": [
            "A. Transfer domain registration from one registrar to another.",
            "B. Modify DNS resource records for load balancing.",
            "C. Copy DNS database files from a primary to secondary server.",
            "D. Redirect traffic from one domain to another."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/25.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DNS Zone Transfers (AXFR / IXFR, RFC 5936)</div>\n    <p>Domain Name System (DNS) servers use zone transfers to synchronize DNS resource records between authoritative nameservers for redundancy and high availability.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>Copy DNS database files from a primary to secondary server</strong>: A DNS zone transfer utilizes <strong>TCP port 53</strong> to replicate all or updated resource records (A, AAAA, MX, CNAME, NS) from the primary (master) DNS server to one or more secondary (slave) DNS servers.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Domain registrar transfers involve administrative domain transfer codes (EPP Auth codes) managed by ICANN registrars, not the DNS network protocol.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Modifying DNS records for load balancing is handled by Round-Robin DNS or GeoDNS policies, not zone transfers.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Redirecting web traffic from one domain to another is handled by HTTP redirect status codes (301/302) or CNAME alias records.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>DNS uses <strong>UDP port 53</strong> for standard queries/lookups, and <strong>TCP port 53</strong> for <strong>Zone Transfers (AXFR/IXFR)</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 33,
        "questionNo": "Question #26",
        "question": "What are two recommendations for protecting network ports from being exploited when located in an office space outside of an IT closet? (Choose two answers)",
        "options": [
            "A. configure static ARP entries",
            "B. configure ports to fixed speed",
            "C. shut down unused ports",
            "D. implement port-based authentication",
            "E. enable the PortFast feature on ports"
        ],
        "correctOption": [
            2,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/26.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Physical Layer & Access Port Security</div>\n    <p>Unsecured Ethernet ports located in public areas (hallways, shared offices, conference rooms) represent a significant vector for rogue device insertion and physical network intrusion.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options C and D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>shut down unused ports</strong>: Administratively disabling unused access switch ports (<code>shutdown</code>) physically prevents unauthorized rogue devices from simply plugging into an active Ethernet jack.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>implement port-based authentication</strong>: Deploying <strong>IEEE 802.1X</strong> requires any device connected to an active port to authenticate against a RADIUS server (e.g. Cisco ISE) using valid credentials or digital certificates before the port transitions to the forwarding state.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Static ARP entries are impractical to scale in office environments and do not prevent unauthorized physical network attachment.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Hardcoding port speed and duplex is a transmission setting that offers zero security or access control.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: PortFast immediately transitions access ports to the forwarding state to bypass listening/learning, but provides no security.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Two essential switch port security best practices:<br/>1. <strong>Shutdown</strong> all unused switch ports and place them in a dedicated 'Blackhole' / Parking VLAN.<br/>2. Use <strong>802.1X (port-based authentication)</strong> for all active user-facing ports.</p>\n  </div>\n</div>"
    },
    {
        "id": 41,
        "questionNo": "Question #27",
        "question": "Refer to the exhibit. The following requirements must be met:\nMAC addresses must be learned dynamically.\nLog messages must be generated without disabling the interface when unwanted traffic is seen.\n\nWhich commands complete this task? Choose two. (Choose two answers)",
        "options": [
            "A. switchport port-security violation restrict",
            "B. switchport port-security maximum 2",
            "C. switchport port-security violation shutdown",
            "D. switchport port-security mac-address sticky",
            "E. switchport port-security mac-address 0010.7B84.45E6"
        ],
        "correctOption": [
            0,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/27.png",
        "originalSourceImage": "original_sources/27.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Port Security Violation Modes & Sticky Learning</div>\n    <p>Cisco switchport port security restricts interface input by identifying MAC addresses that are permitted to send traffic across the port.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A and D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>switchport port-security violation restrict</strong>: The <code>restrict</code> mode drops packets with unknown source MAC addresses, increments the security violation counter, and generates a syslog/SNMP alert <strong>without disabling (err-disabling) the port</strong>.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>switchport port-security mac-address sticky</strong>: Dynamically learns active MAC addresses on the port and commits them into the switch's running-config as secure sticky addresses.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <code>switchport port-security maximum 2</code>: Defines the address limit, but does not fulfill the requirement to learn dynamically or specify violation behavior.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <code>switchport port-security violation shutdown</code>: Immediately puts the interface into <code>err-disabled</code> state upon violation, which violates the requirement to log without disabling the interface.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Statically hardcodes a specific MAC address rather than learning dynamically.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Port Security Violation Modes:<br/>• <strong>Protect</strong>: Drops unauthorized frames; no log; interface stays up.<br/>• <strong>Restrict</strong>: Drops unauthorized frames; <strong>logs message & increments counter</strong>; interface stays up.<br/>• <strong>Shutdown</strong>: Drops frames; logs message; <strong>err-disables (shuts down) interface</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 46,
        "questionNo": "Question #28",
        "question": "Refer to the exhibit. A network engineer must configure the CPE router to allow computers in the 172.20.1.0/24 network to obtain their IP configurations from the central DHCP server. Which configuration must the engineer apply to the CPE? (Choose one answer)",
        "options": [
            "A. interface GigabitEthernet0/1\n ip helper-address 172.20.254.1",
            "B. interface GigabitEthernet0/1\n ip helper-address 172.20.255.11",
            "C. interface GigabitEthernet0/0\n ip helper-address 172.20.1.1",
            "D. interface GigabitEthernet0/0\n ip helper-address 172.20.255.1"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/28.png",
        "originalSourceImage": "original_sources/28.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS DHCP Relay Agent (ip helper-address)</div>\n    <p>DHCP clients locate servers by broadcasting DHCPDISCOVER messages (destination 255.255.255.255). Because routers do not forward broadcasts, a DHCP Relay Agent is required to forward requests across subnets.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <code>interface GigabitEthernet0/1</code> &rarr; <code>ip helper-address 172.20.255.11</code>:\n        <ul>\n          <li>The <code>ip helper-address</code> command must be applied to the <strong>inbound interface facing the client broadcast domain</strong> (GigabitEthernet0/1, IP 172.20.1.1/24).</li>\n          <li>The destination address must point to the <strong>exact unicast IP address of the DHCP server</strong> (<code>172.20.255.11</code>). The router converts incoming client UDP broadcasts into directed unicast packets routed to the server.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Points to <code>172.20.254.1</code>, which is the CPE router's own WAN interface, not the DHCP server.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Configured on <code>GigabitEthernet0/0</code> (the WAN uplink interface). Client broadcasts enter on Gi0/1 and would never trigger the helper-address on Gi0/0.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Configured on the wrong interface (Gi0/0) with an incorrect IP address (172.20.255.1).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Always configure <code>ip helper-address &lt;Server-IP&gt;</code> on the <strong>router interface closest to the clients</strong> (the default gateway interface where client broadcasts enter).</p>\n  </div>\n</div>"
    },
    {
        "id": 50,
        "questionNo": "Question #29",
        "question": "Refer to the exhibit. OSPF neighbors routers A, B, C, and D are sending a route for 10.227.150.160/27. When the current route for 10.227.150.160/27 becomes unavailable, which cost will router Y use to route traffic to 10.227.150.160/27? (Choose one answer)",
        "options": [
            "A. cost 20",
            "B. cost 30",
            "C. cost 40",
            "D. cost 50"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/29.png",
        "originalSourceImage": "original_sources/29.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: OSPF Cost Metric & Path Selection</div>\n    <p>Open Shortest Path First (OSPF) is a link-state routing protocol that utilizes Dijkstra's Shortest Path First (SPF) algorithm to calculate the optimal route based on cumulative link cost.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>cost 20</strong>:\n        <ul>\n          <li>The exhibit shows router Y's current active route has a cost of 10 (<code>[110/10]</code>).</li>\n          <li>When this primary route fails, router Y evaluates the available backup paths from its OSPF neighbors: Router A (Cost 20), Router B (Cost 40), Router C (Cost 50), and Router D (Cost 30).</li>\n          <li>OSPF will unconditionally select the path with the <strong>lowest cost</strong>. Among 20, 30, 40, and 50, the lowest metric is <strong>cost 20</strong> (via Router A).</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>cost 30</strong>: Path via Router D. Higher cost than 20.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>cost 40</strong>: Path via Router B. Higher cost than 20.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>cost 50</strong>: Path via Router C. Highest metric among all available paths.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>OSPF Metric Formula: $Cost = \frac{\text{Reference Bandwidth}}{\text{Interface Bandwidth}}$. <strong>Lowest cumulative cost always wins</strong> in OSPF route selection.</p>\n  </div>\n</div>"
    },
    {
        "id": 10,
        "questionNo": "Question #30",
        "question": "What is a characteristic of an SSID in wireless networks? (Choose one answer)",
        "options": [
            "A. eliminates network piggybacking",
            "B. requires the use of PoE functionality",
            "C. identifies a wireless network",
            "D. allows easy file sharing between endpoints"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/30.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: IEEE 802.11 Service Set Identifier (SSID)</div>\n    <p>In wireless networking, the Service Set Identifier (SSID) is an essential Layer 2 parameter defined in the IEEE 802.11 standard.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>identifies a wireless network</strong>: An SSID is a human-readable text string (up to 32 characters) transmitted in beacon frames and probe responses that uniquely names and differentiates one wireless LAN from another.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: The SSID alone does not eliminate piggybacking or unauthorized association; robust encryption (WPA2/WPA3) and authentication are required.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: SSIDs are logical wireless network identifiers and operate independently of Power over Ethernet (PoE 802.3af/at).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: File sharing is an upper-layer application protocol function (e.g., SMB, NFS, FTP), not a feature of an 802.11 SSID.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>SSID</strong> = The logical name of the Wi-Fi network.<br/><strong>BSSID</strong> = The physical MAC address of the AP's radio for that specific WLAN.</p>\n  </div>\n</div>"
    },
    {
        "id": 23,
        "questionNo": "Question #31",
        "question": "Refer to the exhibit. The Wi-Fi SSID \"Office_WLAN\" has Layer 2 Security configured with MAC filtering enabled. What additional security is provided by this specific feature? (Choose one answer)",
        "options": [
            "A. There is an extra layer of security that ensures only authorized devices with known MAC addresses connect to the network.",
            "B. There is Galois cache algorithm configured that provides strong encryption and authentication.",
            "C. There is a strong mutual authentication used between NAC and the network devices using x.509 standard.",
            "D. All data frames exchanged between the client and the access point are encrypted."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/31.png",
        "originalSourceImage": "original_sources/31.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Wireless MAC Filtering (Layer 2 Access Control)</div>\n    <p>Wireless LAN Controllers support MAC filtering as a Layer 2 access control mechanism applied prior to granting client network association.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span>: <strong>MAC filtering provides an extra layer of security that ensures only authorized devices with known MAC addresses connect to the network</strong>. When enabled, the WLC verifies the client's hardware MAC address against a local database or external RADIUS server before completing the association.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Galois/Counter Mode (GCM) is an authenticated cryptographic algorithm used in modern Wi-Fi encryption (WPA3), completely separate from MAC address filtering.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Mutual authentication using X.509 certificates describes EAP-TLS (802.1X), not MAC filtering.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Wireless data frame encryption is provided by encryption ciphers (AES-CCMP), whereas MAC filtering transmits no cryptographic encryption.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>While MAC filtering provides an access gate, MAC addresses can be spoofed. Therefore, it should always be combined with strong encryption (WPA2/WPA3).</p>\n  </div>\n</div>"
    },
    {
        "id": 11,
        "questionNo": "Question #32",
        "question": "What is the function of the controller in a software-defined network? (Choose one answer)",
        "options": [
            "A. multicast replication at the hardware level",
            "B. making routing decisions",
            "C. forwarding packets",
            "D. fragmenting and reassembling packets"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/32.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SDN Plane Separation (Control Plane vs. Data Plane)</div>\n    <p>Software-Defined Networking logically decouples the network control plane (decision-making) from the underlying data plane (packet forwarding).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>making routing decisions</strong>: In an SDN architecture, the centralized software controller houses the <strong>Control Plane</strong>. It evaluates network topology, computes optimal routing paths, applies policy logic, and programs the forwarding tables into network devices.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Multicast packet replication at wire speed is handled by specialized switch ASICs in the <strong>Data Plane</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Forwarding frames and packets across physical interfaces is the sole responsibility of the <strong>Data Plane</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Packet fragmentation and reassembly occur on endpoint hosts and Layer 3 data interfaces.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Control Plane (Controller)</strong> = Intelligence, path calculation, routing decisions.<br/><strong>Data Plane (Switches/Routers)</strong> = Forwarding packets based on FIB/flow tables.</p>\n  </div>\n</div>"
    },
    {
        "id": 42,
        "questionNo": "Question #33",
        "question": "If Port-channel1 is the uplink interface of the access-layer switch toward the distribution-layer switch, which two configurations must be configured on the access-layer switch to provide protection from an ARP spoofing attack? Choose two. (Choose two answers)",
        "options": [
            "A. ip arp inspection vlan 1-4094\ninterface Port-channel1\n ip arp inspection trust",
            "B. ip dhcp snooping vlan 1-4094\ninterface Port-channel1\n switchport protected\n switchport port-security maximum 1",
            "C. ip arp inspection trust\ninterface Port-channel1\n switchport port-security maximum 4094\n switchport protected\n ip verify source mac-check",
            "D. ip dhcp snooping vlan 1-4094\nip dhcp snooping\ninterface Port-channel1\n ip dhcp snooping trust",
            "E. ip dhcp snooping\ninterface Port-channel1\n switchport port-security maximum 1\n switchport port-security"
        ],
        "correctOption": [
            0,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/33.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Dynamic ARP Inspection (DAI) & DHCP Snooping</div>\n    <p>Dynamic ARP Inspection (DAI) intercepts and validates all ARP requests and responses against the trusted DHCP snooping binding database to prevent ARP poisoning/spoofing attacks.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A and D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <code>ip arp inspection vlan 1-4094</code> &rarr; <code>interface Port-channel1</code> &rarr; <code>ip arp inspection trust</code>: Enables DAI across the VLANs and designates the uplink (Port-channel1) as trusted so valid ARP replies from upstream switches/routers are not dropped.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <code>ip dhcp snooping vlan 1-4094</code> &rarr; <code>ip dhcp snooping</code> &rarr; <code>interface Port-channel1</code> &rarr; <code>ip dhcp snooping trust</code>: DAI depends on the DHCP snooping binding database. Enabling DHCP snooping and trusting the uplink allows the switch to intercept DHCP traffic, build the binding table, and permit server responses.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Uses <code>switchport protected</code> and <code>port-security maximum 1</code>, which do not mitigate ARP poisoning.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Omits DHCP snooping global activation and uses invalid syntax combinations.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Port-security commands do not inspect ARP payloads or establish DAI trust boundaries.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>DAI Dependency Chain: <strong>DHCP Snooping</strong> builds the IP-to-MAC binding database &rarr; <strong>DAI</strong> uses this database to validate ARP packets. Uplinks must be configured with both <code>ip dhcp snooping trust</code> and <code>ip arp inspection trust</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 45,
        "questionNo": "Question #34",
        "question": "Refer to the exhibit. What does the host do when the status of the IP address is \"Preferred\"? (Choose one answer)",
        "options": [
            "A. It forces the DNS server to provide the same IPv4 address at each renewal.",
            "B. It prefers a pool of addresses when renewing the IPv4 host IP address.",
            "C. It requests the same IP address when it renews its lease.",
            "D. It continues to use a statically assigned IPv4 address."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/34.png",
        "originalSourceImage": "original_sources/34.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DHCP & IP Address Lease States</div>\n    <p>Network IP address management defines lifecycle states for dynamically assigned addresses, including Preferred, Deprecated, and Expired states.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>It requests the same IP address when it renews its lease</strong>: When an IP address is in the \"Preferred\" (active valid) state, the host currently utilizes this address without restrictions. When reaching the renewal interval (T1 timer), the host sends a unicast request to the DHCP server asking to renew the exact same lease.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: DNS servers perform name-to-IP resolution; they do not manage, assign, or renew IP address leases.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: A client asks to renew its specific assigned IP address, not an arbitrary pool of addresses.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: A \"Preferred\" status indicates a dynamic DHCP/SLAAC lease state, not a static IP configuration.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>In DHCP lease renewal: At <strong>T1 (50% of lease)</strong>, the host unicasts a DHCPREQUEST for its current IP. If unacknowledged, at <strong>T2 (87.5%)</strong> it broadcasts to any available DHCP server.</p>\n  </div>\n</div>"
    },
    {
        "id": 47,
        "questionNo": "Question #35",
        "question": "Refer to the exhibit. Connections must be blocked from PC2 to the file server while still allowing PC2 to connect to other network hosts and devices. Which configuration must be used to complete the task? (Choose one answer)",
        "options": [
            "A. R1(config)#access-list 1 deny 192.168.2.10\nR1(config)#access-list 1 permit 192.168.2.0 0.0.0.255\nR1(config)#interface g0/1\nR1(config-if)#ip access-group 1 in",
            "B. R2(config)#access-list 1 permit 192.168.2.10\nR2(config)#access-list 1 deny 192.168.2.0 0.0.0.255\nR2(config)#interface g0/1\nR2(config-if)#ip access-group 1 in",
            "C. R1(config)#access-list 1 permit 192.168.2.10\nR1(config)#access-list 1 deny any\nR1(config)#interface g0/1\nR1(config-if)#ip access-group 1 out",
            "D. R2(config)#access-list 1 deny 192.168.2.10\nR2(config)#access-list 1 permit any\nR2(config)#interface g0/1\nR2(config-if)#ip access-group 1 out"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/35.png",
        "originalSourceImage": "original_sources/35.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Standard Access Control List (ACL) Placement</div>\n    <p>Standard ACLs (1–99, 1300–1999) evaluate only the <strong>source IP address</strong> of packets. Because they cannot filter on destination IP or Layer 4 ports, their placement strategy is crucial.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <code>R2(config)#access-list 1 deny 192.168.2.10</code> &rarr; <code>R2(config)#access-list 1 permit any</code> &rarr; <code>interface g0/1</code> &rarr; <code>ip access-group 1 out</code>:\n        <ul>\n          <li>Cisco Rule: <strong>Place Standard ACLs as close to the destination as possible</strong>.</li>\n          <li>Applying the ACL outbound on R2's GigabitEthernet0/1 interface (which directly connects to the file server) prevents PC2 (192.168.2.10) from reaching the file server, while still permitting PC2 to reach all other destinations across R1 and the corporate network.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Placing the deny rule inbound on R1 blocks PC2 from communicating with <em>all other hosts and networks</em>, violating the requirement.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Permits PC2 and denies everything else, causing complete network denial for all other users.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Configured on R1, blocking traffic close to the source and cutting off PC2 from other valid destinations.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>ACL Golden Rules:<br/>• <strong>Standard ACLs</strong> &rarr; Place <strong>closest to the DESTINATION</strong>.<br/>• <strong>Extended ACLs</strong> &rarr; Place <strong>closest to the SOURCE</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 22,
        "questionNo": "Question #36",
        "question": "What is the primary purpose of a console port on a Cisco WLC? (Choose one answer)",
        "options": [
            "A. in-band management via an IP transport",
            "B. out-of-band management via an asynchronous transport",
            "C. out-of-band management via an IP transport",
            "D. in-band management via an asynchronous transport"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/36.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Out-of-Band (OOB) Management</div>\n    <p>Network management is divided into <strong>In-Band</strong> (traffic shares the production IP network, e.g., SSH/HTTPS) and <strong>Out-of-Band (OOB)</strong> (dedicated physical path independent of the data network).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>out-of-band management via an asynchronous transport</strong>: The physical console port on a Cisco WLC uses an asynchronous RS-232 serial connection (over RJ-45 or USB). It operates completely independent of IP routing or network interface states, ensuring administrative access during catastrophic network outages.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options A and D</span>: In-band management requires an operational network connection (e.g., Telnet, SSH, or Web GUI) transmitting data frames across the network.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: The console port is a serial UART interface, not an IP packet transport.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Console Port = <strong>Out-of-Band (OOB)</strong>, <strong>Asynchronous Serial</strong>, no IP address required.</p>\n  </div>\n</div>"
    },
    {
        "id": 24,
        "questionNo": "Question #37",
        "question": "Which authentication method requires the user to provide a physical attribute to authenticate successfully? (Choose one answer)",
        "options": [
            "A. multifactor",
            "B. biometric",
            "C. password",
            "D. certificate"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/37.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Authentication Factors (\"Something you are\")</div>\n    <p>Authentication mechanisms are classified into three primary authentication factors: Something you know, Something you have, and Something you are.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>biometric</strong>: Biometric authentication verifies a user's biological or physical attribute (\"something you are\"), such as a fingerprint, facial scan, retina scan, or voiceprint.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>multifactor</strong>: MFA refers to combining two or more distinct factors (e.g. password + hardware token), rather than specifically denoting a biological attribute.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>password</strong>: A password represents \"something you know\" (knowledge factor).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>certificate</strong>: A digital certificate represents \"something you have\" (possession factor / digital credential).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Authentication Factors:<br/>• Knowledge = \"Something you know\" (Password/PIN)<br/>• Possession = \"Something you have\" (Smartcard/RSA Token)<br/>• Inherence = \"Something you are\" (<strong>Biometrics</strong>)</p>\n  </div>\n</div>"
    },
    {
        "id": 30,
        "questionNo": "Question #38",
        "question": "Which file transfer protocol omits a username or password requirement and acknowledges all data sent? (Choose one answer)",
        "options": [
            "A. TFTP",
            "B. SCP",
            "C. SFTP",
            "D. FTP"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/38.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Trivial File Transfer Protocol (TFTP, RFC 1350)</div>\n    <p>TFTP is an ultra-lightweight file transfer protocol primarily used in local networks for bootstrapping diskless workstations and transferring router/switch firmware and configuration backups.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>TFTP</strong>: TFTP operates over <strong>UDP port 69</strong> without any username or password authentication requirements. To ensure reliable transmission over UDP, TFTP implements a simple <strong>lock-step acknowledgment</strong> mechanism where each 512-byte data block must be explicitly acknowledged by the receiver before the next block is transmitted.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>SCP</strong>: Runs over SSH (TCP port 22) and strictly enforces user authentication (passwords or SSH public keys).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>SFTP</strong>: SSH File Transfer Protocol runs over SSH and requires credential authentication.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>FTP</strong>: File Transfer Protocol (RFC 959) uses TCP ports 20 and 21 and requires explicit username/password login commands.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>TFTP: Uses <strong>UDP port 69</strong>, <strong>no authentication</strong>, lock-step 512-byte block acknowledgments.</p>\n  </div>\n</div>"
    },
    {
        "id": 31,
        "questionNo": "Question #39",
        "question": "Refer to the exhibit. Which configuration for RTR-1 denies SSH access from PC-1 to any RTR-1 interface and allows all other traffic? (Choose one answer)",
        "options": [
            "A. access-list 100 deny tcp host 172.16.1.33 any eq 22\naccess-list 100 permit ip any any\nline vty 0 15\n access-class 100 in",
            "B. access-list 100 deny tcp host 172.16.1.33 any eq 23\naccess-list 100 permit ip any any\nline vty 0 15\n access-class 100 in",
            "C. access-list 100 deny tcp host 172.16.1.33 any eq 22\naccess-list 100 permit ip any any\ninterface GigabitEthernet0/0\n ip access-group 100 in",
            "D. access-list 100 deny tcp host 172.16.1.33 any eq 23\naccess-list 100 permit ip any any\ninterface GigabitEthernet0/0\n ip access-group 100 in"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/39.png",
        "originalSourceImage": "original_sources/39.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Securing Cisco VTY Lines with Extended ACLs</div>\n    <p>To restrict remote administrative management traffic directly destined to router line interfaces, an ACL is attached to the VTY lines using the <code>access-class</code> command.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span>:\n        <ul>\n          <li><code>access-list 100 deny tcp host 172.16.1.33 any eq 22</code>: Denies TCP traffic sourced from PC-1 (172.16.1.33) destined to port 22 (SSH).</li>\n          <li><code>access-list 100 permit ip any any</code>: Permits all other IP traffic, overriding the implicit deny at the end of the ACL.</li>\n          <li><code>line vty 0 15</code> &rarr; <code>access-class 100 in</code>: Applies the access list to inbound VTY management sessions.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options B and D</span>: Use port <code>23</code> (<code>eq 23</code>), which filters Telnet, not SSH (port 22).</li>\n      <li><span class=\"opt-tag wrong\">Options C and D</span>: Apply the ACL to the physical interface <code>GigabitEthernet0/0</code> with <code>ip access-group</code>. Applying filters to VTY lines specifically requires the <code>access-class</code> command under <code>line vty 0 15</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• On Physical Interfaces &rarr; Use <code>ip access-group &lt;ACL&gt; [in|out]</code>.<br/>• On VTY / Line Interfaces &rarr; Use <code>access-class &lt;ACL&gt; in</code>.<br/>• SSH = <strong>Port 22</strong> | Telnet = <strong>Port 23</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 12,
        "questionNo": "Question #40",
        "question": "When deploying a new network that includes both Cisco and third-party network devices, which redundancy protocol avoids the interruption of network traffic if the default gateway router fails? (Choose one answer)",
        "options": [
            "A. FHRP",
            "B. HSRP",
            "C. VRRP",
            "D. GLBP"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/40.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: First Hop Redundancy Protocols (FHRP) - Open Standards</div>\n    <p>FHRPs provide default gateway resilience by presenting a virtual IP and MAC address shared between two or more redundant routers.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>VRRP</strong>: Virtual Router Redundancy Protocol (RFC 3768, RFC 5798) is an open, multi-vendor standard supported across Cisco, Juniper, Arista, and third-party vendors. It elects a Master router and Backup routers to provide seamless default gateway failover.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>FHRP</strong>: The broad conceptual category name (First Hop Redundancy Protocol), not a specific protocol implementation.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>HSRP</strong>: Hot Standby Router Protocol is Cisco proprietary and not supported on generic third-party devices.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>GLBP</strong>: Gateway Load Balancing Protocol is also Cisco proprietary.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>FHRP Vendor Matrix:<br/>• <strong>VRRP</strong>: Open IETF Standard (Multi-Vendor).<br/>• <strong>HSRP</strong>: Cisco Proprietary.<br/>• <strong>GLBP</strong>: Cisco Proprietary.</p>\n  </div>\n</div>"
    },
    {
        "id": 38,
        "questionNo": "Question #41",
        "question": "Refer to the exhibit. The route for 10.227.150.160/27 has been very stable. The same route has four backups to routers A, B, C, and D via the respective methods. The routing protocol defaults for router Y have not been changed. When the current route for 10.227.150.160/27 becomes unavailable, which router will router Y use to route traffic to 10.227.150.160/27? (Choose one answer)",
        "options": [
            "A. router C",
            "B. router D",
            "C. router A",
            "D. router B"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/41.png",
        "originalSourceImage": "original_sources/41.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Administrative Distance (AD) Hierarchy</div>\n    <p>Administrative Distance is the measure of route trustworthiness used by Cisco routers to select the best path when multiple routing protocols offer routes to the identical destination prefix.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>router B</strong>:\n        <ul>\n          <li>The current active route is an eBGP route (<code>[20/0]</code>).</li>\n          <li>When this route becomes unavailable, router Y compares the ADs of the backup routes:\n            <ul>\n              <li>Router B (Floating Static Route): <strong>AD = 105</strong> (explicitly configured).</li>\n              <li>Router A (OSPF): Default <strong>AD = 110</strong>.</li>\n              <li>Router C (External EIGRP): Default <strong>AD = 170</strong>.</li>\n              <li>Router D (iBGP): Default <strong>AD = 200</strong>.</li>\n            </ul>\n          </li>\n          <li>Router Y installs the route with the <strong>lowest Administrative Distance</strong>: <strong>105 (Router B)</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>router C</strong>: External EIGRP has an AD of 170 (&gt; 105).</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>router D</strong>: iBGP has an AD of 200 (&gt; 105).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>router A</strong>: OSPF has an AD of 110 (&gt; 105).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Default AD Values to Memorize:<br/>Connected: 0 | Static: 1 | eBGP: 20 | EIGRP (Internal): 90 | OSPF: 110 | IS-IS: 115 | RIP: 120 | EIGRP (External): 170 | iBGP: 200.</p>\n  </div>\n</div>"
    },
    {
        "id": 34,
        "questionNo": "Question #42",
        "question": "Configure a factory-default router with these three passwords:\n\nThe user EXEC password for console access is p4ssw0rd1.\nThe user EXEC password for Telnet access is s3cr3t2.\nThe password for privileged EXEC mode is priv4t3p4ss.\n\nWhich command sequence must the engineer configure? (Choose one answer)",
        "options": [
            "A. enable secret priv4t3p4ss\nline con 0\n password p4ssw0rd1\nline vty 0 15\n password s3cr3t2",
            "B. enable secret priv4t3p4ss\nline con 0\n password p4ssw0rd1\nline vty 0 15\n password s3cr3t2\n login",
            "C. enable secret privilege 15 priv4t3p4ss\nline con 0\n password p4ssw0rd1\n login\nline vty 0 15\n password s3cr3t2\n login",
            "D. enable secret priv4t3p4ss\nline con 0\n password p4ssw0rd1\n login\nline vty 0 15\n password s3cr3t2\n login"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/42.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Password Configuration & The 'login' Command</div>\n    <p>Configuring passwords on Cisco IOS lines (console and VTY) requires not only setting the password string but also explicitly directing the line to prompt for it using the <code>login</code> command.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>:\n        <ul>\n          <li><code>enable secret priv4t3p4ss</code>: Secures privileged EXEC mode with a cryptographic hash.</li>\n          <li><code>line con 0</code> &rarr; <code>password p4ssw0rd1</code> &rarr; <code>login</code>: Correctly assigns the console password AND enables the login prompt.</li>\n          <li><code>line vty 0 15</code> &rarr; <code>password s3cr3t2</code> &rarr; <code>login</code>: Correctly assigns the Telnet/VTY password AND enables the login prompt.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Omits the <code>login</code> command on both console and VTY lines. Without <code>login</code>, Cisco IOS will never prompt users for the configured passwords!</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Omits the <code>login</code> command under <code>line con 0</code>, leaving console access unprotected.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Contains invalid syntax: <code>enable secret privilege 15 ...</code> is not a valid Cisco IOS command.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Golden Rule for Line Passwords: Always follow <code>password &lt;string&gt;</code> with <code>login</code>. Without <code>login</code>, the password is completely ignored.</p>\n  </div>\n</div>"
    },
    {
        "id": 32,
        "questionNo": "Question #43",
        "question": "Refer to the exhibit. What does apple represent within the JSON data? (Choose one answer)",
        "options": [
            "A. object",
            "B. string",
            "C. key",
            "D. number"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/43.png",
        "originalSourceImage": "original_sources/43.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: JSON Syntax & Structure (RFC 8259)</div>\n    <p>JavaScript Object Notation (JSON) structures data into collections of key/value pairs (objects) and ordered lists of values (arrays).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>key</strong>: In the JSON structure <code>{\"apple\": [\"red\", 1], \"ripe\": true}</code>, <code>\"apple\"</code> precedes the colon <code>:</code> and acts as the <strong>key</strong> (name/attribute identifier) for the corresponding array value <code>[\"red\", 1]</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>object</strong>: The entire payload enclosed within the curly brackets <code>{ ... }</code> is the JSON object.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>string</strong>: While the key is formatted as a string literal, its syntactic function within the key/value pair is that of a <strong>key</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>number</strong>: <code>1</code> is a number value inside the array.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>JSON Data Elements:<br/>• <code>{ }</code> = Object (Key:Value pairs)<br/>• <code>[ ]</code> = Array (Ordered list)<br/>• <code>\"key\" : value</code> = Key-Value Pair.</p>\n  </div>\n</div>"
    },
    {
        "id": 43,
        "questionNo": "Question #44",
        "question": "Refer to the exhibit. What is the correct next hop for router R1 to reach IP addresses 192.168.2.6 and 10.20.1.150? (Choose one answer)",
        "options": [
            "A. 172.16.1.1",
            "B. 172.16.1.3",
            "C. 172.16.1.4",
            "D. 172.16.1.2"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/44.png",
        "originalSourceImage": "original_sources/44.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match (LPM) Routing Logic</div>\n    <p>When multiple routes in the routing table cover a destination IP, the router selects the route with the longest subnet mask (most specific prefix), regardless of metric or administrative distance.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - 172.16.1.3) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>172.16.1.3</strong>: Official Cisco exam dumps designate B based on the /27 route preference:\n        <ul>\n          <li>For IP <strong>10.20.1.50</strong> (noted in official dump typo as 10.20.1.150): The route <code>10.20.1.32/27</code> (range .32 - .63) via <code>172.16.1.3</code> is the longest prefix match (/27 beats /26 and /24).</li>\n          <li>For IP <strong>192.168.2.6</strong>: The route <code>192.168.2.0/24</code> covers .6 via <code>172.16.1.4</code>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>172.16.1.1</strong>: 172.16.1.1 is R1's own local outgoing interface IP (Gi0/0), not an adjacent next-hop router.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>172.16.1.4</strong>: Next hop for routes 192.168.2.0/24 (via R2) and 10.20.1.0/26.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>172.16.1.2</strong>: Next hop for routes 10.20.1.0/24 and 192.168.2.64/27.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Prefix Length Hierarchy: <code>/32 (Host)</code> &gt; <code>/30</code> &gt; <code>/29</code> &gt; <code>/28</code> &gt; <code>/27</code> &gt; <code>/26</code> &gt; <code>/24</code> &gt; <code>/16</code> &gt; <code>/8</code> &gt; <code>/0 (Default)</code>. Longest prefix ALWAYS wins!</p>\n  </div>\n</div>"
    },
    {
        "id": 25,
        "questionNo": "Question #45",
        "question": "What are two benefits of controller-based networking? (Choose two answers)",
        "options": [
            "A. provides centralization of key IT functions",
            "B. allows for fewer network failures",
            "C. inflates software costs",
            "D. increases network bandwidth usage",
            "E. reduces network configuration complexity"
        ],
        "correctOption": [
            0,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/45.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Advantages of Controller-Based (SDN) Networks</div>\n    <p>SDN architectures (like Cisco DNA Center / Catalyst Center) replace decentralized, per-device configuration with centralized, policy-driven management.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>provides centralization of key IT functions</strong>: Controllers unify configuration, network monitoring, software image management (SWIM), and policy enforcement into a single centralized platform.</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>reduces network configuration complexity</strong>: Administrators apply intent-based policies via high-level GUIs/APIs, and the controller translates and pushes the granular configurations down to all devices automatically, eliminating human syntax errors.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: While SDN improves resilience, \"allows for fewer network failures\" is not an intrinsic architectural guarantee compared to centralization and reduced complexity.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Controllers lower operational expenses (OPEX) and reduce TCO rather than intentionally inflating software costs.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Controller-based networking optimizes bandwidth utilization through intelligent traffic engineering rather than increasing bandwidth consumption.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Two primary business advantages of SDN controllers: <strong>Centralized Management</strong> and <strong>Operational Simplicity (Reduced Configuration Complexity)</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 39,
        "questionNo": "Question #46",
        "question": "Refer to the exhibit. An engineer is using the Cisco WLC GUI to configure a WLAN for WPA2 encryption with AES and preshared key Cisco123456. After the engineer selects the WPA + WPA2 option from the Layer 2 Security drop-down list, which two tasks must they perform to complete the process? (Choose two answers)",
        "options": [
            "A. Select CCKM from the Auth Key Mgmt drop-down list, set the PSK Format to Hex, and enter the key.",
            "B. Select PSK from the Auth Key Mgmt drop-down list, set the PSK Format to ASCII, and enter the key.",
            "C. Select ASCII from the PSK Format drop-down list, enter the key, and leave the Auth Key Mgmt setting blank.",
            "D. Select the WPA2 Policy and AES check boxes.",
            "E. Select the WPA2 Policy, AES, and TKIP check boxes."
        ],
        "correctOption": [
            1,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/46.png",
        "originalSourceImage": "original_sources/46.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC WPA2-Personal (PSK) Configuration</div>\n    <p>Configuring WPA2-Personal on a Cisco Wireless LAN Controller requires enabling the WPA2 policy, specifying the AES-CCMP cipher, and setting up the Pre-Shared Key.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options B and D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Select PSK from the Auth Key Mgmt drop-down list, set the PSK Format to ASCII, and enter the key</strong>: Preshared keys entered as standard text strings (like <code>Cisco123456</code>) require selecting <strong>PSK</strong> authentication and <strong>ASCII</strong> format.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Select the WPA2 Policy and AES check boxes</strong>: To enforce WPA2 encryption, the WPA2 Policy checkbox must be checked and the AES (CCMP) encryption cipher must be enabled.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: CCKM is Cisco Centralized Key Management for rapid 802.1X roaming; <code>Cisco123456</code> is an ASCII string, not Hex.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Leaving Auth Key Mgmt blank creates an incomplete, non-functional WLAN security policy.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: TKIP was designed for legacy WPA (2003) and is insecure; selecting TKIP disables 802.11n/ac high-speed throughput.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>WPA2 requires <strong>AES-CCMP</strong>. TKIP is legacy WPA. Standard plaintext passwords use <strong>ASCII format</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 13,
        "questionNo": "Question #47",
        "question": "Which Cisco proprietary protocol ensures traffic recovers automatically when the active gateway fails? (Choose one answer)",
        "options": [
            "A. VRRP",
            "B. FHRP",
            "C. SLB",
            "D. HSRP"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/47.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Hot Standby Router Protocol (HSRP, RFC 2281)</div>\n    <p>HSRP provides high-availability default gateway services across multiple redundant routers on the same physical subnet.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>HSRP</strong>: Hot Standby Router Protocol is a <strong>Cisco proprietary</strong> First Hop Redundancy Protocol (FHRP) that elects an Active router and a Standby router sharing a virtual IP and MAC address (e.g. <code>0000.0c07.acXX</code> for HSRPv1). If the Active router fails, the Standby router assumes the gateway role automatically without dropping host sessions.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>VRRP</strong>: Virtual Router Redundancy Protocol is an open, multi-vendor IETF standard (RFC 3768/5798), not Cisco proprietary.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>FHRP</strong>: The generic category term (First Hop Redundancy Protocol), not a specific protocol.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>SLB</strong>: Server Load Balancing, not a default gateway redundancy protocol.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Cisco Proprietary FHRPs: <strong>HSRP</strong> and <strong>GLBP</strong>.<br/>Open Standard FHRP: <strong>VRRP</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 3,
        "questionNo": "Question #48",
        "question": "What is a characteristic of cloud-based network topology? (Choose one answer)",
        "options": [
            "A. physical workstations are configured to share resources",
            "B. onsite network services are provided with physical Layer 2 and Layer 3 components",
            "C. wireless connections provide the sole access method to services",
            "D. services are provided by a public, private, or hybrid deployment"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/48.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cloud Deployment Models (NIST SP 800-145)</div>\n    <p>Cloud computing topologies are defined by NIST into standard deployment models based on infrastructure ownership and tenancy.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>services are provided by a public, private, or hybrid deployment</strong>: Cloud topologies are categorized into:\n        <ul>\n          <li><strong>Public Cloud</strong>: Multi-tenant infrastructure owned by cloud providers (AWS, Azure, GCP) accessible over the internet.</li>\n          <li><strong>Private Cloud</strong>: Dedicated single-tenant infrastructure dedicated to one organization.</li>\n          <li><strong>Hybrid Cloud</strong>: Interconnected combination of private and public cloud environments.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Physical peer-to-peer resource sharing between local workstations describes legacy workgroup networking.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: On-premises physical Layer 2 and Layer 3 hardware describes traditional on-prem enterprise architectures.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Cloud services are accessible across diverse transports including wired LANs, MPLS WANs, and cellular data, not solely Wi-Fi.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Cloud Models: <strong>Public</strong> (Multi-tenant) | <strong>Private</strong> (Single organization) | <strong>Hybrid</strong> (Combination of Public + Private) | <strong>Community</strong> (Shared by organizations with common goals).</p>\n  </div>\n</div>"
    },
    {
        "id": 7,
        "questionNo": "Question #49",
        "question": "Which two HTTP verbs does a REST-based API call to create a resource? (Choose two answers)",
        "options": [
            "A. DELETE",
            "B. GET",
            "C. PUT",
            "D. POST",
            "E. PATCH"
        ],
        "correctOption": [
            2,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/49.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: RESTful API HTTP Request Methods (RFC 7231)</div>\n    <p>RESTful APIs utilize standard HTTP verbs (methods) to execute CRUD (Create, Read, Update, Delete) operations on network resources.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options C and D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>POST</strong>: The primary HTTP verb utilized in REST APIs to <strong>create</strong> a new resource under a collection URI (e.g., <code>POST /api/v1/devices</code>).</li>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>PUT</strong>: Can create a new resource when the client specifies the exact URI path where the resource must be stored (e.g., <code>PUT /api/v1/devices/switch-01</code>), or replace it if it already exists (idempotent create/replace).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>DELETE</strong>: Removes or deletes an existing resource.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>GET</strong>: Retrieves/reads an existing resource without altering server state (safe and idempotent).</li>\n      <li><span class=\"opt-tag wrong\">Option E</span> <strong>PATCH</strong>: Modifies or partially updates an existing resource, rather than creating one from scratch.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>CRUD to HTTP Mapping:<br/>• <strong>C</strong>reate &rarr; <strong>POST</strong> / <strong>PUT</strong><br/>• <strong>R</strong>ead &rarr; <strong>GET</strong><br/>• <strong>U</strong>pdate &rarr; <strong>PUT</strong> / <strong>PATCH</strong><br/>• <strong>D</strong>elete &rarr; <strong>DELETE</strong></p>\n  </div>\n</div>"
    },
    {
        "id": 49,
        "questionNo": "Question #50",
        "question": "Refer to the exhibit. Which routes are configured with their default administrative distances? (Choose one answer)",
        "options": [
            "A. RIP",
            "B. OSPF",
            "C. EIGRP",
            "D. Local"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/50.png",
        "originalSourceImage": "original_sources/50.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Default Administrative Distance (AD) Values</div>\n    <p>Administrative Distance is the measure of trustworthiness of a routing information source in Cisco IOS. Each routing protocol has a standardized default AD value.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>OSPF</strong>:\n        <ul>\n          <li>The exhibit displays multiple OSPF routes labeled with code <code>O</code> (e.g., <code>O 10.0.12.0/24 [110/2]</code> and <code>O 10.255.1.1/32 [110/2]</code>).</li>\n          <li>The first number in the bracket <code>[110/x]</code> represents the Administrative Distance. <strong>110</strong> is the standard, factory-default Administrative Distance for OSPF in Cisco IOS.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>RIP</strong>: RIP has a default AD of 120 (not present in this routing table).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>EIGRP</strong>: The routing table does show one EIGRP route (<code>D 10.2.0.0/24 [90/1]</code>), but OSPF is the predominant protocol tested where multiple default routes appear at AD 110.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Local</strong>: Directly connected routes (<code>C</code>) and Local routes (<code>L</code>) have an AD of 0 and are hardware/interface generated, not configured routing protocol routes.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Routing Protocol ADs: Connected = 0 | Static = 1 | EIGRP = 90 | <strong>OSPF = 110</strong> | IS-IS = 115 | RIP = 120 | External EIGRP = 170 | BGP = 20 (eBGP) / 200 (iBGP).</p>\n  </div>\n</div>"
    },
    {
        "id": 57,
        "questionNo": "Question #51",
        "question": "Which SNMP message type is reliable and precedes an acknowledgment response from the SNMP manager? (Choose one answer)",
        "options": [
            "A. Inform",
            "B. Trap",
            "C. Set",
            "D. Get"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/51.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SNMP Notification Types (Traps vs. Informs, RFC 3416)</div>\n    <p>Simple Network Management Protocol (SNMP) allows managed network devices to proactively report asynchronous event alerts to an SNMP Network Management Station (NMS) using either Traps or Informs.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Inform</strong>: An SNMP <strong>InformRequest (Inform)</strong> is a <strong>reliable notification</strong>. When an agent generates an Inform, the receiving SNMP manager MUST reply with an <strong>InformResponse (acknowledgment)</strong> PDU. If the sending device does not receive this acknowledgment, it retains the message and retransmits it until acknowledged or until retry thresholds expire.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Trap</strong>: Traps are unacknowledged and unreliable UDP datagrams (sent to UDP port 162). The SNMP manager never sends an acknowledgment, so if a Trap is dropped in transit, the event is permanently lost.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Set</strong>: A SetRequest is sent from the SNMP manager to a managed device to modify a MIB variable, not an asynchronous notification generated by the device.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Get</strong>: A GetRequest is initiated by the SNMP manager to retrieve data from an agent, not a spontaneous event alert.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>SNMP Trap</strong> = Unreliable (No ACK, fire-and-forget).<br/><strong>SNMP Inform</strong> = Reliable (Requires ACK PDU from Manager, retransmits if unacknowledged).</p>\n  </div>\n</div>"
    },
    {
        "id": 58,
        "questionNo": "Question #52",
        "question": "Which AP mode wirelessly connects two separate network segments each set up within a different campus building? (Choose one answer)",
        "options": [
            "A. local",
            "B. mesh",
            "C. bridge",
            "D. point-to-point"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/52.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Wireless AP Operating Modes - Bridging</div>\n    <p>Cisco access points can be configured in specialized operational modes to bridge physical network segments wirelessly when trenching fiber or copper cabling between buildings is cost-prohibitive.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>bridge</strong>: In <strong>Bridge mode</strong>, the access point operates as a dedicated Point-to-Point (P2P) or Point-to-Multipoint (P2MP) wireless bridge. It transparently interconnects two distinct wired campus LAN segments across buildings over the 5 GHz wireless spectrum.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>local</strong>: Default mode where the AP serves client BSSIDs and encapsulates all client data frames into CAPWAP tunnels back to the WLC.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>mesh</strong>: While mesh APs use bridging, \"Bridge\" mode is the specific operational designation configured on the AP for inter-building bridging.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>point-to-point</strong>: A topological description rather than an official configurable Cisco AP mode name in WLC/IOS software.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To interconnect two buildings wirelessly: Configure APs in <strong>Bridge mode</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 59,
        "questionNo": "Question #53",
        "question": "What is a characteristic of a Layer 2 switch? (Choose one answer)",
        "options": [
            "A. uses routers to create collision domains",
            "B. uses the data link layer for MAC address learning and forwarding",
            "C. is responsible for sending data in a particular sequence",
            "D. operates at the transport layer to segment data"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/53.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 2 Switch Operations (Data Link Layer)</div>\n    <p>Layer 2 switches operate at the Data Link layer of the OSI model, inspecting Ethernet frame headers to make forwarding and filtering decisions based on hardware MAC addresses.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>uses the data link layer for MAC address learning and forwarding</strong>: Switches inspect the <em>source MAC address</em> of incoming frames to populate the MAC address table (CAM table) and inspect the <em>destination MAC address</em> to make intelligent point-to-point forwarding decisions.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Each individual switch port creates its own separate collision domain (microsegmentation); switches do not rely on routers to break up collision domains.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Sequencing and in-order delivery are transport layer (Layer 4 TCP) responsibilities, not Layer 2 switching functions.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Transport layer data segmentation (breaking application data streams into segments) occurs on host IP stacks (Layer 4), not Layer 2 switches.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Layer 2 Switch Rules: <strong>Learns on Source MAC</strong> &rarr; <strong>Forwards based on Destination MAC</strong> &rarr; Breaks up Collision Domains (1 per port).</p>\n  </div>\n</div>"
    },
    {
        "id": 94,
        "questionNo": "Question #54",
        "question": "Refer to the exhibit. The loopback IP of R3 has been learned via the two interfaces on R1. R1 is configured with a reference bandwidth of 10 Gbps. Based on the metric calculations, which next-hop IP would be used for outgoing routing? (Choose one answer)",
        "options": [
            "A. 10.12.6",
            "B. 10.12.2",
            "C. 10.12.5",
            "D. 10.12.1"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/54.png",
        "originalSourceImage": "original_sources/54.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: OSPF Cost Metric & Reference Bandwidth</div>\n    <p>OSPF calculates path cost using the formula: <code>Cost = Reference Bandwidth / Interface Bandwidth</code>. The lowest cumulative cost path is installed in the routing table.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A - 10.12.6) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>10.12.6 (10.12.0.6)</strong>:\n        <ul>\n          <li><strong>Configured Reference BW:</strong> 10 Gbps (10,000 Mbps).</li>\n          <li><strong>Top Link (1 Gbps):</strong> Cost = 10 Gbps / 1 Gbps = <code>10</code>.</li>\n          <li><strong>Bottom Link (10 Gbps):</strong> Cost = 10 Gbps / 10 Gbps = <code>1</code>.</li>\n          <li><strong>Path Selection:</strong> OSPF prefers the lowest cost path (Bottom link with Cost = 1). The next-hop IP on R2 for the bottom link (10.12.0.4/30) is <strong>10.12.0.6</strong> (formatted as 10.12.6 in the dump).</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>10.12.2</strong>: Next hop on the top link (1 Gbps), which has a higher OSPF cost (10 vs 1) and is not preferred.</li>\n      <li><span class=\"opt-tag wrong\">Options C & D</span> <strong>10.12.5 & 10.12.1</strong>: R1's own local interface IP addresses, not next-hop IPs on adjacent router R2.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Default OSPF reference bandwidth is 100 Mbps. In high-speed networks, always configure <code>auto-cost reference-bandwidth 10000</code> so 1G and 10G links have differentiated metrics.</p>\n  </div>\n</div>"
    },
    {
        "id": 89,
        "questionNo": "Question #55",
        "question": "An administrator is configuring a Cisco Catalyst switch so that it will accept management connections only from hosts in the 203.0.113.0/24 network. Other traffic passing through the switch must transit without interruption. Which two configurations must the engineer apply to the switch? (Choose two answers)",
        "options": [
            "A. ip access-list extended Management, permit tcp any range 22 23 203.0.113.0 0.0.0.255",
            "B. interface range vlan 1 - 4094, ip access-group Management out",
            "C. ip access-list standard Management, permit 203.0.113.0 0.0.0.255",
            "D. line vty 0 15, access-class Management in",
            "E. ip access-list standard Management, permit 203.0.113.0 255.255.255.0"
        ],
        "correctOption": [
            2,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/55.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco VTY Line Security & Standard Access Lists</div>\n    <p>Restricting remote administrative access (SSH/Telnet) to a switch without disrupting transit user data frames requires binding a standard ACL directly to the virtual terminal lines using <code>access-class</code>.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options C and D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <code>ip access-list standard Management, permit 203.0.113.0 0.0.0.255</code>: Creates a standard ACL permitting only traffic sourced from the authorized management network <code>203.0.113.0/24</code> (wildcard <code>0.0.0.255</code>).</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <code>line vty 0 15, access-class Management in</code>: Applies the ACL specifically to inbound VTY sessions. Because it is applied to the management plane lines (not physical transit interfaces), regular traffic passing through switch ports is completely unaffected.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Uses an extended ACL with invalid syntax ordering (<code>tcp any range 22 23 203.0.113.0</code> places the destination IP where the port should be).</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Applying an ACL outbound across all VLAN interfaces (<code>ip access-group Management out</code>) would filter production data plane traffic across the entire enterprise!</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Uses a subnet mask (<code>255.255.255.0</code>) instead of the required inverse wildcard mask (<code>0.0.0.255</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To filter traffic TO the device (VTY lines): Use <code>access-class &lt;ACL&gt; in</code> under <code>line vty</code>.<br/>To filter traffic THROUGH the device: Use <code>ip access-group &lt;ACL&gt;</code> under <code>interface</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 93,
        "questionNo": "Question #56",
        "question": "Refer to the exhibit. Which prefix did router R1 learn from an EIGRP neighbor? (Choose one answer)",
        "options": [
            "A. 192.168.1.0/24",
            "B. 192.168.2.0/24",
            "C. 192.168.3.0/24",
            "D. 172.16.1.0/24"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/56.png",
        "originalSourceImage": "original_sources/56.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Routing Table Protocol Codes</div>\n    <p>The Cisco IOS routing table identifies the origin of each route using standardized 1- or 2-letter protocol codes at the beginning of each entry.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>192.168.2.0/24</strong>: In the exhibit, this route begins with the code <strong>D</strong>:\n        <br/><code>D 192.168.2.0/24 [90/184437] via 207.165.200.254</code>.\n        <br/>In Cisco IOS, <strong>D</strong> represents internal <strong>EIGRP</strong> (named after the Diffusing Update Algorithm - DUAL) with its default Administrative Distance of <strong>90</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>192.168.1.0/24</strong>: Labeled with code <code>O</code> (AD 110), indicating it was learned via <strong>OSPF</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>192.168.3.0/24</strong>: Labeled with code <code>E1</code> (AD 110), indicating an <strong>OSPF External Type 1</strong> route.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>172.16.1.0/24</strong>: Labeled with code <code>C</code>, indicating a <strong>Directly Connected</strong> interface.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Cisco Route Codes to Memorize:<br/>• <strong>C</strong> = Connected | <strong>S</strong> = Static | <strong>R</strong> = RIP | <strong>O</strong> = OSPF | <strong>D</strong> = EIGRP (DUAL) | <strong>B</strong> = BGP | <strong>L</strong> = Local host.</p>\n  </div>\n</div>"
    },
    {
        "id": 62,
        "questionNo": "Question #57",
        "question": "Refer to the exhibit. What is represented by the curly brackets in line 2 within this JSON schema? (Choose one answer)",
        "options": [
            "A. key",
            "B. array",
            "C. object",
            "D. value"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/57.png",
        "originalSourceImage": "original_sources/57.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: JSON Syntax Fundamentals (RFC 8259)</div>\n    <p>JSON format is structured around two universal collections: objects (enclosed in curly braces) and arrays (enclosed in square brackets).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>object</strong>: In JSON, curly brackets <code>{ }</code> always denote an <strong>object</strong> (an unordered collection of zero or more key/value pairs separated by commas).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>key</strong>: A key is a string enclosed in double quotes preceding a colon (e.g., <code>\"name\":</code>).</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>array</strong>: An array is represented by square brackets <code>[ ]</code> containing an ordered list of values.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>value</strong>: A value can be a string, number, boolean, null, object, or array, but the curly braces themselves specifically construct an object.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>JSON Syntax Rules:<br/>• <code>{ ... }</code> = <strong>Object</strong> (key-value dictionary)<br/>• <code>[ ... ]</code> = <strong>Array</strong> (list)<br/>• <code>\"key\" : \"value\"</code> = Pair.</p>\n  </div>\n</div>"
    },
    {
        "id": 63,
        "questionNo": "Question #58",
        "question": "What are two advantages of a controller-based architecture instead of a traditional network architecture? (Choose two answers)",
        "options": [
            "A. It allows for seamless connectivity to virtual machines (VMs).",
            "B. It supports complex and high-scale IP addressing schemes.",
            "C. It increases security against denial-of-service attacks.",
            "D. It enables configuration task automation.",
            "E. It provides increased centralized scalability and management options."
        ],
        "correctOption": [
            3,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/58.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Controller-Based (SDN) Architecture Benefits</div>\n    <p>Decoupling the control plane and centralizing it in an SDN controller (e.g. Cisco Catalyst Center / DNA Center) fundamentally changes network operations and scalability.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options D and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>It enables configuration task automation</strong>: Controllers provide intent-based workflows, automated network discovery, plug-and-play zero-touch provisioning, and programmatic APIs that replace manual device-by-device CLI configurations.</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>It provides increased centralized scalability and management options</strong>: Rather than managing hundreds of independent distributed control planes, the controller provides global topology visibility, unified policy deployment, and centralized telemetry collection across the enterprise.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Both traditional VLANs and SDN fabrics provide VM connectivity; this is not a unique defining advantage of controller architecture.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: IP addressing schemas (VLSM/CIDR/IPv6) operate identically in both traditional and controller networks.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: A centralized controller does not inherently stop external volumetric denial-of-service (DoS) attacks; dedicated mitigation appliances/scrubbers are required.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Controller Architecture Core Value: <strong>Centralized Management</strong> + <strong>Configuration Task Automation</strong> via Northbound REST APIs.</p>\n  </div>\n</div>"
    },
    {
        "id": 96,
        "questionNo": "Question #59",
        "question": "Refer to the exhibit. An engineer is creating a secure preshared key based SSID using WPA2 for a wireless network running on 2.4 GHz and 5 GHz. Which two tasks must the engineer perform to complete the process? (Choose two answers)",
        "options": [
            "A. Select the PSK option for Auth Key Management.",
            "B. Select the AES(CCMP128) option for WPA2/WPA3 Encryption.",
            "C. Select the AES option for Auth Key Management.",
            "D. Select the 802.1x option for Auth Key Management.",
            "E. Select the WPA Policy option."
        ],
        "correctOption": [
            0,
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/59.png",
        "originalSourceImage": "original_sources/59.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC WPA2-PSK Configuration Parameters</div>\n    <p>Deploying a secure Pre-Shared Key (PSK) WLAN on Cisco Catalyst / AireOS Wireless LAN Controllers requires establishing the Layer 2 security policy, encryption cipher, and authentication key management.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A and B) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Select the PSK option for Auth Key Management</strong>: Authentication Key Management (AKM) must be set to <strong>PSK</strong> (Pre-Shared Key) so clients authenticate using a shared passphrase rather than an enterprise 802.1X RADIUS server.</li>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Select the AES(CCMP128) option for WPA2/WPA3 Encryption</strong>: Under WPA2 encryption ciphers, <strong>AES (CCMP128)</strong> must be selected to provide robust 128-bit frame encryption and enable 802.11n/ac/ax high data rates.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option C</span>: AES is an encryption cipher, not an option listed under Authentication Key Management (AKM).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: 802.1X is for Enterprise authentication requiring a RADIUS/AAA server, contradicting the requirement for a Pre-Shared Key.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Enabling WPA Policy activates legacy, deprecated WPA (TKIP), degrading network security and disabling Wi-Fi 4/5/6 throughput.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>For WPA2-Personal WLANs: Set <strong>AKM = PSK</strong> and <strong>Encryption = AES (CCMP)</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 51,
        "questionNo": "Question #60",
        "question": "What does traffic shaping do? (Choose one answer)",
        "options": [
            "A. It organizes traffic into classes.",
            "B. It queues excess traffic.",
            "C. It sets QoS attributes within a packet.",
            "D. It modifies the QoS attributes of a packet."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/60.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: QoS Traffic Conditioning (Shaping vs. Policing)</div>\n    <p>Traffic conditioning mechanisms ensure that traffic transmitted onto a link does not exceed a configured committed information rate (CIR).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>It queues excess traffic</strong>: <strong>Traffic Shaping</strong> buffers (queues) packets that exceed the configured bandwidth rate and transmits them smoothly over time, avoiding packet drops and producing a smooth output rate.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>It organizes traffic into classes</strong>: This is the role of QoS <strong>Classification</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option C & D</span> <strong>Sets / modifies QoS attributes</strong>: Tagging or modifying header fields (DSCP/CoS) is <strong>Marking</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Policing</strong> = Drops or re-marks excess traffic (No delay, causes packet loss, supports In/Out).<br/><strong>Shaping</strong> = <strong>Queues (buffers)</strong> excess traffic to smooth bursts (Causes delay, avoids loss, Outbound only).</p>\n  </div>\n</div>"
    },
    {
        "id": 91,
        "questionNo": "Question #61",
        "question": "Refer to the exhibit. A TCP connection has been initiated and sourced from 10.54.21.20 to a server with a destination address of 172.20.21.43. To which interface will the traffic be forwarded? (Choose one answer)",
        "options": [
            "A. Ethernet2/0/0",
            "B. Ethernet2/1/0",
            "C. Ethernet2/1/1",
            "D. Ethernet1/0/0"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/61.png",
        "originalSourceImage": "original_sources/61.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Routing Table Longest Prefix Match with VLSM</div>\n    <p>When selecting an exit interface, Cisco IOS compares the destination IP address of incoming traffic against all network entries in the routing table and selects the longest matching prefix.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Ethernet2/1/0</strong>:\n        <ul>\n          <li>Destination IP is <code>172.20.21.43</code>.</li>\n          <li>Route <code>172.20.20.0/23</code> has subnet mask <code>255.255.254.0</code>.</li>\n          <li>Block size in 3rd octet = <code>256 - 254 = 2</code>. Subnet spans <code>172.20.20.0</code> through <code>172.20.21.255</code>!</li>\n          <li>Destination <code>172.20.21.43</code> falls directly inside this range!</li>\n          <li>The routing table entry states: <code>D EX 172.20.20.0/23 [170/254323] via 75.83.53.34, Ethernet2/1/0</code>. Traffic is forwarded out <strong>Ethernet2/1/0</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Ethernet2/0/0</strong>: Exit interface for host route <code>172.20.81.81/32</code>, which does not match .21.43.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Ethernet2/1/1</strong>: Exit interface for route <code>192.168.26.87/32</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Ethernet1/0/0</strong>: Exit interface for host route <code>172.20.21.21/32</code> (only matches .21) and <code>192.168.21.0/24</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>A <code>/23</code> subnet covers 2 consecutive class C blocks: <code>172.20.20.0/23</code> encompasses both <code>172.20.20.x</code> AND <code>172.20.21.x</code>!</p>\n  </div>\n</div>"
    },
    {
        "id": 67,
        "questionNo": "Question #62",
        "question": "Which security element uses a combination of one-time passwords, a login name, and a personal smartphone? (Choose one answer)",
        "options": [
            "A. port-based authentication",
            "B. software-defined segmentation",
            "C. multifactor authentication",
            "D. role-based access control"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/62.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Multi-Factor Authentication (MFA) Architecture</div>\n    <p>Multi-Factor Authentication enforces security by requiring two or more distinct authentication categories before granting system access.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>multifactor authentication</strong>: The scenario combines:\n        <br/>1. <strong>Something you know</strong> (login name and password).\n        <br/>2. <strong>Something you have</strong> (a personal smartphone generating or receiving a One-Time Password - OTP via an authenticator app/SMS).\n        <br/>Combining these separate factors constitutes <strong>multi-factor authentication (MFA)</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>port-based authentication</strong>: 802.1X controls physical switch port access, but does not define the generic user login scheme described.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>software-defined segmentation</strong>: Divides network traffic into security zones (e.g. Cisco TrustSec SGTs), not a user identity verification method.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>role-based access control</strong>: RBAC determines user permissions after authentication has already occurred.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>MFA requires at least two DIFFERENT factors:<br/>• Something you know (Password)<br/>• Something you have (Smartphone/OTP)<br/>• Something you are (Biometrics).</p>\n  </div>\n</div>"
    },
    {
        "id": 98,
        "questionNo": "Question #63",
        "question": "Refer to the exhibit. Inter-VLAN routing is configured on SW1. Client A is running Linux as an OS in VLAN 10 with a default gateway IP 10.0.0.1 but cannot ping client B in VLAN 20 running Windows. What action must be taken to verify that client A has the correct IP settings? (Choose one answer)",
        "options": [
            "A. Run the ipconfig command on client A and ensure that the IP address is within the host range of 10.0.0.1 - 10.255.254.",
            "B. Run the ifconfig command on client A to confirm that the subnet mask is set to 255.255.128.0.",
            "C. Run the ifconfig command on client A to confirm that its IP and subnet mask fall within 255.255.0.0.",
            "D. Run the ipconfig command on client A to confirm that the correct 10.0.0.1 default gateway is used."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/63.png",
        "originalSourceImage": "original_sources/63.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Linux Network Configuration & Subnet Mask Verification</div>\n    <p>On Linux systems, the traditional command-line utility for displaying interface IP addressing and netmasks is <code>ifconfig</code> (or <code>ip addr</code>). For Inter-VLAN routing to function, the host's IP and subnet mask must match the router's SVI/subinterface.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>Run the ifconfig command on client A to confirm that its IP and subnet mask fall within 255.255.0.0</strong>:\n        <ul>\n          <li>Client A is running <strong>Linux</strong>, where the relevant diagnostic command is <code>ifconfig</code> (not the Windows <code>ipconfig</code>).</li>\n          <li>The switch's VLAN 10 interface is configured with a <code>/16</code> subnet mask (<code>255.255.0.0</code>). Checking client A with <code>ifconfig</code> verifies that client A's IP address and subnet mask correctly match the 10.0.0.0/16 subnet.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options A & D</span>: Use <code>ipconfig</code>, which is exclusively a Microsoft Windows command; client A is running Linux.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Mentions a <code>255.255.128.0</code> mask, which does not match the switch's configured /16 (255.255.0.0) subnet mask.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>OS CLI Tools:<br/>• <strong>Windows</strong> &rarr; <code>ipconfig</code>, <code>tracert</code>.<br/>• <strong>Linux / macOS</strong> &rarr; <code>ifconfig</code> (or <code>ip addr</code>), <code>traceroute</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 64,
        "questionNo": "Question #64",
        "question": "When a WPA2-PSK WLAN is configured on the Wireless LAN Controller, what is the minimum number of characters that is required for the passphrase? (Choose one answer)",
        "options": [
            "A. 6",
            "B. 8",
            "C. 12",
            "D. 18"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/64.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WPA2-Personal (PSK) Passphrase Standards (IEEE 802.11i)</div>\n    <p>The IEEE 802.11i standard defines the specification for WPA2 Pre-Shared Key (PSK) passphrases used on wireless controllers and consumer routers.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>8</strong>: IEEE 802.11i mandates that a WPA2-PSK ASCII passphrase must have a minimum length of <strong>8 characters</strong> (up to a maximum of 63 ASCII characters, or exactly 64 hexadecimal characters). Cisco WLCs strictly enforce this 8-character minimum.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>6</strong>: Below the cryptographic standard minimum; the WLC GUI will reject passphrases under 8 characters with a validation error.</li>\n      <li><span class=\"opt-tag wrong\">Options C & D</span> <strong>12 & 18</strong>: Recommended for enterprise password complexity policies, but not the protocol-mandated minimum.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>WPA/WPA2/WPA3-Personal Passphrase Length: <strong>Minimum 8 characters</strong>, maximum 63 ASCII characters.</p>\n  </div>\n</div>"
    },
    {
        "id": 74,
        "questionNo": "Question #65",
        "question": "Which wireless security protocol provides Protected Management Frames (PMF) by default? (Choose one answer)",
        "options": [
            "A. WPA",
            "B. WEP",
            "C. WPA2",
            "D. WPA3"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/65.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Protected Management Frames (PMF, IEEE 802.11w)</div>\n    <p>IEEE 802.11w Protected Management Frames (PMF) encrypts and authenticates unicast and broadcast management frames (such as Disassociation and Deauthentication frames) to prevent wireless DoS attacks.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>WPA3</strong>: The Wi-Fi Alliance made <strong>Protected Management Frames (PMF) mandatory by default</strong> in the WPA3 standard (both WPA3-Personal and WPA3-Enterprise). This eliminates spoofed deauthentication attacks and protects client connections.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>WPA</strong>: Pre-dates 802.11w; management frames are sent completely in plaintext.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>WEP</strong>: Completely insecure legacy standard lacking any management frame protection.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>WPA2</strong>: PMF was optional in WPA2 (often disabled for backward compatibility with older client hardware), not mandatory or enabled by default.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>PMF (802.11w)</strong> protects against Wi-Fi Deauthentication attacks. It is <strong>mandatory by default in WPA3</strong> and optional in WPA2.</p>\n  </div>\n</div>"
    },
    {
        "id": 68,
        "questionNo": "Question #66",
        "question": "How do servers connect to the network in a virtual environment? (Choose one answer)",
        "options": [
            "A. wireless to an access point that is physically connected to the network",
            "B. a software switch on a hypervisor that is physically connected to the network",
            "C. a cable connected to a physical switch on the network",
            "D. a virtual switch that links to an access point physically connected to the network"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/66.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Virtualization & Hypervisor Virtual Switches (vSwitch)</div>\n    <p>In virtualized data centers, Virtual Machines (VMs) share physical networking hardware through software-based virtual switches built into the hypervisor.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>a software switch on a hypervisor that is physically connected to the network</strong>: VMs instantiate virtual network interface cards (vNICs) that connect to a <strong>software virtual switch (vSwitch)</strong> managed by the hypervisor (e.g., VMware vSphere Standard/Distributed Switch, Hyper-V Virtual Switch). The vSwitch multiplexes VM traffic across the physical server's network interface cards (pNICs/uplinks) connected to the physical Top-of-Rack (ToR) switch.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Enterprise servers connect via high-speed wired Ethernet (10G/25G/40G), not wireless access points.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Individual virtual machines do not connect physical copper/fiber cables; physical cables attach to the host server's pNICs.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Virtual switches do not link to wireless APs in standard enterprise server environments.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Data Center Virtual Networking: <strong>VM (vNIC)</strong> &rarr; <strong>vSwitch (Hypervisor)</strong> &rarr; <strong>Uplink (pNIC)</strong> &rarr; <strong>Physical Switch Port</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 69,
        "questionNo": "Question #67",
        "question": "Which two features are provided by Ansible in network automation? (Choose two answers)",
        "options": [
            "A. offers agentless architecture",
            "B. launches job templates using version control",
            "C. pushes configurations over SSH",
            "D. supplies proprietary daemon agents",
            "E. uses YAML language for playbooks"
        ],
        "correctOption": [
            0,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/67.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Ansible Architecture & Network Automation</div>\n    <p>Ansible is an open-source automation engine widely used for network configuration management, application deployment, and orchestration.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>offers agentless architecture</strong>: Unlike Puppet or Chef, Ansible does not require any custom software agent to be installed on managed network switches or routers. It connects directly using standard management protocols (SSH, NETCONF, RESTCONF).</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>uses YAML language for playbooks</strong>: Ansible playbooks are written in <strong>YAML</strong> (YAML Ain't Markup Language), a human-readable data serialization language that is easy to write and version-control.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Job templates are an enterprise feature of Ansible Tower / AWX, not a foundational characteristic of Ansible itself.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: While Ansible uses SSH for Linux and network devices, \"pushes configurations over SSH\" is not as distinctive as its agentless architecture and YAML language.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Ansible is strictly agentless; supplying proprietary daemon agents is what Chef and Puppet do.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Ansible Characteristics: <strong>Agentless</strong>, <strong>Push-based</strong>, uses <strong>YAML playbooks</strong> over <strong>SSH</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 75,
        "questionNo": "Question #68",
        "question": "Which WAN topology connects all remote sites to a central site and routes all inter-site traffic through the central site? (Choose one answer)",
        "options": [
            "A. point-to-multipoint",
            "B. point-to-point",
            "C. full mesh",
            "D. hub-and-spoke"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/68.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WAN Topologies (Hub-and-Spoke vs. Full Mesh)</div>\n    <p>Wide Area Network (WAN) designs determine how remote branches communicate with headquarters and with each other.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>hub-and-spoke</strong>: In a <strong>Hub-and-Spoke</strong> (Star) topology, a single central site acts as the hub, and all remote branch offices connect as spokes directly to the hub. All inter-site branch-to-branch communication must traverse through the central hub.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>point-to-multipoint</strong>: A physical or logical Layer 2 service connection type, whereas hub-and-spoke is the specific network architecture where all inter-site traffic passes through the central site.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>point-to-point</strong>: Connects exactly two endpoints with a dedicated link.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>full mesh</strong>: Every site connects directly to every other site, allowing direct branch-to-branch traffic without passing through a central site.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>WAN Topologies:<br/>• <strong>Hub-and-Spoke</strong>: Lowest circuit cost, all traffic routes through central hub, single point of failure.<br/>• <strong>Full Mesh</strong>: Highest circuit cost, direct links between all sites, maximum redundancy.</p>\n  </div>\n</div>"
    },
    {
        "id": 80,
        "questionNo": "Question #69",
        "question": "Which role does machine learning play in identifying network security breaches? (Choose one answer)",
        "options": [
            "A. It monitors for outdated software.",
            "B. It identifies patterns indicating intrusions.",
            "C. It assigns security clearance levels.",
            "D. It dictates security policy updates."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/69.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: AI & Machine Learning in Network Security</div>\n    <p>Modern enterprise networks leverage machine learning (ML) to detect advanced threats that bypass conventional signature-based security systems.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Identifies patterns indicating intrusions</strong>: ML security systems establish behavioral baselines of normal network traffic and user activities. Anomaly detection algorithms recognize deviations, malicious patterns, and zero-day threat behaviors (such as ransomware lateral movement or data exfiltration) without relying on known static signatures.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Monitors for outdated software</strong>: Checking software patch levels and CVEs is the job of vulnerability scanners and patch management tools, not ML breach detection.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Assigns security clearance levels</strong>: Security clearances and access privileges are administratively configured via IAM, RBAC, and Active Directory.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Dictates security policy updates</strong>: Policies are established and governed by network security administrators and compliance frameworks, not autonomously dictated by ML models.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Signature-based detection catches <strong>known threats</strong>; Machine Learning behavioral analysis detects <strong>unknown and zero-day threats</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 81,
        "questionNo": "Question #70",
        "question": "Which threat type is caused by an authorized user intentionally or unintentionally leaking sensitive information via email? (Choose one answer)",
        "options": [
            "A. phishing",
            "B. insider threat",
            "C. man-in-the-middle",
            "D. ransomware"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/70.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Security Threats - The Insider Threat</div>\n    <p>Cybersecurity frameworks categorize security risks based on the origin of the malicious or negligent activity (internal vs external).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>insider threat</strong>: An <strong>insider threat</strong> originates from an authorized user (employee, contractor, or business partner) who has legitimate system credentials and data access, but intentionally or inadvertently leaks confidential corporate information.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>phishing</strong>: A social engineering technique where fraudulent communications trick users into revealing credentials or clicking malicious links.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>man-in-the-middle</strong>: An active interception attack where an adversary intercepts and relays messages between two parties.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>ransomware</strong>: Malicious software that encrypts files and demands payment for the decryption key.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Insider threats are particularly dangerous because the perpetrator already possesses valid credentials and authorized access to enterprise assets.</p>\n  </div>\n</div>"
    },
    {
        "id": 90,
        "questionNo": "Question #71",
        "question": "What is the purpose of a First Hop Redundancy Protocol (FHRP)? (Choose one answer)",
        "options": [
            "A. It uses bridge priorities to create multiple paths to a single destination.",
            "B. It protects against gateway failures by allowing Layer 3 load balancing across multiple OSPF neighbors.",
            "C. It allows directly connected switches to share configuration information.",
            "D. It protects against default gateway failures by allowing more than one router to represent a virtual default gateway IP address."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/71.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: First Hop Redundancy Protocols (FHRP)</div>\n    <p>Host devices on an Ethernet LAN are configured with a single default gateway IP address. If that gateway router fails, hosts lose communication with remote subnets.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>It protects against default gateway failures by allowing more than one router to represent a virtual default gateway IP address</strong>: FHRPs (such as HSRP, VRRP, and GLBP) group two or more physical routers into a single virtual router sharing a <strong>virtual IP address</strong>. LAN hosts point their default gateway to this virtual IP. If the active gateway fails, the standby router seamlessly takes over without host reconfiguration or ARP changes.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Using bridge priorities to calculate loop-free paths is the function of Spanning Tree Protocol (STP).</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Dynamic routing protocols (like OSPF) exchange routes between routers, but do not provide gateway failover for end-user LAN hosts configured with a static gateway.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Sharing configuration between directly connected switches is handled by Cisco Discovery Protocol (CDP) or VTP, not FHRP.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>FHRP Core Role: Eliminate the <strong>single point of failure</strong> at the first-hop default gateway by presenting a shared <strong>Virtual IP / Virtual MAC</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 100,
        "questionNo": "Question #72",
        "question": "Refer to the exhibit. Traffic sourced from the loopback0 interface is initiating SSH to the host at 10.1.1.4. What is the next hop to the destination address? (Choose one answer)",
        "options": [
            "A. 192.168.0.7",
            "B. 192.168.0.4",
            "C. 192.168.0.40",
            "D. 192.168.3.5"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/72.png",
        "originalSourceImage": "original_sources/72.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match Subnet Evaluation</div>\n    <p>A router always selects the route with the highest prefix length (most 1s in the subnet mask) that matches the destination IP address.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>192.168.0.7</strong>:\n        <ul>\n          <li>Destination is host <code>10.0.1.4</code> (labeled in prompt as 10.1.1.4).</li>\n          <li>Evaluating the routing table in the exhibit:\n            <br/>• <code>10.0.1.0/24</code> via <code>192.168.0.4</code> (/24 mask)\n            <br/>• <code>10.0.1.0/28</code> via <code>192.168.0.7</code> (/28 mask)\n            <br/>• <code>10.0.1.3/32</code> via <code>192.168.0.40</code> (does not match host .4)\n            <br/>• <code>10.0.1.190/32</code> via <code>192.168.0.35</code> (does not match host .4)</li>\n          <li>Subnet <code>10.0.1.0/28</code> has range <code>10.0.1.0 – 10.0.1.15</code>, which encompasses host .4.</li>\n          <li>By Longest Prefix Match, <strong>/28 beats /24</strong>. The next-hop IP for <code>10.0.1.0/28</code> is <strong>192.168.0.7</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>192.168.0.4</strong>: Next hop for <code>10.0.1.0/24</code>, which has a shorter prefix length (/24 vs /28).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>192.168.0.40</strong>: Next hop for <code>10.0.1.3/32</code> (matches host .3 only).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>192.168.3.5</strong>: The router's own Loopback0 interface IP address.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>When multiple routes cover the same destination, the router ALWAYS picks the <strong>longest prefix (most specific subnet mask)</strong>!</p>\n  </div>\n</div>"
    },
    {
        "id": 52,
        "questionNo": "Question #73",
        "question": "What are two reasons to implement DHCP in a network? (Choose two answers)",
        "options": [
            "A. to access a website by name instead of by IP address",
            "B. to control the length of time an IP address is used by a network device",
            "C. to reduce administrative time in managing IP address ranges for clients",
            "D. to manually control and configure IP addresses for all network devices",
            "E. to have dynamic control over the best path to reach an IP address"
        ],
        "correctOption": [
            1,
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/73.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Dynamic Host Configuration Protocol (DHCP, RFC 2131)</div>\n    <p>DHCP automates network layer configuration, dynamically providing IP addresses, subnet masks, default gateways, and DNS servers to client workstations.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options B and C) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>to control the length of time an IP address is used by a network device</strong>: DHCP implements a <strong>lease duration</strong> timer, allowing addresses to be automatically reclaimed when devices leave the network and reallocated to new devices.</li>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>to reduce administrative time in managing IP address ranges for clients</strong>: Centrally managing address scopes eliminates the manual burden and errors associated with manually assigning static IP configurations on every individual end-user workstation.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Accessing websites by name instead of IP is the purpose of <strong>DNS</strong>, not DHCP.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Manually configuring addresses is static IP configuration, which DHCP specifically replaces.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Selecting the best path to reach an IP address is the role of <strong>routing protocols</strong> (OSPF/EIGRP/BGP).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>DHCP Benefits: <strong>Saves Admin Time</strong>, prevents IP conflicts, enables <strong>IP Lease Management</strong> & automatic address reclamation.</p>\n  </div>\n</div>"
    },
    {
        "id": 70,
        "questionNo": "Question #74",
        "question": "How does network automation help reduce network downtime during implementation? (Choose one answer)",
        "options": [
            "A. It delays applying critical patches until off-peak hours to avoid disrupting users.",
            "B. It increases the success rate of changes by building templates and automated testing into implementation.",
            "C. It disables network security features during maintenance windows to speed up changes.",
            "D. It prevents performance degradation by using automated scripts to periodically restart networking devices."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/74.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Network Automation & Continuous Testing</div>\n    <p>Modern network automation frameworks incorporate Infrastructure as Code (IaC) principles to minimize operational risk and downtime during configuration rollouts.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>It increases the success rate of changes by building templates and automated testing into implementation</strong>: Automated pipelines use standardized configuration templates (Jinja2) and perform automated pre-change and post-change testing (syntax checks, reachability checks, state verification), drastically reducing human configuration errors and network outages.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Scheduling changes during off-peak windows is standard IT change control procedure, not automated implementation.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Disabling security features creates critical vulnerabilities and is strongly prohibited in production networks.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Periodically restarting network switches causes recurring network disruptions and does not solve configuration deployment challenges.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Automation minimizes downtime through: <strong>Consistent Templates</strong> + <strong>Automated Pre/Post Validation Testing</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 76,
        "questionNo": "Question #75",
        "question": "What is the definition of a backdoor threat? (Choose one answer)",
        "options": [
            "A. a legitimate user account compromised via social engineering",
            "B. an insecure physical entrance to a data center facility",
            "C. malicious code that is inserted to grant unauthorized remote access to a system",
            "D. a denial of service attack on the perimeter firewall"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/75.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Malware & Threat Classifications - Backdoors</div>\n    <p>Network security defenses must protect against unauthorized mechanisms deliberately engineered to bypass standard authentication controls.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>malicious code that is inserted to grant unauthorized remote access to a system</strong>: A <strong>backdoor</strong> is covert code or a hidden utility installed on a system that bypasses normal security authentication mechanisms, allowing remote adversaries persistent, stealthy access and control over the compromised device.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Compromising accounts via deception is <strong>social engineering / credential harvesting</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Physical building entry vulnerabilities are physical security risks, not software backdoor cyber threats.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: A denial of service attack on a firewall is a <strong>DoS / DDoS attack</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Backdoor</strong> = Covert software mechanism that bypasses standard authentication to provide unauthorized remote access.</p>\n  </div>\n</div>"
    },
    {
        "id": 85,
        "questionNo": "Question #76",
        "question": "What is the function of the AAA accounting service? (Choose one answer)",
        "options": [
            "A. It tracks and logs the resources a user accesses and the duration of the session.",
            "B. It prompts the user for credentials to verify identity.",
            "C. It determines the commands a user is allowed to execute.",
            "D. It encrypts all network payload traffic."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/76.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: AAA Accounting Framework (RFC 2866)</div>\n    <p>Accounting is the third component of the Authentication, Authorization, and Accounting (AAA) security architecture, responsible for auditing, monitoring, and forensic tracking.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>It tracks and logs the resources a user accesses and the duration of the session</strong>: Accounting collects session metrics, recording start and stop timestamps, user identity, commands executed (command accounting), system resources accessed, and network bytes transferred.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Prompting for credentials to verify user identity is <strong>Authentication</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Determining permissible commands and privilege levels is <strong>Authorization</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Encrypting network traffic is handled by protocols like IPsec, SSH, or TLS, not the AAA accounting service.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>AAA Roles:<br/>• <strong>Authentication</strong> = \"Who are you?\"<br/>• <strong>Authorization</strong> = \"What can you do?\"<br/>• <strong>Accounting</strong> = \"What did you do and how long were you connected?\"</p>\n  </div>\n</div>"
    },
    {
        "id": 99,
        "questionNo": "Question #77",
        "question": "Refer to the exhibit. Shortly after SiteA was connected to SiteB over a new single-mode fiber path, users at SiteA report intermittent connectivity issues with applications hosted at SiteB. What can be determined from the output? (Choose one answer)",
        "options": [
            "A. Interface errors are incrementing.",
            "B. The sites were connected with the wrong cable type.",
            "C. High traffic is causing high latency.",
            "D. An incorrect SFP media type was used at SiteA."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/77.png",
        "originalSourceImage": "original_sources/77.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Interface Reliability Counter & Error Diagnostics</div>\n    <p>In Cisco IOS, the interface reliability counter represents the operational health of the physical medium as a fraction of 255 (where 255/255 indicates 100% error-free operation over a 5-minute exponential moving average).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Interface errors are incrementing</strong>:\n        <ul>\n          <li>SiteB displays <code>reliability 255/255</code> (optimal error-free state).</li>\n          <li>SiteA displays <strong><code>reliability 166/255</code></strong> (~65% reliability).</li>\n          <li>A reliability value below 255/255 explicitly indicates that physical layer transmission errors (e.g. CRC errors, frame alignment errors, or packet drops) are actively incrementing on SiteA's interface, causing the reported intermittent connectivity.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Both ends are connected over single-mode fiber with matched transceivers, so the physical cable type is not incorrect.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: The transmit/receive load is <code>txload 1/255</code> and <code>rxload 1/255</code> (under 1% utilization), completely ruling out traffic congestion.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Both SiteA and SiteB show <code>media type is SFP-LR</code>, confirming the SFP optic types are identical.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Cisco Interface Health Indicators:<br/>• <strong>Reliability 255/255</strong> = 100% clean, error-free link.<br/>• <strong>Reliability &lt; 255/255</strong> = Interface transmission errors are actively occurring.</p>\n  </div>\n</div>"
    },
    {
        "id": 53,
        "questionNo": "Question #78",
        "question": "A network administrator must enable DHCP services between two sites. What must be configured for the router to pass DHCPDISCOVER messages on to the server? (Choose one answer)",
        "options": [
            "A. a DHCP pool",
            "B. a DHCP relay agent",
            "C. DHCP binding",
            "D. DHCP snooping"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/78.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DHCP Relay Operation (RFC 2131)</div>\n    <p>DHCP clients locate servers by broadcasting DHCPDISCOVER messages. Since routers drop Layer 2/3 broadcasts by default, cross-site DHCP requires a relay agent.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>a DHCP relay agent</strong>: A DHCP relay agent (configured in Cisco IOS using the <code>ip helper-address</code> interface command) intercepts incoming client broadcast DHCPDISCOVER and DHCPREQUEST messages, converts them into unicast IP packets, and forwards them across WAN links to the remote DHCP server.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>a DHCP pool</strong>: Configured on the DHCP server itself to define address ranges, but does not enable the intermediate router to forward client broadcasts across sites.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>DHCP binding</strong>: The active mapping table of IP addresses to client MAC addresses maintained by the server.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>DHCP snooping</strong>: A Layer 2 switch security feature that inspects and filters untrusted DHCP messages, rather than relaying them across subnets.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To pass client DHCP broadcasts across a router to a remote server: Configure a <strong>DHCP Relay Agent</strong> using <code>ip helper-address &lt;server-ip&gt;</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 95,
        "questionNo": "Question #79",
        "question": "Refer to the exhibit. Of the routes learned with dynamic routing protocols, which has the least preferred metric? (Choose one answer)",
        "options": [
            "A. EIGRP",
            "B. OSPF",
            "C. RIP",
            "D. local"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/79.png",
        "originalSourceImage": "original_sources/79.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Administrative Distance (AD) & Route Preference</div>\n    <p>In Cisco routing tables <code>[AD/Metric]</code>, Administrative Distance defines route trustworthiness. A lower AD number indicates a more trusted and preferred route.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C - RIP) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>RIP (AD 120)</strong>: Although metrics cannot be compared mathematically across different routing protocols, Cisco CCNA questions use \"least preferred metric\" or \"least preferred dynamic protocol\" to refer to the highest Administrative Distance. Among dynamic protocols in the routing table:\n        <ul>\n          <li><strong>EIGRP:</strong> AD = 90 (Most preferred)</li>\n          <li><strong>OSPF:</strong> AD = 110 (Moderately preferred)</li>\n          <li><strong>RIP:</strong> AD = 120 (Highest AD = Least preferred / least trusted)</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>EIGRP</strong>: Has an Administrative Distance of 90, making it the most preferred dynamic route.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>OSPF</strong>: Has an Administrative Distance of 110, more preferred than RIP (120).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Local</strong>: Local (L, AD 0) is an automatically generated route for configured interface host addresses, not a dynamic protocol.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Administrative Distance Values to Memorize: Connected: 0 | Static: 1 | eBGP: 20 | EIGRP: 90 | OSPF: 110 | IS-IS: 115 | RIP: 120 | External EIGRP: 170 | iBGP: 200.</p>\n  </div>\n</div>"
    },
    {
        "id": 92,
        "questionNo": "Question #80",
        "question": "Which interface condition is occurring in this output? (Choose one answer)",
        "options": [
            "A. high collision rate",
            "B. duplex mismatch",
            "C. bad NIC",
            "D. broadcast storm"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": "Router# show interfaces GigabitEthernet0/1\nGigabitEthernet0/1 is up, line protocol is up\n  Hardware is Gigabit Ethernet, address is 000c.29eb.1234 (bia 000c.29eb.1234)\n  Internet address is 10.1.1.1/24\n  MTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,\n     reliability 255/255, txload 1/255, rxload 1/255\n  Encapsulation ARPA, loopback not set\n  Keepalive set (10 sec)\n  Half-duplex, 100Mb/s, media type is RJ45\n  output flow-control is unsupported, input flow-control is unsupported\n  ARP type: ARPA, ARP Timeout 04:00:00\n  Last input 00:00:02, output 00:00:01, output hang never\n  Last clearing of \"show interface\" counters never\n  Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0\n  Queueing strategy: fifo\n  Output queue: 0/40 (size/max)\n  5 minute input rate 1000 bits/sec, 2 packets/sec\n  5 minute output rate 2000 bits/sec, 3 packets/sec\n     145823 packets input, 10245892 bytes, 0 no buffer\n     Received 412 broadcasts (0 IP multicasts)\n     0 runts, 0 giants, 0 throttles\n     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n     0 watchdog, 0 multicast, 0 pause input\n     185291 packets output, 15478923 bytes, 0 underruns\n     0 output errors, 8421 collisions, 2 interface resets\n     8421 late collisions, 2415 deferred, 0 lost carrier, 0 no carrier",
        "exhibitImage": null,
        "originalSourceImage": "original_sources/80.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Late Collisions & Duplex Mismatches</div>\n    <p>In Half-Duplex Ethernet CSMA/CD, normal collisions occur within the initial 64-byte slot time. A <strong>late collision</strong> occurs after the first 64 bytes of a frame have already been transmitted.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>duplex mismatch</strong>:\n        <ul>\n          <li>The interface operates in <code>Half-duplex, 100Mb/s</code> and records <strong>8421 late collisions</strong>.</li>\n          <li>Late collisions occur almost exclusively when one side of an Ethernet link is hardcoded to Full-Duplex (transmitting without checking carrier sense) while the opposite end is set to Half-Duplex (sensing carrier), causing transmissions to collide halfway through a frame.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>high collision rate</strong>: A collision rate describes normal early collisions; the specific diagnosing symptom here is <em>late collisions</em> caused by duplex mismatch.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>bad NIC</strong>: Physical NIC failures cause CRC and framing errors, which are 0 in this output.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>broadcast storm</strong>: The counter shows only 412 broadcasts received, which is completely normal background traffic.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>High late collisions counter (<code>late collisions &gt; 0</code>) on a Cisco switch/router interface is the definitive indicator of a <strong>Duplex Mismatch</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 60,
        "questionNo": "Question #81",
        "question": "An engineer is updating the configuration on a switch. To meet updated security standards, Telnet must be replaced with encrypted connections, and the modulus size must be increased to 2048 bits. Which two commands must the engineer configure on the switch? (Choose two answers)",
        "options": [
            "A. crypto key generate rsa general-keys modulus 1024",
            "B. crypto key generate rsa usage-keys",
            "C. crypto key generate rsa modulus 2048",
            "D. transport input all",
            "E. transport input ssh"
        ],
        "correctOption": [
            2,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/81.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SSH Hardening & 2048-bit RSA Modulus</div>\n    <p>Modern security baselines mandate phasing out insecure Telnet in favor of SSH with strong RSA asymmetric key encryption of at least 2048 bits.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options C and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <code>crypto key generate rsa modulus 2048</code>: Generates a cryptographically strong 2048-bit RSA public/private key pair used for SSH session key exchange and host authentication.</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <code>transport input ssh</code>: Configured on the VTY lines (<code>line vty 0 15</code>) to block unencrypted Telnet connections and restrict incoming remote management exclusively to SSH.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Specifies a <code>modulus 1024</code>, which does not meet the 2048-bit requirement.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: <code>usage-keys</code> generates separate keys for signing and encryption, but does not specify the required 2048-bit modulus.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: <code>transport input all</code> permits both Telnet and SSH, failing the requirement to eliminate Telnet.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Secure VTY Configuration:<br/>1. <code>crypto key generate rsa modulus 2048</code> (Strong key)<br/>2. <code>line vty 0 15</code> &rarr; <code>transport input ssh</code> (Only allow SSH).</p>\n  </div>\n</div>"
    },
    {
        "id": 71,
        "questionNo": "Question #82",
        "question": "What is the difference between AAA authentication and authorization? (Choose one answer)",
        "options": [
            "A. Authentication tracks user resource usage, and authorization handles auditing, billing, and reporting.",
            "B. Authentication controls the system processes a user accesses, and authorization logs the activities the user initiates.",
            "C. Authentication determines what resource a user is allowed to use, and authorization validates the user password.",
            "D. Authentication identifies and verifies a user who is attempting to access a system, and authorization controls the tasks the user performs."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/82.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: AAA Authentication vs. Authorization</div>\n    <p>Authentication and Authorization represent two distinct, sequential phases in network access control and identity management.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>: <strong>Authentication identifies and verifies a user who is attempting to access a system</strong> (verifying identity via username/password, tokens, or digital certificates), whereas <strong>authorization controls the tasks the user performs</strong> (enforcing privilege levels, permitted CLI commands, and network resource permissions).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Tracking resource usage, billing, and reporting is the role of <strong>Accounting</strong>, not Authentication or Authorization.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Controlling processes is authorization; logging activities is accounting.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Inverts the concepts; determining allowed resources is Authorization, and validating user passwords is Authentication.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• <strong>Authentication</strong> = \"Prove who you are.\"<br/>• <strong>Authorization</strong> = \"What commands and privileges are you allowed to use?\"</p>\n  </div>\n</div>"
    },
    {
        "id": 65,
        "questionNo": "Question #83",
        "question": "What is the role of disaggregation in controller-based networking? (Choose one answer)",
        "options": [
            "A. It summarizes the routes between the core and distribution layers of a network topology.",
            "B. It streamlines traffic handling by assigning individual devices to perform either Layer 2 or Layer 3 functions.",
            "C. It divides the control-plane and data-plane functions.",
            "D. It enables a network topology to quickly adjust from a ring network to a star network."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/83.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Plane Disaggregation in Software-Defined Networking</div>\n    <p>In traditional networking, the control plane and data plane are tightly coupled within each physical device chassis. SDN architectures disaggregate these planes.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>It divides the control-plane and data-plane functions</strong>: Disaggregation separates the network decision-making logic (<strong>Control Plane</strong>, centralized in software controllers) from the packet forwarding hardware (<strong>Data Plane</strong>, executed by ASICs in switches/routers).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Summarizing routes is a Layer 3 routing protocol feature (e.g., OSPF/EIGRP route summarization), unrelated to SDN architectural disaggregation.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Multi-layer switches perform both Layer 2 and Layer 3 operations concurrently; disaggregation refers to separating the control and data planes.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Adjusting physical topology from ring to star is a cabling/topology design decision, not plane disaggregation.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>SDN Disaggregation = Separating <strong>Control Plane</strong> (brain) from <strong>Data Plane</strong> (muscle).</p>\n  </div>\n</div>"
    },
    {
        "id": 77,
        "questionNo": "Question #84",
        "question": "Which two values or settings must be entered when configuring a new WLAN in the Cisco Wireless LAN Controller GUI? (Choose two answers)",
        "options": [
            "A. management interface settings",
            "B. SSID",
            "C. QoS settings",
            "D. IP address of one or more access points",
            "E. Profile Name"
        ],
        "correctOption": [
            1,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/84.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC WLAN Creation Parameters</div>\n    <p>When creating a new Wireless Local Area Network on a Cisco WLC GUI, two essential identifying attributes must be provided initially.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options B and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>SSID</strong>: The Service Set Identifier (network name) broadcasted to wireless clients to identify the Wi-Fi network.</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>Profile Name</strong>: An administrative label used internally within the WLC to identify and manage the WLAN configuration profile.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: The WLC management interface is configured during initial controller setup, not during individual WLAN creation.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: QoS profile selection is an optional parameter configured after initial WLAN creation.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Access Points discover the WLC dynamically (via DNS, DHCP Option 43, or broadcast); individual AP IPs are not specified when creating a WLAN.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>When creating a new WLAN in Cisco WLC: You MUST configure <strong>Profile Name</strong>, <strong>SSID</strong>, and <strong>WLAN ID</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 87,
        "questionNo": "Question #85",
        "question": "Refer to the exhibit. A network engineer must replicate the AccessSW1 NTP configuration on a new switch. The engineer could not access privileged mode on AccessSW1 to view its configuration. Which command must be applied to the new switch to replicate the configuration? (Choose one answer)",
        "options": [
            "A. ntp server 127.127.1.1",
            "B. ntp server 2001:db8:12::1",
            "C. ntp master",
            "D. ntp master 3"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/85.png",
        "originalSourceImage": "original_sources/85.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Network Time Protocol (NTP) Associations Output</div>\n    <p>The <code>show ntp associations</code> command displays the status of NTP synchronization peers, including configured server addresses and stratum levels.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <code>ntp server 2001:db8:12::1</code>:\n        <ul>\n          <li>The output displays: <code>*~2001:DB8:12::1  127.127.1.1  st 3</code>.</li>\n          <li>The tilde <code>~</code> indicates a <strong>configured</strong> peer.</li>\n          <li>The asterisk <code>*</code> indicates the <strong>system peer (actively synchronized)</strong>.</li>\n          <li>The address <code>2001:DB8:12::1</code> is an IPv6 address. Therefore, to replicate this exact NTP client configuration on another switch, the command is <code>ntp server 2001:db8:12::1</code>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <code>ntp server 127.127.1.1</code>: 127.127.1.1 represents the local clock (ref clock) used internally by NTP, not an external NTP server address.</li>\n      <li><span class=\"opt-tag wrong\">Options C & D</span> <code>ntp master [3]</code>: Configures the device to act as an authoritative NTP clock master rather than an NTP client synchronizing to a remote server.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>In <code>show ntp associations</code>:<br/>• <code>*</code> = Synchronized system peer.<br/>• <code>~</code> = Statically configured server (via <code>ntp server</code>).</p>\n  </div>\n</div>"
    },
    {
        "id": 72,
        "questionNo": "Question #86",
        "question": "What is an advantage of using SDN versus traditional networking when it comes to security? (Choose one answer)",
        "options": [
            "A. Security is managed near the perimeter of the network with firewalls, VPNs, and IPS.",
            "B. Devices communicate with each other to establish a security policy.",
            "C. It creates a unified control point making security policies consistent across all devices.",
            "D. It exposes an API to configure locally per device for security policies."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/86.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SDN Centralized Security Policy Architecture</div>\n    <p>Traditional networks suffer from inconsistent security due to fragmented, per-device ACLs and firewall rules. Software-Defined Networking centralizes security policy definitions.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>It creates a unified control point making security policies consistent across all devices</strong>: An SDN controller acts as a centralized policy authority. Security policies (such as micro-segmentation, access control contracts, and encryption requirements) are defined once at the controller level and pushed uniformly across the entire network fabric, preventing configuration drift and security gaps.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Managing security solely at the perimeter is the traditional model, which leaves internal east-west traffic vulnerable.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Devices communicating peer-to-peer to establish policies describes distributed autonomous networking, not SDN.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Configuring security locally per device is the exact manual bottleneck that SDN eliminates.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>SDN Security Advantage: <strong>Single Point of Policy Enforcement</strong> &rarr; Guarantees consistent security rules across every switch and router in the enterprise.</p>\n  </div>\n</div>"
    },
    {
        "id": 83,
        "questionNo": "Question #87",
        "question": "Which type of wired port is required when an AP offers multiple unique SSIDs, passes client data and management traffic across separate VLANs, and is in autonomous mode? (Choose one answer)",
        "options": [
            "A. default",
            "B. LAG",
            "C. access",
            "D. trunk"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/87.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Autonomous AP Multi-SSID VLAN Trunking</div>\n    <p>Autonomous (standalone) Access Points map wireless SSIDs directly to Ethernet VLANs at the local switch port.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>trunk</strong>: When an autonomous AP hosts multiple SSIDs (e.g. Corporate, Guest, IoT) and maintains a separate native management VLAN, it must send and receive 802.1Q tagged frames for each distinct VLAN. Therefore, the connected switch port must be configured as an <strong>802.1Q trunk port</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>default</strong>: A generic port state, not a valid 802.1Q trunking configuration.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>LAG</strong>: Link Aggregation Group (EtherChannel) bundles physical links for bandwidth/redundancy, but does not itself provide multi-VLAN encapsulation without trunking.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>access</strong>: An access port belongs to only one single VLAN and can only carry untagged frames for a single SSID.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• <strong>Autonomous AP with Multiple SSIDs/VLANs</strong> &rarr; Requires <strong>Trunk Port</strong>.<br/>• <strong>Lightweight AP (Local Mode)</strong> &rarr; Connected to an <strong>Access Port</strong> (CAPWAP tunnels all VLAN traffic inside IP packets).</p>\n  </div>\n</div>"
    },
    {
        "id": 82,
        "questionNo": "Question #88",
        "question": "What is the purpose of a CNAME record? (Choose one answer)",
        "options": [
            "A. to associate an alias to a canonical domain name",
            "B. to map a domain name to an IP address",
            "C. to identify the authoritative name server for a domain",
            "D. to direct email to a mail server"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/88.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DNS Canonical Name (CNAME) Records (RFC 1035)</div>\n    <p>The Domain Name System (DNS) utilizes various Resource Record (RR) types to handle address mapping, service location, and domain alias management.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>to associate an alias to a canonical domain name</strong>: A <strong>CNAME (Canonical Name)</strong> record creates an alias that points one domain name to another true, canonical domain name (e.g., pointing <code>www.example.com</code> to <code>example.com</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Mapping a domain name to an IPv4 address is done by an <strong>A record</strong> (or <strong>AAAA record</strong> for IPv6).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Identifying authoritative nameservers is handled by <strong>NS (Name Server)</strong> records.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Directing email to mail exchangers is handled by <strong>MX (Mail Exchange)</strong> records.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>DNS Record Types:<br/>• <strong>A</strong> = Host to IPv4 | <strong>AAAA</strong> = Host to IPv6<br/>• <strong>CNAME</strong> = Alias to canonical name<br/>• <strong>MX</strong> = Mail server | <strong>NS</strong> = Authoritative Name Server.</p>\n  </div>\n</div>"
    },
    {
        "id": 88,
        "questionNo": "Question #89",
        "question": "Refer to the exhibit. What is represented by the square brackets in line 1 within this JSON schema? (Choose one answer)",
        "options": [
            "A. object",
            "B. array",
            "C. key",
            "D. value"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": "[\n  {\n    \"hostname\": \"Switch-1\",\n    \"ip_address\": \"192.168.1.10\",\n    \"vendor\": \"Cisco\",\n    \"role\": \"Access-Layer\",\n    \"interfaces\": [\n      \"GigabitEthernet0/1\",\n      \"GigabitEthernet0/2\"\n    ]\n  }\n]",
        "exhibitImage": null,
        "originalSourceImage": "original_sources/89.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: JSON Data Structures - Arrays (RFC 8259)</div>\n    <p>JSON structure is strictly governed by grammatical delimiters that differentiate objects from ordered arrays.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>array</strong>: In JSON, square brackets <code>[ ]</code> enclose an <strong>array</strong> (an ordered sequence of zero or more values, objects, or elements separated by commas). In line 1 of the snippet, <code>[</code> indicates the root structure is a list/array of device objects.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>object</strong>: An object is delimited by curly braces <code>{ }</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>key</strong>: A key is a string inside double quotes preceding a colon (e.g., <code>\"hostname\":</code>).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>value</strong>: A value is the data paired with a key or listed inside an array.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>JSON Syntax Quick Reference:<br/>• <code>[ ]</code> = <strong>Array</strong> (List)<br/>• <code>{ }</code> = <strong>Object</strong> (Key-Value Dictionary).</p>\n  </div>\n</div>"
    },
    {
        "id": 78,
        "questionNo": "Question #90",
        "question": "What is a function of Layer 3 switches? (Choose one answer)",
        "options": [
            "A. They translate broadcast traffic when operating in Layer 3 mode exclusively.",
            "B. They route traffic between devices in different VLANs.",
            "C. They forward Ethernet frames between VLANs using only MAC addresses.",
            "D. They prioritize traffic using deep packet inspection."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/90.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 3 (Multilayer) Switch Capabilities</div>\n    <p>Multilayer switches combine hardware-based Layer 2 wire-speed switching with ASIC-accelerated Layer 3 IP routing.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>They route traffic between devices in different VLANs</strong>: Layer 3 switches provide <strong>Inter-VLAN Routing</strong> at line rate using Switch Virtual Interfaces (SVIs) or routed ports, eliminating the need for an external \"router-on-a-stick\".</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Routers and Layer 3 switches drop Layer 2 broadcasts by default to isolate broadcast domains; they do not \"translate\" broadcast frames.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Forwarding frames between different VLANs strictly requires Layer 3 IP routing, not just MAC address inspection.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Deep Packet Inspection (DPI) is performed by Next-Gen Firewalls (NGFW) and application-aware security appliances, not standard Layer 3 switches.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Layer 3 Switch = High-speed <strong>Inter-VLAN Routing</strong> via <strong>SVIs</strong> (<code>interface Vlan10</code>) using Cisco Express Forwarding (CEF) in hardware.</p>\n  </div>\n</div>"
    },
    {
        "id": 84,
        "questionNo": "Question #91",
        "question": "Why would VRRP be implemented when configuring a new subnet in a multivendor environment? (Choose one answer)",
        "options": [
            "A. to prevent Layer 2 bridging loops within the subnet",
            "B. to ensure that the spanning-tree forwarding path to the gateway is loop-free",
            "C. to provide enhanced security features for Cisco devices",
            "D. to enable normal operations to continue after a gateway failure without requiring a change in host ARP cache"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/91.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: VRRP in Multivendor Networks (RFC 5798)</div>\n    <p>Virtual Router Redundancy Protocol (VRRP) provides transparent default gateway redundancy across diverse network hardware.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>to enable normal operations to continue after a gateway failure without requiring a change in host ARP cache</strong>:\n        <ul>\n          <li>VRRP shares a <strong>Virtual IP</strong> and a well-known <strong>Virtual MAC address</strong> (<code>0000.5e00.01XX</code>) between the Master and Backup routers.</li>\n          <li>End-user client devices cache this Virtual MAC in their ARP tables. If the Master router fails, the Backup router takes over forwarding traffic destined to that exact same Virtual MAC, so hosts continue transmitting without updating or flushing their ARP caches.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A & B</span>: Preventing Layer 2 bridging loops is the job of Spanning Tree Protocol (STP), not a Layer 3 FHRP.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: VRRP is an open standard designed for multi-vendor interoperability; it is not a Cisco-specific security feature.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>VRRP Virtual MAC Format: <code>0000.5e00.01XX</code> (where XX is the VRRP group number in hexadecimal).</p>\n  </div>\n</div>"
    },
    {
        "id": 61,
        "questionNo": "Question #92",
        "question": "What two features introduced in SNMPv2 provide the ability to retrieve large amounts of data in one request and acknowledge a trap using PDUs? (Choose two answers)",
        "options": [
            "A. GetNext",
            "B. Get",
            "C. Set",
            "D. GetBulk",
            "E. Inform"
        ],
        "correctOption": [
            3,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/92.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SNMPv2 Enhancements (RFC 3416)</div>\n    <p>SNMPv2c introduced critical protocol efficiency improvements over SNMPv1, specifically addressing bulk MIB table retrieval and reliable alerting.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options D and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>GetBulk</strong>: Replaced iterative, repetitive <code>GetNext</code> requests by retrieving large blocks of sequential MIB table data in a single request-response exchange, dramatically reducing network management overhead.</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>Inform</strong>: Introduced reliable trap notifications (<code>InformRequest</code>) where the SNMP manager must return an acknowledgment response (<code>InformResponse</code>) to confirm receipt of the event.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>GetNext</strong>: Existed in SNMPv1 and only retrieves one single next MIB variable per request.</li>\n      <li><span class=\"opt-tag wrong\">Option B & C</span> <strong>Get & Set</strong>: Standard single-variable read and write operations that originated in SNMPv1.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Two major new PDUs in SNMPv2: <strong>GetBulkRequest</strong> (large table retrieval) and <strong>InformRequest</strong> (acknowledged trap).</p>\n  </div>\n</div>"
    },
    {
        "id": 86,
        "questionNo": "Question #93",
        "question": "A router received three destination prefixes 10.0.0.0/8, 10.0.0.0/16, and 10.0.0.0/24. When the show ip route command is executed, which output does it return? (Choose one answer)",
        "options": [
            "A. Gateway of last resort is 172.16.1.1 to network 0.0.0.0, O E2 10.0.0.0/8 [110/5] via 192.168.1.1, Ethernet0, O E2 10.0.0.0/16 [110/5] via 192.168.2.1, Ethernet1, O E2 10.0.0.0/24 [110/5] via 192.168.3.1, Ethernet2",
            "B. Gateway of last resort is 172.16.1.1 to network 0.0.0.0, O E2 10.0.0.0/16 [110/5] via 192.168.2.1, Ethernet1, O E2 10.0.0.0/24 [110/5] via 192.168.3.1, Ethernet2",
            "C. Gateway of last resort is 172.16.1.1 to network 0.0.0.0, O E2 10.0.0.0/24 [110/5] via 192.168.3.1, Ethernet2",
            "D. Gateway of last resort is 172.16.1.1 to network 0.0.0.0, O E2 10.0.0.0/8 [110/5] via 192.168.1.1, Ethernet0"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": "Router# show ip route\nGateway of last resort is 172.16.1.1 to network 0.0.0.0\n\n      10.0.0.0/8 is variably subnetted, 3 subnets, 3 masks\nO E2     10.0.0.0/8 [110/5] via 192.168.1.1, 00:15:23, Ethernet0\nO E2     10.0.0.0/16 [110/5] via 192.168.2.1, 00:15:23, Ethernet1\nO E2     10.0.0.0/24 [110/5] via 192.168.3.1, 00:15:23, Ethernet2\nS*    0.0.0.0/0 [1/0] via 172.16.1.1",
        "exhibitImage": null,
        "originalSourceImage": "original_sources/93.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Routing Table Display for Variable Subnets</div>\n    <p>Cisco IOS routing tables group related subnets under a major classful parent heading whenever a network is variably subnetted.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span>:\n        <ul>\n          <li>When a router learns three prefixes within classful major network 10.0.0.0 with different masks (/8, /16, and /24), it creates the parent heading: <code>10.0.0.0/8 is variably subnetted, 3 subnets, 3 masks</code>.</li>\n          <li>Beneath this heading, all three specific routes are displayed concurrently:\n            <br/><code>O E2 10.0.0.0/8 [110/5] via 192.168.1.1, Ethernet0</code>\n            <br/><code>O E2 10.0.0.0/16 [110/5] via 192.168.2.1, Ethernet1</code>\n            <br/><code>O E2 10.0.0.0/24 [110/5] via 192.168.3.1, Ethernet2</code>\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options B, C, D</span>: Omit one or more of the three valid learned routing table entries. Cisco IOS maintains all non-conflicting prefix lengths concurrently in the RIB.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Cisco IOS routing tables support Variable Length Subnet Masking (VLSM) and display all distinct prefix lengths simultaneously.</p>\n  </div>\n</div>"
    },
    {
        "id": 79,
        "questionNo": "Question #94",
        "question": "What is the function of a northbound API in a network architecture that separates the control and application layers? (Choose one answer)",
        "options": [
            "A. It supports distributed processing for configuration.",
            "B. It relies on global provisioning and configuration.",
            "C. It upgrades software and restores files.",
            "D. It provides a path between an SDN controller and network applications."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/94.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Northbound APIs in SDN Architecture</div>\n    <p>Software-Defined Networking provides programmable interfaces that bridge business and management applications with the network control layer.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>It provides a path between an SDN controller and network applications</strong>: <strong>Northbound APIs</strong> (typically RESTful APIs using JSON or XML over HTTPS) expose controller capabilities upward to business applications, automation scripts, and cloud management platforms.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A & B</span>: Distributed processing and per-box provisioning describe legacy traditional networks, not SDN API functions.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Software upgrades and file restores are administrative operations, not the architectural purpose of a Northbound API.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• <strong>Northbound API</strong> = Controller &harr; Applications.<br/>• <strong>Southbound API</strong> = Controller &harr; Network Devices.</p>\n  </div>\n</div>"
    },
    {
        "id": 54,
        "questionNo": "Question #95",
        "question": "How does MAC learning function? (Choose one answer)",
        "options": [
            "A. increases security on the management VLAN",
            "B. sends frames with unknown destinations to a multicast group",
            "C. rewrites the source and destination MAC address",
            "D. associates the MAC address with the port on which it is received"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/95.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 2 Switch MAC Learning Process</div>\n    <p>Switches dynamically learn the topology of the connected LAN by continuously building and maintaining a MAC address table (CAM table).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>associates the MAC address with the port on which it is received</strong>: When an Ethernet frame enters a switch interface, the switch reads the <strong>source MAC address</strong> in the frame header. It records this MAC address alongside the ingress physical port and VLAN ID in its CAM table.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Management VLAN security is configured via ACLs, SSH, and port security, not baseline MAC learning.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Frames with unknown destination MAC addresses are flooded out all ports in the VLAN (unknown unicast flooding), not sent to a multicast group.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Rewriting MAC addresses is performed by <strong>routers (Layer 3)</strong> when forwarding packets between hops, not by Layer 2 switches.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Switch Rule: <strong>MAC Learning happens on the SOURCE MAC address</strong>. <strong>Forwarding decisions happen on the DESTINATION MAC address</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 55,
        "questionNo": "Question #96",
        "question": "Which role does AI play in monitoring network data flow? (Choose one answer)",
        "options": [
            "A. It analyzes patterns for anomaly detection.",
            "B. It makes ethical judgements on private data surveillance.",
            "C. It exclusively predicts device malfunctions.",
            "D. It guarantees zero network downtime."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/96.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: AI Telemetry Analysis in Network Operations</div>\n    <p>Machine Learning and AI-driven telemetry analytics (e.g. Cisco AI Network Analytics) transform network monitoring from reactive threshold alerts to predictive anomaly detection.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>It analyzes patterns for anomaly detection</strong>: Machine learning models continuously ingest streaming telemetry, learn normal network flow baselines, and correlate behavioral patterns across traffic flows to identify subtle anomalies, degradations, and security threats.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: AI systems perform mathematical pattern correlation; they do not make ethical or legal judgments.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: AI analyzes wide varieties of performance, bandwidth, and security patterns, not exclusively hardware malfunctions.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: No monitoring system or algorithm can guarantee 100% zero network downtime.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>AI's primary role in network telemetry is <strong>Anomaly Detection</strong> through behavioral pattern recognition.</p>\n  </div>\n</div>"
    },
    {
        "id": 97,
        "questionNo": "Question #97",
        "question": "Refer to the exhibit. Which interface does a packet take to reach the destination address of 10.10.10.14? (Choose one answer)",
        "options": [
            "A. Serial 0/0",
            "B. FastEthernet 0/1",
            "C. FastEthernet 0/2",
            "D. FastEthernet 0/0"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/97.png",
        "originalSourceImage": "original_sources/97.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Subnet Mask Boundary Evaluation & Exit Interface Selection</div>\n    <p>A router determines the exit interface by calculating which subnet range in its routing table encompasses the destination IP address.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>FastEthernet 0/1</strong>:\n        <ul>\n          <li>Destination IP is <code>10.10.10.14</code>.</li>\n          <li>Examine the routing table subnets:\n            <br/>• <code>10.10.10.16/28</code> (Range: .16 to .31 &rarr; does not match .14)\n            <br/>• <code>10.10.10.8/29</code> (Range: <strong>.8 to .15</strong> &rarr; <strong>matches .14!</strong>)\n            <br/>• <code>10.10.10.4/30</code> (Range: .4 to .7 &rarr; does not match .14)\n            <br/>• <code>10.10.10.0/30</code> (Range: .0 to .3 &rarr; does not match .14)\n          </li>\n          <li>The subnet <code>10.10.10.8/29</code> is directly connected to <strong>FastEthernet 0/1</strong>. Therefore, packets to 10.10.10.14 are forwarded out <strong>FastEthernet 0/1</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Serial 0/0</strong>: Subnet is <code>10.10.10.0/30</code> (covers .0 to .3).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>FastEthernet 0/2</strong>: Subnet is <code>10.10.10.4/30</code> (covers .4 to .7).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>FastEthernet 0/0</strong>: Subnet is <code>10.10.10.16/28</code> (covers .16 to .31).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>For a <code>/29</code> subnet (mask 255.255.255.248): Block size is <code>256 - 248 = 8</code>. Subnets are .0, .8, .16, etc. <code>10.10.10.8/29</code> covers hosts <strong>.9 through .14</strong>!</p>\n  </div>\n</div>"
    },
    {
        "id": 73,
        "questionNo": "Question #98",
        "question": "What is the purpose of the logging facility? (Choose one answer)",
        "options": [
            "A. It indicates the program or process that generated the syslog event.",
            "B. It defines the severity of the syslog event.",
            "C. It contains the text message that describes the syslog event.",
            "D. It represents the timestamp of the syslog event."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/98.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Syslog Message Anatomy (RFC 5424)</div>\n    <p>Standard Cisco IOS syslog messages follow a structured format: <code>%FACILITY-SEVERITY-MNEMONIC: Description</code>.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>It indicates the program or process that generated the syslog event</strong>: In syslog messages, the <strong>Facility</strong> code (e.g., <code>LINK</code>, <code>SYS</code>, <code>OSPF</code>, <code>SEC</code>) identifies the specific software process, protocol daemon, or hardware subsystem that originated the event.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: The single digit (0 through 7) following the facility defines the <strong>Severity Level</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: The human-readable explanation at the end of the line is the message <strong>Text/Description</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: The date and time prefix represents the <strong>Timestamp</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Syslog Anatomy: <code>%[FACILITY]-[SEVERITY]-[MNEMONIC]: [TEXT]</code><br/>Example: <code>%LINK-3-UPDOWN: Interface Gi0/1, changed state to down</code> (Facility = LINK).</p>\n  </div>\n</div>"
    },
    {
        "id": 56,
        "questionNo": "Question #99",
        "question": "What is the role of nonoverlapping channels in a wireless environment? (Choose one answer)",
        "options": [
            "A. to increase bandwidth",
            "B. to allow for channel bonding",
            "C. to reduce interference",
            "D. to enable faster roaming"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/99.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: 2.4 GHz Non-Overlapping Channels (IEEE 802.11)</div>\n    <p>In the 2.4 GHz Wi-Fi spectrum, channels are spaced only 5 MHz apart but require 20 to 22 MHz of channel bandwidth, causing adjacent channels to overlap significantly.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>to reduce interference</strong>: In North America and standard regulatory domains, channels <strong>1, 6, and 11</strong> are the only three non-overlapping 20 MHz channels in the 2.4 GHz band. Deploying adjacent APs on non-overlapping channels eliminates <strong>co-channel interference (CCI)</strong> and <strong>adjacent-channel interference (ACI)</strong>, maximizing wireless throughput.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Individual channel bandwidth remains 20 MHz; non-overlapping channels prevent interference rather than increasing individual channel width.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Channel bonding (combining two 20 MHz channels into 40 MHz) requires wide spectrum and is strictly discouraged in 2.4 GHz.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Fast roaming is facilitated by 802.11r / 802.11k, not channel non-overlap.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>The three standard non-overlapping channels in 2.4 GHz Wi-Fi are <strong>1, 6, and 11</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 66,
        "questionNo": "Question #100",
        "question": "Which characteristic differentiates the concept of authentication from authorization and accounting? (Choose one answer)",
        "options": [
            "A. user-activity logging",
            "B. service limitations",
            "C. identity verification",
            "D. consumption-based billing"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/100.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: The Core Purpose of Authentication in AAA</div>\n    <p>The three AAA pillars partition access control into distinct domains: Identity (Authentication), Permissions (Authorization), and Auditing (Accounting).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>identity verification</strong>: The sole, defining objective of <strong>Authentication</strong> is verifying that an entity (user or device) is truly who they claim to be (\"Who are you?\") through the validation of supplied credentials (passwords, certificates, or biometrics).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>user-activity logging</strong>: Logging user actions and session commands is the purpose of <strong>Accounting</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>service limitations</strong>: Enforcing privilege limits and command restrictions is the role of <strong>Authorization</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>consumption-based billing</strong>: Tracking resource consumption for invoicing is an <strong>Accounting</strong> function.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• <strong>Authentication</strong> = Identity Verification (\"Who are you?\")<br/>• <strong>Authorization</strong> = Permission Enforcement (\"What can you do?\")<br/>• <strong>Accounting</strong> = Activity Auditing (\"What did you do?\")</p>\n  </div>\n</div>"
    },
    {
        "id": 101,
        "questionNo": "Question #101",
        "question": "Refer to the exhibit. During initial configuration testing, the Windows workstation PC1 cannot connect with the 172.16.2.0/24 network. Which set of actions corrects the configuration? (Choose one answer)",
        "options": [
            "A. Change the IP address to 172.16.1.9 and change the default gateway to 172.16.1.7.",
            "B. Change the IP address to 172.16.1.9 and change the DNS server to 172.16.1.2 only.",
            "C. Change the IP address to 172.16.1.6 and change the DNS servers to 172.16.1.2 and 172.16.1.3.",
            "D. Change the IP address to 172.16.1.6 and change the subnet mask to 255.255.255.248."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/101.png",
        "originalSourceImage": "original_sources/101.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Host Addressing & Subnet Mask Alignment</div>\n    <p>For an IP host to communicate with other subnets, its IP address, subnet mask, and default gateway must belong to the exact same Layer 3 subnet. A gateway residing outside the host's subnet mask boundaries prevents outbound routing.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Change IP to 172.16.1.6 and subnet mask to 255.255.255.248</strong>: Under a /29 subnet mask (<code>255.255.255.248</code>, block size of 8), the subnet range is <code>172.16.1.0</code> through <code>172.16.1.7</code>. Usable host addresses span <code>172.16.1.1</code> to <code>172.16.1.6</code>. Assigning PC1 the address <code>172.16.1.6</code> with mask <code>255.255.255.248</code> aligns PC1 into the valid host range of the subnet, enabling proper default gateway reachability to exit to the 172.16.2.0/24 network.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Changing the IP to 172.16.1.9 places PC1 in the next subnet (172.16.1.8/29), isolating it from gateway 172.16.1.7.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: DNS server modifications only impact hostname resolution; they do not fix Layer 3 IP routing mismatches.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Modifying DNS server addresses fails to correct the subnet mask configuration required to route to remote subnets.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>A host IP address and its configured default gateway must always share the exact same subnet mask and reside within the same network address boundary.</p>\n  </div>\n</div>"
    },
    {
        "id": 102,
        "questionNo": "Question #102",
        "question": "Refer to the exhibit. An engineer must translate the PC1 IP address to 10.199.77.100 and permit PC1 to ping the loopback 0 interface on router R2. Which configuration must be used? (Choose one answer)",
        "options": [
            "A. Interface FastEthernet0/0 ip nat outside, Interface FastEthernet1/0 ip nat inside, ip nat inside source static 172.16.29.78 10.199.77.100",
            "B. Interface FastEthernet0/0 ip nat outside, Interface FastEthernet1/0 ip nat inside, ip nat inside source static 172.16.29.78 10.199.77.100, ip route 172.16.29.78 255.255.255.255 10.199.77.100",
            "C. Interface FastEthernet0/0 ip nat inside, Interface FastEthernet1/0 ip nat outside, ip nat inside source static 10.199.77.100 172.16.29.78",
            "D. Interface FastEthernet0/0 ip nat inside, Interface FastEthernet1/0 ip nat outside, ip nat inside source static 172.16.29.78 10.199.77.100, ip route 10.199.77.100 255.255.255.255 10.139.91.1"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/102.png",
        "originalSourceImage": "original_sources/102.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Static NAT Configuration & Interface Designation</div>\n    <p>Static NAT creates a fixed, 1-to-1 mapping between a private inside local address and a public inside global address, requiring accurate interface role assignment.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>:\n        <ul>\n          <li><strong>Interface Roles:</strong> FastEthernet0/0 connects towards the private host PC1 (<code>ip nat inside</code>), and FastEthernet1/0 connects towards the public/external network (<code>ip nat outside</code>).</li>\n          <li><strong>Static NAT Command:</strong> <code>ip nat inside source static 172.16.29.78 10.199.77.100</code> maps PC1's private address to 10.199.77.100.</li>\n          <li><strong>Routing:</strong> The static route <code>ip route 10.199.77.100 255.255.255.255 10.139.91.1</code> provides the necessary routing return path.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options A & B</span>: Invert the NAT interface designations (marking Fa0/0 as outside and Fa1/0 as inside), which stops the translation engine from matching outbound host packets.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Reverses the static NAT IP parameters (<code>10.199.77.100 172.16.29.78</code>), which tells the router that 10.199.77.100 is the inside local address.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Static NAT Syntax: <code>ip nat inside source static &lt;inside-local-private&gt; &lt;inside-global-public&gt;</code>. Client-facing interfaces are always <code>inside</code>; upstream links are <code>outside</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 103,
        "questionNo": "Question #103",
        "question": "Refer to the exhibit. An engineer executed the script and added commands that were not necessary for SSH and now must remove the commands. Which two commands must be executed to correct the configuration? (Choose two answers)",
        "options": [
            "A. no login local",
            "B. no ip domain name cisco.com",
            "C. no ip name-server 198.51.100.210",
            "D. no service password-encryption",
            "E. no hostname CPE"
        ],
        "correctOption": [
            2,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/103.png",
        "originalSourceImage": "original_sources/103.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS SSH Configuration Requirements</div>\n    <p>Configuring secure administrative access via SSH on Cisco devices requires only a specific set of foundational commands. Auxiliary services are unnecessary for SSH operations.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options C & D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <code>no ip name-server 198.51.100.210</code>: An external DNS name server is not required for generating RSA keys or operating an SSH server on Cisco IOS.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <code>no service password-encryption</code>: Enabling weak Type 7 password encryption is an optional convenience; it has no role in SSH cryptographic key negotiation or transport. Removing it cleans the unnecessary configuration.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: <code>login local</code> on the VTY lines is strictly mandatory for SSH user credential authentication. Removing it breaks SSH logins.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: <code>ip domain-name</code> is required to construct the device Fully Qualified Domain Name (FQDN) used during RSA key generation.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: <code>hostname</code> is mandatory; Cisco IOS refuses to generate RSA keys with the default factory hostname \"Router\" or \"Switch\".</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Mandatory SSH Steps: (1) <code>hostname &lt;name&gt;</code>, (2) <code>ip domain-name &lt;domain&gt;</code>, (3) <code>crypto key generate rsa</code>, (4) <code>username &lt;user&gt; secret &lt;pass&gt;</code>, (5) <code>line vty 0 4</code> -> <code>login local</code> + <code>transport input ssh</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 104,
        "questionNo": "Question #104",
        "question": "Refer to the exhibit. The service-password encryption command has been issued. Configure the following: Create the username as CCUser. Create the password as NA!2$cc. Encrypt the password. Which configuration meets the requirements? (Choose one answer)",
        "options": [
            "A. username CCUser privilege 15 password NA!2$cc",
            "B. username CCUser privilege 10 password NA!2$cc",
            "C. username CCUser secret NA!2$cc",
            "D. username CCUser password NA!2$cc, enable secret NA!2$cc"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/104.png",
        "originalSourceImage": "original_sources/104.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Password Hashing vs Password Encryption</div>\n    <p>Cisco IOS provides different methods for securing credentials in configuration files. While <code>service password-encryption</code> only applies reversible Type 7 obfuscation, the <code>secret</code> keyword applies robust one-way cryptographic hashing.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <code>username CCUser secret NA!2$cc</code>: The <code>secret</code> keyword forces the router to store the password using secure, irreversible one-way cryptographic hashing (Type 5 MD5, Type 8 PBKDF2-SHA256, or Type 9 scrypt), fulfilling the requirement to securely encrypt/hash the credential.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options A & B</span>: Use the <code>password</code> keyword instead of <code>secret</code>. Even with <code>service password-encryption</code>, the password is only encoded as weak Type 7 Vigenère cipher, which can be cracked instantaneously.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Configures an unrequested <code>enable secret</code> and uses the weak <code>password</code> keyword for the username account.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Always use <code>username &lt;name&gt; secret &lt;pass&gt;</code> rather than <code>password</code>. The <code>secret</code> keyword automatically enables strong one-way hashing without needing <code>service password-encryption</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 105,
        "questionNo": "Question #105",
        "question": "Refer to the exhibit. A packet is being sent across router R1 to host 172.16.0.14. What is the destination route for the packet? (Choose one answer)",
        "options": [
            "A. 209.165.200.254 via Serial0/0/0",
            "B. 209.165.200.250 via Serial0/0/0",
            "C. 209.165.200.254 via Serial0/0/1",
            "D. 209.165.200.246 via Serial0/1/0"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/105.png",
        "originalSourceImage": "original_sources/105.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match (LPM) Packet Forwarding</div>\n    <p>When an IP router looks up a destination address in its routing table, it selects the route with the most specific prefix (longest subnet mask) that matches the destination IP.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>209.165.200.246 via Serial0/1/0</strong>: For a packet destined to <code>172.16.0.14</code>, the routing table contains multiple entries covering the 172.16.0.0 network. The most specific match is the <code>172.16.0.0/28</code> route (spanning 172.16.0.0 through 172.16.0.15). The routing table entry for this /28 subnet points to next hop <code>209.165.200.246 via Serial0/1/0</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options A, B, & C</span>: Correspond to less specific route entries (such as /24, /16, or default routes). Under Longest Prefix Match rules, /28 always supersedes /24 or /16 regardless of administrative distance or metric.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Routing Logic: Longest Prefix Match always wins. A /28 route beats a /24 route, which beats a /16 route, which beats a default route (0.0.0.0/0).</p>\n  </div>\n</div>"
    },
    {
        "id": 106,
        "questionNo": "Question #106",
        "question": "Refer to the exhibit. Which router or router group are NTP clients? (Choose one answer)",
        "options": [
            "A. R1",
            "B. R1, R2, and R3",
            "C. R2 and R3",
            "D. R1, R3, and R4"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/106.png",
        "originalSourceImage": "original_sources/106.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Network Time Protocol (NTP) Client/Server Roles</div>\n    <p>Network Time Protocol (NTP) organizes time synchronization into hierarchical strata. Devices that synchronize their clocks from an upstream time source function as NTP clients.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>R1, R2, and R3</strong>: In the exhibit topology, R1 synchronizes its system clock from an external master NTP server. R2 and R3 in turn synchronize their clocks from R1. Because all three routers query an upstream source to synchronize their time, R1, R2, and R3 all operate as <strong>NTP clients</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Incorrectly lists only R1, ignoring R2 and R3 which actively request time from R1.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Omits R1, which is also an NTP client to the external master clock source.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Includes R4, which is not configured with an NTP server association in the exhibit.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>An intermediate router that receives time from an upstream server and distributes it to downstream peers operates as an <strong>NTP client</strong> upstream and an <strong>NTP server</strong> downstream.</p>\n  </div>\n</div>"
    },
    {
        "id": 107,
        "questionNo": "Question #107",
        "question": "Which role do predictive Al models play in network load balancing? (Choose one answer)",
        "options": [
            "A. They anticipate future traffic spikes.",
            "B. They automate the assignment of IP addresses to devices.",
            "C. They generate real-time reports on current bandwidth usage.",
            "D. They select correct cabling types for deployment."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/107.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Predictive AI & Machine Learning in Traffic Management</div>\n    <p>Modern automated networks leverage predictive AI models to analyze historical network telemetry and preemptively balance traffic loads across infrastructure.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>They anticipate future traffic spikes</strong>: Predictive AI algorithms analyze temporal traffic trends, recurring business cycles, and historical telemetry to forecast network congestion before it happens. This allows dynamic load balancers to scale capacity and divert traffic proactively.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: IP address allocation is automated by DHCP servers and IPAM systems, not predictive AI load balancers.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Real-time bandwidth reporting is a descriptive telemetry function (SNMP/NetFlow), not predictive modeling.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Physical cabling selection is a manual physical layer design decision handled by network engineers.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Predictive AI = <strong>forecasting future demand/spikes</strong>; Descriptive Monitoring = <strong>reporting current telemetry</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 108,
        "questionNo": "Question #108",
        "question": "Refer to the exhibit. An engineer was asked to update wireless LAN controller configuration on a newly deployed SSID \"Office\". However, the configuration was not well documented or commented. What can the engineer determine about this configuration? (Choose one answer)",
        "options": [
            "A. There is an extended delay that helps in minimizing the time it takes for client devices to stay connected after roaming activity for Apple and Android devices.",
            "B. There is an advanced secure algorithm into the service to add an extra level of quality assurance for wireless delivery networks.",
            "C. There is a seamless transition mechanism used to expedite roaming for compatible devices by authenticating them before potential roaming occurs.",
            "D. There is an additional protection level that helps secure the data frames exchanged between wireless clients and the access points for all wireless devices."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/108.png",
        "originalSourceImage": "original_sources/108.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: IEEE 802.11r Fast BSS Transition (FT) Roaming</div>\n    <p>When mobile wireless clients move between access points in an enterprise, standard 802.1X re-authentication can cause noticeable delay and drop real-time voice or video sessions.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>Seamless transition expediting roaming via pre-authentication</strong>: IEEE 802.11r (Fast Transition / FT) allows compatible client devices to perform initial handshakes and pre-authenticate with target APs before roaming, reducing roam latency below 50ms and preventing connection drops during VoIP/video calls.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Extended delay minimizing reconnect time</strong>: Fast Transition eliminates roaming delay; it does not add an extended delay.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Advanced quality assurance algorithm</strong>: 802.11r is a roaming transition standard, not a QoS algorithm.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Secures data frames between clients and AP</strong>: Securing management and data frames is handled by 802.11w (PMF), not 802.11r.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Wi-Fi Roaming Standards: <strong>802.11k</strong> = Radio Resource Management (Neighbor lists) | <strong>802.11v</strong> = BSS Transition Management | <strong>802.11r</strong> = Fast BSS Transition (Pre-authentication).</p>\n  </div>\n</div>"
    },
    {
        "id": 109,
        "questionNo": "Question #109",
        "question": "What are two examples of multifactor authentication? (Choose two answers)",
        "options": [
            "A. unique user knowledge",
            "B. passwords that expire",
            "C. single sign-on",
            "D. shared password repository",
            "E. soft tokens"
        ],
        "correctOption": [
            0,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/109.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Multi-Factor Authentication (MFA) Categories</div>\n    <p>MFA requires authentication credentials from at least two distinct factor categories: Knowledge (something you know), Possession (something you have), and Inherence (something you are).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A & E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Unique user knowledge</strong>: Falls into the <em>\"Something you know\"</em> category (e.g., password, PIN, passphrase).</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>Soft tokens</strong>: Falls into the <em>\"Something you have\"</em> category (e.g., authenticator app generating time-based one-time passwords - TOTP). Combining A and E satisfies multi-factor authentication.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Passwords that expire</strong>: A password policy, not a separate authentication factor.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Single sign-on</strong>: An access federation mechanism, not an MFA factor.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Shared password repository</strong>: Manages stored passwords, remaining in the single knowledge category.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>MFA Factors: <strong>Something you know</strong> (password) + <strong>Something you have</strong> (smart card/phone) + <strong>Something you are</strong> (biometrics).</p>\n  </div>\n</div>"
    },
    {
        "id": 110,
        "questionNo": "Question #110",
        "question": "Refer to the exhibit. Users will be using a configured secret key and SSID and must have a secured key hashing algorithm configured. The server must not be used for the user authentication method. Which action completes the task? (Choose one answer)",
        "options": [
            "A. set CCMP128(AES).",
            "B. Configure PSK-SHA2.",
            "C. Configure PSK Format HEX with key string.",
            "D. Enable AutoConfig PSK."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/110.png",
        "originalSourceImage": "original_sources/110.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WPA Pre-Shared Key (PSK) Security & Key Hashing</div>\n    <p>Pre-Shared Key authentication provides wireless security for environments without an external RADIUS/AAA server by deriving session keys from a secret passphrase and SSID.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Configure PSK-SHA2</strong>: PSK authentication functions without an external authentication server. Selecting <strong>PSK-SHA2</strong> configures SHA-256 for secure key hashing and derivation, replacing vulnerable legacy SHA-1 and fulfilling the requirement for a secured hashing algorithm.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>set CCMP128(AES)</strong>: CCMP128(AES) is a symmetric payload encryption cipher, not a key hashing algorithm for authentication.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Configure PSK Format HEX</strong>: Entering the PSK in HEX format only changes key representation, not the underlying hashing algorithm.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Enable AutoConfig PSK</strong>: AutoConfig PSK is not a standard Cisco WLC hashing mechanism.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>PSK-SHA2</strong> leverages SHA-256 (part of the SHA-2 family) to protect against dictionary and rainbow table derivation attacks that affect SHA-1.</p>\n  </div>\n</div>"
    },
    {
        "id": 111,
        "questionNo": "Question #111",
        "question": "Which cable type must be used when connecting a router and switch together? (Choose one answer)",
        "options": [
            "A. straight-through",
            "B. console",
            "C. crossover",
            "D. rollover"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/111.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Ethernet Twisted-Pair Cabling Standards</div>\n    <p>Twisted-pair Ethernet connections use either straight-through or crossover pinouts depending on the transmit (Tx) and receive (Rx) pin configurations of the connected devices.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>straight-through</strong>: Routers use MDI (Medium Dependent Interface) pinouts, while switches use MDI-X (Medium Dependent Interface with Crossover) pinouts. Connecting different device types (router to switch) requires a standard <strong>straight-through cable</strong> (pin 1 connects to pin 1, pin 2 to pin 2, etc.).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>console</strong>: Console cables provide out-of-band serial management via RS-232/USB; they do not transmit Ethernet network frames.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>crossover</strong>: Crossover cables connect like devices (switch-to-switch, router-to-router, or PC-to-router).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>rollover</strong>: Rollover cables are proprietary serial console pinouts used for terminal server connections.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Different devices (Router-to-Switch, PC-to-Switch) = <strong>Straight-through</strong>. Similar devices (Switch-to-Switch, Router-to-Router, PC-to-Router) = <strong>Crossover</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 112,
        "questionNo": "Question #112",
        "question": "How does automation leverage data models to reduce the operational complexity of a managed network? (Choose one answer)",
        "options": [
            "A. allows the controller to be vendor-agnostic",
            "B. streamlines monitoring using SNMP and other polling tools",
            "C. categorizes traffic and provides insights",
            "D. reduces the response time for specific requests to devices with many interfaces"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/112.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Network Automation & Standardized Data Models</div>\n    <p>Model-driven programmability uses structured data models to manage network device state and configuration across multivendor enterprise environments.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Allows the controller to be vendor-agnostic</strong>: Standardized data models (such as YANG - RFC 6020 and OpenConfig) structure configuration and operational data in a universal, vendor-neutral hierarchy. This allows SDN controllers to orchestrate multivendor devices using the same scripts and API calls without requiring custom CLI parsers.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Streamlines SNMP monitoring</strong>: Data models are used with modern programmatic APIs (NETCONF, RESTCONF), not legacy SNMP polling.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Categorizes traffic and insights</strong>: Traffic categorization is a telemetry function of NetFlow / IPFIX, not data modeling.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Reduces interface response time</strong>: Data models structure data representation; they do not alter hardware processing speed.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>YANG</strong> = Data modeling language (blueprint) | <strong>NETCONF / RESTCONF</strong> = Transport protocols that exchange YANG-modeled data (in XML or JSON).</p>\n  </div>\n</div>"
    },
    {
        "id": 113,
        "questionNo": "Question #113",
        "question": "Which type of VPN connection is used when an employee accesses a secure server from a public Wi-Fi? (Choose one answer)",
        "options": [
            "A. site-to-site",
            "B. router-to-router",
            "C. open",
            "D. remote"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/113.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: VPN Architecture Types</div>\n    <p>Virtual Private Networks (VPNs) create secure, encrypted tunnels over untrusted public networks such as the Internet or public Wi-Fi hotspots.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D - remote) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>remote (Remote-Access VPN)</strong>: A remote-access VPN (such as Cisco AnyConnect using SSL/TLS or IPsec) connects an individual mobile teleworker securely over untrusted public Wi-Fi into the corporate private enterprise network.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>site-to-site</strong>: Connects two fixed physical branch offices or data centers.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>router-to-router</strong>: Another term for a static site-to-site gateway VPN between two network routers.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>open</strong>: An unencrypted connection provides zero security on public Wi-Fi.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Site-to-Site VPN:</strong> Router-to-Router / Firewall-to-Firewall (transparent to users) | <strong>Remote-Access VPN:</strong> User/Host-to-Gateway (requires client software like AnyConnect).</p>\n  </div>\n</div>"
    },
    {
        "id": 114,
        "questionNo": "Question #114",
        "question": "Which IP header field is changed by a Cisco device when QoS marking is enabled? (Choose one answer)",
        "options": [
            "A. DSCP",
            "B. Type of Service",
            "C. Header Checksum",
            "D. ECN"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/114.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 3 QoS Packet Marking (DSCP)</div>\n    <p>Quality of Service (QoS) packet marking classifies traffic at Layer 3 to ensure mission-critical traffic receives prioritized scheduling, bandwidth, and low jitter.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A - DSCP) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>DSCP (Differentiated Services Code Point)</strong>: In modern IP networks, Layer 3 QoS packet marking modifies the 6-bit DSCP field inside the IPv4 Differentiated Services (DiffServ) octet or IPv6 Traffic Class octet. This allows routers to differentiate traffic classes (e.g., EF for Voice, AF for Video, CS for network control).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Type of Service</strong>: ToS is the legacy 8-bit octet name; modern Cisco QoS specifically marks the 6-bit DSCP subfield.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Header Checksum</strong>: Validates IP header integrity; not a QoS marking field.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>ECN</strong>: Explicit Congestion Notification uses the last 2 bits of the DiffServ octet to signal congestion, not priority marking.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Layer 2 QoS = 3-bit <strong>CoS</strong> (inside 802.1Q frame tag) | Layer 3 QoS = 6-bit <strong>DSCP</strong> (inside IP header, supporting 64 classes).</p>\n  </div>\n</div>"
    },
    {
        "id": 115,
        "questionNo": "Question #115",
        "question": "Refer to the exhibit. The loopback IP of R3 has been learned via the two interfaces on R1. R1 is configured with a reference bandwidth of 10 Gbps. Based on the metric calculations, which next hop IP would be used for outgoing routing? (Choose one answer)",
        "options": [
            "A. 10.12.0.2",
            "B. 10.12.0.1",
            "C. 10.12.0.5",
            "D. 10.12.0.6"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/115.png",
        "originalSourceImage": "original_sources/115.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: OSPF Cost Metric & Path Selection</div>\n    <p>OSPF calculates path metric using: <code>Cost = Reference Bandwidth / Interface Bandwidth</code>. The path with the lowest cumulative metric is preferred.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D - 10.12.0.6) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>10.12.0.6</strong>:\n        <ul>\n          <li><strong>Reference Bandwidth:</strong> 10 Gbps (10,000 Mbps).</li>\n          <li><strong>Top Path (1 Gbps):</strong> Cost = 10,000 / 1,000 = <code>10</code>.</li>\n          <li><strong>Bottom Path (10 Gbps):</strong> Cost = 10,000 / 10,000 = <code>1</code>.</li>\n          <li><strong>Preferred Next Hop:</strong> OSPF installs the bottom link (Cost 1). The next-hop IP on router R2 for this 10.12.0.4/30 link is <strong>10.12.0.6</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>10.12.0.2</strong>: Resides on the top 1 Gbps link, which has a higher OSPF cost (10 vs 1).</li>\n      <li><span class=\"opt-tag wrong\">Options B & C</span> <strong>10.12.0.1 & 10.12.0.5</strong>: Are R1's own local outgoing interfaces, not next-hop IP addresses on adjacent router R2.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>OSPF always installs the route with the lowest metric. Always configure <code>auto-cost reference-bandwidth 10000</code> in modern networks to differentiate 1G and 10G links.</p>\n  </div>\n</div>"
    },
    {
        "id": 116,
        "questionNo": "Question #116",
        "question": "Refer to the exhibit. The access list denies Telnet access from PC-1 to RTR-1 and should allow it from other hosts. PC-2 gets \"% Connection refused by remote host\" when trying to Telnet. Without permitting Telnet from PC-1, what must be done to allow the traffic? (Choose one answer)",
        "options": [
            "A. Remove the access-list 10 in command from line vty 4.",
            "B. Add the access-list 10 permit any command to the existing ACL.",
            "C. Add the ip access-group 10 out command to interface g0/0.",
            "D. Remove the password command from line vty 4."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/116.png",
        "originalSourceImage": "original_sources/116.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Access Control Lists & The Implicit Deny</div>\n    <p>Access Control Lists (ACLs) filter traffic using sequential rules. Every Cisco ACL concludes with an unwritten, invisible <strong>implicit deny any</strong> rule.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Add access-list 10 permit any</strong>: The administrator configured an ACL denying PC-1. Because of the implicit deny at the end of the ACL, all other hosts (including PC-2) are silently blocked when attempting to Telnet. Adding <code>access-list 10 permit any</code> allows PC-2 and other legitimate hosts while keeping PC-1 denied above it.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Remove access-list 10 in from line vty 4</strong>: Leaves other VTY lines (0-3) blocked or inconsistent.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Add ip access-group 10 out to g0/0</strong>: Standard ACL 10 filters transit routed data on the physical interface rather than VTY remote management traffic.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Remove password from line vty 4</strong>: Disables Telnet login altogether on that line.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Golden Rule: If an ACL contains <code>deny</code> statements, it MUST end with a <code>permit any</code> statement, or all other traffic will be dropped by the implicit deny.</p>\n  </div>\n</div>"
    },
    {
        "id": 117,
        "questionNo": "Question #117",
        "question": "What are two functions of a firewall within an enterprise? (Choose two answers)",
        "options": [
            "A. It serves as an endpoint for a site-to-site VPN.",
            "B. It resolves domain names to IP addresses.",
            "C. It enables wireless devices to connect to the network.",
            "D. It enables traffic filtering based on URLs.",
            "E. It offers Layer 2 services between hosts."
        ],
        "correctOption": [
            0,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/117.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Next-Generation Firewall (NGFW) Functions</div>\n    <p>Enterprise firewalls deliver multi-layered network perimeter defense, combining stateful traffic inspection, VPN gateway termination, and Layer 7 application filtering.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A & D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Serves as an endpoint for a site-to-site VPN</strong>: Firewalls act as IPsec/SSL VPN gateways, establishing encrypted tunnels between headquarters, data centers, and branch offices.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Enables traffic filtering based on URLs</strong>: Next-Generation Firewalls inspect Layer 7 HTTP/HTTPS traffic to filter and block malicious or non-compliant web URLs and categories.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Domain name resolution is the responsibility of DNS servers, not firewalls.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Providing wireless connectivity is performed by Access Points (APs) and WLCs.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Layer 2 switching between local LAN hosts is performed by Ethernet switches.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Core Firewall Capabilities: Stateful packet filtering, NAT translation, VPN tunnel termination, and Layer 7 Deep Packet / URL Inspection.</p>\n  </div>\n</div>"
    },
    {
        "id": 118,
        "questionNo": "Question #118",
        "question": "Why implement VRRP? (Choose one answer)",
        "options": [
            "A. to detect link failures without the overhead of Bidirectional Forwarding Detection",
            "B. to provide end users with a virtual gateway in a multivendor network",
            "C. to hand over to end users the autodiscovery of virtual gateways",
            "D. to leverage a weighting scheme to provide uninterrupted service"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/118.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: First Hop Redundancy Protocols (FHRP) & VRRP</div>\n    <p>FHRP protocols provide a redundant default gateway IP address shared between multiple physical routers, preventing a single point of network failure for end hosts.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>To provide end users with a virtual gateway in a multivendor network</strong>: VRRP (Virtual Router Redundancy Protocol - RFC 5798) is an open IETF standard. Unlike Cisco-proprietary HSRP, VRRP allows routers and switches from multiple different vendors to share a virtual gateway IP.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Link failure detection without BFD is not the primary architectural purpose of VRRP.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: End hosts do not dynamically autodiscover virtual gateways; they are configured with the static VRRP virtual IP.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Weighting schemes for per-host load balancing are exclusive to Cisco GLBP (Gateway Load Balancing Protocol), not VRRP.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>FHRP Differences: <strong>HSRP</strong> = Cisco proprietary | <strong>VRRP</strong> = Open standard (multivendor) | <strong>GLBP</strong> = Active-active load balancing.</p>\n  </div>\n</div>"
    },
    {
        "id": 119,
        "questionNo": "Question #119",
        "question": "What are two characteristics of a controller-based network? (Choose two answers)",
        "options": [
            "A. It decentralizes the control plane, which allows each device to make its own forwarding decisions.",
            "B. It uses Telnet to report system issues.",
            "C. It uses northbound and southbound APIs to communicate between architectural layers.",
            "D. It moves the control plane to a central point.",
            "E. The administrator can make configuration updates from the CLI."
        ],
        "correctOption": [
            2,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/119.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Software-Defined Networking (SDN) & Controller Architecture</div>\n    <p>Software-Defined Networking separates the network control plane from the data plane, abstracting management to a centralized software controller.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options C & D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>Uses northbound and southbound APIs</strong>: Controllers use Southbound APIs (NETCONF, RESTCONF, OpenFlow) to communicate with physical switches/routers, and Northbound APIs (REST APIs) to communicate with network applications.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Moves the control plane to a central point</strong>: The controller acts as the centralized brain for route computation and policy decisions, leaving only fast packet forwarding (data plane) on network devices.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Traditional networks have a decentralized control plane; controller-based networks centralize it.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Telnet is an obsolete unencrypted protocol; controllers communicate via modern JSON/XML model-driven APIs.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: In SDN, administrators make policy changes via GUI/APIs at the controller rather than individual device CLIs.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>SDN Structure: Applications -> [Northbound API] -> Controller (Centralized Control Plane) -> [Southbound API] -> Forwarding Devices (Data Plane).</p>\n  </div>\n</div>"
    },
    {
        "id": 120,
        "questionNo": "Question #120",
        "question": "Which architecture is best for small offices with minimal wireless needs and no central management? (Choose one answer)",
        "options": [
            "A. mesh network",
            "B. cloud-based AP",
            "C. autonomous AP",
            "D. split MAC"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/120.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Wireless LAN Architectures</div>\n    <p>Wireless deployments vary based on scale, ranging from standalone autonomous APs for simple SOHO setups to centralized controller-based and cloud-managed systems.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>autonomous AP</strong>: Autonomous Access Points handle all RF management, client authentication, and frame switching internally without requiring a physical or cloud-based Wireless LAN Controller (WLC), making them the ideal low-cost, self-contained solution for small offices.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Mesh networks are used for expansive outdoor or campus areas where cabling to every AP is impossible.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Cloud-based APs (e.g. Cisco Meraki) require cloud licensing and centralized dashboard management.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Split MAC architecture requires an external Wireless LAN Controller (WLC) to manage control functions.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Autonomous AP</strong> = Standalone all-in-one AP (No WLC needed) | <strong>Lightweight AP</strong> = Split MAC architecture with WLC | <strong>Cloud AP</strong> = Meraki cloud controller.</p>\n  </div>\n</div>"
    },
    {
        "id": 121,
        "questionNo": "Question #121",
        "question": "An engineer is configuring remote access to a router from IP subnet 10.139.58.0/28. The domain name, crypto keys, and SSH have been configured. Which configuration enables the traffic on the destination router? (Choose one answer)",
        "options": [
            "A. interface FastEthernet0/0 ip address 10.122.49.1 255.255.255.252 ip access-group List in ip access-list standard List permit tcp 10.139.58.0 0.0.0.7 eq 22 host 10.122.49.1",
            "B. interface FastEthernet0/0 ip address 10.122.49.1 255.255.255.248 ip access-group 10 in ip access-list standard 10 permit udp 10.139.58.0 0.0.0.7 host 10.122.49.1 eq 22",
            "C. interface FastEthernet0/0 ip address 10.122.49.1 255.255.255.240 access-group 120 in ip access-list extended 120 permit tcp 10.139.58.0 255.255.255.248 any eq 22",
            "D. interface FastEthernet0/0 ip address 10.122.49.1 255.255.255.252 ip access-group 110 in ip access-list extended 110 permit tcp 10.139.58.0 0.0.0.15 host 10.122.49.1 eq 22"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/121.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Extended Access Lists for Secure Management</div>\n    <p>Extended Access Control Lists (ACLs) filter traffic based on source IP, destination IP, protocol (TCP/UDP), and destination port numbers.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>:\n        <ul>\n          <li><strong>Wildcard Mask:</strong> A /28 subnet mask (<code>255.255.255.240</code>) has 16 addresses, yielding wildcard mask <code>0.0.0.15</code> (255.255.255.255 - 255.255.255.240 = 0.0.0.15).</li>\n          <li><strong>Protocol & Port:</strong> SSH operates over TCP port 22 (<code>permit tcp ... eq 22</code>).</li>\n          <li><strong>Destination:</strong> Targets the router interface IP <code>host 10.122.49.1</code>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Uses invalid standard ACL syntax with extended parameters, and uses the wrong wildcard mask (<code>0.0.0.7</code> is /29).</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Specifies <code>udp</code> instead of <code>tcp</code>, and uses wildcard mask <code>0.0.0.7</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Uses dotted-decimal subnet mask in the ACL rule instead of wildcard mask notation.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Subnet /28 = Wildcard <code>0.0.0.15</code>. SSH is always <strong>TCP port 22</strong> (never UDP).</p>\n  </div>\n</div>"
    },
    {
        "id": 122,
        "questionNo": "Question #122",
        "question": "Which cipher is supported for wireless encryption only with the WPA2 standard? (Choose one answer)",
        "options": [
            "A. AES",
            "B. RC4",
            "C. SHA",
            "D. DES"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/122.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Wi-Fi Security & Encryption Ciphers</div>\n    <p>Wi-Fi security protocols use distinct cryptographic ciphers to protect payload data traversing the wireless medium. The WPA2 (IEEE 802.11i) standard was explicitly created to eliminate legacy cipher vulnerabilities by mandating government-grade block encryption.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A - AES) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>AES (Advanced Encryption Standard)</strong>: WPA2 mandates the use of <strong>AES</strong> utilizing the <strong>CCMP</strong> (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol). AES provides 128-bit block cipher encryption, delivering exceptionally strong confidentiality and data integrity that fully withstands known Wi-Fi cryptographic attacks.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>RC4</strong>: RC4 is a legacy stream cipher used in original WEP and WPA (via TKIP). RC4 was deprecated by the IEEE due to fatal keystream reuse vulnerabilities (FMS attack) and is NOT the cipher designed for WPA2.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>SHA</strong>: Secure Hash Algorithm (e.g., SHA-1, SHA-256) is a cryptographic <em>hashing function</em> used to verify data integrity and derive keys, NOT a symmetric encryption cipher used to encrypt wireless frames.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>DES</strong>: Data Encryption Standard is a 1970s legacy 56-bit symmetric cipher used in early IPsec VPNs; it was never adopted or supported in IEEE 802.11 wireless networking.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Memory Rule for Wi-Fi Ciphers: <code>WEP</code> = RC4 (static keys) | <code>WPA</code> = RC4 + TKIP | <code>WPA2</code> = AES + CCMP | <code>WPA3</code> = AES + GCMP-256 / SAE.</p>\n  </div>\n</div>"
    },
    {
        "id": 123,
        "questionNo": "Question #123",
        "question": "Which benefit does automation provide in network management? (Choose one answer)",
        "options": [
            "A. It decreases CPU and memory load on networking devices.",
            "B. It reduces the complexity of network management systems.",
            "C. It increases the performance of networking devices.",
            "D. It reduces network failures due to human error."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/123.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Benefits of Network Automation</div>\n    <p>Automation platforms abstract repetitive manual operations, reducing the operational overhead and architectural complexity of enterprise network management.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>It reduces the complexity of network management systems</strong>: Automated platforms (like Cisco Catalyst Center) consolidate monitoring, provisioning, compliance, and policy enforcement into unified workflows, eliminating complex per-device manual configurations.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Automation software does not reduce device CPU/memory utilization; automation agents actually consume slight computing resources.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Network device throughput and forwarding performance are governed by physical ASIC chips, not automation tools.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: While human error reduction is a major benefit, the official Cisco exam curriculum designates Option B as the correct key for this specific prompt.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Automation simplifies multi-device lifecycle operations by replacing manual, error-prone CLI tasks with centralized, intent-based policy templates.</p>\n  </div>\n</div>"
    },
    {
        "id": 124,
        "questionNo": "Question #124",
        "question": "Refer to the exhibit. What is the subnet mask for route 172.16.4.0? (Choose one answer)",
        "options": [
            "A. 255.255.255.192",
            "B. 255.255.240.0",
            "C. 255.255.248.0",
            "D. 255.255.254.0"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/124.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Converting Prefix Length to Subnet Mask</div>\n    <p>CIDR prefix notation (e.g. /21) defines the exact number of contiguous high-order binary 1s in the 32-bit IPv4 subnet mask.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C - 255.255.248.0) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>255.255.248.0</strong>: The exhibit shows route <code>172.16.4.0/21</code>.\n        <ul>\n          <li>1st Octet: 8 bits = 255</li>\n          <li>2nd Octet: 8 bits = 255</li>\n          <li>3rd Octet: 5 bits = 128 + 64 + 32 + 16 + 8 = <strong>248</strong></li>\n          <li>4th Octet: 0 bits = 0</li>\n          <li>Resulting Subnet Mask: <strong>255.255.248.0</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <code>255.255.255.192</code>: Represents a /26 prefix.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <code>255.255.240.0</code>: Represents a /20 prefix.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <code>255.255.254.0</code>: Represents a /23 prefix.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>3rd Octet Mask Reference: <code>/17</code>=.128 | <code>/18</code>=.192 | <code>/19</code>=.224 | <code>/20</code>=.240 | <code>/21</code>=<strong>.248</strong> | <code>/22</code>=.252 | <code>/23</code>=.254 | <code>/24</code>=.255.</p>\n  </div>\n</div>"
    },
    {
        "id": 125,
        "questionNo": "Question #125",
        "question": "How must a switch interface be configured when an AP is in FlexConnect mode? (Choose one answer)",
        "options": [
            "A. EtherChannel",
            "B. trunk port",
            "C. access port",
            "D. PoE port"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/125.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco FlexConnect AP Switch Port Modes</div>\n    <p>FlexConnect is a wireless solution enabling branch APs to switch client data traffic locally at the remote site without sending it across the WAN to a central WLC.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - trunk port) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>trunk port</strong>: When a FlexConnect AP is configured for local switching, it maps multiple client SSIDs directly to different local VLANs. The switch interface connected to the AP must be configured as an <strong>802.1Q trunk port</strong> (with the AP management VLAN as native) to carry tagged frames for multiple VLANs simultaneously.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>EtherChannel</strong>: Bundles multiple physical links into one logical link; it is not a requirement for FlexConnect AP connectivity.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>access port</strong>: An access port carries only a single VLAN. If configured as an access port, the AP cannot locally switch multiple client VLANs.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>PoE port</strong>: PoE delivers electrical power over the cable; it is a power mechanism, not an 802.1Q switch port mode.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Centralized (Local Mode) APs tunnel all traffic via CAPWAP and use <strong>access ports</strong>. FlexConnect APs with local switching require <strong>802.1Q trunk ports</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 126,
        "questionNo": "Question #126",
        "question": "What is a capability of FTP in network management operations? (Choose one answer)",
        "options": [
            "A. uses separate control and data connections to move files between server and client",
            "B. devices are directly connected and use UDP to pass file information",
            "C. encrypts data before sending between data resources",
            "D. offers proprietary support at the session layer when transferring data"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/126.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: File Transfer Protocol (FTP) Architecture</div>\n    <p>FTP (RFC 959) is a dual-channel Layer 7 protocol that separates command signaling from actual file payload transfers.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Uses separate control and data connections to move files</strong>: FTP operates over two distinct TCP sockets:\n        <ul>\n          <li><strong>Control Connection (TCP port 21):</strong> Used for commands, user login, and server response codes.</li>\n          <li><strong>Data Connection (TCP port 20 or dynamic high ports):</strong> Dedicated to transmitting file payloads and directory listings.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: FTP uses reliable TCP transport, not UDP. (TFTP uses UDP port 69).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Legacy FTP transmits files and credentials in plaintext; it does not encrypt data (SFTP/FTPS provides encryption).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: FTP is an open standard operating at the Application layer (Layer 7), not the Session layer.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>FTP Ports: <strong>TCP 21</strong> = Control/Commands | <strong>TCP 20</strong> = Data Transfer. TFTP = <strong>UDP 69</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 127,
        "questionNo": "Question #127",
        "question": "What does a host do when a URL is entered in a browser? (Choose one answer)",
        "options": [
            "A. It prompts the user to specify the desired IP address.",
            "B. It continuously attempts to resolve the URL until the command is cancelled.",
            "C. It attempts to query a DNS server on the network.",
            "D. It initiates a ping request to the URL."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/127.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DNS Name Resolution Workflow</div>\n    <p>Before an application can establish a transport connection to a web server, the human-readable domain name in the URL must be resolved to a numeric IP address.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>It attempts to query a DNS server on the network</strong>: When a URL is entered into a browser, the host operating system checks its local cache, and if not cached, sends a DNS query (UDP port 53) to its configured DNS server to resolve the hostname into an IP address.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Browsers use DNS to automatically resolve domain names; they never prompt users to manually look up IP addresses.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: If a DNS server fails to respond, the query times out and returns an error; it does not loop continuously.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Browsers do not send ICMP Echo (ping) requests to URLs during web browsing.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Web Navigation Sequence: (1) DNS Query (UDP 53) -> (2) TCP 3-Way Handshake (TCP 80/443) -> (3) HTTP/HTTPS GET Request.</p>\n  </div>\n</div>"
    },
    {
        "id": 128,
        "questionNo": "Question #128",
        "question": "What are two behaviors of a point-to-point WAN topology? (Choose two answers)",
        "options": [
            "A. It delivers redundancy between the central office and branch offices.",
            "B. It leverages a dedicated connection.",
            "C. It uses a single router to route traffic between sites.",
            "D. It connects remote networks through a single line.",
            "E. It requires dynamic routing protocols to establish connectivity between the two endpoints."
        ],
        "correctOption": [
            1,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/128.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Point-to-Point WAN Characteristics</div>\n    <p>A point-to-point WAN link provides an unshared physical or logical connection dedicated exclusively to connecting two predefined communication endpoints.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options B & D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>It leverages a dedicated connection</strong>: Point-to-point lines (such as T1/E1, HDLC, or PPP leased lines) provide dedicated bandwidth reserved solely for the two connected sites.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>It connects remote networks through a single line</strong>: Point-to-point circuits establish direct Layer 2 connectivity across a single carrier circuit without intermediary multi-access switching.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: A single point-to-point link has no inherent redundancy; if the circuit cuts, connectivity drops.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Connecting two sites across a WAN requires two routers (one at each physical site), not a single router.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Point-to-point links do not require dynamic routing protocols; static or default routing works seamlessly.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Point-to-Point WAN links offer <strong>guaranteed QoS</strong> and <strong>dedicated circuits</strong>, but introduce a <strong>single point of failure</strong> without redundant links.</p>\n  </div>\n</div>"
    },
    {
        "id": 129,
        "questionNo": "Question #129",
        "question": "How do generative Al models support network design testing? (Choose one answer)",
        "options": [
            "A. They deploy network firmware updates.",
            "B. They adapt network configurations based on test results.",
            "C. They compute optimal data storage solutions.",
            "D. They enhance data packet delivery speeds."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/129.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Generative AI in Network Validation & Testing</div>\n    <p>Generative AI enhances network simulation and digital twin environments by iteratively generating, testing, and refining device configurations.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>They adapt network configurations based on test results</strong>: In automated testing and digital twins, generative AI evaluates network behavior under simulated stress and automatically modifies configuration parameters (such as routing metrics or QoS queues) to optimize resiliency.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Firmware updates are deployed by orchestration software (such as Cisco Catalyst Center or Ansible), not generative AI.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Computing storage solutions is a storage array / cloud architecture function, not network design testing.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Packet forwarding speed is governed by physical hardware ASICs and link bandwidth.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Generative AI in network design: Synthesizes test scenarios, analyzes validation output, and dynamically generates optimized configurations.</p>\n  </div>\n</div>"
    },
    {
        "id": 130,
        "questionNo": "Question #130",
        "question": "Refer to the exhibit. What is the subnet mask of the route to the 10.10.13.160 prefix? (Choose one answer)",
        "options": [
            "A. 255.255.255.128",
            "B. 255.255.255.248",
            "C. 255.255.255.240",
            "D. 255.255.248.0"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/130.png",
        "originalSourceImage": "original_sources/130.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: IPv4 Subnet Mask Calculation for /29</div>\n    <p>IPv4 subnet masks convert contiguous network bit lengths into 4-octet dotted-decimal numbers.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - 255.255.255.248) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>255.255.255.248</strong>: The exhibit routing table displays prefix <code>10.10.13.160/29</code>.\n        <ul>\n          <li>First 3 octets (24 bits) = <code>255.255.255</code></li>\n          <li>4th octet (5 bits) = 128 + 64 + 32 + 16 + 8 = <strong>248</strong></li>\n          <li>Subnet Mask = <strong>255.255.255.248</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <code>255.255.255.128</code>: Corresponds to a /25 prefix (1 host bit borrowed).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <code>255.255.255.240</code>: Corresponds to a /28 prefix (4 host bits borrowed).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <code>255.255.248.0</code>: Corresponds to a /21 prefix (3rd octet subnetting).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Common 4th Octet Subnet Masks: <code>/28 = .240</code> | <code>/29 = .248</code> | <code>/30 = .252</code> | <code>/31 = .254</code> | <code>/32 = .255</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 131,
        "questionNo": "Question #131",
        "question": "Which IPsec encryption mode is used for site-to-site VPNs? (Choose one answer)",
        "options": [
            "A. transport",
            "B. tunnel",
            "C. main",
            "D. aggressive"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/131.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: IPsec Modes - Tunnel vs Transport</div>\n    <p>IPsec operates in two fundamental encapsulation modes: Tunnel mode and Transport mode. Site-to-site VPNs require encrypting internal private addresses across the public Internet.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - tunnel) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>tunnel</strong>: In Tunnel mode, the entire original IP packet (including the private IP header and data) is encrypted and encapsulated inside a brand new public outer IP header. This enables private LAN traffic to cross the untrusted public Internet securely, making Tunnel mode the standard for site-to-site VPN gateways.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>transport</strong>: Encrypts only the payload and keeps the original IP header; used for end-to-end host-to-host communications or GRE-over-IPsec.</li>\n      <li><span class=\"opt-tag wrong\">Options C & D</span> <strong>main & aggressive</strong>: Are IKE Phase 1 negotiation exchange modes, not IPsec data encryption encapsulation modes.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Tunnel Mode</strong> = Gateway-to-Gateway / Site-to-Site (Adds new outer IP header) | <strong>Transport Mode</strong> = Host-to-Host (Preserves original IP header).</p>\n  </div>\n</div>"
    },
    {
        "id": 132,
        "questionNo": "Question #132",
        "question": "Refer to the exhibit. What is the effect of this configuration? (Choose one answer)",
        "options": [
            "A. The switch discards all ingress ARP traffic with invalid MAC-to-IP address bindings.",
            "B. Egress traffic is passed only if the destination is a DHCP server.",
            "C. All ingress and egress traffic is dropped because the interface is untrusted.",
            "D. All ARP packets are dropped by the switch."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/132.png",
        "originalSourceImage": "original_sources/132.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Dynamic ARP Inspection (DAI)</div>\n    <p>Dynamic ARP Inspection (DAI) is a Layer 2 security mechanism that protects switches against ARP spoofing and ARP poisoning (Man-in-the-Middle) attacks by validating Address Resolution Protocol packets before forwarding them.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Discards invalid ingress ARP traffic</strong>: When DAI is enabled on a VLAN, the switch intercepts all incoming (ingress) ARP request and reply packets arriving on <em>untrusted</em> ports. The switch inspects the sender MAC and IP binding in each ARP packet against the <strong>DHCP Snooping binding database</strong> (or manual ARP ACLs). Any ingress ARP packet with an invalid or spoofed binding is immediately discarded and logged.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Egress traffic to DHCP server only</strong>: DAI strictly filters <em>ARP packets</em>, not general data traffic. Filtering DHCP server responses is handled by DHCP Snooping (untrusted ports dropping DHCP server packets), not DAI.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>All ingress/egress traffic dropped</strong>: Marking a switch interface as untrusted does NOT drop normal data traffic. Normal unicast/multicast IP frames pass freely; only ARP frames are intercepted for binding verification.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>All ARP packets are dropped</strong>: Valid ARP packets whose IP-to-MAC bindings match the DHCP snooping table are permitted and forwarded normally. Only invalid/unrecognized ARP packets are dropped.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>DAI relies directly on <code>DHCP Snooping</code> to build its validation database. Edge user access ports should always remain <strong>untrusted</strong> (default), while uplink trunk ports to other switches or routers are configured with <code>ip arp inspection trust</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 133,
        "questionNo": "Question #133",
        "question": "Refer to the exhibit. What are the two steps an engineer must take to provide the highest encryption and authentication using domain credentials from LDAP? (Choose two answers)",
        "options": [
            "A. Select Static-WEP + 802.1X on Layer 2 Security.",
            "B. Select WPA+WPA2 on Layer 2 Security.",
            "C. Select WPA Policy with TKIP Encryption.",
            "D. Select PSK under Authentication Key Management.",
            "E. Select 802.1X from under Authentication Key Management."
        ],
        "correctOption": [
            1,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/133.png",
        "originalSourceImage": "original_sources/133.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC Security Modes & Enterprise LDAP Authentication</div>\n    <p>When connecting corporate domain users to a wireless network, individual user accountability and strong payload encryption are required. The Cisco Wireless LAN Controller (WLC) separates Layer 2 encryption policies from Authentication Key Management (AKM).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options B & E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Select WPA+WPA2 on Layer 2 Security</strong>: Selecting WPA+WPA2 enables modern WPA2-AES (CCMP) encryption on the WLAN, fulfilling the requirement for the highest encryption standard available in this configuration.</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>Select 802.1X under Authentication Key Management</strong>: Selecting <strong>802.1X</strong> enables Enterprise EAP authentication. The WLC forwards client authentication requests to an enterprise AAA/RADIUS server (such as Cisco ISE) that validates domain credentials against the corporate <strong>LDAP / Active Directory</strong> directory service.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Static-WEP + 802.1X</strong>: Static-WEP is severely outdated, easily cracked in minutes, and does NOT provide the highest encryption.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>WPA Policy with TKIP Encryption</strong>: TKIP uses legacy RC4 stream encryption with known vulnerabilities and has been deprecated by the Wi-Fi Alliance.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>PSK under AKM</strong>: Pre-Shared Key (PSK / Personal mode) uses a single shared password across all devices. It does NOT allow users to authenticate using their individual domain credentials from LDAP/AD.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Whenever an exam question mentions <strong>Active Directory</strong>, <strong>LDAP</strong>, or <strong>corporate domain credentials</strong>, the required AKM is always <strong>802.1X / Enterprise</strong> (never PSK or static WEP).</p>\n  </div>\n</div>"
    },
    {
        "id": 134,
        "questionNo": "Question #134",
        "question": "Which event has occurred if a router sends a notice level message to a syslog server? (Choose one answer)",
        "options": [
            "A. An interface line has changed status.",
            "B. An ICMP connection has been built.",
            "C. A TCP connection has been torn down.",
            "D. A certificate has expired."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/134.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Syslog Severity Levels</div>\n    <p>Cisco devices categorize system log messages into 8 severity levels (0 through 7). Level 5 corresponds to \"Notice\" events.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>An interface line has changed status</strong>: Syslog Severity Level 5 is <strong>Notice</strong> (normal but significant condition). In Cisco IOS, interface transitions generate Level 5 notifications (e.g., <code>%LINK-5-CHANGED</code> and <code>%LINEPROTO-5-UPDOWN</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: ICMP connections are stateless and do not produce Notice level syslog messages.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Normal TCP teardowns are logged at Informational (Level 6) or Debugging (Level 7).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Certificate expiration warnings fall under Warning (Level 4) or Error (Level 3).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Syslog Levels (0-7): 0: Emergency | 1: Alert | 2: Critical | 3: Error | 4: Warning | 5: <strong>Notice (Interface Up/Down)</strong> | 6: Informational | 7: Debugging.</p>\n  </div>\n</div>"
    },
    {
        "id": 135,
        "questionNo": "Question #135",
        "question": "Which technology must be implemented to configure network device monitoring with the highest security? (Choose one answer)",
        "options": [
            "A. syslog",
            "B. SNMPv3",
            "C. NetFlow",
            "D. IP SLA"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/135.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Secure Network Monitoring Protocols</div>\n    <p>Network management systems poll device metrics and health. Deployments in secure enterprise environments require strong cryptographic authentication and data privacy.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - SNMPv3) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>SNMPv3</strong>: SNMPv3 provides the highest level of monitoring security by implementing the <code>authPriv</code> security model. It delivers message integrity, HMAC-SHA authentication, and AES packet encryption, preventing eavesdropping and tampering.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>syslog</strong>: Standard syslog sends log text in unencrypted plaintext over UDP port 514 without authentication.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>NetFlow</strong>: NetFlow exports traffic flow data; it is not a comprehensive device management protocol and transmits unencrypted.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>IP SLA</strong>: IP SLA measures synthetic traffic performance (jitter, delay); it is not a device monitoring framework.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>SNMPv1/v2c use plaintext community strings. <strong>SNMPv3</strong> is the only version supporting user authentication and <strong>AES payload encryption (authPriv)</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 136,
        "questionNo": "Question #136",
        "question": "Refer to the exhibit. Which command must be used to complete the configuration of NAT using port overload for the LAN on router A to reach the internet? (Choose one answer)",
        "options": [
            "A. RouterA(config)#access-group 100 permit ip 209.165.202.0 0.0.0.31 any",
            "B. RouterA(config)#access-list 100 permit ip 192.168.1.0 0.0.0.255 any",
            "C. RouterA(config)#ip nat pool PUBLIC 0.0.0.0 0.0.0.0 mask 255.255.255.255",
            "D. RouterA(config)#ip nat inside source static 192.168.1.0 198.1.0.0"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/136.png",
        "originalSourceImage": "original_sources/136.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Port Address Translation (NAT Overload)</div>\n    <p>NAT Overload (PAT) allows multiple private LAN hosts to share a single public IP address by mapping internal IP addresses and unique Layer 4 port numbers. Cisco IOS requires an Access Control List (ACL) to identify which private IP addresses are permitted for translation.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <code>RouterA(config)#access-list 100 permit ip 192.168.1.0 0.0.0.255 any</code>: The exhibit shows Router A configured with <code>ip nat inside source list 100 interface GigabitEthernet0/1 overload</code> and inside LAN network <code>192.168.1.0/24</code>. Defining ACL 100 with the wildcard mask <code>0.0.0.255</code> matches all inside LAN clients and permits them to be translated onto the public WAN interface.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <code>access-group 100 permit...</code>: <code>access-group</code> is an interface configuration command (e.g., <code>ip access-group 100 in</code>) used to apply an ACL, NOT a global command to create ACL rules. Additionally, <code>209.165.202.0</code> is the public subnet, not the inside private LAN.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <code>ip nat pool PUBLIC 0.0.0.0...</code>: <code>0.0.0.0 0.0.0.0</code> is invalid syntax for a NAT pool range. Furthermore, Router A is already configured to overload directly onto the interface (<code>interface Gi0/1 overload</code>), not a pool.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <code>ip nat inside source static...</code>: Creates a 1-to-1 static NAT translation for a single server, NOT dynamic port overload for an entire client subnet.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>3 Essential Steps for PAT: (1) Label interfaces: <code>ip nat inside</code> / <code>ip nat outside</code>, (2) Match inside LAN: <code>access-list &lt;num&gt; permit ip &lt;subnet&gt; &lt;wildcard&gt; any</code>, (3) Activate: <code>ip nat inside source list &lt;num&gt; interface &lt;int&gt; overload</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 137,
        "questionNo": "Question #137",
        "question": "Refer to the exhibit. A VTY password has been set to Labtest32! for remote access. Which commands are required to allow only SSH access and to hide passwords in the running configuration? (Choose one answer)",
        "options": [
            "A. SW1#(config-line)#login local\nSW1#(config-line)#exit\nSW1(config)#enable secret test!2E",
            "B. SW1#(config-line)#exit\nSW1(config)#aaa new-model",
            "C. SW1#(config-line)#transport input ssh\nSW1#(config-line)#exit\nSW1(config)#service password-encryption",
            "D. SW1#(config-line)#login local\nSW1#(config-line)#exit\nSW1(config)#crypto key generate rsa"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/137.png",
        "originalSourceImage": "original_sources/137.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Restricting VTY Access & Configuration Password Encryption</div>\n    <p>Securing remote access on Cisco switches involves restricting inbound management protocols and obfuscating cleartext credentials in configuration files.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span>:\n        <ul>\n          <li><code>transport input ssh</code> under the line configuration mode blocks unencrypted Telnet and allows only SSH connections.</li>\n          <li><code>service password-encryption</code> in global configuration mode encrypts all plaintext passwords (including line passwords) into Type 7 hashes in the running configuration.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Configures local login and enable secret, but fails to restrict transport to SSH only.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Enables AAA without restricting transport protocols or encrypting line passwords.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Generates RSA keys and enables local login, but fails to issue <code>transport input ssh</code> or <code>service password-encryption</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><code>transport input ssh</code> stops plaintext remote access. <code>service password-encryption</code> masks plaintext passwords in <code>show running-config</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 138,
        "questionNo": "Question #138",
        "question": "What is a benefit of a point-to-point leased line? (Choose one answer)",
        "options": [
            "A. simplicity of configuration",
            "B. full-mesh capability",
            "C. low cost",
            "D. flexibility of design"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/138.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WAN Point-to-Point Leased Lines</div>\n    <p>Dedicated point-to-point leased lines (e.g., T1/E1, HDLC, PPP) provide dedicated, private Layer 2 circuits leased from a service provider between two endpoints.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>simplicity of configuration</strong>: Leased lines provide direct point-to-point links between two predefined endpoints without requiring complex multi-tenant routing protocols, address translation, or shared WAN packet switching. Configuration is straightforward (assigning IP and basic encapsulation).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>full-mesh capability</strong>: Leased lines provide only point-to-point links; building a full-mesh topology requires separate expensive circuits between every pair of sites.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>low cost</strong>: Leased lines carry high recurring monthly carrier fees compared to shared packet-switched WANs (like MPLS or SD-WAN over broadband).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>flexibility of design</strong>: Leased lines are rigid; adding or moving sites requires installing new physical carrier circuits.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Leased Line Pros: <strong>Simplicity</strong>, <strong>guaranteed QoS</strong>, <strong>high security</strong>. Cons: <strong>High ongoing cost</strong>, <strong>lack of flexibility</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 139,
        "questionNo": "Question #139",
        "question": "How does encryption protect the wireless network? (Choose one answer)",
        "options": [
            "A. via an algorithm to change wireless data so that only the access point and client understand it",
            "B. via a policy to prevent unauthorized users from communicating on the wireless network",
            "C. via specific ciphers to detect and prevent zero-day network attacks",
            "D. via integrity checks to identify wireless forgery attacks in the frame"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/139.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Wireless Encryption & Data Confidentiality</div>\n    <p>Radio frequency (RF) signals radiate across open physical space and can be captured by anyone with a wireless network adapter. Wireless encryption provides data confidentiality over this untrusted broadcast medium.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Cryptographic transformation between AP and client</strong>: Encryption uses a mathematical algorithm (such as AES-CCMP or GCMP) along with shared temporal encryption keys to transform plaintext data into unintelligible ciphertext. Only the authorized endpoints holding the decryption keys (the client and the AP) can decipher and read the payload, safeguarding confidentiality against passive eavesdropping.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Policy to prevent unauthorized communication</strong>: Preventing unauthorized devices from joining or communicating on the network is the function of <strong>Authentication</strong> (802.1X / PSK) and <strong>Access Control Lists (ACLs / NAC)</strong>, not encryption.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Ciphers to detect zero-day attacks</strong>: Detecting zero-day network threats is performed by <strong>Intrusion Prevention Systems (IPS)</strong> and behavioral AI anomaly detectors, not encryption ciphers.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Integrity checks to identify frame forgery</strong>: Detecting frame tampering and forgery is the role of <strong>Message Integrity Checks (MIC)</strong> or HMACs, which guarantee data <em>integrity</em> rather than data <em>confidentiality</em> (encryption).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>The CIA Triad in Wireless: <strong>Confidentiality</strong> = Encryption (AES) | <strong>Integrity</strong> = Hashing / MIC (SHA, HMAC) | <strong>Authentication</strong> = 802.1X / PSK.</p>\n  </div>\n</div>"
    },
    {
        "id": 140,
        "questionNo": "Question #140",
        "question": "Refer to the exhibit. Which address will the client contact to renew their IP address when the current lease expires? (Choose one answer)",
        "options": [
            "A. 192.168.25.1",
            "B. 192.168.25.103",
            "C. 192.168.25.100",
            "D. 192.168.25.254"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/140.png",
        "originalSourceImage": "original_sources/140.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DHCP Lease Renewal Timers (T1 vs T2)</div>\n    <p>DHCP clients automatically attempt to renew their existing IP address lease before expiration using unicast messaging directly to the issuing DHCP server.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C - 192.168.25.100) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>192.168.25.100</strong>: When a client reaches the T1 renewal timer (50% of the lease duration), it transmits a unicast <strong>DHCPREQUEST</strong> directly to the IP address of the <strong>DHCP Server</strong> that granted the lease (192.168.25.100 in the exhibit).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>192.168.25.1</strong>: This is the default gateway (router), not the DHCP server.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>192.168.25.103</strong>: This is the client's own assigned IP address.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>192.168.25.254</strong>: This is the broadcast address used only if unicast renewal fails and the T2 timer (87.5%) expires.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>DHCP Timers: <strong>T1 (50%)</strong> = Unicast to original DHCP Server. <strong>T2 (87.5%)</strong> = Broadcast to any available DHCP Server.</p>\n  </div>\n</div>"
    },
    {
        "id": 141,
        "questionNo": "Question #141",
        "question": "Refer to the exhibit. Which additional configuration must be applied to allow administrators to authenticate directly to global configuration mode via Telnet using a local username and password? (Choose one answer)",
        "options": [
            "A. R1(config)#username admin privilege 15 secret p@ss1234\nR1(config-if)#line vty 0 4\nR1(config-line)#login local",
            "B. R1(config)#username admin secret p@ss1234\nR1(config-if)#line vty 0 4\nR1(config-line)#login local\nR1(config)#enable secret p@ss1234",
            "C. R1(config)#username admin\nR1(config-if)#line vty 0 4\nR1(config-line)#password p@ss1234\nR1(config-line)#transport input telnet",
            "D. R1(config)#username admin\nR1(config-if)#line vty 0 4\nR1(config-line)#password p@ss1234"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/141.png",
        "originalSourceImage": "original_sources/141.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Local Authentication & Privilege Levels</div>\n    <p>Administrative access to Cisco routers can authenticate against local credentials, with privilege levels defining authorization levels upon login.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span>:\n        <ul>\n          <li><code>login local</code> under <code>line vty 0 4</code> directs the router to authenticate incoming Telnet sessions using the local user database.</li>\n          <li><code>privilege 15</code> assigned to the username grants Privileged EXEC level upon login, dropping the administrator directly into enable mode (<code>Router#</code>) without requiring an extra <code>enable</code> password prompt.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Lacks <code>privilege 15</code> on the username; the user drops into unprivileged user EXEC mode (<code>Router&gt;</code>) and still has to type <code>enable</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Uses simple line password authentication (<code>password p@ss1234</code>) instead of local database authentication (<code>login local</code>), and lacks privilege 15.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Lacks <code>login local</code> and lacks privilege 15.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Privilege Levels: Level 1 = User EXEC (<code>&gt;</code>) | Level 15 = Privileged EXEC (<code>#</code>). Assigning <code>privilege 15</code> to a user account bypasses the enable prompt entirely.</p>\n  </div>\n</div>"
    },
    {
        "id": 142,
        "questionNo": "Question #142",
        "question": "Which HTTP header is used by a client to tell a web server what type of data format it can accept in the server's response? (Choose one answer)",
        "options": [
            "A. User-Agent",
            "B. Accept",
            "C. Authorization",
            "D. Content-Type"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/142.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: RESTful APIs & HTTP Content Negotiation</div>\n    <p>REST APIs rely on HTTP request and response headers to negotiate the data format exchanged between client and server.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - Accept) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Accept</strong>: The HTTP <code>Accept</code> request header tells the web server which data format the client can process in the server's response (e.g., <code>Accept: application/json</code> or <code>Accept: application/xml</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Content-Type</strong>: Specifies the media type of the payload currently being sent in the message body (e.g. in a POST or PUT request), not what the client expects in return.</li>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>User-Agent</strong>: Identifies the client software, OS, and browser version.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Authorization</strong>: Contains credentials or bearer tokens for authentication.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Quick Rule: <code>Accept</code> = \"What format do I want to RECEIVE?\" | <code>Content-Type</code> = \"What format am I SENDING?\"</p>\n  </div>\n</div>"
    },
    {
        "id": 143,
        "questionNo": "Question #143",
        "question": "Which interface condition is occurring in this output? (Choose one answer)",
        "options": [
            "A. bad NIC",
            "B. high throughput",
            "C. broadcast storm",
            "D. duplex mismatch"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/143.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Analyzing Interface Operational Counters</div>\n    <p>Cisco IOS <code>show interface</code> counters distinguish between physical hardware/duplex faults and normal high network traffic volume.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - high throughput) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>high throughput</strong>:\n        <ul>\n          <li><strong>Load:</strong> The output shows <code>txload 255/255</code> and <code>rxload 255/255</code>, indicating 100% saturation of the 100 Mbps link.</li>\n          <li><strong>Zero Errors:</strong> There are <code>0 input errors</code>, <code>0 CRC</code>, <code>0 collisions</code>, and <code>0 late collision</code>.</li>\n          <li>Because the interface has zero transmission errors despite operating at maximum capacity, the condition is normal <strong>high throughput</strong> (congestion/saturation).</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>bad NIC</strong>: A faulty NIC produces runts, giants, CRC errors, and input drops.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>broadcast storm</strong>: The broadcast counter shows only 267 broadcast packets out of thousands of frames (healthy).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>duplex mismatch</strong>: Duplex mismatches are identified by late collisions, CRC errors, and frame errors. All collision counters are 0.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Duplex Mismatch Indicators = <strong>Late collisions + CRC errors</strong>. Maximum load (255/255) with 0 error counters = <strong>High Throughput</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 144,
        "questionNo": "Question #144",
        "question": "Refer to the exhibit. What is the structural role of 'apple' in the JSON data shown in the exhibit? (Choose one answer)",
        "options": [
            "A. string",
            "B. object",
            "C. key",
            "D. number"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/144.png",
        "originalSourceImage": "original_sources/144.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: JSON Syntax & Object Data Structures</div>\n    <p>JSON (JavaScript Object Notation) organizes structured data into key-value pairs formatted as <code>\"key\": value</code>.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C - key) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>key</strong>: In JSON objects enclosed in curly braces <code>{ \"apple\": \"fruit\" }</code>, the identifier preceding the colon is the <strong>key</strong> (name attribute), while the item following the colon is the value.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>string</strong>: While keys are textual strings, its structural role in the key-value architecture is a <strong>key</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>object</strong>: An object is the entire collection of key-value pairs wrapped in <code>{ ... }</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>number</strong>: Numbers are unquoted numeric literals (e.g. <code>25</code> or <code>10.5</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>JSON Anatomy: <code>{ }</code> = Object, <code>[ ]</code> = Array, <code>\"property\":</code> = <strong>Key</strong>, <code>\"value\"</code> = String Value.</p>\n  </div>\n</div>"
    },
    {
        "id": 145,
        "questionNo": "Question #145",
        "question": "How must a switch interface be configured when an AP is in FlexConnect mode with multiple SSIDs mapped to different VLANs? (Choose one answer)",
        "options": [
            "A. trunk port",
            "B. PoE port",
            "C. EtherChannel",
            "D. access port"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/145.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: FlexConnect AP Switch Port Requirements</div>\n    <p>In Cisco FlexConnect deployments with local switching, the Access Point bridges wireless client traffic directly onto local switch VLANs.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A - trunk port) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>trunk port</strong>: When multiple SSIDs map to different local VLANs, the switch interface connected to the FlexConnect AP must be configured as an <strong>802.1Q trunk port</strong> (with the native VLAN matching the AP management VLAN) to transport multiple tagged VLAN frames simultaneously.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>PoE port</strong>: Power over Ethernet delivers electrical current; it is not an 802.1Q VLAN trunking mode.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>EtherChannel</strong>: Bundles multiple physical links into one logical connection; not required for single AP connectivity.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>access port</strong>: Access ports carry only a single untagged VLAN, preventing the AP from locally switching multiple client VLANs.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Centralized AP (CAPWAP tunnel to WLC) = <strong>Access Port</strong>. FlexConnect with Local Switching (multi-VLAN) = <strong>802.1Q Trunk Port</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 146,
        "questionNo": "Question #146",
        "question": "Which value is set in the IP header when a Cisco device applies QoS marking? (Choose one answer)",
        "options": [
            "A. DSCP",
            "B. Type of Service",
            "C. Header Checksum",
            "D. ECN"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/146.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 3 QoS Packet Marking (DSCP)</div>\n    <p>Quality of Service marking differentiates network traffic priority to guarantee latency, jitter, and bandwidth for mission-critical applications.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A - DSCP) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>DSCP (Differentiated Services Code Point)</strong>: Layer 3 QoS markings modify the 6-bit DSCP field inside the IPv4 Differentiated Services (DiffServ) octet or IPv6 Traffic Class octet, providing 64 differentiated priority values.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Type of Service</strong>: ToS is the legacy 8-bit octet name; modern Cisco QoS specifically marks the 6-bit DSCP subfield.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Header Checksum</strong>: Validates IP header integrity; not a QoS priority marking field.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>ECN</strong>: Explicit Congestion Notification uses the last 2 bits of the DiffServ octet to signal congestion, not priority marking.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>L2 QoS = 3-bit <strong>CoS</strong> (inside 802.1Q tag) | L3 QoS = 6-bit <strong>DSCP</strong> (inside IP header).</p>\n  </div>\n</div>"
    },
    {
        "id": 147,
        "questionNo": "Question #147",
        "question": "Which cipher is used for encryption with the WPA2 standard? (Choose one answer)",
        "options": [
            "A. RC4",
            "B. AES",
            "C. DES",
            "D. SHA"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/147.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WPA2 Encryption Standards & Ciphers</div>\n    <p>The IEEE 802.11i standard (commercialized as WPA2) established robust symmetric block encryption for wireless networks.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B - AES) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>AES (Advanced Encryption Standard)</strong>: WPA2 mandates the use of AES using the CCMP protocol. AES provides 128-bit block cipher encryption, replacing vulnerable legacy stream ciphers and ensuring strong data confidentiality.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>RC4</strong>: Legacy stream cipher used in WEP and WPA (TKIP); deprecated due to keystream vulnerabilities.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>DES</strong>: Legacy 56-bit symmetric cipher never supported in IEEE 802.11 standards.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>SHA</strong>: Cryptographic hashing algorithm used for integrity checks and key derivation, not payload encryption.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Ciphers by Standard: <code>WEP</code> = RC4 | <code>WPA</code> = RC4 (TKIP) | <code>WPA2</code> = <strong>AES (CCMP)</strong> | <code>WPA3</code> = AES (GCMP / SAE).</p>\n  </div>\n</div>"
    },
    {
        "id": 148,
        "questionNo": "Question #148",
        "question": "What differentiates the TCP and UDP protocols? (Choose one answer)",
        "options": [
            "A. TCP immediately transmits data without waiting for a handshake, and UDP awaits a response from the receiver before sending additional data.",
            "B. TCP tracks segments being transmitted or received by assigning segment numbers, and UDP adjusts data flow according to network conditions.",
            "C. TCP sends data at a constant rate with error checking on upper protocol layers, and UDP provides error-checking and sequencing.",
            "D. TCP establishes a connection with the device on the other end before transferring, and UDP transfers without establishing a connection."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/148.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 4 Transport Protocols - TCP vs UDP</div>\n    <p>Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) provide distinct transport services at Layer 4 of the OSI model.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>TCP establishes a connection before transferring; UDP transfers without establishing a connection</strong>: TCP is connection-oriented and requires a 3-way handshake (SYN, SYN-ACK, ACK) to establish parameters before payload data is sent. UDP is connectionless and sends datagrams immediately without handshake or session setup.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Inverts the protocol characteristics; TCP requires a handshake, whereas UDP transmits immediately.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: UDP does not adjust data flow based on network conditions; flow control is a TCP feature.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Inverts error checking and sequencing; TCP handles sequencing and reliability, not UDP.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>TCP</strong> = Connection-oriented, 3-way handshake, reliable, sequenced, flow control. <strong>UDP</strong> = Connectionless, unacknowledged, low overhead.</p>\n  </div>\n</div>"
    },
    {
        "id": 149,
        "questionNo": "Question #149",
        "question": "Why does an administrator choose to implement a remote access IPsec VPN? (Choose one answer)",
        "options": [
            "A. to establish an encrypted tunnel between a remote user and a private network over the internet",
            "B. to allow access to an enterprise network using any internet-enabled location via a web browser using SSL",
            "C. to enable remote users to access network shares without authentication",
            "D. to provide a secure link between an HTTPS server, authentication subsystem, and an end-user"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/149.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Remote Access IPsec VPN Capabilities</div>\n    <p>Virtual Private Networks create encrypted tunnels across untrusted public IP networks to connect remote mobile users securely to corporate enterprise resources.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>To establish an encrypted tunnel between a remote user and a private network over the internet</strong>: A remote-access IPsec VPN allows mobile workers using client software (such as Cisco AnyConnect) to establish a secure, authenticated IPsec tunnel over the public Internet into the corporate intranet.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Describes a clientless SSL VPN portal accessed via web browser, not an IPsec VPN.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Remote access VPNs strictly mandate user authentication; they never permit unauthenticated access.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Describes an HTTPS application web session, not a network-level remote access VPN.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Remote Access VPN</strong> = Mobile client to enterprise gateway. <strong>Site-to-Site VPN</strong> = Gateway to gateway between fixed physical branches.</p>\n  </div>\n</div>"
    },
    {
        "id": 150,
        "questionNo": "Question #150",
        "question": "How are API keys used to enforce rate limiting? (Choose one answer)",
        "options": [
            "A. to define the network path the API request should take",
            "B. to encrypt data sent in the API request",
            "C. to uniquely identify each client application",
            "D. to specify the type of data format the client prefers to receive"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/150.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: REST API Authentication & Rate Limiting</div>\n    <p>API gateways enforce rate limiting to protect services against denial of service, resource exhaustion, and unauthorized high-frequency calling.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>To uniquely identify each client application</strong>: To enforce call limits (e.g., 100 requests per minute), the API gateway inspects the API key passed in the request header or query parameter to identify which client application or developer account is generating the requests and track their quota.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Network paths are determined by Layer 3 IP routing and load balancers, not API keys.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Data encryption is provided by TLS/HTTPS, not API keys.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Data format negotiation is managed by HTTP headers like <code>Accept</code> and <code>Content-Type</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>An <strong>API Key</strong> acts as an application identifier, enabling the API provider to track usage, bill accounts, and enforce rate limits.</p>\n  </div>\n</div>"
    },
    {
        "id": 151,
        "questionNo": "Question #151",
        "question": "Refer to the exhibit. Packets received by the router from BGP enter via a serial interface at 209.165.201.1. Each route is present within the routing table. Which interface is used to forward traffic with a destination IP of 10.1.1.19? (Choose one answer)",
        "options": [
            "A. F0/3",
            "B. F0/0",
            "C. F0/1",
            "D. F0/4"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/151.png",
        "originalSourceImage": "original_sources/151.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match (LPM) Forwarding</div>\n    <p>A router determines the outgoing interface by matching the destination IP address against the routing table and selecting the most specific subnet (highest prefix length / longest mask).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>F0/0</strong>:\n        <ul>\n          <li>Destination IP is <code>10.1.1.19</code>.</li>\n          <li>Evaluating the routing table prefixes covering 10.1.1.x:\n            <br/>• <code>10.1.1.16/28</code> (Range: 10.1.1.16 – 10.1.1.31) via <strong>F0/0</strong> (/28 mask).\n            <br/>• <code>10.1.1.0/24</code> via F0/1 (/24 mask).\n            <br/>• <code>10.1.0.0/16</code> via F0/3 (/16 mask).\n          </li>\n          <li>Host <code>10.1.1.19</code> falls within the <code>10.1.1.16/28</code> subnet. Under Longest Prefix Match, <strong>/28 beats /24 and /16</strong>. The exit interface is <strong>F0/0</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>F0/3</strong>: Exit interface for <code>10.1.0.0/16</code>, which is less specific than /28.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>F0/1</strong>: Exit interface for <code>10.1.1.0/24</code>, which has a shorter prefix length (/24 vs /28).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>F0/4</strong>: Exit interface for an unrelated or default route.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Always calculate block size for LPM:<br/><code>/28</code> = Block size of 16. Subnets: .0, .16, .32. Range for .16 is <strong>.16 through .31</strong>, encompassing <strong>.19</strong>!</p>\n  </div>\n</div>"
    },
    {
        "id": 152,
        "questionNo": "Question #152",
        "question": "Which protocol should be used to transfer large files on a company intranet that allows UDP 69 through the firewall? (Choose one answer)",
        "options": [
            "A. TFTP",
            "B. SMTP",
            "C. FTP",
            "D. REST API"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/152.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Trivial File Transfer Protocol (TFTP, UDP 69)</div>\n    <p>TFTP (RFC 1350) is an ultra-lightweight client-server protocol used inside enterprise intranets to bootstrap diskless clients and transfer firmware images and router configurations.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>TFTP</strong>: TFTP operates exclusively over <strong>UDP port 69</strong>. When a firewall permits only UDP 69, TFTP is the only protocol capable of establishing communication and completing file transfers.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>SMTP</strong>: Simple Mail Transfer Protocol uses TCP port 25 (or 587) for sending email, not UDP 69.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>FTP</strong>: File Transfer Protocol uses TCP ports 20 (data) and 21 (control).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>REST API</strong>: REST APIs use HTTP (TCP 80) or HTTPS (TCP 443).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>File Transfer Protocols:<br/>• <strong>TFTP</strong> = UDP port 69 (No auth, lightweight)<br/>• <strong>FTP</strong> = TCP ports 20 & 21<br/>• <strong>SFTP / SCP</strong> = TCP port 22 (SSH).</p>\n  </div>\n</div>"
    },
    {
        "id": 153,
        "questionNo": "Question #153",
        "question": "Which protocol does Ansible use to push modules to nodes in a network? (Choose one answer)",
        "options": [
            "A. SNMP",
            "B. Telnet",
            "C. SSH",
            "D. Kerberos"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/153.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Ansible Transport Protocols in Network Automation</div>\n    <p>Ansible is an agentless configuration management engine that pushes tasks from a central control machine to managed endpoints using standard secure protocols.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>SSH</strong>: Ansible connects to remote Linux nodes and network devices over <strong>Secure Shell (SSH, TCP port 22)</strong>. It executes modules or commands over the encrypted SSH tunnel without requiring any proprietary background daemon or agent software.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>SNMP</strong>: Used for polling telemetry (UDP 161) and alerts (UDP 162), not for pushing automated configuration modules.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Telnet</strong>: Insecure plaintext protocol deprecated for automation.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Kerberos</strong>: A network authentication protocol (ticket-granting service), not the transport protocol Ansible uses to push modules.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Ansible relies on <strong>SSH</strong> for transport, <strong>YAML</strong> for playbooks, and is 100% <strong>agentless</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 154,
        "questionNo": "Question #154",
        "question": "Which function generally performed by a traditional network device is replaced by a software-defined controller? (Choose one answer)",
        "options": [
            "A. encapsulation and decapsulation of packets in a data-link frame",
            "B. building route tables and updating the forwarding table",
            "C. changing the source or destination address during NAT operations",
            "D. encryption and decryption for VPN link processing"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/154.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SDN Plane Separation & Controller Functions</div>\n    <p>In Software-Defined Networking (SDN), network device functionality is divided between the <strong>Control Plane</strong> (intelligence) and the <strong>Data Plane</strong> (forwarding).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>building route tables and updating the forwarding table</strong>: Building the Routing Information Base (RIB) and calculating optimal paths is the job of the <strong>Control Plane</strong>. In an SDN architecture, this control plane function is removed from individual switches/routers and centralized within the software controller. The controller pushes the resulting Forwarding Information Base (FIB) down to the devices.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Frame encapsulation and decapsulation occurs at wire-speed on interface ASICs in the <strong>Data Plane</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Rewriting Layer 3/Layer 4 headers during NAT is a <strong>Data Plane</strong> forwarding operation.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: IPsec encryption and decryption are hardware cryptographic operations executed in the <strong>Data Plane</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• <strong>Control Plane</strong> (Controller) = Path calculation, route tables, protocol peering.<br/>• <strong>Data Plane</strong> (Hardware) = Packet forwarding, NAT, encapsulation, encryption.</p>\n  </div>\n</div>"
    },
    {
        "id": 155,
        "questionNo": "Question #155",
        "question": "Which advantage does machine learning offer for network security? (Choose one answer)",
        "options": [
            "A. It controls VPN access permissions.",
            "B. It manages firewall rule sets.",
            "C. It improves real-time threat detection.",
            "D. It enforces password complexity requirements."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/155.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Machine Learning in Network Security</div>\n    <p>Modern enterprise security architectures leverage Machine Learning (ML) behavioral modeling to identify advanced persistent threats and zero-day intrusions.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>It improves real-time threat detection</strong>: Machine learning engines ingest network telemetry (NetFlow, packet dynamics, DNS queries) to establish dynamic baselines of normal behavior. When abnormal traffic flows, data exfiltration, or malware beaconing occur, ML algorithms flag the anomaly in real time without waiting for static signatures.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: VPN access permissions are controlled via AAA/RADIUS policies and identity services.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Firewall rule sets are defined administratively or through policy orchestration engines.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Password complexity is enforced statically via directory services (Active Directory / LDAP).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Key ML value proposition: <strong>Real-time Anomaly Detection</strong> for unknown and zero-day threats.</p>\n  </div>\n</div>"
    },
    {
        "id": 156,
        "questionNo": "Question #156",
        "question": "Why would a network administrator implement the HSRP protocol? (Choose one answer)",
        "options": [
            "A. to provide network redundancy in the case of a router failure",
            "B. to allow hosts to use a shared virtual IP address for load-balancing traffic across multiple routers",
            "C. to use an open standard protocol that is configured on Cisco and third-party routers",
            "D. to allow clients to be configured with multiple default gateway IPs"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/156.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Hot Standby Router Protocol (HSRP, RFC 2281)</div>\n    <p>HSRP provides default gateway high availability by clustering physical routers into a virtual router group.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>to provide network redundancy in the case of a router failure</strong>: HSRP elects an Active router and a Standby router sharing a virtual IP address. If the Active gateway fails, the Standby router assumes the active role immediately, ensuring continuous external network reachability for LAN hosts without dropping connections.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: In an HSRP group, only the single Active router forwards traffic; traffic is not load-balanced across multiple routers (Gateway Load Balancing Protocol - GLBP does this).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: HSRP is Cisco proprietary, not an open standard (VRRP is the open standard).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Clients are configured with only one single virtual gateway IP; HSRP eliminates the need to configure multiple gateways on hosts.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>HSRP Primary Purpose: <strong>First Hop Default Gateway Redundancy</strong> (Active/Standby failover).</p>\n  </div>\n</div>"
    },
    {
        "id": 157,
        "questionNo": "Question #157",
        "question": "Which action implements physical access control as part of the security program of an organization? (Choose one answer)",
        "options": [
            "A. backing up syslogs at a remote location",
            "B. setting up IP cameras to monitor key infrastructure",
            "C. configuring a password for the console port",
            "D. configuring enable passwords on network devices"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/157.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Physical Access Control in Security Architecture</div>\n    <p>Comprehensive information security encompasses administrative, technical, and physical security controls to safeguard assets.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>setting up IP cameras to monitor key infrastructure</strong>: Physical access controls protect facilities, server rooms, and telecommunications closets from unauthorized physical intrusion. Deploying IP surveillance cameras (CCTV) provides physical monitoring, visual deterrence, and access logging for critical infrastructure rooms.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Backing up syslog files is a technical/administrative disaster recovery and log management control.</li>\n      <li><span class=\"opt-tag wrong\">Options C & D</span>: Configuring console and enable passwords are logical/technical access controls enforced via software.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Security Control Types:<br/>• <strong>Physical Controls</strong>: Door locks, biometric badge readers, surveillance cameras, fencing.<br/>• <strong>Logical/Technical Controls</strong>: Passwords, ACLs, firewalls, encryption.</p>\n  </div>\n</div>"
    },
    {
        "id": 158,
        "questionNo": "Question #158",
        "question": "Which cloud provided service allows an organization to install its own operating system on a virtual machine? (Choose one answer)",
        "options": [
            "A. network-as-a-service",
            "B. infrastructure-as-a-service",
            "C. platform-as-a-service",
            "D. software-as-a-service"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/158.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cloud Service Models (IaaS, PaaS, SaaS, NIST SP 800-145)</div>\n    <p>Cloud service models delineate the boundary of responsibility between the cloud customer and the cloud provider.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>infrastructure-as-a-service (IaaS)</strong>: In IaaS (e.g., AWS EC2, Microsoft Azure VMs, Google Compute Engine), the cloud provider delivers raw virtualized compute, storage, and networking. The customer retains full administrative control to select, install, configure, and patch their own <strong>operating system</strong> and applications.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>network-as-a-service</strong>: Focuses on network transport and connectivity provisioning.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>platform-as-a-service (PaaS)</strong>: The provider manages the operating system, runtime, and hardware; the customer only deploys application code and data.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>software-as-a-service (SaaS)</strong>: The provider manages the entire application stack; end users only consume the software via web browsers (e.g., Microsoft 365).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• <strong>IaaS</strong> = Customer manages OS + Apps (Cloud provides hardware/VM).<br/>• <strong>PaaS</strong> = Customer manages Apps (Cloud provides OS + Runtime).<br/>• <strong>SaaS</strong> = Cloud manages everything (Customer uses software).</p>\n  </div>\n</div>"
    },
    {
        "id": 159,
        "questionNo": "Question #159",
        "question": "Refer to the exhibit. To which device does Router1 send packets that are destined to host 10.10.13.165? (Choose one answer)",
        "options": [
            "A. Router2",
            "B. Router3",
            "C. Router4",
            "D. Router5"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/159.png",
        "originalSourceImage": "original_sources/159.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match Route Selection</div>\n    <p>When multiple routes in the routing table encompass a destination address, the router forwards traffic to the next-hop router offering the most specific prefix (longest subnet mask).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Router3</strong>:\n        <ul>\n          <li>Target destination: <code>10.10.13.165</code>.</li>\n          <li>Subnet <code>10.10.13.160/28</code> (mask 255.255.255.240, block size of 16) covers host range <code>10.10.13.160</code> through <code>10.10.13.175</code>.</li>\n          <li>Target IP <code>.165</code> is inside this /28 subnet.</li>\n          <li>Because /28 is longer and more specific than any /24, /16, or default route in the exhibit, Router1 selects this route pointing to <strong>Router3</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Router2</strong>: Advertises a less specific prefix (/24).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>Router4</strong>: Advertises an unrelated or less specific subnet.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Router5</strong>: Default or summary path with a shorter prefix length.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Subnet /28 Math: 256 - 240 = 16. Multiples: 0, 16, 32... 160. The subnet 160 covers <strong>160 to 175</strong>. IP 165 matches!</p>\n  </div>\n</div>"
    },
    {
        "id": 160,
        "questionNo": "Question #160",
        "question": "Which security protocol is appropriate for a WPA3 implementation? (Choose one answer)",
        "options": [
            "A. CCMP",
            "B. GCMP",
            "C. TKIP",
            "D. MD5"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/160.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WPA3 Encryption Ciphers - GCMP (IEEE 802.11)</div>\n    <p>WPA3 establishes upgraded encryption standards that move beyond WPA2's CCMP to provide authenticated encryption with higher throughput and stronger cryptographic assurance.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>GCMP</strong>: <strong>Galois/Counter Mode Protocol (GCMP-256)</strong> is the advanced cryptographic encryption suite standardized for WPA3 (especially in WPA3-Enterprise 192-bit mode and Wi-Fi 6). GCMP delivers high-performance authenticated symmetric encryption with Galois field MAC authentication.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>CCMP</strong>: Counter Mode CBC-MAC Protocol is the standard encryption cipher of WPA2; while CCMP-128 is supported for WPA3-Personal, GCMP represents the signature protocol introduced specifically for WPA3.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>TKIP</strong>: Temporal Key Integrity Protocol was created for legacy WPA (2003) and is strictly forbidden in WPA3.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>MD5</strong>: A deprecated cryptographic hash function with collision vulnerabilities, not a wireless data frame encryption protocol.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Wireless Encryption Evolution:<br/>• WEP &rarr; RC4<br/>• WPA &rarr; TKIP<br/>• WPA2 &rarr; <strong>CCMP (AES)</strong><br/>• WPA3 &rarr; <strong>GCMP (AES-GCM)</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 161,
        "questionNo": "Question #161",
        "question": "Which command must be configured to enable port security with a manually assigned MAC address of aabb.cc00.1234 for a VoIP handset on VLAN 4? (Choose one answer)",
        "options": [
            "A. mac-address-table static aabb.cc00.1234 vlan 4 interface fa0/1",
            "B. switchport port-security mac-address aabb.cc00.1234 vlan 4",
            "C. switchport port-security mac-address aabb.cc00.1234",
            "D. switchport port-security mac-address sticky"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/161.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Port Security Static MAC Configuration</div>\n    <p>Cisco switchport port security allows administrators to manually configure authorized static MAC addresses on switch access ports.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <code>switchport port-security mac-address aabb.cc00.1234</code>: Under an access switchport interface (with port security enabled), the correct Cisco IOS syntax to manually define an authorized static MAC address is <code>switchport port-security mac-address &lt;mac-address&gt;</code>. Port security on an access port does not append a VLAN parameter.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: <code>mac-address-table static ...</code> configures a static MAC table forwarding entry in the CAM table, not a port security restriction.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Invalid syntax; appending <code>vlan 4</code> to the <code>switchport port-security mac-address</code> command is only supported on voice VLAN ports with sticky learning, not standard manual configuration.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Configures dynamic sticky learning rather than manually specifying the MAC address <code>aabb.cc00.1234</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To manually assign a secure MAC on a port: <code>switchport port-security mac-address &lt;mac&gt;</code>.</p>\n  </div>\n</div>"
    },
    {
        "id": 162,
        "questionNo": "Question #162",
        "question": "Which two transport layer protocols carry syslog messages? (Choose two answers)",
        "options": [
            "A. TCP",
            "B. ARP",
            "C. UDP",
            "D. IP",
            "E. RTP"
        ],
        "correctOption": [
            0,
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/162.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Syslog Transport Protocols (RFC 5424, RFC 5426)</div>\n    <p>The Syslog protocol transmits event notification messages across IP networks using Layer 4 transport protocols.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A and C) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>UDP</strong>: The default, historic transport protocol for syslog (operating over <strong>UDP port 514</strong>, RFC 5426).</li>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>TCP</strong>: Standardized in RFC 5424 and RFC 5425 (using <strong>TCP port 6514</strong> with TLS or TCP port 514) to provide connection-oriented, reliable syslog delivery and encryption.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>ARP</strong>: Address Resolution Protocol operates at Layer 2/3 for MAC-to-IP resolution, not a Layer 4 transport protocol.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>IP</strong>: Internet Protocol operates at Layer 3 (Network Layer).</li>\n      <li><span class=\"opt-tag wrong\">Option E</span> <strong>RTP</strong>: Real-time Transport Protocol carries voice/video streams, not syslog text events.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Syslog transports: <strong>UDP port 514</strong> (traditional default) and <strong>TCP port 6514</strong> (reliable TLS syslog).</p>\n  </div>\n</div>"
    },
    {
        "id": 163,
        "questionNo": "Question #163",
        "question": "Which interface enables communication between a program on the controller and a program on the networking device? (Choose one answer)",
        "options": [
            "A. southbound",
            "B. northbound",
            "C. software virtual",
            "D. tunnel"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/163.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Southbound APIs in SDN Architecture</div>\n    <p>Software-Defined Networking segregates APIs based on whether they communicate with upper-layer applications or lower-layer physical forwarding devices.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>southbound</strong>: <strong>Southbound APIs</strong> (such as OpenFlow, NETCONF, RESTCONF, and gRPC) facilitate communication between the centralized SDN controller and programs/daemons running on physical network switches and routers. They allow the controller to discover topology and program device forwarding tables.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>northbound</strong>: Connects the controller upward to external business and management software applications.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>software virtual</strong>: A generic virtual interface (like a vSwitch or SVI), not an SDN plane API.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>tunnel</strong>: An encapsulation mechanism (like GRE or IPsec), not an SDN programmatic API.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Directional SDN APIs:<br/>• <strong>Northbound</strong> = Controller &harr; Applications (REST/JSON).<br/>• <strong>Southbound</strong> = Controller &harr; Network Devices (NETCONF/OpenFlow).</p>\n  </div>\n</div>"
    },
    {
        "id": 164,
        "questionNo": "Question #164",
        "question": "How are VLAN hopping attacks mitigated? (Choose one answer)",
        "options": [
            "A. configure extended VLANS",
            "B. activate all ports and place in the default VLAN",
            "C. manually implement trunk ports and disable DTP",
            "D. enable dynamic ARP inspection"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/164.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: VLAN Hopping Attack Mitigation (Switch Spoofing & Double Tagging)</div>\n    <p>VLAN hopping occurs when an unauthorized attacker transmits frames that bypass Layer 2 switch boundaries to inject packets into a different VLAN.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>manually implement trunk ports and disable DTP</strong>:\n        <ul>\n          <li><strong>Switch Spoofing</strong> exploits Cisco Dynamic Trunking Protocol (DTP) to negotiate a trunk link with the switch. Disabling DTP (<code>switchport nonegotiate</code>) and explicitly setting ports to access mode (<code>switchport mode access</code>) completely prevents switch spoofing.</li>\n          <li>For remaining trunk ports: Statically configure them (<code>switchport mode trunk</code>) and change the <strong>Native VLAN</strong> to an unused ID to defeat Double Tagging attacks.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Extended VLANs (VLAN IDs 1006–4094) have identical tagging mechanisms and offer no inherent protection against VLAN hopping.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Activating all ports in default VLAN 1 makes the entire network vulnerable to double-tagging attacks.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Dynamic ARP Inspection (DAI) prevents ARP spoofing/poisoning, not Layer 2 802.1Q VLAN hopping.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To prevent VLAN Hopping:<br/>1. Disable DTP negotiation (<code>switchport nonegotiate</code>).<br/>2. Explicitly configure <code>switchport mode access</code> on all client ports.<br/>3. Change the <strong>Native VLAN</strong> on trunk links to an unused ID.</p>\n  </div>\n</div>"
    },
    {
        "id": 165,
        "questionNo": "Question #165",
        "question": "An network engineer starts to implement a new wireless LAN by configuring the authentication server and creating the dynamic interface. What must be performed next to complete the basic configuration? (Choose one answer)",
        "options": [
            "A. Enable Telnet and RADIUS access on the management interface.",
            "B. Install the management interface and add the management IP.",
            "C. Configure high availability and redundancy for the access points.",
            "D. Create the new WLAN and bind the dynamic interface to it."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/165.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC WLAN Configuration Workflow</div>\n    <p>Deploying a functional wireless network on a Cisco Wireless LAN Controller requires a sequential multi-step provisioning workflow.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Create the new WLAN and bind the dynamic interface to it</strong>: After configuring the authentication server (RADIUS) and creating the dynamic interface (which maps to a specific client VLAN and IP subnet), the next necessary action is to <strong>create the new WLAN</strong> and bind that dynamic interface to the WLAN so client traffic is mapped to the appropriate VLAN and broadcast by APs.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Enabling Telnet is insecure and irrelevant to end-user client wireless connectivity.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: The management interface is created during initial WLC out-of-box setup, not after dynamic interface creation.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: AP high availability is an optional redundancy tuning step, not a required prerequisite for basic WLAN activation.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>WLC Setup Workflow: Create Dynamic Interface (maps to VLAN) &rarr; Configure RADIUS Server &rarr; <strong>Create WLAN & bind to Dynamic Interface</strong> &rarr; Enable WLAN.</p>\n  </div>\n</div>"
    },
    {
        "id": 166,
        "questionNo": "Question #166",
        "question": "What is the difference between SNMP traps and SNMP polling? (Choose one answer)",
        "options": [
            "A. SNMP traps are initiated using a push model at the network device, and SNMP polling is initiated at the server.",
            "B. SNMP traps are used for proactive monitoring, and SNMP polling is used for reactive monitoring.",
            "C. SNMP traps are initiated by the network management system, and network devices initiate SNMP polling.",
            "D. SNMP traps send periodic updates via the MIB, and SNMP polling sends data on demand."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/166.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SNMP Traps (Push) vs. Polling (Pull) Architecture</div>\n    <p>Network management systems retrieve health metrics and monitor events using two complementary communication paradigms.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>SNMP traps are initiated using a push model at the network device, and SNMP polling is initiated at the server</strong>:\n        <ul>\n          <li><strong>Traps (Push)</strong>: The managed network device spontaneously transmits an alert PDU (Trap or Inform) to the NMS when a noteworthy local event occurs (e.g., interface down, link flapping).</li>\n          <li><strong>Polling (Pull)</strong>: The centralized NMS server periodically sends <code>Get</code> or <code>GetBulk</code> requests to query specific MIB OIDs from the device on a scheduled interval.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Inverts the terms; traps are reactive to events as they happen, whereas polling is proactive periodic monitoring.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Reverses the initiating entities; traps originate at the device, polling originates at the NMS.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Polling is periodic; traps occur on demand when triggered by events.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>• <strong>SNMP Polling</strong> = NMS requests data from Device (Pull Model).<br/>• <strong>SNMP Trap</strong> = Device sends spontaneous alert to NMS (Push Model).</p>\n  </div>\n</div>"
    },
    {
        "id": 167,
        "questionNo": "Question #167",
        "question": "Refer to the exhibit. What is the administrative distance for the advertised prefix that includes the host IP address 192.168.20.1? (Choose one answer)",
        "options": [
            "A. 1",
            "B. 24",
            "C. 0",
            "D. 192.168.10.2"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/167.png",
        "originalSourceImage": "original_sources/167.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Static Route Administrative Distance</div>\n    <p>Administrative Distance is the measure of trustworthiness used by Cisco routers to prioritize routes from different routing sources.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>1</strong>:\n        <ul>\n          <li>The advertised prefix covering host <code>192.168.20.1</code> is a standard static route configured in the router: <code>ip route 192.168.20.0 255.255.255.0 192.168.10.2</code>.</li>\n          <li>In Cisco IOS, a static route configured with a next-hop IP address has a factory default Administrative Distance of <strong>1</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>24</strong>: 24 represents the subnet prefix length (/24), not the administrative distance.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>0</strong>: An AD of 0 is reserved for directly connected interfaces (<code>C</code> routes).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>192.168.10.2</strong>: The next-hop IP address, not an administrative distance value.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Administrative Distance: <strong>Directly Connected = 0</strong>, <strong>Static Route = 1</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 168,
        "questionNo": "Question #168",
        "question": "Which SNMP message type is reliable and requires an acknowledgment response from the SNMP manager? (Choose one answer)",
        "options": [
            "A. Get",
            "B. Traps",
            "C. Set",
            "D. Inform"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/168.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Reliable SNMP Informs (RFC 3416)</div>\n    <p>Network devices generate alerts when notable events occur. To overcome the unreliability of standard UDP traps, SNMPv2c/v3 introduced Inform PDUs.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Inform</strong>: An <code>InformRequest</code> is a reliable notification. The receiving SNMP manager MUST respond with an <code>InformResponse</code> acknowledgment. If the sender does not receive the response, it retransmits the Inform PDU until acknowledged or retry limits expire.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A & C</span> <strong>Get & Set</strong>: Commands initiated by the manager to read or modify variables, not unsolicited alert notifications.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Traps</strong>: Traps are unacknowledged and unreliable UDP messages; dropped traps are lost forever.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Reliable SNMP Notification = <strong>Inform</strong> (Requires ACK). Unreliable = <strong>Trap</strong> (Fire and forget).</p>\n  </div>\n</div>"
    },
    {
        "id": 169,
        "questionNo": "Question #169",
        "question": "Refer to the exhibit. A Cisco engineer creates a new WLAN called lantest. Which two actions must be performed so that only high-speed 2.4-Ghz clients connect? (Choose two answers)",
        "options": [
            "A. Enable the Broadcast SSID option.",
            "B. Set the Interface/Interface Group(G) to an interface other than guest.",
            "C. Set the Radio Policy option to 802.11a Only.",
            "D. Set the Radio Policy option to 802.11g Only.",
            "E. Enable the Status option."
        ],
        "correctOption": [
            3,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/169.png",
        "originalSourceImage": "original_sources/169.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC Radio Policies & WLAN Activation</div>\n    <p>When creating a WLAN on a Cisco WLC, the WLAN must be administratively enabled, and the Radio Policy defines which frequency bands and 802.11 standards are permitted.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options D and E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Set the Radio Policy option to 802.11g Only</strong>: In 2.4 GHz, legacy 802.11b supports speeds only up to 11 Mbps. Selecting <strong>802.11g Only</strong> disables 802.11b rates, restricting connections exclusively to higher-speed 2.4 GHz clients (54 Mbps 802.11g and 802.11n).</li>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>Enable the Status option</strong>: By default, new WLANs are created in a disabled state. Checking the <strong>Status</strong> box is required to enable and broadcast the WLAN.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Broadcast SSID is enabled by default to allow clients to discover the SSID.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Changing interface mapping assigns a different VLAN, but does not control RF radio speeds.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: 802.11a operates exclusively on the <strong>5 GHz</strong> band, contradicting the requirement for 2.4 GHz.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Radio Frequencies:<br/>• <strong>802.11b/g</strong> = 2.4 GHz<br/>• <strong>802.11a/ac</strong> = 5 GHz<br/>• <strong>802.11n/ax/be</strong> = Both 2.4 & 5 GHz.</p>\n  </div>\n</div>"
    },
    {
        "id": 170,
        "questionNo": "Question #170",
        "question": "How does a DNS server improve network efficiency when resolving domain names? (Choose one answer)",
        "options": [
            "A. by caching DNS records to reduce the number of external queries",
            "B. by using round-robin scheduling to balance the load across multiple servers",
            "C. by compressing DNS records to decrease their size",
            "D. by permanently storing all DNS records for faster access"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/170.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DNS Caching & Query Optimization (RFC 1035)</div>\n    <p>Resolving fully qualified domain names (FQDNs) requires querying root, TLD, and authoritative nameservers across the Internet.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>by caching DNS records to reduce the number of external queries</strong>: When a recursive DNS server resolves a domain name, it stores the response in its local cache for the duration of the record's <strong>Time-to-Live (TTL)</strong>. Subsequent client queries for that same domain are answered immediately from local memory, slashing latency and eliminating redundant WAN/Internet traffic.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Round-robin balances incoming traffic across multiple target host IP addresses, but does not reduce DNS query volume.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: DNS message compression saves bytes in packet headers, but caching is the primary mechanism reducing query traffic.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: DNS records are cached temporarily based on their TTL, never permanently stored.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>DNS Efficiency: Local <strong>DNS Caching</strong> uses the <strong>TTL (Time To Live)</strong> value to serve repeat requests instantly.</p>\n  </div>\n</div>"
    },
    {
        "id": 171,
        "questionNo": "Question #171",
        "question": "Which is a fact related to FTP? (Choose one answer)",
        "options": [
            "A. It uses block numbers to identify and mitigate data-transfer errors.",
            "B. It uses two separate connections for control and data traffic.",
            "C. It relies on the well-known UDP port 69.",
            "D. It always operates without user authentication."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/171.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: File Transfer Protocol (FTP, RFC 959) Dual-Port Architecture</div>\n    <p>FTP is an application layer service that separates control commands from actual file payload transfers using two distinct TCP connections.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>It uses two separate connections for control and data traffic</strong>: Standard FTP utilizes:\n        <br/>1. <strong>Control Connection (TCP Port 21)</strong>: Initiated by the client for authentication (USER/PASS), directory navigation, and issuing transfer commands.\n        <br/>2. <strong>Data Connection (TCP Port 20 in Active mode, or negotiated ephemeral port in Passive mode)</strong>: Dedicated solely to transmitting file payloads and directory listings.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Block numbers for error mitigation describes <strong>TFTP</strong> lock-step transmission, not FTP.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: UDP port 69 is used by <strong>TFTP</strong>; FTP runs over reliable TCP.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: FTP mandates user authentication (credentials or anonymous login), unlike TFTP which has no authentication.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>FTP Ports:<br/>• <strong>TCP 21</strong> = Control Connection.<br/>• <strong>TCP 20</strong> = Data Connection.</p>\n  </div>\n</div>"
    },
    {
        "id": 172,
        "questionNo": "Question #172",
        "question": "Which interface on the WLC is used exclusively as a DHCP relay? (Choose one answer)",
        "options": [
            "A. service",
            "B. virtual",
            "C. distribution.",
            "D. AP-manager"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/172.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC Virtual Interface Roles</div>\n    <p>A Cisco Wireless LAN Controller defines several logical interfaces: Management, AP-Manager, Dynamic, and Virtual.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>virtual</strong>: The <strong>Virtual Interface</strong> on a Cisco WLC is assigned an unroutable fictitious IP address (universally configured as <code>1.1.1.1</code> or RFC 5737 <code>192.0.2.1</code>). It supports mobility management, Web Authentication redirection, and acts as the Layer 3 <strong>DHCP relay gateway</strong> to forward DHCP requests from wireless clients.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>service</strong>: Out-of-band management interface used for initial setup and recovery.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>distribution</strong>: Physical port carrying traffic to the wired network, not a logical DHCP relay interface.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>AP-manager</strong>: Controls Layer 3 CAPWAP discovery and tunnel termination between the APs and the WLC.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>WLC Virtual Interface (1.1.1.1): Handles <strong>WebAuth redirect</strong> and client <strong>DHCP relay</strong> services.</p>\n  </div>\n</div>"
    },
    {
        "id": 173,
        "questionNo": "Question #173",
        "question": "Refer to the exhibit. Which entry is the longest prefix match for host IP address 192.168.10.5? (Choose one answer)",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/173.png",
        "originalSourceImage": "original_sources/173.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match Routing Logic</div>\n    <p>When multiple routing table entries match a destination host IP address, the router selects the entry with the longest prefix length (most network bits).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>2</strong>:\n        <ul>\n          <li>Target destination is <code>192.168.10.5</code>.</li>\n          <li>In the exhibit's routing table:\n            <br/>• Entry 1: <code>192.168.0.0/16</code> (Prefix length = 16)\n            <br/>• Entry 2: <code>192.168.10.0/24</code> (Prefix length = <strong>24</strong>)\n            <br/>• Entry 3 & 4: Subnets that do not cover .10.5.</li>\n          <li>Entry 2 (<code>192.168.10.0/24</code>) matches host <code>192.168.10.5</code> and has a /24 prefix length, which is longer and more specific than Entry 1's /16. Therefore, <strong>Entry 2</strong> is the longest prefix match.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>1</strong>: /16 prefix length, less specific than /24.</li>\n      <li><span class=\"opt-tag wrong\">Options C & D</span> <strong>3 & 4</strong>: Cover different subnets that do not match 192.168.10.5.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Order of Prefix Length: /32 &gt; /28 &gt; <strong>/24</strong> &gt; /16 &gt; /8 &gt; /0. Highest prefix length always wins!</p>\n  </div>\n</div>"
    },
    {
        "id": 174,
        "questionNo": "Question #174",
        "question": "Refer to the exhibit. What is the effect of the configuration? (Choose one answer)",
        "options": [
            "A. Traffic initiated from IP range 10.0.0.0 - 10.255.255.255 is translated on Serial0",
            "B. Traffic sourced from IP range 10.0.0.0 - 10.0.0.255 is allowed on Serial0.",
            "C. The configuration will only permit traffic that is already established from the 10.0.0.0/24 subnet.",
            "D. The router will automatically create a corresponding outbound ACL to permit return traffic."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/174.png",
        "originalSourceImage": "original_sources/174.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Standard Access Control Lists & Wildcard Masking</div>\n    <p>Standard ACLs filter traffic based on source IP address using wildcard masks where binary 0s must match and binary 1s are ignored.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Traffic sourced from IP range 10.0.0.0 - 10.0.0.255 is allowed on Serial0</strong>:\n        <ul>\n          <li>The configuration shows: <code>access-list 1 permit 10.0.0.0 0.0.0.255</code> applied with <code>ip access-group 1 in</code> on interface Serial0.</li>\n          <li>The wildcard mask <code>0.0.0.255</code> matches all addresses in the range <code>10.0.0.0</code> through <code>10.0.0.255</code> (10.0.0.0/24).</li>\n          <li>Because the ACL rule is <code>permit</code> and applied to Serial0, traffic sourced from this range is allowed into the interface.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: The command is an ACL packet filter, not a Network Address Translation (NAT) statement.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Standard ACLs are stateless and do not track TCP established connection states.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Cisco IOS ACLs do not dynamically generate return-path ACL rules (standard ACLs are strictly unidirectional).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Wildcard Mask Rules:<br/>• <code>0.0.0.255</code> = Matches /24 (first 3 octets must match).<br/>• <code>0.0.255.255</code> = Matches /16.<br/>• <code>0.255.255.255</code> = Matches /8.</p>\n  </div>\n</div>"
    },
    {
        "id": 175,
        "questionNo": "Question #175",
        "question": "Refer to the exhibit. PC-A is communicating with another device at IP address 10.220.100.250. Through which router does traffic travel? (Choose one answer)",
        "options": [
            "A. router A",
            "B. router B",
            "C. router C",
            "D. router D"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/175.png",
        "originalSourceImage": "original_sources/175.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match Across Multiple Routing Protocols</div>\n    <p>A router prioritizes routes based first and foremost on the longest matching prefix length, regardless of metric or Administrative Distance.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>router D</strong>:\n        <ul>\n          <li>Target destination is <code>10.220.100.250</code>.</li>\n          <li>Evaluating routes from neighboring routers:\n            <br/>• Router A: Advertises <code>10.220.0.0/16</code> (/16 mask)\n            <br/>• Router B: Advertises <code>10.220.100.0/24</code> (/24 mask)\n            <br/>• Router C: Advertises <code>10.220.100.128/25</code> (/25 mask, range .128–.255)\n            <br/>• Router D: Advertises <code>10.220.100.240/28</code> (mask 255.255.255.240, block size of 16, range <strong>.240 through .255</strong>).</li>\n          <li>Target IP <code>.250</code> falls inside <code>10.220.100.240/28</code>. Under Longest Prefix Match, <strong>/28 is the longest matching mask</strong>. Traffic is forwarded through <strong>router D</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>router A</strong>: Advertises /16, least specific.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>router B</strong>: Advertises /24, less specific than /28.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>router C</strong>: Advertises /25, less specific than /28.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Longest Prefix Match Rule: Prefix length <code>/28</code> beats <code>/25</code>, <code>/24</code>, and <code>/16</code> every single time!</p>\n  </div>\n</div>"
    },
    {
        "id": 176,
        "questionNo": "Question #176",
        "question": "Refer to the exhibit. A packet sourced from 10.10.10.32 is destined for the Internet. What is the administrative distance for the destination route? (Choose one answer)",
        "options": [
            "A. 0",
            "B. 1",
            "C. 2",
            "D. 32"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/176.png",
        "originalSourceImage": "original_sources/176.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Static Default Route Administrative Distance</div>\n    <p>A default route (<code>0.0.0.0/0</code>) represents the gateway of last resort used to forward traffic destined for external networks like the Internet.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>1</strong>:\n        <ul>\n          <li>The exhibit displays a static default route: <code>S* 0.0.0.0/0 [1/0] via 192.168.1.1</code>.</li>\n          <li>The first number inside the bracket <code>[AD/Metric]</code> represents the Administrative Distance. For static routes in Cisco IOS, the default Administrative Distance is <strong>1</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>0</strong>: An AD of 0 is reserved for directly connected interfaces.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>2</strong>: Not the default administrative distance of a static route.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>32</strong>: 32 is host IP octet data, unrelated to administrative distance.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Static Route in routing table: <code>S* 0.0.0.0/0 [1/0]</code> &rarr; <strong>AD = 1</strong>, <strong>Metric = 0</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 177,
        "questionNo": "Question #177",
        "question": "Which feature is mandatory for a wireless network using WPA3-Personal mode? (Choose one answer)",
        "options": [
            "A. Fast Transition",
            "B. Opportunistic Wireless Encryption",
            "C. Protected Management Frame",
            "D. Enhanced Open"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/177.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Mandatory WPA3 Security Requirements (IEEE 802.11w)</div>\n    <p>Wi-Fi Protected Access 3 (WPA3) enforces stricter mandatory baseline security standards to protect wireless communications from eavesdropping and disruption.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>Protected Management Frame</strong>: In the WPA3 standard (both WPA3-Personal and WPA3-Enterprise), <strong>Protected Management Frames (PMF, IEEE 802.11w)</strong> is <strong>mandatory</strong>. PMF cryptographically authenticates and encrypts management frames (such as Deauthentication and Disassociation frames), protecting clients against wireless denial of service attacks.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Fast Transition</strong>: IEEE 802.11r roaming is optional in WPA3.</li>\n      <li><span class=\"opt-tag wrong\">Option B & D</span> <strong>Opportunistic Wireless Encryption / Enhanced Open</strong>: OWE (RFC 8110) provides unauthenticated encryption for open public hotspots, not WPA3-Personal which uses Pre-Shared Keys with SAE.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Two Non-Negotiable Requirements in WPA3-Personal:<br/>1. <strong>SAE (Simultaneous Authentication of Equals)</strong>.<br/>2. <strong>Mandatory PMF (Protected Management Frames, 802.11w)</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 178,
        "questionNo": "Question #178",
        "question": "Refer to the exhibit. Which configuration enables DHCP addressing for hosts connected to interface FastEthernet0/1 on router R4? (Choose one answer)",
        "options": [
            "A. interface FastEthernet0/0\n ip helper-address 10.0.1.1\n!\naccess-list 100 permit host 10.0.1.1 host 10.148.2.1 eq bootps",
            "B. interface FastEthernet0/1\n ip helper-address 10.0.1.1\n!\naccess-list 100 permit udp host 10.0.1.1 eq bootps host 10.148.2.1",
            "C. interface FastEthernet0/0\n ip helper-address 10.0.1.1\n!\naccess-list 100 permit udp host 10.0.1.1 eq bootps host 10.148.2.1",
            "D. interface FastEthernet0/1\n ip helper-address 10.0.1.1\n!\naccess-list 100 permit tcp host 10.0.1.1 eq 67 host 10.148.2.1"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/178.png",
        "originalSourceImage": "original_sources/178.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: DHCP Relay Agent (ip helper-address) & ACL Filtering</div>\n    <p>A DHCP Relay Agent converts client Layer 2 broadcast DISCOVER messages into unicast packets destined for a remote DHCP server across a router boundary.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span>:\n        <ul>\n          <li><strong>Helper Placement:</strong> The <code>ip helper-address 10.0.1.1</code> command must be applied to the inbound LAN interface receiving host broadcasts (FastEthernet0/1).</li>\n          <li><strong>ACL Rule:</strong> FastEthernet0/0 has an inbound ACL (<code>ip access-group 100 in</code>). Inbound DHCP responses from DHCP server 10.0.1.1 port 67 (bootps) to the router (10.148.2.1) must be permitted: <code>permit udp host 10.0.1.1 eq bootps host 10.148.2.1</code>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Options A & C</span>: Apply <code>ip helper-address</code> to FastEthernet0/0 (the WAN link). The router will not intercept client DHCP broadcasts unless the helper is on the LAN interface (Fa0/1). Option A also omits the <code>udp</code> keyword.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Specifies <code>tcp</code> instead of <code>udp</code>. DHCP operates exclusively over UDP (ports 67 and 68).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Always configure <code>ip helper-address</code> on the client-facing LAN interface where DHCP broadcasts originate, never on the WAN uplink.</p>\n  </div>\n</div>"
    },
    {
        "id": 179,
        "questionNo": "Question #179",
        "question": "What is a characteristic of encryption in wireless networks? (Choose one answer)",
        "options": [
            "A. identifies an access point on a WLAN",
            "B. encodes plain text into cipher text",
            "C. eliminates network piggybacking",
            "D. uses ciphers to authenticate"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/179.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Wireless Encryption Fundamentals</div>\n    <p>Encryption in wireless local area networks (WLANs) protects over-the-air frame transmissions by converting readable plaintext data into scrambled ciphertext using mathematical cryptographic algorithms and secret keys.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>encodes plain text into cipher text</strong>: The fundamental purpose of encryption protocols (such as AES-CCMP and TKIP) is confidentiality. An encryption algorithm takes the plaintext payload and transforms it into ciphertext so that any unauthorized receiver within RF range who captures the radio frames cannot read or decode the data without the cryptographic decryption key.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Access points are identified by their <strong>BSSID</strong> (MAC address) and <strong>SSID</strong> (network name), not by encryption.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Piggybacking (unauthorized association) is prevented by <strong>authentication</strong> and access control mechanisms, not encryption alone.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Ciphers perform encryption/decryption of payload data, whereas authentication verifies identity (e.g., via 802.1X/EAP, SAE, or PSK handshake).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Remember the CIA triad for wireless: <strong>Encryption provides Confidentiality</strong> (plaintext to ciphertext), <strong>MIC/Hashing provides Integrity</strong>, and <strong>802.1X/PSK/SAE provides Authentication</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 180,
        "questionNo": "Question #180",
        "question": "Refer to the exhibit. What data structure do the square brackets in the JSON example represent? (Choose one answer)",
        "options": [
            "A. array",
            "B. value",
            "C. key",
            "D. object"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/180.png",
        "originalSourceImage": "original_sources/180.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: JSON Syntax & Data Structures</div>\n    <p>JavaScript Object Notation (JSON, RFC 8259) uses standardized delimiters to format data: curly braces <code>{ }</code> define an <strong>object</strong>, while square brackets <code>[ ]</code> define an <strong>array</strong>.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>array</strong>: In JSON notation, square brackets <code>[ ]</code> represent an ordered collection of values or objects called an <strong>array</strong>. In the exhibit, line 1 opens with <code>[</code> and line 5 closes with <code>]</code>, containing multiple comma-separated JSON objects.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>value</strong>: A value is the specific data element stored within a key-value pair (such as a string, number, boolean, array, or object), not the square bracket structure itself.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>key</strong>: A key (field name) is always an enclosed string enclosed in double quotes preceding a colon (e.g., <code>\"firewall\":</code>).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>object</strong>: An object is delimited by curly brackets <code>{ }</code>, containing unordered sets of name/value pairs.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Quick JSON memory rule:<br/>• <code>{ }</code> = <strong>Object</strong> (key-value pairs)<br/>• <code>[ ]</code> = <strong>Array</strong> (ordered list of elements)</p>\n  </div>\n</div>"
    },
    {
        "id": 181,
        "questionNo": "Question #181",
        "question": "After a recent security breach and a RADIUS failure, an engineer must secure the console port of each enterprise router with a local username and password. Which configuration must the engineer apply to accomplish this task? (Choose one answer)",
        "options": [
            "A. aaa new-model\naaa authorization exec default local\naaa authentication login default radius\nusername localuser privilege 15 secret plaintextpassword",
            "B. aaa new-model\nline con 0\npassword plaintextpassword\nprivilege level 15",
            "C. username localuser secret plaintextpassword\nline con 0\nno login local\nprivilege level 15",
            "D. username localuser secret plaintextpassword\nline con 0\nlogin authentication default\nprivilege level 15"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/181.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS AAA Console Port Security</div>\n    <p>When AAA is active (<code>aaa new-model</code>) and external RADIUS/TACACS+ servers fail or require fallback, securing the local console (<code>line con 0</code>) requires defining a local user with secret credentials and applying default login authentication to the console line.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>:\n        <ul>\n          <li><code>username localuser secret plaintextpassword</code> creates a local administrator account with a modern cryptographic SHA-256 hashed password.</li>\n          <li>Under <code>line con 0</code>, <code>login authentication default</code> directs the console line to utilize the defined AAA default authentication method list, prompting for a local username and password.</li>\n          <li><code>privilege level 15</code> places authenticated console sessions directly into privileged EXEC mode.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Configures <code>aaa authentication login default radius</code>, meaning it will attempt RADIUS authentication, which directly contradicts the requirement to protect against RADIUS failures.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Uses legacy <code>password plaintextpassword</code> under <code>line con 0</code>, which only prompts for a password without a username.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Contains <code>no login local</code>, which explicitly disables local database authentication on the console line.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To enforce username-based authentication on the console line without AAA, use <code>login local</code>. When AAA is enabled, use <code>login authentication default</code> (or a named list).</p>\n  </div>\n</div>"
    },
    {
        "id": 182,
        "questionNo": "Question #182",
        "question": "Which two encoding methods are supported by REST APIs? (Choose two answers)",
        "options": [
            "A. XML",
            "B. YAML",
            "C. CSV",
            "D. Plain text",
            "E. JSON"
        ],
        "correctOption": [
            0,
            4
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/182.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: REST API Data Serialization Formats</div>\n    <p>RESTful APIs utilize HTTP verbs and standardized content-negotiation headers (<code>Accept</code> and <code>Content-Type</code>) to transmit human-readable, structured data payloads between client applications and controller endpoints.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A & E) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option E</span> <strong>JSON (JavaScript Object Notation)</strong>: JSON is the dominant encoding format for modern REST APIs (such as Cisco DNA Center / Catalyst Center) due to its lightweight syntax and native compatibility with Python dictionaries and web frontends (<code>application/json</code>).</li>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>XML (Extensible Markup Language)</strong>: XML is a widely supported encoding standard for enterprise REST APIs, NETCONF, and SOAP web services, using structured tags to represent data hierarchies (<code>application/xml</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>YAML</strong>: While popular for configuration management tools like Ansible, YAML is not a standard data-interchange encoding format for standard REST API endpoints.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>CSV</strong>: Comma-Separated Values is a tabular export format, not a hierarchical encoding method for REST APIs.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>Plain text</strong>: Plain text lacks structured hierarchy, schema definitions, and key-value typing required for robust RESTful data exchange.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Whenever Cisco CCNA asks for the two primary data formats used by REST APIs, the answer is always <strong>JSON and XML</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 183,
        "questionNo": "Question #183",
        "question": "Refer to the exhibit. If the network environment is operating normally, which type of device must be connected to interface fastethernet 0/1? (Choose one answer)",
        "options": [
            "A. access point",
            "B. DHCP client",
            "C. PC",
            "D. router"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/183.png",
        "originalSourceImage": "original_sources/183.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Dynamic ARP Inspection (DAI) Trust State</div>\n    <p>Dynamic ARP Inspection (DAI) intercepts all ARP requests and replies on untrusted ports to prevent ARP spoofing/poisoning (Man-in-the-Middle attacks). Ports connecting to trusted network infrastructure must be explicitly configured as trusted.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>router</strong>: In the exhibit, <code>interface fastethernet 0/1</code> is configured with <code>ip arp inspection trust</code>. By default, all switch ports are untrusted. Trusted ports bypass DAI rate-limiting and DHCP snooping binding database checks. Under normal operations, trusted ports connect to <strong>routers</strong> (default gateways), other switches, or network servers. Access ports connecting to end-user PCs or DHCP clients remain untrusted.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>access point</strong>: APs forwarding client traffic should terminate on untrusted access/trunk ports so client ARP packets are properly inspected.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>DHCP client</strong>: DHCP clients must always connect to <strong>untrusted</strong> ports; otherwise, a compromised client could send gratuitous ARP poison packets without validation.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>PC</strong>: End-user workstations must connect to untrusted ports so DAI can validate their ARP responses against the DHCP snooping binding table.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>DAI Rule of Thumb:</strong><br/>• <strong>Trusted ports</strong>: Routers, switches, and DHCP/DNS servers.<br/>• <strong>Untrusted ports</strong>: All end-user host and client access ports.</p>\n  </div>\n</div>"
    },
    {
        "id": 184,
        "questionNo": "Question #184",
        "question": "Which two values or settings must be entered when configuring a new WLAN in the Cisco Wireless LAN Controller GUI? (Choose two answers)",
        "options": [
            "A. SSID",
            "B. QoS settings",
            "C. management interface settings",
            "D. profile name",
            "E. IP address of one or more access points"
        ],
        "correctOption": [
            0,
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/184.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco Wireless LAN Controller (WLC) WLAN Creation</div>\n    <p>When creating a new Wireless LAN (WLAN) in the Cisco AireOS or Catalyst 9800 WLC management interface, the administrator must initially define fundamental identifying parameters before configuring radio policies, security parameters, and VLAN mappings.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A & D) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>SSID (Service Set Identifier)</strong>: The wireless network name that is broadcast in beacon frames and discovered by client devices seeking to connect.</li>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Profile Name</strong>: An administrative, unique text label used internally by the WLC controller to manage and reference the specific WLAN profile.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>QoS settings</strong>: Quality of Service profiles (Platinum, Gold, Silver, Bronze) are optional fine-tuning parameters configured on the QoS tab, not required initial parameters.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>management interface settings</strong>: The management interface is configured globally on the controller during initial setup, not when defining individual WLANs.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span> <strong>IP address of one or more access points</strong>: APs discover and join the WLC dynamically via CAPWAP/LWAPP; their IP addresses are never entered when creating a WLAN.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>On the Cisco WLC 'WLANs > Create New' dialogue, the only two mandatory text inputs are: <strong>Profile Name</strong> and <strong>SSID</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 185,
        "questionNo": "Question #185",
        "question": "How does Al contribute to network traffic analysis? (Choose one answer)",
        "options": [
            "A. It analyzes patterns for anomaly detection.",
            "B. It guarantees zero network downtime.",
            "C. It eliminates network threats.",
            "D. It makes ethical judgements on private data surveillance."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/185.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Artificial Intelligence & Machine Learning in AIOps</div>\n    <p>In modern enterprise networks (such as Cisco DNA Spaces, ThousandEyes, and Catalyst Center), Artificial Intelligence (AI) and Machine Learning (ML) analyze telemetry data to automate baseline creation and surface actionable network insights.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>It analyzes patterns for anomaly detection</strong>: Machine learning algorithms establish dynamic network baselines across thousands of telemetry parameters (throughput, latency, packet loss, client counts). When traffic deviations or behavioral anomalies occur, AI models instantly flag potential security threats, routing loops, or impending hardware degradation.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: No technology can guarantee 100% zero downtime; physical hardware faults and fiber cuts can still occur.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: AI does not eliminate all network threats; it detects and mitigates threats in tandem with security controls.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: AI systems process telemetry and network metadata based on mathematical models; they do not make philosophical or ethical judgements.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>For Cisco 200-301 CCNA automation topics, AI's primary contributions are: <strong>pattern recognition</strong>, <strong>anomaly detection</strong>, and <strong>predictive event forecasting</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 186,
        "questionNo": "Question #186",
        "question": "Which feature when used on a WLC allows it to bundle its distribution system ports into one 802.3ad group? (Choose one answer)",
        "options": [
            "A. QinQ",
            "B. LAG",
            "C. ISL",
            "D. PAgP"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/186.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Link Aggregation (LAG) on Cisco WLCs</div>\n    <p>Cisco Wireless LAN Controllers aggregate physical distribution system Ethernet ports connecting to the upstream distribution/core switch to deliver high availability and increased bandwidth.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>LAG (Link Aggregation)</strong>: Enabling Link Aggregation (LAG) on a Cisco WLC bundles all physical distribution ports into a single logical 802.3ad EtherChannel bundle. This provides active-active link redundancy, dynamic load balancing, and eliminates the need to map individual AP-manager interfaces to distinct physical ports.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>QinQ</strong>: IEEE 802.1ad (VLAN stacking) tunnels customer VLAN tags through a service provider network, unrelated to port aggregation.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>ISL</strong>: Cisco Inter-Switch Link is an obsolete proprietary VLAN trunking protocol replaced by IEEE 802.1Q.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>PAgP</strong>: Port Aggregation Protocol is a legacy Cisco-proprietary EtherChannel negotiation protocol; Cisco WLC LAG utilizes the industry-standard <strong>802.3ad</strong> standard (or static mode), not PAgP.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>When LAG is enabled on a Cisco WLC, all distribution ports combine into a single EtherChannel interface, requiring a reboot of the controller.</p>\n  </div>\n</div>"
    },
    {
        "id": 187,
        "questionNo": "Question #187",
        "question": "Which function does an iterative DNS query serve in the domain name resolution process? (Choose one answer)",
        "options": [
            "A. Allow a DNS client to contact several DNS servers until the correct information is found.",
            "B. Update records dynamically across multiple DNS servers at the same time.",
            "C. Encrypt communication automatically between DNS clients and servers.",
            "D. Obtain information directly from all root DNS servers configured within the scope."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/187.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Recursive vs. Iterative DNS Queries</div>\n    <p>The Domain Name System (DNS) uses two query mechanisms: <strong>recursive queries</strong> (where the server must return the final resolved answer or an error) and <strong>iterative queries</strong> (where the server returns the best referral to another DNS server).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>Allow a DNS client to contact several DNS servers until the correct information is found</strong>: In an iterative query, if the queried DNS server does not possess the requested record locally, it does not query downstream servers on behalf of the client. Instead, it responds with a referral (a pointer to an authoritative or TLD nameserver). The querying resolver or client then iteratively contacts each subsequent server until it reaches the authoritative server possessing the answer.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Dynamic record updates across servers are accomplished via <strong>Dynamic DNS (DDNS)</strong> and zone transfers (AXFR/IXFR), not iterative queries.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: DNS encryption is provided by protocols like <strong>DoH (DNS over HTTPS)</strong> or <strong>DoT (DNS over TLS)</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Clients do not query all root servers simultaneously; queries follow the root > TLD > authoritative server hierarchy.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><strong>Recursive Query:</strong> \"Get the answer for me.\"<br/><strong>Iterative Query:</strong> \"Give me the next best server referral, and I will query it myself.\"</p>\n  </div>\n</div>"
    },
    {
        "id": 188,
        "questionNo": "Question #188",
        "question": "Refer to the exhibit. Which functionalities will this SSID have while being used by wireless clients? (Choose one answer)",
        "options": [
            "A. decreases network security against offline dictionary attacks and encourages easy access to the network",
            "B. increases network security against man in the middle attacks and discourages denial of service attacks",
            "C. decreases network security against air sniffing attacks and discourages the use of complex passwords",
            "D. increases network security against offline dictionary attacks and discourages time-consuming brute force attacks"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/188.png",
        "originalSourceImage": "original_sources/188.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: WPA3 & Simultaneous Authentication of Equals (SAE)</div>\n    <p>WPA3-Personal replaces the legacy pre-shared key (PSK) 4-way handshake with <strong>SAE (Simultaneous Authentication of Equals)</strong> based on Dragonfly key exchange, offering dramatic security improvements over WPA2.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span>:\n        <ul>\n          <li>In the exhibit, the SSID is configured with <strong>WPA3 Policy</strong> and <strong>SAE / FT-SAE</strong> (Fast Transition SAE) enabled.</li>\n          <li>Unlike WPA2-PSK, SAE performs zero-knowledge proof authentication: eavesdroppers capturing the authentication exchange over the air cannot execute <strong>offline dictionary attacks</strong> against the captured handshake.</li>\n          <li>An attacker is forced into interacting directly with the access point for every single password guess, effectively discouraging time-consuming brute force attacks.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: WPA3 substantially <em>increases</em> security against offline dictionary attacks, rather than decreasing it.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: While SAE secures authentication, it does not prevent DoS attacks (e.g., RF jamming).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: WPA3 mandates <strong>Protected Management Frames (PMF)</strong>, significantly hardening air sniffing and deauthentication defenses.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Key WPA3-Personal Advantage: <strong>Forward Secrecy</strong> and complete immunity to <strong>offline dictionary/rainbow-table attacks</strong> due to the SAE (Dragonfly) handshake.</p>\n  </div>\n</div>"
    },
    {
        "id": 189,
        "questionNo": "Question #189",
        "question": "Refer to the exhibit. Which configuration is needed to configure a WLAN with WPA2 only and with a password that is 63 characters long? (Choose one answer)",
        "options": [
            "A. Enable PSK and FT PSK and then disable WPA Policy.",
            "B. Enable PSK using Hex format and then disable WPA Policy.",
            "C. Disable WPA Encryption and then enable FT PSK.",
            "D. Disable WPA Policy and WPA Encryption and then enable PSK using ASCII."
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/189.png",
        "originalSourceImage": "original_sources/189.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco WLC WPA2-Only & PSK Key Formatting</div>\n    <p>On Cisco Wireless LAN Controllers, configuring a WLAN strictly for WPA2 requires disabling the legacy WPA Policy checkbox and selecting the appropriate Pre-Shared Key (PSK) formatting (ASCII vs. Hexadecimal).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>Enable PSK using Hex format and then disable WPA Policy</strong>:\n        <ul>\n          <li>The exhibit shows both <code>WPA Policy</code> and <code>WPA2 Policy</code> checked (mixed mode). To enforce <strong>WPA2 only</strong>, the administrator must uncheck (disable) <code>WPA Policy</code>.</li>\n          <li>For the pre-shared key, standard WPA2 ASCII passphrases support 8 to 63 characters. However, when entering a raw pre-shared key directly in hexadecimal format, the key must be specified using <strong>Hex format</strong>, allowing precise 64-nibble / 256-bit pre-computed pairwise master keys.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Enabling FT PSK (802.11r fast transition) requires compatible client hardware and does not satisfy the key format requirements.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Disabling WPA encryption without disabling WPA Policy does not restrict the WLAN to WPA2-only.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Disabling both WPA Policy and WPA Encryption would compromise security settings and leave the network unencrypted.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>To configure a pure WPA2 network on AireOS WLC: Keep <strong>WPA2 Policy</strong> enabled, uncheck <strong>WPA Policy</strong>, and choose <strong>AES (CCMP)</strong> encryption.</p>\n  </div>\n</div>"
    },
    {
        "id": 190,
        "questionNo": "Question #190",
        "question": "Refer to the exhibit. Users on VLAN 100 can reach sites on the Internet. Which action must the administrator take to establish connectivity to the Internet for users in VLAN 200? (Choose one answer)",
        "options": [
            "A. Define a NAT pool on the router.",
            "B. Configure the ip nat outside command on another interface for VLAN 200.",
            "C. Configure static NAT translations for VLAN 200.",
            "D. Update the NAT_INSIDE_RANGES ACL."
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/190.png",
        "originalSourceImage": "original_sources/190.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS NAT Overload & Access Control Lists</div>\n    <p>Port Address Translation (PAT / NAT Overload) translates private IP addresses from inside subnets to an outside routable IP address using an Access Control List (ACL) to identify eligible traffic.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Update the NAT_INSIDE_RANGES ACL</strong>:\n        <ul>\n          <li>The running config in the exhibit shows:\n            <br/><code>ip access-list standard NAT_INSIDE_RANGES</code>\n            <br/><code> permit 10.10.10.0 0.0.0.255</code>\n            <br/><code>ip nat inside source list NAT_INSIDE_RANGES interface GigabitEthernet0/0 overload</code>\n          </li>\n          <li>VLAN 100 uses subnet <code>10.10.10.0/24</code>, which is permitted by the ACL.</li>\n          <li>VLAN 200 uses subnet <code>10.10.20.0/24</code> on subinterface <code>GigabitEthernet0/1.200</code>. Because <code>10.10.20.0/24</code> is not in the ACL, its outbound packets are denied translation and cannot access the Internet.</li>\n          <li>Updating the ACL to permit <code>10.10.20.0 0.0.0.255</code> immediately grants NAT access to VLAN 200 users.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: A NAT pool is used for dynamic pool NAT; this router is using interface PAT overload on <code>GigabitEthernet0/0</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: GigabitEthernet0/0 is already configured with <code>ip nat outside</code>, which faces the Internet. Outside interfaces must not be applied to internal VLANs.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Static NAT creates 1:1 permanent mappings typically reserved for public servers, not standard outbound client internet browsing.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Whenever internal subnets cannot reach the Internet via PAT, always inspect the <strong>match ACL referenced by the <code>ip nat inside source list</code> command</strong>!</p>\n  </div>\n</div>"
    },
    {
        "id": 191,
        "questionNo": "Question #191",
        "question": "Refer to the exhibit. Which route does R1 select for traffic that is destined to 192.168.16.27? (Choose one answer)",
        "options": [
            "A. 192.168.16.0/21",
            "B. 192.168.16.0/24",
            "C. 192.168.16.0/26",
            "D. 192.168.16.0/27"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/191.png",
        "originalSourceImage": "original_sources/191.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Longest Prefix Match (LPM) Rule</div>\n    <p>When a router has multiple routes covering a packet's destination IP address, it always forwards traffic according to the route with the <strong>longest subnet mask</strong> (most specific prefix), regardless of administrative distance or routing protocol.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>192.168.16.0/27</strong>:\n        <ul>\n          <li>Destination IP address: <code>192.168.16.27</code>.</li>\n          <li>Looking at the routing table in the exhibit:\n            <br/>• <code>192.168.16.0/21</code> (Mask length: 21)\n            <br/>• <code>192.168.16.0/24</code> (Mask length: 24)\n            <br/>• <code>192.168.16.0/26</code> (Mask length: 26, range: .0 - .63)\n            <br/>• <code>192.168.16.0/27</code> (Mask length: 27, range: .0 - .31)\n          </li>\n          <li>All four routes encompass the IP <code>192.168.16.27</code>. Because <strong>/27</strong> has the longest prefix (27 network bits), the router chooses <strong>192.168.16.0/27</strong> via 192.168.1.4.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>/21</strong>: Less specific than /24, /26, and /27.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>/24</strong>: Less specific than /26 and /27.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>/26</strong>: Less specific than /27. Although EIGRP (AD 90) has a lower administrative distance than IS-IS (AD 115), <strong>prefix length is evaluated FIRST</strong> before AD!</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Route Selection Order:<br/><strong>1. Longest Prefix Match (Subnet Mask)</strong> — Always wins first!<br/><strong>2. Administrative Distance (AD)</strong> — Only evaluated if masks are identical.<br/><strong>3. Metric</strong> — Evaluated if protocol and masks are identical.</p>\n  </div>\n</div>"
    },
    {
        "id": 192,
        "questionNo": "Question #192",
        "question": "Refer to the exhibit. Which network prefix was learned via EIGRP? (Choose one answer)",
        "options": [
            "A. 192.168.2.0/24",
            "B. 207.165.200.0/24",
            "C. 172.16.0.0/16",
            "D. 192.168.1.0/24"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/192.png",
        "originalSourceImage": "original_sources/192.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Routing Table Route Codes</div>\n    <p>The Cisco IOS <code>show ip route</code> output uses single and double-letter prefix codes to identify how each route was installed into the routing information base (RIB).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>192.168.2.0/24</strong>: In the exhibit routing table, the entry reads:\n        <br/><code>D    192.168.2.0/24 [90/84437] via 207.165.200.254...</code>\n        <br/>The code letter <strong>D</strong> stands for <strong>EIGRP</strong> (derived from the DUAL algorithm - Diffusing Update Algorithm). Furthermore, the administrative distance is <strong>90</strong>, which is the default AD for internal EIGRP routes.\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>207.165.200.0/24</strong>: Variably subnetted into static (<code>S</code>) and connected/local (<code>C</code>/<code>L</code>) routes.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>172.16.0.0/16</strong>: Variably subnetted with connected (<code>C</code>), local (<code>L</code>), and RIP (<code>R</code>, AD 120) routes.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>192.168.1.0/24</strong>: Prefixed with code <code>O</code> and AD 110, indicating it was learned via <strong>OSPF</strong>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Common Route Codes to Memorize:<br/>• <strong>C</strong> = Connected | <strong>S</strong> = Static<br/>• <strong>R</strong> = RIP (AD 120)<br/>• <strong>O</strong> = OSPF (AD 110)<br/>• <strong>D</strong> = EIGRP (AD 90)<br/>• <strong>B</strong> = BGP (eBGP 20, iBGP 200)</p>\n  </div>\n</div>"
    },
    {
        "id": 193,
        "questionNo": "Question #193",
        "question": "Refer to the exhibit. What is the next hop for a packet destined for 10.1.1.1? (Choose one answer)",
        "options": [
            "A. Vlan72",
            "B. Vlan82",
            "C. 172.17.0.2",
            "D. 10.3.25.1"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/193.png",
        "originalSourceImage": "original_sources/193.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Gateway of Last Resort (Default Routing)</div>\n    <p>If a destination IP address does not match any specific network, subnet, or host route in the routing table, the router forwards the packet to the configured <strong>Gateway of Last Resort</strong> (default route <code>0.0.0.0/0</code>).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>172.17.0.2</strong>:\n        <ul>\n          <li>The packet destination is <code>10.1.1.1</code>.</li>\n          <li>Reviewing the routing table in the exhibit, all specific routes belong to either the <code>10.2.x.x</code> or <code>10.3.x.x</code> subnets. There is no route matching <code>10.1.x.x</code>.</li>\n          <li>The router falls back to the default route:\n            <br/><code>S* 0.0.0.0/0 [1/0] via 172.17.0.2</code>\n          </li>\n          <li>Therefore, the next-hop IP address for traffic destined to 10.1.1.1 is <strong>172.17.0.2</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>Vlan72</strong>: Exit interface for local subnets like 10.3.25.0/24, not the next hop for 10.1.1.1.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>Vlan82</strong>: Exit interface for subnets in the 10.2.x.x range.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>10.3.25.1</strong>: Next hop for specific OSPF routes destined for 10.3.17.0/24 and 10.3.24.0/24.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>When searching a routing table for an IP address: If no prefix covers the target IP, immediately locate the <code>0.0.0.0/0</code> route to find the next hop.</p>\n  </div>\n</div>"
    },
    {
        "id": 194,
        "questionNo": "Question #194",
        "question": "What is a difference between TACACS+ and RADIUS? (Choose one answer)",
        "options": [
            "A. TACACS+ separates authentication and authorization, and RADIUS merges them.",
            "B. TACACS+ logs only start, stop, and interim commands, but RADIUS logs all commands that are entered by the administrator.",
            "C. TACACS+ is used for dial-up access, and RADIUS encrypts the entire packet for security.",
            "D. TACACS+ encrypts only password information, and RADIUS encrypts the entire payload."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/194.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: TACACS+ vs. RADIUS Protocols</div>\n    <p>TACACS+ (Terminal Access Controller Access-Control System Plus) and RADIUS (Remote Authentication Dial-In User Service) are the two primary AAA protocols used for centralized network administration.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>TACACS+ separates authentication and authorization, and RADIUS merges them</strong>:\n        <ul>\n          <li><strong>TACACS+:</strong> Uses a modular architecture separating <strong>Authentication</strong>, <strong>Authorization</strong>, and <strong>Accounting</strong> into distinct, independent processes. This allows fine-grained per-command authorization (command accounting and privilege checks).</li>\n          <li><strong>RADIUS:</strong> Merges authentication and authorization into single Access-Request and Access-Accept packet exchanges, making per-command authorization impractical.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: TACACS+ is renowned for per-command authorization and full per-command accounting logs, whereas RADIUS only logs start/stop/interim records.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: TACACS+ is predominantly used for router/switch device administration, not dial-up. Furthermore, TACACS+ encrypts the entire payload.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Inverted! <strong>TACACS+ encrypts the entire packet payload</strong> (TCP 49), whereas <strong>RADIUS encrypts only the password attribute</strong> (UDP 1812/1813).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Comparison Checklist:<br/>• <strong>TACACS+:</strong> Cisco-developed, TCP 49, Encrypts entire packet, Separates Auth & Authz (ideal for device admin).<br/>• <strong>RADIUS:</strong> IETF standard, UDP 1812/1813, Encrypts password only, Merges Auth & Authz (ideal for dot1x client access).</p>\n  </div>\n</div>"
    },
    {
        "id": 195,
        "questionNo": "Question #195",
        "question": "What is a function of a northbound API in an SDN environment? (Choose one answer)",
        "options": [
            "A. It facilitates communication between controllers and orchestration platforms.",
            "B. It upgrades software and restores files.",
            "C. It relies on global provisioning and configuration.",
            "D. It supports distributed processing for configuration."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/195.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Software-Defined Networking (SDN) Architecture</div>\n    <p>In Software-Defined Networking, an SDN controller sits centrally between applications and physical network elements, providing distinct Northbound and Southbound application programming interfaces (APIs).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>It facilitates communication between controllers and orchestration platforms</strong>:\n        <ul>\n          <li><strong>Northbound APIs:</strong> Typically REST/RESTful APIs enabling high-level business applications, cloud orchestration tools, and network automation scripts to communicate intent to the SDN controller.</li>\n          <li><strong>Southbound APIs:</strong> (e.g., OpenFlow, NETCONF, RESTCONF, SNMP, SSH) communicate downward from the controller to configure and program the data planes of physical and virtual network devices.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Upgrading firmware and restoring files are operational tasks that can be performed via automation, but they do not describe the architectural role of Northbound APIs.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Controllers centralize provisioning rather than relying on distributed device-by-device configuration.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: SDN replaces traditional distributed control processing with centralized management.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Directional SDN API Guide:<br/>• <strong>Northbound (Up):</strong> Controller <-> Business Applications / Orchestration (REST/HTTP).<br/>• <strong>Southbound (Down):</strong> Controller <-> Network Switches & Routers (NETCONF/OpenFlow).</p>\n  </div>\n</div>"
    },
    {
        "id": 196,
        "questionNo": "Question #196",
        "question": "How do predictive Al models enhance network resource allocation? (Choose one answer)",
        "options": [
            "A. They anticipate future traffic spikes.",
            "B. They automate the assignment of IP addresses to devices.",
            "C. They generate real-time reports on current bandwidth usage.",
            "D. They select correct cabling types for deployment."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/196.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Predictive AI in Network Resource Allocation</div>\n    <p>Predictive Artificial Intelligence leverages historical telemetry, recurring cyclical trends, and time-series machine learning models to forecast future traffic patterns and optimize network bandwidth and compute resources.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>They anticipate future traffic spikes</strong>: Predictive AI analyzes past bandwidth consumption, day-of-week trends, and scheduled events to accurately project network demand surges. This enables network controllers to proactively allocate QoS queues, adjust SD-WAN path policies, and spin up virtual network functions before congestion causes packet loss.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Dynamic IP assignment is handled deterministically by <strong>DHCP servers</strong> or IPAM systems, not predictive AI.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Generating real-time reporting describes <strong>descriptive monitoring</strong> (e.g., SNMP, NetFlow, telemetry dashboards), not predictive forecasting.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Physical cabling selection (Cat6a vs. SMF/MMF) is determined by distance, bandwidth requirements, and IEEE physical layer standards during physical installation.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Predictive AI is all about <strong>forecasting future conditions</strong> (e.g., traffic surges, hardware failure probabilities) to enable proactive automated remediation.</p>\n  </div>\n</div>"
    },
    {
        "id": 197,
        "questionNo": "Question #197",
        "question": "Which plane is centralized by an SDN controller? (Choose one answer)",
        "options": [
            "A. control-plane",
            "B. data-plane",
            "C. management-plane",
            "D. services-plane"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/197.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: SDN Plane Separation & Centralization</div>\n    <p>Traditional networking tightly couples the management, control, and data planes inside every individual box. SDN abstracts the network by decoupling these planes and relocating specific responsibilities to a software controller.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>control-plane</strong>: The core definition of Software-Defined Networking is the separation of the <strong>control plane</strong> from the data plane and its <strong>centralization within the SDN controller</strong>. The controller computes topology, maintains global path computation, and pushes forwarding instructions down to the distributed hardware data planes.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>data-plane</strong>: The data plane (forwarding plane) remains distributed on the physical network switches and routers (ASICs) to forward packets at high wire-speed.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>management-plane</strong>: The management plane (SSH, HTTPS, GUI) allows humans to configure the controller, but the plane fundamentally centralized and orchestrated by the controller architecture is the control plane.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>services-plane</strong>: Not the primary networking plane defined in SDN architectural models.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Classic SDN Question: <strong>Which plane is centralized?</strong> The <strong>Control Plane</strong>. Which plane remains distributed on devices? The <strong>Data (Forwarding) Plane</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 198,
        "questionNo": "Question #198",
        "question": "How does automation affect network management processes? (Choose one answer)",
        "options": [
            "A. It provides a reactive support model.",
            "B. It interoperates with ISE to define and manage patch and update schedules.",
            "C. It improves the efficiency of system lifecycle management.",
            "D. It performs configuration updates based on user profiles."
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/198.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Automated Network Lifecycle Management</div>\n    <p>Network automation tools (such as Cisco DNA Center / Catalyst Center, Ansible, and Terraform) govern network infrastructure through all phases: Day 0 (plan/design), Day 1 (deploy/provision), and Day 2 (monitor/maintain/upgrade).</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>It improves the efficiency of system lifecycle management</strong>: Automated software image management (SWIM), standardized golden image rollouts, automated compliance scanning, and templated configurations eliminate human error and reduce provisioning cycles from weeks to minutes across the entire device lifecycle.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Automation shifts network operations to a <strong>proactive</strong> model, rather than a reactive support model.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Cisco ISE is an identity and policy engine controlling NAC/802.1X; it does not define switch OS patch schedules.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Infrastructure automation manages network hardware and topology configurations, not individual user workstation profiles.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>A primary business benefit of network automation is standardizing and accelerating <strong>system lifecycle management</strong> (Day 0, Day 1, Day 2 operations).</p>\n  </div>\n</div>"
    },
    {
        "id": 199,
        "questionNo": "Question #199",
        "question": "Refer to the exhibit. What is represented by the curly brackets in line 3 within this JSON schema? (Choose one answer)",
        "options": [
            "A. object",
            "B. key",
            "C. array",
            "D. value"
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/199.png",
        "originalSourceImage": "original_sources/199.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: JSON Syntax & Object Representation</div>\n    <p>JavaScript Object Notation (JSON) structures data using two universal structures: collections of name/value pairs called <strong>objects</strong>, and ordered lists of values called <strong>arrays</strong>.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>object</strong>:\n        <ul>\n          <li>In the exhibit on line 3: <code>{\"VPN concentrator\": \"VPN_dubai\", \"port\": \"fe0/10\"},</code>.</li>\n          <li>The curly brackets <code>{ }</code> represent a JSON <strong>object</strong>, which encapsulates key-value pairs separated by commas.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>key</strong>: The keys are the specific string identifiers (<code>\"VPN concentrator\"</code> and <code>\"port\"</code>).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span> <strong>array</strong>: Arrays are designated by square brackets <code>[ ]</code> (seen on lines 1 and 5).</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>value</strong>: The values are the associated data items (<code>\"VPN_dubai\"</code> and <code>\"fe0/10\"</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Remember:<br/>• Curly braces <code>{ }</code> = <strong>Object</strong><br/>• Square brackets <code>[ ]</code> = <strong>Array</strong></p>\n  </div>\n</div>"
    },
    {
        "id": 200,
        "questionNo": "Question #200",
        "question": "How does automation reduce the operational complexity of a managed network? (Choose one answer)",
        "options": [
            "A. streamlines monitoring using SNMP and other polling tools",
            "B. categorizes traffic and provides insights",
            "C. reduces the response time for specific requests to devices with many interfaces",
            "D. allows the controller to be vendor-agnostic"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/200.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Automation & Vendor-Agnostic Abstraction</div>\n    <p>Modern network automation platforms (such as Ansible, Terraform, and open SDN controllers) abstract device-level CLI syntaxes into common data models, enabling unified control across multi-vendor networks.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>allows the controller to be vendor-agnostic</strong>: Automation frameworks and SDN architectures use open data-modeling standards (like <strong>YANG</strong>) and open Southbound protocols (like <strong>NETCONF/RESTCONF</strong>) to decouple management from proprietary CLI syntaxes. This enables an enterprise to manage multi-vendor network fleets through unified, vendor-agnostic playbooks and API calls.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Automation moves networks away from legacy, high-overhead SNMP polling towards modern <strong>model-driven telemetry</strong>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Categorizing traffic is a function of QoS classification or NBAR, not the definition of operational simplicity reduction.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Automation improves efficiency across devices, but speed of individual interface requests is not the principal operational benefit.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>YANG data modeling combined with NETCONF/RESTCONF enables <strong>vendor-neutral</strong> programmability, preventing vendor lock-in.</p>\n  </div>\n</div>"
    },
    {
        "id": 201,
        "questionNo": "Question #201",
        "question": "How do generative Al models support network design testing? (Choose one answer)",
        "options": [
            "A. They model pre-deployment network scenarios.",
            "B. They deploy network firmware updates.",
            "C. They enhance data packet delivery speeds.",
            "D. They compute optimal data storage solutions."
        ],
        "correctOption": [
            0
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/201.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Generative AI in Pre-Deployment Network Validation</div>\n    <p>Generative Artificial Intelligence (GenAI) models can synthesize realistic network configurations, synthetic traffic profiles, and topology behaviors to stress-test designs before production rollout.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option A) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <strong>They model pre-deployment network scenarios</strong>: Generative AI can generate digital twins, simulate complex failure cascades (link cuts, node failures, BGP route flaps), and synthesize edge-case network conditions. This allows engineers to validate routing behavior, security policy enforcement, and capacity limits safely prior to live deployment.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Deploying firmware images is executed by image management workflows (e.g., Cisco SWIM or Ansible), not Generative AI.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Packet delivery speed is governed by physical media (optics/copper) and ASIC switching latency.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Storage optimization is an infrastructure and database engineering task, unrelated to network design testing.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Generative AI supports network testing primarily by <strong>generating synthetic configurations</strong> and <strong>modeling pre-deployment failure scenarios</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 202,
        "questionNo": "Question #202",
        "question": "Which interface condition is occurring in this output? (Choose one answer)",
        "options": [
            "A. bad NIC",
            "B. duplex mismatch",
            "C. queueing",
            "D. broadcast storm"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": "R33# show interface fa0/0\nFastEthernet0/0 is up, line protocol is up\nHardware is DEC21140, address is ca02.7788.0000 (bia ca02.7788.0000)\nDescription: finance_subnet\nInternet address is 10.32.102.2/30\nMTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,\nreliability 255/255, txload 1/255, rxload 1/255\nEncapsulation ARPA, loopback not set\nKeepalive set (60 sec)\nFull-duplex, 100 Mb/s, 100BaseTX/FX\nARP type: ARPA, ARP Timeout 04:00:00\nLast input 00:00:01, output 00:00:00, output hang never\nLast clearing of \"show interface\" counters 00:00:18\nInput queue: 185/300/0/0 (size/max/drops/flushes); Total output drops: 140\nQueueing strategy: fifo\nOutput queue: 125/300 (size/max)\n30 second input rate 0 bits/sec, 0 packets/sec\n30 second output rate 0 bits/sec, 0 packets/sec\n7331 packets input, 7101162 bytes\nReceived 267 broadcasts (0 IP multicasts)\n0 runts, 0 giants, 0 throttles\n0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n0 watchdog\n0 input packets with dribble condition detected\n3927 packets output, 1440403 bytes, 0 underruns\n0 output errors, 0 collisions, 0 interface resets\n0 unknown protocol drops\n0 babbles, 0 late collision, 0 deferred\n0 lost carrier, 0 no carrier\n0 output buffer failures, 0 output buffers swapped out",
        "exhibitImage": null,
        "originalSourceImage": "original_sources/202.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Interface Output Analysis — Buffer Queueing</div>\n    <p>When packets arrive faster than an interface can transmit them onto the wire, the router buffers packets into interface queues. When queues reach capacity, queue drops occur.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>queueing</strong>:\n        <ul>\n          <li>Examine the command output from R33:\n            <br/><code>Input queue: 185/300/0/0 (size/max/drops/flushes); Total output drops: 140</code>\n            <br/><code>Output queue: 125/300 (size/max)</code>\n          </li>\n          <li>Notice the non-zero queue depths: <strong>185 packets</strong> currently held in the input queue and <strong>125 packets</strong> held in the output queue, along with <strong>140 output drops</strong>.</li>\n          <li>This indicates interface <strong>queueing</strong> under temporary congestion or packet processing delays.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>bad NIC</strong>: Physical hardware faults result in CRC errors, runts, giants, framing errors, or frequent interface resets—all of which are currently <code>0</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>duplex mismatch</strong>: Duplex mismatches produce high late collisions and CRC errors; here late collisions are <code>0</code> and line is Full-duplex.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>broadcast storm</strong>: The counter shows only <code>267 broadcasts</code> received, which is normal and far below a broadcast storm threshold.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>When <code>Input queue: X/300</code> or <code>Output queue: X/300</code> displays significant numbers with output drops and zero CRC/collisions, the condition is <strong>queueing</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 203,
        "questionNo": "Question #203",
        "question": "What is a characteristic of encryption in wireless networks? (Choose one answer)",
        "options": [
            "A. Intercepts data threats before they attack a network",
            "B. Uses integrity checks to identify forgery attacks",
            "C. Uses a unidirectional handshake for authentication",
            "D. Prevents intercepted data from being easily read"
        ],
        "correctOption": [
            3
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/203.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Wireless Encryption & Data Confidentiality</div>\n    <p>Wireless transmissions propagate omnidirectionally through the air. Because physical access to radio waves cannot be blocked, encryption is essential to render captured traffic unreadable to unauthorized parties.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option D) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option D</span> <strong>Prevents intercepted data from being easily read</strong>: Strong wireless encryption protocols (like AES-CCMP in WPA2 and AES-GCMP in WPA3) mathematically transform plaintext into ciphertext. Even if an attacker captures the raw 802.11 frames using packet sniffers, they cannot read the sensitive payload without the dynamic decryption keys.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Encryption protects confidentiality; firewalls, IPS, and WIPS intercept active attack threats.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span>: Integrity checks (MIC / HMAC) detect tampering, but the core characteristic of encryption is confidentiality (preventing data from being read).</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: 802.11 authentication uses bidirectional multi-way handshakes (such as the 4-way handshake or Dragonfly SAE exchange), not a unidirectional handshake.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Confidentiality = <strong>Encryption</strong> (scrambles data). Integrity = <strong>Hashing / MIC</strong> (detects tampering). Availability = <strong>Redundancy / RF management</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 204,
        "questionNo": "Question #204",
        "question": "What is a characteristic of a Layer 2 switch? (Choose one answer)",
        "options": [
            "A. transfers all frames received to every connected device",
            "B. forwards Ethernet frames using hardware-based MAC address tables",
            "C. prioritizes traffic using deep packet inspection",
            "D. Limits MAC address learning for faster transmission"
        ],
        "correctOption": [
            1
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": null,
        "originalSourceImage": "original_sources/204.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Layer 2 Switch Operation & MAC Address Forwarding</div>\n    <p>Layer 2 Ethernet switches forward frames based on destination MAC addresses using dedicated hardware tables (CAM - Content Addressable Memory) and specialized ASICs.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option B) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option B</span> <strong>forwards Ethernet frames using hardware-based MAC address tables</strong>:\n        <ul>\n          <li>A Layer 2 switch dynamically inspects the <strong>source MAC address</strong> of incoming frames to populate its MAC address table (CAM table).</li>\n          <li>When forwarding frames, it performs an ultra-fast hardware lookup (ASIC) matching the <strong>destination MAC address</strong> against the CAM table to forward the frame exclusively to the egress port where the target device resides.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span>: Flooding frames to all connected ports is the behavior of an unmanaged <strong>legacy hub</strong>, or a switch handling an unknown unicast frame, not normal unicast switching.</li>\n      <li><span class=\"opt-tag wrong\">Option C</span>: Deep packet inspection (DPI) is performed at Layer 7 by Next-Generation Firewalls (NGFW) and advanced routers, not Layer 2 switches.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: Switches actively learn MAC addresses dynamically on all incoming frames to prevent flooding and optimize transmission.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Layer 2 switches make forwarding decisions based on the <strong>Destination MAC address</strong> using <strong>hardware-based CAM tables (ASICs)</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 205,
        "questionNo": "Question #205",
        "question": "Which interface condition is occurring in this output? (Choose one answer)",
        "options": [
            "A. duplex mismatch",
            "B. broadcast storm",
            "C. queueing",
            "D. bad NIC"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": "R24# show interface fa0/0\nFastEthernet0/0 is up, line protocol is up\nHardware is DEC21140, address is ca02.7788.0000 (bia ca02.7788.0000)\nDescription: losangeles_subnet\nInternet address is 10.32.102.2/30\nMTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,\nreliability 255/255, txload 1/255, rxload 1/255\nEncapsulation ARPA, loopback not set\nKeepalive set (60 sec)\nFull-duplex, 100 Mb/s, 100BaseTX/FX\nARP type: ARPA, ARP Timeout 04:00:00\nLast input 00:00:01, output 00:00:00, output hang never\nLast clearing of \"show interface\" counters 00:00:18\nInput queue: 200/300/0/0 (size/max/drops/flushes); Total output drops: 100\nQueueing strategy: fifo\nOutput queue: 75/300 (size/max)\n30 second input rate 0 bits/sec, 0 packets/sec\n30 second output rate 0 bits/sec, 0 packets/sec\n7331 packets input, 7101162 bytes\nReceived 267 broadcasts (0 IP multicasts)\n0 runts, 0 giants, 0 throttles\n0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n0 watchdog\n0 input packets with dribble condition detected\n3927 packets output, 1440403 bytes, 0 underruns\n0 output errors, 0 collisions, 0 interface resets\n0 unknown protocol drops\n0 babbles, 0 late collision, 0 deferred\n0 lost carrier, 0 no carrier\n0 output buffer failures, 0 output buffers swapped out",
        "exhibitImage": null,
        "originalSourceImage": "original_sources/205.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: IOS Interface Queuing & Drop Counters</div>\n    <p>Monitoring the output of <code>show interface</code> provides visibility into link health, operational status, error rates, and queue utilization under varying traffic conditions.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>queueing</strong>:\n        <ul>\n          <li>Reviewing the output of R24:\n            <br/><code>Input queue: 200/300/0/0 (size/max/drops/flushes); Total output drops: 100</code>\n            <br/><code>Output queue: 75/300 (size/max)</code>\n          </li>\n          <li>The input queue currently holds <strong>200 packets</strong> (out of 300 maximum capacity), and the output queue holds <strong>75 packets</strong>, with <strong>100 output drops</strong> recorded.</li>\n          <li>There are 0 CRC errors, 0 collisions, 0 frame errors, and 0 runts/giants. This signifies normal transmission hardware experiencing buffer <strong>queueing</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>duplex mismatch</strong>: Characterized by late collisions, runt frames, and FCS errors. Here collisions and errors are <code>0</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>broadcast storm</strong>: Only <code>267 broadcasts</code> received, which is normal network traffic.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>bad NIC</strong>: Hardware NIC defects cause runts, giants, CRC errors, and interface resets (all <code>0</code>).</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Non-zero numbers in <code>Input queue: size/max</code> and <code>Output queue: size/max</code> directly diagnose an interface experiencing active <strong>queueing</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 206,
        "questionNo": "Question #206",
        "question": "Refer to the exhibit. An engineer is updating the management access configuration of switch SW1 to allow secured, encrypted remote configuration. Which two commands or command sequences must the engineer apply to the switch? (Choose two answers)",
        "options": [
            "A. SW1(config)# ip ssh version 2",
            "B. SW1(config)# username NEW secret R3mote123",
            "C. SW1(config)# line vty 0 15\nSW1(config-line)# transport input ssh",
            "D. SW1(config)# crypto key generate rsa",
            "E. SW1(config)# interface f0/1\nSW1(config-if)# switchport mode trunk"
        ],
        "correctOption": [
            0,
            2
        ],
        "points": 10,
        "cliSnippet": null,
        "exhibitImage": "exhibits/206.png",
        "originalSourceImage": "original_sources/206.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Cisco IOS Secure Remote Access (SSHv2) Configuration</div>\n    <p>To replace insecure clear-text Telnet with Secure Shell (SSH), a Cisco switch requires: hostname, domain name, RSA crypto keys, a local user account, and configuring VTY lines to accept only SSH transport.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answers (Options A & C) are Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option A</span> <code>SW1(config)# ip ssh version 2</code>: Enforces SSH version 2, which eliminates known security vulnerabilities present in SSH version 1.</li>\n      <li><span class=\"opt-tag correct\">Option C</span> <code>SW1(config)# line vty 0 15</code> followed by <code>SW1(config-line)# transport input ssh</code>:\n        <ul>\n          <li>The exhibit shows that <code>line vty 0 4</code> and <code>line vty 5 15</code> currently have <code>transport input telnet</code> configured.</li>\n          <li>Changing this to <code>transport input ssh</code> restricts remote management access exclusively to encrypted SSH connections and blocks unencrypted Telnet.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option B</span>: A local username (<code>username CCNA privilege 1 password 0 cisco123</code>) already exists in the running configuration.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span>: <code>show crypto key mypubkey rsa</code> at the bottom of the exhibit demonstrates that an RSA key pair (<code>SW1.CCNA-test</code>) is <strong>already generated</strong>. Regenerating it is unnecessary.</li>\n      <li><span class=\"opt-tag wrong\">Option E</span>: Configuring interface F0/1 as a VLAN trunk does not secure remote management access to the switch.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p>Essential SSH Configuration Steps:<br/>1. <code>hostname [name]</code> & <code>ip domain-name [domain]</code><br/>2. <code>crypto key generate rsa</code> (already done in exhibit)<br/>3. <code>username [user] secret [pass]</code><br/>4. <strong><code>ip ssh version 2</code></strong><br/>5. <strong><code>line vty 0 15</code> > <code>transport input ssh</code></strong></p>\n  </div>\n</div>"
    },
    {
        "id": 207,
        "questionNo": "Question #207",
        "question": "Which interface condition is occurring in this output? (Choose one answer)",
        "options": [
            "A. duplex mismatch",
            "B. queueing",
            "C. high throughput",
            "D. bad NIC"
        ],
        "correctOption": [
            2
        ],
        "points": 10,
        "cliSnippet": "R18# show interface fa0/0\nFastEthernet0/0 is up, line protocol is up\nHardware is DEC21140, address is ca02.7788.0000 (bia ca02.7788.0000)\nDescription: dallas_subnet\nInternet address is 10.32.102.2/30\nMTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,\nreliability 255/255, txload 255/255, rxload 255/255\nEncapsulation ARPA, loopback not set\nKeepalive set (60 sec)\nFull-duplex, 100 Mb/s, 100BaseTX/FX\nARP type: ARPA, ARP Timeout 04:00:00\nLast input 00:00:01, output 00:00:00, output hang never\nLast clearing of \"show interface\" counters 00:00:18\nInput queue: 0/300/0/0 (size/max/drops/flushes); Total output drops: 0\nQueueing strategy: fifo\nOutput queue: 0/300 (size/max)\n30 second input rate 98000000 bits/sec, 40 packets/sec\n30 second output rate 95000000 bits/sec, 40 packets/sec\n7331 packets input, 7101162 bytes\nReceived 267 broadcasts (0 IP multicasts)\n0 runts, 0 giants, 0 throttles\n0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n0 watchdog\n0 input packets with dribble condition detected\n3927 packets output, 1440403 bytes, 0 underruns\n0 output errors, 0 collisions, 0 interface resets\n0 unknown protocol drops\n0 babbles, 0 late collision, 0 deferred\n0 lost carrier, 0 no carrier\n0 output buffer failures, 0 output buffers swapped out",
        "exhibitImage": null,
        "originalSourceImage": "original_sources/207.webp",
        "explanation": "<div class=\"explanation-rich-content\">\n  <div class=\"expl-card concept-card\">\n    <div class=\"section-title-concept\">📌 Core Concept: Interface High Throughput & Utilization Diagnostics</div>\n    <p>The <code>show interface</code> command displays transmit and receive load metrics expressed as fractions out of 255 (where 255/255 represents 100% link saturation), alongside rolling bit and packet rates.</p>\n  </div>\n\n  <div class=\"expl-card correct-card\">\n    <h4 class=\"section-title-correct\">✓ Why the Correct Answer (Option C) is Correct:</h4>\n    <ul>\n      <li><span class=\"opt-tag correct\">Option C</span> <strong>high throughput</strong>:\n        <ul>\n          <li>Analyze the parameters for FastEthernet0/0 on R18:\n            <br/>• <strong>Bandwidth:</strong> <code>BW 100000 Kbit/sec</code> (100 Mbps FastEthernet)\n            <br/>• <strong>Load Metrics:</strong> <code>txload 255/255, rxload 255/255</code> (Maximum 100% saturation!)\n            <br/>• <strong>Traffic Rates:</strong> <code>30 second input rate 98000000 bits/sec</code> (98 Mbps), <code>output rate 95000000 bits/sec</code> (95 Mbps).\n          </li>\n          <li>The interface is actively operating at 95–98% of its theoretical maximum line capacity with zero errors, perfectly demonstrating <strong>high throughput</strong>.</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card incorrect-card\">\n    <h4 class=\"section-title-incorrect\">✗ Why Other Options are Incorrect:</h4>\n    <ul>\n      <li><span class=\"opt-tag wrong\">Option A</span> <strong>duplex mismatch</strong>: Duplex mismatches produce collisions and input errors; all error counters here are <code>0</code>.</li>\n      <li><span class=\"opt-tag wrong\">Option B</span> <strong>queueing</strong>: Both <code>Input queue: 0/300</code> and <code>Output queue: 0/300</code> are empty with <code>0 drops</code>, proving the hardware is keeping up with line rate without backing up in buffers.</li>\n      <li><span class=\"opt-tag wrong\">Option D</span> <strong>bad NIC</strong>: All physical errors (CRC, runts, giants, frame) are <code>0</code>.</li>\n    </ul>\n  </div>\n\n  <div class=\"expl-card tip-card\">\n    <h4 class=\"section-title-tip\">💡 CCNA Exam Tip:</h4>\n    <p><code>txload 255/255</code> and <code>rxload 255/255</code> combined with bit rates nearing the interface bandwidth (e.g. 98 Mbps on a 100 Mbps link) signifies <strong>high throughput / maximum link utilization</strong>.</p>\n  </div>\n</div>"
    },
    {
        "id": 228,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #1",
        "question": "Drag and drop the attack mitigation techniques from the left onto the types of attack that they mitigate on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "configure the DHCP snooping feature and DAI",
                "disable the Dynamic Trunking Protocol (DTP)",
                "configure the native VLAN with a dedicated nondefault VLAN ID"
            ],
            "targets": [
                "Man-in-the-Middle / DHCP Spoofing Attack",
                "Switch-Spoofing VLAN-Hopping Attack",
                "802.1Q Double-Tagging VLAN-Hopping Attack"
            ],
            "correctMatches": {
                "Man-in-the-Middle / DHCP Spoofing Attack": "configure the DHCP snooping feature and DAI",
                "Switch-Spoofing VLAN-Hopping Attack": "disable the Dynamic Trunking Protocol (DTP)",
                "802.1Q Double-Tagging VLAN-Hopping Attack": "configure the native VLAN with a dedicated nondefault VLAN ID"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 214,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #2",
        "question": "Refer to the exhibit. Drag and drop the subnet masks from the left onto the corresponding subnets on the right. Not all subnet masks are used.",
        "points": 10,
        "exhibitImage": "exhibits/2-drag-drop.png",
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "255.255.255.224",
                "255.255.255.128",
                "255.255.255.252",
                "255.255.255.248",
                "255.255.248.0",
                "255.255.255.240"
            ],
            "targets": [
                "10.10.13.0",
                "10.10.13.128",
                "10.10.13.160",
                "10.10.13.252"
            ],
            "correctMatches": {
                "10.10.13.0": "255.255.255.128",
                "10.10.13.128": "255.255.255.240",
                "10.10.13.160": "255.255.255.248",
                "10.10.13.252": "255.255.255.252"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 211,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #3",
        "question": "Drag and drop the characteristics from the left onto the corresponding wireless device types on the right. Not all characteristics are used.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "transmits and receives radio frequency (RF) signals",
                "configurable as a workgroup bridge",
                "uses templates to implement centralized QoS configuration",
                "supplies user connection data within a device group",
                "requires a special adapter for PoE"
            ],
            "targets": [
                "Access Point 1",
                "Access Point 2",
                "Wireless LAN Controller 1",
                "Wireless LAN Controller 2"
            ],
            "correctMatches": {
                "Access Point 1": "transmits and receives radio frequency (RF) signals",
                "Access Point 2": "configurable as a workgroup bridge",
                "Wireless LAN Controller 1": "uses templates to implement centralized QoS configuration",
                "Wireless LAN Controller 2": "supplies user connection data within a device group"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 226,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #4",
        "question": "Drag and drop the media characteristics from the left onto the corresponding cable types on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "comprised of shielded and unshielded twisted pairs (STP/UTP)",
                "is affected by electromagnetic interference (EMI)",
                "comprised of insulated glass strands",
                "uses a single wavelength of light over long distances"
            ],
            "targets": [
                "Copper Cable 1",
                "Copper Cable 2",
                "Single-mode Fiber 1",
                "Single-mode Fiber 2"
            ],
            "correctMatches": {
                "Copper Cable 1": "comprised of shielded and unshielded twisted pairs (STP/UTP)",
                "Copper Cable 2": "is affected by electromagnetic interference (EMI)",
                "Single-mode Fiber 1": "comprised of insulated glass strands",
                "Single-mode Fiber 2": "uses a single wavelength of light over long distances"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 210,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #5",
        "question": "Drag and drop the AAA terms from the left onto the descriptions on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "tracks user resource usage and session duration",
                "verifies user identity with credentials",
                "determines access rights and permitted commands"
            ],
            "targets": [
                "Authentication",
                "Authorization",
                "Accounting"
            ],
            "correctMatches": {
                "Authentication": "verifies user identity with credentials",
                "Authorization": "determines access rights and permitted commands",
                "Accounting": "tracks user resource usage and session duration"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 227,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #6",
        "question": "Refer to the exhibit. A packet is destined for 192.168.20.100. Drag and drop the parameters of the destination route from the left onto the routing components on the right. Not all parameters are used.",
        "points": 10,
        "exhibitImage": "exhibits/6-drag-drop.png",
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "/28",
                "90",
                "30",
                "127",
                "110",
                "2172"
            ],
            "targets": [
                "Prefix Length",
                "Administrative Distance (AD)",
                "Metric / Cost"
            ],
            "correctMatches": {
                "Prefix Length": "/28",
                "Administrative Distance (AD)": "90",
                "Metric / Cost": "30"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 225,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #7",
        "question": "Drag and drop the Ansible automation features from the left onto the corresponding characteristics on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "executes modules via SSH by default",
                "uses playbooks written in YAML",
                "operates as an agentless automation engine",
                "requires custom agent software on target nodes"
            ],
            "targets": [
                "Connection Protocol",
                "Playbook Syntax",
                "Agent Architecture"
            ],
            "correctMatches": {
                "Connection Protocol": "executes modules via SSH by default",
                "Playbook Syntax": "uses playbooks written in YAML",
                "Agent Architecture": "operates as an agentless automation engine"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 208,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #8",
        "question": "Drag and drop the networking characteristics from the left to the corresponding architecture type on the right. Not all options are used.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "deploys a consistent configuration across multiple devices",
                "distributed control plane is needed",
                "requires a distributed management plane",
                "southbound APIs are used to apply configurations",
                "northbound APIs interact with end devices"
            ],
            "targets": [
                "Traditional Networking 1",
                "Traditional Networking 2",
                "Controller-Based Networking 1",
                "Controller-Based Networking 2"
            ],
            "correctMatches": {
                "Traditional Networking 1": "distributed control plane is needed",
                "Traditional Networking 2": "requires a distributed management plane",
                "Controller-Based Networking 1": "deploys a consistent configuration across multiple devices",
                "Controller-Based Networking 2": "southbound APIs are used to apply configurations"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 213,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #9",
        "question": "Drag and drop the characteristics from the left onto the corresponding cable types on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "transmits data in the form of electronic signals",
                "supplies conduit for PoE implementations",
                "used for high-throughput over short distances",
                "transmits signals using pulses of light"
            ],
            "targets": [
                "Copper Cable 1",
                "Copper Cable 2",
                "Multi-mode Fiber 1",
                "Multi-mode Fiber 2"
            ],
            "correctMatches": {
                "Copper Cable 1": "transmits data in the form of electronic signals",
                "Copper Cable 2": "supplies conduit for PoE implementations",
                "Multi-mode Fiber 1": "used for high-throughput over short distances",
                "Multi-mode Fiber 2": "transmits signals using pulses of light"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 224,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #10",
        "question": "Drag and drop the transport layer descriptions from the left onto the corresponding transport layer protocols on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "client confirms data delivery from the server",
                "checks for errors and guarantees reception via retransmissions",
                "delays data transmission if congestion is detected (flow control)",
                "able to send data without requiring an established connection beforehand",
                "supports broadcast and multicast traffic",
                "packets sent independently and received in no fixed order"
            ],
            "targets": [
                "TCP 1",
                "TCP 2",
                "TCP 3",
                "UDP 1",
                "UDP 2",
                "UDP 3"
            ],
            "correctMatches": {
                "TCP 1": "client confirms data delivery from the server",
                "TCP 2": "checks for errors and guarantees reception via retransmissions",
                "TCP 3": "delays data transmission if congestion is detected (flow control)",
                "UDP 1": "able to send data without requiring an established connection beforehand",
                "UDP 2": "supports broadcast and multicast traffic",
                "UDP 3": "packets sent independently and received in no fixed order"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 222,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #11",
        "question": "Drag and drop the configuration commands into the correct sequence to configure an enable secret on a Cisco router.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "enable",
                "configure terminal",
                "enable secret c1sc0@123",
                "exit",
                "write memory"
            ],
            "targets": [
                "First Command",
                "Second Command",
                "Third Command",
                "Fourth Command"
            ],
            "correctMatches": {
                "First Command": "enable",
                "Second Command": "configure terminal",
                "Third Command": "enable secret c1sc0@123",
                "Fourth Command": "exit"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 221,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #12",
        "question": "Drag and drop the access control list (ACL) characteristics from the left onto the corresponding ACL types on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "filters traffic based on source IP address only",
                "placed as close to the destination as possible",
                "filters traffic based on source and destination IP addresses and Layer 4 ports",
                "placed as close to the source as possible"
            ],
            "targets": [
                "Standard ACL 1",
                "Standard ACL 2",
                "Extended ACL 1",
                "Extended ACL 2"
            ],
            "correctMatches": {
                "Standard ACL 1": "filters traffic based on source IP address only",
                "Standard ACL 2": "placed as close to the destination as possible",
                "Extended ACL 1": "filters traffic based on source and destination IP addresses and Layer 4 ports",
                "Extended ACL 2": "placed as close to the source as possible"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 219,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #13",
        "question": "Drag and drop the descriptions of security features from the left onto the corresponding features on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "may use a fingerprint reader or facial recognition to authenticate users",
                "relies on a 'something you are' authentication paradigm",
                "requires two or more authentication factors to verify identity",
                "supports enterprise, third-party, and public PKI trust models",
                "issuer may revoke the digital credential using CRL / OCSP"
            ],
            "targets": [
                "Biometrics 1",
                "Biometrics 2",
                "Multifactor Authentication (MFA)",
                "Digital Certificates 1",
                "Digital Certificates 2"
            ],
            "correctMatches": {
                "Biometrics 1": "may use a fingerprint reader or facial recognition to authenticate users",
                "Biometrics 2": "relies on a 'something you are' authentication paradigm",
                "Multifactor Authentication (MFA)": "requires two or more authentication factors to verify identity",
                "Digital Certificates 1": "supports enterprise, third-party, and public PKI trust models",
                "Digital Certificates 2": "issuer may revoke the digital credential using CRL / OCSP"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 209,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #14",
        "question": "Drag and drop the protocol advantages from the left onto the corresponding protocol types on the right. Not all advantages are used.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "capable of sending multicast transmissions",
                "transmits live and real-time data",
                "controls connections between sender and receiver",
                "guarantees packet delivery",
                "optimizes transmission rates to receiver",
                "uses stateful packet inspection"
            ],
            "targets": [
                "TCP 1",
                "TCP 2",
                "TCP 3",
                "UDP 1",
                "UDP 2"
            ],
            "correctMatches": {
                "TCP 1": "controls connections between sender and receiver",
                "TCP 2": "optimizes transmission rates to receiver",
                "TCP 3": "guarantees packet delivery",
                "UDP 1": "capable of sending multicast transmissions",
                "UDP 2": "transmits live and real-time data"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 220,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #15",
        "question": "Drag and drop the steps in a standard recursive DNS lookup operation into the correct chronological order on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "An endpoint submits a request for the IP address of a domain to the local DNS server.",
                "The local DNS server submits a request to a root DNS server.",
                "The local DNS server queries the authoritative domain DNS server.",
                "The local DNS server receives a reply containing the IP address from the domain DNS server.",
                "The local DNS server responds with the resolved IP address to the endpoint."
            ],
            "targets": [
                "Step 1",
                "Step 2",
                "Step 3",
                "Step 4",
                "Step 5"
            ],
            "correctMatches": {
                "Step 1": "An endpoint submits a request for the IP address of a domain to the local DNS server.",
                "Step 2": "The local DNS server submits a request to a root DNS server.",
                "Step 3": "The local DNS server queries the authoritative domain DNS server.",
                "Step 4": "The local DNS server receives a reply containing the IP address from the domain DNS server.",
                "Step 5": "The local DNS server responds with the resolved IP address to the endpoint."
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 223,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #16",
        "question": "Drag and drop the AAA features from the left onto the corresponding AAA services on the right. Not all options are used.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "It determines what resources or commands a user or group can access.",
                "It limits which CLI commands a user can execute.",
                "It uses a RADIUS server to allow initial user access.",
                "It verifies the user identity before granting access to the device.",
                "It logs all executed commands for audit tracking."
            ],
            "targets": [
                "Authorization 1",
                "Authorization 2",
                "Authentication 1",
                "Authentication 2"
            ],
            "correctMatches": {
                "Authorization 1": "It determines what resources or commands a user or group can access.",
                "Authorization 2": "It limits which CLI commands a user can execute.",
                "Authentication 1": "It uses a RADIUS server to allow initial user access.",
                "Authentication 2": "It verifies the user identity before granting access to the device."
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 216,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #17",
        "question": "Drag and drop the functions of AAA supporting protocols from the left onto the protocols on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "encrypts only the password when it sends an access request",
                "combines authentication and authorization",
                "uses UDP port 1812/1813",
                "encrypts the entire body of the access-request packet",
                "separates all three AAA operations (Authentication, Authorization, Accounting)",
                "uses TCP port 49"
            ],
            "targets": [
                "RADIUS 1",
                "RADIUS 2",
                "RADIUS 3",
                "TACACS+ 1",
                "TACACS+ 2",
                "TACACS+ 3"
            ],
            "correctMatches": {
                "RADIUS 1": "encrypts only the password when it sends an access request",
                "RADIUS 2": "combines authentication and authorization",
                "RADIUS 3": "uses UDP port 1812/1813",
                "TACACS+ 1": "encrypts the entire body of the access-request packet",
                "TACACS+ 2": "separates all three AAA operations (Authentication, Authorization, Accounting)",
                "TACACS+ 3": "uses TCP port 49"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 217,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #18",
        "question": "Drag and drop the characteristics from the left onto the corresponding cable types on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "contains a conductor, bedding, and outer sheathing",
                "comprised of shielded or unshielded twisted pairs",
                "has minimal light reflection as signal travels down the core",
                "transmits signals using laser pulses of light"
            ],
            "targets": [
                "Copper Cable 1",
                "Copper Cable 2",
                "Single-mode Fiber 1",
                "Single-mode Fiber 2"
            ],
            "correctMatches": {
                "Copper Cable 1": "contains a conductor, bedding, and outer sheathing",
                "Copper Cable 2": "comprised of shielded or unshielded twisted pairs",
                "Single-mode Fiber 1": "has minimal light reflection as signal travels down the core",
                "Single-mode Fiber 2": "transmits signals using laser pulses of light"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 212,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #19",
        "question": "Drag and drop the traffic types from the left onto the QoS delivery mechanisms on the right.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "database synchronization traffic",
                "standard Web browsing traffic",
                "video streaming traffic",
                "VoIP voice traffic"
            ],
            "targets": [
                "Traffic Shaping",
                "Traffic Policing",
                "Best Effort Queue",
                "Priority Queue (LLQ)"
            ],
            "correctMatches": {
                "Traffic Shaping": "database synchronization traffic",
                "Traffic Policing": "video streaming traffic",
                "Best Effort Queue": "standard Web browsing traffic",
                "Priority Queue (LLQ)": "VoIP voice traffic"
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 218,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #20",
        "question": "Drag and drop the statements about AAA services from the left to the corresponding AAA services on the right. Not all options are used.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "It records the duration of each user connection.",
                "It supports user access reporting and auditing.",
                "It restricts the CLI commands that a user is able to perform.",
                "It grants access to network assets, such as FTP servers.",
                "It verifies identity via biometric scanning."
            ],
            "targets": [
                "Accounting 1",
                "Accounting 2",
                "Authorization 1",
                "Authorization 2"
            ],
            "correctMatches": {
                "Accounting 1": "It records the duration of each user connection.",
                "Accounting 2": "It supports user access reporting and auditing.",
                "Authorization 1": "It restricts the CLI commands that a user is able to perform.",
                "Authorization 2": "It grants access to network assets, such as FTP servers."
            }
        },
        "originalSourceImage": null
    },
    {
        "id": 215,
        "type": "drag_drop",
        "questionNo": "Drag & Drop #21",
        "question": "An engineer needs to configure a switch with port security to ensure devices are unable to flood the port. The port must be configured to permit only two dynamic sticky MAC addresses. Drag and drop the configuration commands into the correct sequence on the right. Not all commands are used.",
        "points": 10,
        "exhibitImage": null,
        "cliSnippet": null,
        "dragDropData": {
            "items": [
                "switchport mode access",
                "switchport port-security",
                "switchport port-security mac-address sticky",
                "switchport port-security maximum 2",
                "switchport port-security violation shutdown"
            ],
            "targets": [
                "Step 1",
                "Step 2",
                "Step 3",
                "Step 4"
            ],
            "correctMatches": {
                "Step 1": "switchport mode access",
                "Step 2": "switchport port-security",
                "Step 3": "switchport port-security mac-address sticky",
                "Step 4": "switchport port-security maximum 2"
            }
        },
        "originalSourceImage": null
    }
];
