<?php
// Public read-only endpoint the static site fetches at runtime to show content
// added or edited via the admin panel without needing a rebuild.
//   GET /api/content.php?resource=tours              -> all published rows
//   GET /api/content.php?resource=tours&slug=uk-tour  -> one published row, or 404
// Only ever returns published=1 rows (or all rows for resources with no
// published flag, like site settings).
declare(strict_types=1);
require __DIR__ . '/_lib.php';
require __DIR__ . '/_resources.php';

header('Cache-Control: public, max-age=60'); // short cache: content should reach visitors within about a minute

$resources = ab_resources();
$key = (string)($_GET['resource'] ?? '');

if ($key === 'settings') {
    $pdo = ab_db();
    $row = $pdo->query("SELECT * FROM ab_site_settings WHERE id = 'main'")->fetch();
    ab_json($row ?: new stdClass());
}

if (!isset($resources[$key])) {
    ab_json(['error' => 'Unknown resource'], 404);
}

$resource = $resources[$key];
$pdo = ab_db();
$jsonFields = ab_resource_json_fields($resource);
$boolFields = ab_resource_boolean_fields($resource);
$hasPublished = in_array('published', array_column($resource['fields'], 'name'), true);

function content_decode_row(array $row, array $jsonFields, array $boolFields): array
{
    foreach ($jsonFields as $f) {
        $row[$f] = $row[$f] !== null ? json_decode($row[$f], true) : null;
    }
    foreach ($boolFields as $f) {
        $row[$f] = (bool)$row[$f];
    }
    return $row;
}

$slug = $_GET['slug'] ?? null;
if ($slug !== null) {
    if (!$resource['hasSlug']) {
        ab_json(['error' => 'This resource has no individual pages'], 404);
    }
    $where = $hasPublished ? 'WHERE slug = ? AND published = 1' : 'WHERE slug = ?';
    $st = $pdo->prepare("SELECT * FROM {$resource['table']} $where");
    $st->execute([(string)$slug]);
    $row = $st->fetch();
    if (!$row) {
        ab_json(['error' => 'Not found'], 404);
    }
    ab_json(content_decode_row($row, $jsonFields, $boolFields));
}

$orderCols = array_column($resource['fields'], 'name');
$order = in_array('sort_order', $orderCols, true) ? 'sort_order ASC, id ASC' : 'id ASC';
$where = $hasPublished ? 'WHERE published = 1' : '';
$rows = $pdo->query("SELECT * FROM {$resource['table']} $where ORDER BY $order")->fetchAll();
ab_json(array_map(fn($r) => content_decode_row($r, $jsonFields, $boolFields), $rows));
