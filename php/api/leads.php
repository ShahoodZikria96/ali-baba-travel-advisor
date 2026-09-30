<?php
// Receives enquiry-form submissions (POST JSON) and stores them in MySQL.
declare(strict_types=1);
require __DIR__ . '/_lib.php';

ab_require_post();
$in = ab_read_json();

$types = ['visa_assessment', 'tour_enquiry', 'flight_enquiry', 'refusal_case', 'contact'];
$type = $in['type'] ?? '';
$data = $in['data'] ?? null;
if (!is_string($type) || !in_array($type, $types, true) || !is_array($data) || count($data) > 25) {
    ab_json(['error' => 'Invalid lead payload'], 400);
}
// Spam trap: real visitors never fill the hidden field.
if (!empty($in['hp'])) {
    ab_json(['success' => true], 201);
}

$clean = [];
foreach ($data as $k => $v) {
    if (!is_string($k) || strlen($k) > 60) {
        ab_json(['error' => 'Invalid lead payload'], 400);
    }
    if (is_string($v)) {
        $clean[$k] = ab_clean($v, 2000);
    } elseif (is_int($v) || is_float($v) || is_bool($v) || $v === null) {
        $clean[$k] = $v;
    } else {
        ab_json(['error' => 'Invalid lead payload'], 400);
    }
}
$source = isset($in['source']) && is_string($in['source']) ? ab_clean($in['source'], 255) : null;

if (!ab_rate_ok('lead', 8, 600)) {
    ab_json(['error' => 'Too many requests. Please try again later.'], 429);
}

$pdo = ab_db();
$pdo->prepare('INSERT INTO ab_leads (type, data, source, ip_hash, created_at) VALUES (?, ?, ?, ?, NOW())')
    ->execute([$type, json_encode($clean, JSON_UNESCAPED_UNICODE), $source, hash('sha256', ab_ip())]);

$lines = [];
foreach ($clean as $k => $v) {
    $lines[] = $k . ': ' . (is_bool($v) ? ($v ? 'yes' : 'no') : (string)$v);
}
ab_notify('New website enquiry: ' . $type, implode("\n", $lines) . "\n\nPage: " . ($source ?? '-') . "\nOpen the admin: /admin/");

ab_json(['success' => true], 201);
