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
        "originalSourceImage": "original_sources/1.webp"
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
        "originalSourceImage": "original_sources/2.webp"
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
        "originalSourceImage": "original_sources/3.webp"
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
        "originalSourceImage": "original_sources/4.webp"
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
        "originalSourceImage": "original_sources/5.webp"
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
        "originalSourceImage": "original_sources/6.webp"
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
        "originalSourceImage": "original_sources/7.webp"
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
        "originalSourceImage": "original_sources/8.webp"
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
        "originalSourceImage": "original_sources/9.webp"
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
        "originalSourceImage": "original_sources/10.webp"
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
        "originalSourceImage": "original_sources/11.webp"
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
        "originalSourceImage": "original_sources/12.webp"
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
        "originalSourceImage": "original_sources/13.webp"
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
        "originalSourceImage": "original_sources/14.webp"
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
        "originalSourceImage": "original_sources/15.webp"
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
        "originalSourceImage": "original_sources/16.webp"
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
        "originalSourceImage": "original_sources/17.webp"
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
        "originalSourceImage": "original_sources/18.webp"
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
        "originalSourceImage": "original_sources/19.webp"
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
        "originalSourceImage": "original_sources/20.webp"
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
        "originalSourceImage": "original_sources/21.webp"
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
        "originalSourceImage": "original_sources/22.webp"
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
        "originalSourceImage": "original_sources/24.webp"
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
        "originalSourceImage": "original_sources/25.webp"
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
        "originalSourceImage": "original_sources/26.webp"
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
        "originalSourceImage": "original_sources/27.webp"
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
        "originalSourceImage": "original_sources/28.webp"
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
        "originalSourceImage": "original_sources/29.webp"
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
        "originalSourceImage": "original_sources/30.webp"
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
        "originalSourceImage": "original_sources/31.webp"
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
        "originalSourceImage": "original_sources/32.webp"
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
        "originalSourceImage": "original_sources/33.webp"
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
        "originalSourceImage": "original_sources/34.webp"
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
        "originalSourceImage": "original_sources/35.webp"
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
        "originalSourceImage": "original_sources/36.webp"
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
        "originalSourceImage": "original_sources/37.webp"
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
        "originalSourceImage": "original_sources/38.webp"
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
        "originalSourceImage": "original_sources/39.webp"
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
        "originalSourceImage": "original_sources/40.webp"
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
        "originalSourceImage": "original_sources/41.webp"
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
        "originalSourceImage": "original_sources/42.webp"
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
        "originalSourceImage": "original_sources/43.webp"
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
        "originalSourceImage": "original_sources/45.webp"
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
        "originalSourceImage": "original_sources/46.webp"
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
        "originalSourceImage": "original_sources/47.webp"
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
        "originalSourceImage": "original_sources/48.webp"
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
        "originalSourceImage": "original_sources/49.webp"
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
        "originalSourceImage": "original_sources/50.webp"
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
        "originalSourceImage": "original_sources/51.webp"
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
        "originalSourceImage": "original_sources/52.webp"
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
        "originalSourceImage": "original_sources/53.webp"
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
        "originalSourceImage": "original_sources/55.webp"
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
        "originalSourceImage": "original_sources/56.webp"
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
        "originalSourceImage": "original_sources/57.webp"
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
        "originalSourceImage": "original_sources/58.webp"
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
        "originalSourceImage": "original_sources/59.webp"
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
        "originalSourceImage": "original_sources/60.webp"
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
        "originalSourceImage": "original_sources/61.webp"
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
        "originalSourceImage": "original_sources/62.webp"
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
        "originalSourceImage": "original_sources/63.webp"
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
        "originalSourceImage": "original_sources/64.webp"
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
        "originalSourceImage": "original_sources/65.webp"
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
        "originalSourceImage": "original_sources/66.webp"
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
        "originalSourceImage": "original_sources/67.webp"
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
        "originalSourceImage": "original_sources/68.webp"
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
        "originalSourceImage": "original_sources/70.webp"
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
        "originalSourceImage": "original_sources/71.webp"
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
        "originalSourceImage": "original_sources/72.webp"
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
        "originalSourceImage": "original_sources/73.webp"
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
        "originalSourceImage": "original_sources/74.webp"
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
        "originalSourceImage": "original_sources/75.webp"
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
        "originalSourceImage": "original_sources/76.webp"
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
        "originalSourceImage": "original_sources/77.webp"
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
        "originalSourceImage": "original_sources/78.webp"
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
        "originalSourceImage": "original_sources/80.webp"
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
        "originalSourceImage": "original_sources/81.webp"
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
        "originalSourceImage": "original_sources/82.webp"
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
        "originalSourceImage": "original_sources/83.webp"
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
        "originalSourceImage": "original_sources/84.webp"
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
        "originalSourceImage": "original_sources/85.webp"
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
        "originalSourceImage": "original_sources/86.webp"
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
        "originalSourceImage": "original_sources/87.webp"
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
        "originalSourceImage": "original_sources/88.webp"
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
        "originalSourceImage": "original_sources/89.webp"
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
        "originalSourceImage": "original_sources/90.webp"
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
        "originalSourceImage": "original_sources/91.webp"
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
        "originalSourceImage": "original_sources/92.webp"
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
        "originalSourceImage": "original_sources/93.webp"
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
        "originalSourceImage": "original_sources/94.webp"
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
        "originalSourceImage": "original_sources/95.webp"
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
        "originalSourceImage": "original_sources/96.webp"
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
        "originalSourceImage": "original_sources/97.webp"
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
        "originalSourceImage": "original_sources/98.webp"
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
        "originalSourceImage": "original_sources/99.webp"
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
        "originalSourceImage": "original_sources/100.webp"
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
        "originalSourceImage": "original_sources/101.webp"
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
        "originalSourceImage": "original_sources/102.webp"
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
        "originalSourceImage": "original_sources/103.webp"
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
        "originalSourceImage": "original_sources/104.webp"
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
        "originalSourceImage": "original_sources/105.webp"
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
        "originalSourceImage": "original_sources/106.webp"
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
        "originalSourceImage": "original_sources/107.webp"
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
        "originalSourceImage": "original_sources/111.webp"
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
        "originalSourceImage": "original_sources/115.webp"
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
        "originalSourceImage": "original_sources/117.webp"
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
        "originalSourceImage": "original_sources/118.webp"
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
        "originalSourceImage": "original_sources/119.webp"
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
        "originalSourceImage": "original_sources/120.webp"
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
        "originalSourceImage": "original_sources/121.webp"
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
        "originalSourceImage": "original_sources/123.webp"
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
        "originalSourceImage": "original_sources/124.webp"
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
        "originalSourceImage": "original_sources/126.webp"
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
        "originalSourceImage": "original_sources/127.webp"
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
        "originalSourceImage": "original_sources/128.webp"
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
        "originalSourceImage": "original_sources/129.webp"
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
        "originalSourceImage": "original_sources/130.webp"
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
        "originalSourceImage": "original_sources/131.webp"
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
        "originalSourceImage": "original_sources/134.webp"
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
        "originalSourceImage": "original_sources/135.webp"
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
        "originalSourceImage": "original_sources/137.webp"
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
        "originalSourceImage": "original_sources/140.webp"
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
        "originalSourceImage": "original_sources/143.webp"
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
        "originalSourceImage": "original_sources/144.webp"
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
        "originalSourceImage": "original_sources/145.webp"
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
        "originalSourceImage": "original_sources/146.webp"
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
        "originalSourceImage": "original_sources/147.webp"
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
        "originalSourceImage": "original_sources/148.webp"
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
        "originalSourceImage": "original_sources/149.webp"
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
        "originalSourceImage": "original_sources/150.webp"
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
        "originalSourceImage": "original_sources/151.webp"
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
        "originalSourceImage": "original_sources/152.webp"
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
        "originalSourceImage": "original_sources/153.webp"
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
        "originalSourceImage": "original_sources/154.webp"
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
        "originalSourceImage": "original_sources/155.webp"
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
        "originalSourceImage": "original_sources/156.webp"
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
        "originalSourceImage": "original_sources/157.webp"
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
        "originalSourceImage": "original_sources/158.webp"
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
        "originalSourceImage": "original_sources/159.webp"
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
        "originalSourceImage": "original_sources/160.webp"
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
        "originalSourceImage": "original_sources/161.webp"
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
        "originalSourceImage": "original_sources/162.webp"
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
        "originalSourceImage": "original_sources/163.webp"
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
        "originalSourceImage": "original_sources/164.webp"
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
        "originalSourceImage": "original_sources/165.webp"
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
        "originalSourceImage": "original_sources/166.webp"
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
        "originalSourceImage": "original_sources/167.webp"
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
        "originalSourceImage": "original_sources/168.webp"
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
        "originalSourceImage": "original_sources/169.webp"
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
        "originalSourceImage": "original_sources/170.webp"
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
        "originalSourceImage": "original_sources/171.webp"
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
        "originalSourceImage": "original_sources/172.webp"
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
        "originalSourceImage": "original_sources/173.webp"
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
        "originalSourceImage": "original_sources/174.webp"
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
        "originalSourceImage": "original_sources/175.webp"
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
        "originalSourceImage": "original_sources/176.webp"
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
        "originalSourceImage": "original_sources/177.webp"
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
        "originalSourceImage": "original_sources/179.webp"
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
        "originalSourceImage": "original_sources/180.webp"
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
        "originalSourceImage": "original_sources/181.webp"
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
        "originalSourceImage": "original_sources/182.webp"
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
        "originalSourceImage": "original_sources/183.webp"
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
        "originalSourceImage": "original_sources/184.webp"
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
        "originalSourceImage": "original_sources/185.webp"
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
        "originalSourceImage": "original_sources/186.webp"
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
        "originalSourceImage": "original_sources/187.webp"
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
        "originalSourceImage": "original_sources/188.webp"
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
        "originalSourceImage": "original_sources/189.webp"
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
        "originalSourceImage": "original_sources/190.webp"
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
        "originalSourceImage": "original_sources/191.webp"
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
        "originalSourceImage": "original_sources/192.webp"
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
        "originalSourceImage": "original_sources/193.webp"
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
        "originalSourceImage": "original_sources/194.webp"
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
        "originalSourceImage": "original_sources/195.webp"
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
        "originalSourceImage": "original_sources/196.webp"
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
        "originalSourceImage": "original_sources/197.webp"
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
        "originalSourceImage": "original_sources/198.webp"
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
        "originalSourceImage": "original_sources/199.webp"
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
        "originalSourceImage": "original_sources/200.webp"
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
        "originalSourceImage": "original_sources/201.webp"
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
        "originalSourceImage": "original_sources/202.webp"
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
        "originalSourceImage": "original_sources/203.webp"
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
        "originalSourceImage": "original_sources/204.webp"
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
        "originalSourceImage": "original_sources/205.webp"
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
        "originalSourceImage": "original_sources/206.webp"
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
        "originalSourceImage": "original_sources/207.webp"
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
                "255.255.255.128 (/25)",
                "255.255.255.240 (/28)",
                "255.255.255.248 (/29)",
                "255.255.255.252 (/30)",
                "255.255.248.0 (/21)",
                "255.255.255.224 (/27)"
            ],
            "targets": [
                "10.10.13.0",
                "10.10.13.128",
                "10.10.13.160",
                "10.10.13.252"
            ],
            "correctMatches": {
                "10.10.13.0": "255.255.255.128 (/25)",
                "10.10.13.128": "255.255.255.240 (/28)",
                "10.10.13.160": "255.255.255.248 (/29)",
                "10.10.13.252": "255.255.255.252 (/30)"
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
