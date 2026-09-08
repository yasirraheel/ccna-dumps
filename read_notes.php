<?php
require_once __DIR__ . '/api.php';

echo "=== CANDIDATE NOTES ===\n";
$stmt = $pdo->query("SELECT * FROM candidate_notes ORDER BY id ASC");
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($notes, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

echo "\n\n=== SAVED SESSIONS QUESTION NOTES ===\n";
$stmt2 = $pdo->query("SELECT id, user_email, candidate_name, bank_name, question_notes FROM saved_sessions WHERE question_notes IS NOT NULL AND question_notes != '[]' AND question_notes != '{}' AND question_notes != ''");
$sessNotes = $stmt2->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($sessNotes, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
