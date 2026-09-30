<?php
// Public list of approved reviews (GET). Never fails the page: returns [] on any problem.
declare(strict_types=1);
require __DIR__ . '/_lib.php';

header('Cache-Control: public, max-age=300');
try {
    $rows = ab_db()->query('SELECT name, location, rating, text FROM ab_reviews WHERE published = 1 ORDER BY id DESC LIMIT 60')->fetchAll();
    ab_json($rows);
} catch (Throwable $e) {
    ab_json([]);
}
