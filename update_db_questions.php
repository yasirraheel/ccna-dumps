<?php
require_once __DIR__ . '/api.php';

// 1. Question 37 (Question #23)
$q37_text = "Refer to the exhibit. HQ C needs to use a configuration that:\n• handles up to 150,000 concurrent connections\n• minimizes consumption of public IP addresses\n\nWhich configuration meets the requirements? (Choose one answer)";
$pdo->prepare("UPDATE questions SET question = ? WHERE id = 37 OR question_no = 'Question #23'")->execute([$q37_text]);

// 2. Question 43 (Question #44)
$pdo->prepare("UPDATE questions SET correct_option = ? WHERE id = 43 OR question_no = 'Question #44'")->execute([json_encode([2])]);

// 3. Question 80 (Question #69)
$q80_options = [
    "A. It monitors for outdated software.",
    "B. It identifies patterns indicating intrusions.",
    "C. It assigns security clearance levels.",
    "D. It dictates security policy updates."
];
$pdo->prepare("UPDATE questions SET options = ?, correct_option = ? WHERE id = 80 OR question_no = 'Question #69'")->execute([json_encode($q80_options), json_encode([1])]);

// 4. Question 94 (Question #54)
$q94_text = "Refer to the exhibit. The loopback IP of R3 has been learned via the two interfaces on R1. R1 is configured with a reference bandwidth of 10 Gbps. Based on the metric calculations, which next-hop IP would be used for outgoing routing? (Choose one answer)";
$q94_options = [
    "A. 10.12.6",
    "B. 10.12.2",
    "C. 10.12.5",
    "D. 10.12.1"
];
$pdo->prepare("UPDATE questions SET question = ?, options = ?, correct_option = ? WHERE id = 94 OR question_no = 'Question #54'")->execute([$q94_text, json_encode($q94_options), json_encode([0])]);

// 5. Question 95 (Question #79)
$q95_text = "Refer to the exhibit. Of the routes learned with dynamic routing protocols, which has the least preferred metric? (Choose one answer)";
$q95_options = [
    "A. EIGRP",
    "B. OSPF",
    "C. RIP",
    "D. local"
];
$pdo->prepare("UPDATE questions SET question = ?, options = ?, correct_option = ? WHERE id = 95 OR question_no = 'Question #79'")->execute([$q95_text, json_encode($q95_options), json_encode([2])]);

echo "MYSQL_QUESTIONS_UPDATED_SUCCESSFULLY\n";

$stmt = $pdo->query("SELECT id, question_no, question, options, correct_option FROM questions WHERE id IN (37, 43, 80, 94, 95)");
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "ID: {$row['id']} | {$row['question_no']} | Correct: {$row['correct_option']}\n";
    echo "Opts: {$row['options']}\n";
}
