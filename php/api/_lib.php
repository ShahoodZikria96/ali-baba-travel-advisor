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

    // ---------- Content management tables (offices, tours, guides, etc.) ----------
    // Full parity with the previous Node.js/Prisma CMS, so the admin panel can add
    // or edit any of this content without ever needing a rebuild: the live site
    // pages fetch published rows from these tables at runtime (see api/content.php).
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_offices (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(80) NOT NULL UNIQUE,
        city VARCHAR(120) NOT NULL,
        address TEXT NOT NULL,
        phone VARCHAR(40) NOT NULL,
        hours VARCHAR(120) NOT NULL,
        map_url TEXT NOT NULL,
        opening_date DATE NULL,
        intro TEXT NULL,
        local_context TEXT NULL,
        services_offered JSON NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_countries (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(80) NOT NULL UNIQUE,
        name VARCHAR(120) NOT NULL,
        flag_emoji VARCHAR(20) NULL,
        flag_image VARCHAR(255) NULL,
        hero_image VARCHAR(255) NULL,
        visa_type VARCHAR(120) NOT NULL,
        description TEXT NOT NULL,
        featured TINYINT(1) NOT NULL DEFAULT 0,
        meta_title VARCHAR(255) NULL,
        meta_description TEXT NULL,
        intro TEXT NULL,
        who_can_apply JSON NULL,
        visa_types JSON NULL,
        documents JSON NULL,
        financial_note TEXT NULL,
        processing_time TEXT NULL,
        steps JSON NULL,
        refusal_reasons JSON NULL,
        faqs JSON NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (published), INDEX (featured)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_refusal_pages (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(80) NOT NULL UNIQUE,
        country VARCHAR(120) NOT NULL,
        meta_title VARCHAR(255) NULL,
        meta_description TEXT NULL,
        intro TEXT NOT NULL,
        common_reasons JSON NOT NULL,
        what_we_review JSON NOT NULL,
        special_note TEXT NULL,
        faqs JSON NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_service_pages (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(80) NOT NULL UNIQUE,
        title VARCHAR(160) NOT NULL,
        meta_description TEXT NULL,
        intro TEXT NOT NULL,
        highlights JSON NOT NULL,
        process JSON NOT NULL,
        faqs JSON NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_tours (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(80) NOT NULL UNIQUE,
        destination VARCHAR(160) NOT NULL,
        image VARCHAR(255) NOT NULL,
        duration VARCHAR(80) NOT NULL,
        departure VARCHAR(120) NOT NULL,
        price VARCHAR(60) NOT NULL,
        visa_assistance TINYINT(1) NOT NULL DEFAULT 1,
        summary TEXT NOT NULL,
        highlights JSON NOT NULL,
        included JSON NOT NULL,
        excluded JSON NOT NULL,
        itinerary JSON NOT NULL,
        notes JSON NOT NULL,
        category VARCHAR(20) NOT NULL DEFAULT 'group',
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (published), INDEX (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_guides (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(80) NOT NULL UNIQUE,
        title VARCHAR(200) NOT NULL,
        image VARCHAR(255) NOT NULL,
        category VARCHAR(40) NOT NULL,
        published_date DATE NOT NULL,
        reading_time VARCHAR(40) NULL,
        excerpt TEXT NOT NULL,
        content JSON NOT NULL,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (published), INDEX (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_success_stories (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        country VARCHAR(120) NOT NULL,
        category VARCHAR(120) NOT NULL,
        period VARCHAR(40) NOT NULL,
        summary TEXT NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_videos (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        category VARCHAR(80) NOT NULL,
        duration VARCHAR(20) NULL,
        youtube_url VARCHAR(255) NULL,
        thumbnail VARCHAR(255) NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_faqs (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(255) NOT NULL,
        answer TEXT NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_team_members (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        role VARCHAR(120) NOT NULL,
        photo VARCHAR(255) NULL,
        bio TEXT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        INDEX (published)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $pdo->exec("CREATE TABLE IF NOT EXISTS ab_site_settings (
        id VARCHAR(20) NOT NULL PRIMARY KEY DEFAULT 'main',
        phone VARCHAR(40) NOT NULL,
        phone_secondary VARCHAR(40) NULL,
        whatsapp_number VARCHAR(40) NOT NULL,
        email VARCHAR(160) NOT NULL,
        facebook_url VARCHAR(255) NULL,
        instagram_url VARCHAR(255) NULL,
        youtube_url VARCHAR(255) NULL,
        announcement_text VARCHAR(255) NULL,
        announcement_href VARCHAR(255) NULL,
        announcement_active TINYINT(1) NOT NULL DEFAULT 1,
        youtube_subscribers VARCHAR(20) NOT NULL DEFAULT '0',
        happy_customers_stat VARCHAR(20) NOT NULL DEFAULT '0',
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

/**
 * One-time content seed: on a brand-new database, populates the CMS tables
 * from _seed-data.json (the site's content as of the last build) so the
 * admin panel and live site aren't empty on first deploy. Skipped entirely
 * once ab_offices has any row, so it's safe to run this check on every
 * request and to leave the seed file in place indefinitely.
 */
function ab_maybe_seed(PDO $pdo): void
{
    static $checked = false;
    if ($checked) {
        return;
    }
    $checked = true;
    if ((int)$pdo->query('SELECT COUNT(*) FROM ab_offices')->fetchColumn() > 0) {
        return;
    }
    $file = __DIR__ . '/_seed-data.json';
    if (!is_file($file)) {
        return;
    }
    $seed = json_decode((string)file_get_contents($file), true);
    if (!is_array($seed)) {
        return;
    }
    $tableFor = [
        'offices' => 'ab_offices', 'countries' => 'ab_countries', 'refusal_pages' => 'ab_refusal_pages',
        'service_pages' => 'ab_service_pages', 'tours' => 'ab_tours', 'guides' => 'ab_guides',
        'success_stories' => 'ab_success_stories', 'videos' => 'ab_videos', 'faqs' => 'ab_faqs',
        'team_members' => 'ab_team_members',
    ];
    $pdo->beginTransaction();
    try {
        foreach ($tableFor as $key => $table) {
            foreach ((array)($seed[$key] ?? []) as $row) {
                $cols = [];
                foreach ($row as $col => $val) {
                    if (is_array($val)) {
                        $cols[$col] = json_encode($val, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                    } elseif (is_bool($val)) {
                        $cols[$col] = $val ? 1 : 0; // PDO can bind `false` as '' with some drivers
                    } else {
                        $cols[$col] = $val;
                    }
                }
                $placeholders = implode(', ', array_map(fn($c) => ":$c", array_keys($cols)));
                $pdo->prepare('INSERT INTO ' . $table . ' (' . implode(', ', array_keys($cols)) . ") VALUES ($placeholders)")->execute($cols);
            }
        }
        if (!empty($seed['site_settings']) && is_array($seed['site_settings'])) {
            $s = $seed['site_settings'];
            $cols = array_keys($s);
            $set = implode(', ', array_map(fn($c) => "$c = VALUES($c)", $cols));
            $placeholders = implode(', ', array_map(fn($c) => ":$c", $cols));
            $pdo->prepare(
                'INSERT INTO ab_site_settings (id, ' . implode(', ', $cols) . ") VALUES ('main', $placeholders) "
                . "ON DUPLICATE KEY UPDATE $set"
            )->execute($s);
        }
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        error_log('alibaba seed error: ' . $e->getMessage());
    }
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
        ab_maybe_seed($pdo); // one-time: only inserts if the content tables are still empty
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
