<?php
// Receives a visitor's review (POST JSON). Stored UNPUBLISHED until approved in /admin/.
declare(strict_types=1);
require __DIR__ . '/_lib.php';

ab_require_post();
$in = ab_read_json();

$name = is_string($in['name'] ?? null) ? ab_clean($in['name'], 80) : '';
$location = is_string($in['location'] ?? null) ? ab_clean($in['location'], 60) : '';
$text = is_string($in['text'] ?? null) ? ab_clean($in['text'], 1000) : '';
$rating = (int)($in['rating'] ?? 0);

if (mb_strlen($name) < 2) ab_json(['error' => 'Enter a valid name'], 400);
if (mb_strlen($location) < 2) ab_json(['error' => 'Enter a valid city'], 400);
if ($rating < 1 || $rating > 5) ab_json(['error' => 'Rating must be between 1 and 5'], 400);
if (mb_strlen($text) < 15) ab_json(['error' => 'Review must be between 15 and 1000 characters'], 400);

if (!ab_rate_ok('review', 3, 3600)) {
    ab_json(['error' => 'Too many submissions. Please try again later.'], 429);
}

ab_db()->prepare('INSERT INTO ab_reviews (name, location, rating, text, published, created_at) VALUES (?, ?, ?, ?, 0, NOW())')
    ->execute([$name, $location, $rating, $text]);
ab_notify('New review awaiting approval', "$name ($location) - $rating/5\n\n$text\n\nApprove it in /admin/ -> Reviews");

ab_json(['success' => true], 201);
