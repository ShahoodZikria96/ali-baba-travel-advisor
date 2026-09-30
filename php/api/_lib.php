<?php
// Shared helpers for the site's small PHP backend. Compatible with PHP 7.4+.
// Not a public endpoint: api/.htaccess blocks direct access to files starting with "_".
declare(strict_types=1);

function ab_json($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ab_config(): array
{
    static $cfg = null;
    if ($cfg !== null) {
        return $cfg;
    }
    $candidates = [];
    if (!empty($_SERVER['DOCUMENT_ROOT'])) {
        $candidates[] = dirname(rtrim($_SERVER['DOCUMENT_ROOT'], '/')) . '/alibaba-config.php';
    }
    $candidates[] = dirname(__DIR__) . '/config.php';
    foreach ($candidates as $file) {
        if (is_file($file)) {
            $loaded = require $file;
            if (is_array($loaded)) {
                return $cfg = $loaded;
            }
        }
    }
    ab_json(['error' => 'Server is not configured yet.'], 500);
}

function ab_schema(PDO $pdo): void
{
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_leads (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(40) NOT NULL,
        data MEDIUMTEXT NOT NULL,
        source VARCHAR(255) NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        ip_hash CHAR(64) NULL,
        created_at DATETIME NOT NULL,
        INDEX (status), INDEX (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_reviews (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        location VARCHAR(60) NOT NULL,
        rating TINYINT UNSIGNED NOT NULL DEFAULT 5,
        text TEXT NOT NULL,
        published TINYINT(1) NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_ratelimit (
        k VARCHAR(100) NOT NULL,
        t INT UNSIGNED NOT NULL,
        INDEX (k, t)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

function ab_db(): PDO
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }
    $c = ab_config();
    try {
        $pdo = new PDO(
            'mysql:host=' . ($c['db_host'] ?? 'localhost') . ';dbname=' . ($c['db_name'] ?? '') . ';charset=utf8mb4',
            (string)($c['db_user'] ?? ''),
            (string)($c['db_pass'] ?? ''),
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]
        );
        ab_schema($pdo); // idempotent CREATE TABLE IF NOT EXISTS: no manual SQL import needed
    } catch (Throwable $e) {
        error_log('alibaba db error: ' . $e->getMessage());
        ab_json(['error' => 'Service temporarily unavailable.'], 503);
    }
    return $pdo;
}

function ab_ip(): string
{
    return (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/** Sliding-window rate limit stored in MySQL. Returns false when the limit is exceeded. */
function ab_rate_ok(string $bucket, int $limit, int $windowSeconds): bool
{
    $pdo = ab_db();
    $key = substr($bucket . ':' . hash('sha256', ab_ip()), 0, 100);
    $now = time();
    $st = $pdo->prepare('SELECT COUNT(*) FROM ab_ratelimit WHERE k = ? AND t > ?');
    $st->execute([$key, $now - $windowSeconds]);
    if ((int)$st->fetchColumn() >= $limit) {
        return false;
    }
    $pdo->prepare('INSERT INTO ab_ratelimit (k, t) VALUES (?, ?)')->execute([$key, $now]);
    if (random_int(1, 50) === 1) {
        $pdo->prepare('DELETE FROM ab_ratelimit WHERE t < ?')->execute([$now - 86400]);
    }
    return true;
}

/** Rejects cross-site browser POSTs (Origin must match this host). */
function ab_same_origin(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return true;
    }
    $host = parse_url($origin, PHP_URL_HOST);
    $mine = preg_replace('/:\d+$/', '', (string)($_SERVER['HTTP_HOST'] ?? ''));
    return is_string($host) && strtolower($host) === strtolower($mine);
}

function ab_read_json(int $maxBytes = 10000): array
{
    $raw = file_get_contents('php://input', false, null, 0, $maxBytes + 1);
    if ($raw === false || strlen($raw) > $maxBytes) {
        ab_json(['error' => 'Payload too large'], 413);
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        ab_json(['error' => 'Invalid JSON'], 400);
    }
    return $data;
}

function ab_require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        ab_json(['error' => 'Method not allowed'], 405);
    }
    if (!ab_same_origin()) {
        ab_json(['error' => 'Forbidden'], 403);
    }
}

function ab_clean(string $s, int $max): string
{
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    return function_exists('mb_substr') ? mb_substr(trim($s), 0, $max) : substr(trim($s), 0, $max);
}

function ab_notify(string $subject, string $body): void
{
    $c = ab_config();
    $to = (string)($c['notify_email'] ?? '');
    $from = (string)($c['from_email'] ?? '');
    if ($to === '' || $from === '' || !filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
        return;
    }
    $headers = "From: Ali Baba Travel Advisor <$from>\r\nContent-Type: text/plain; charset=UTF-8\r\nX-Mailer: ab-site";
    @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
}
