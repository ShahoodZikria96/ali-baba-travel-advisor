<?php
// Small admin panel: enquiries (leads), reviews, and the full content CMS
// (offices, tours, guides, etc.) Single file, PHP 7.4+.
declare(strict_types=1);
require __DIR__ . '/../api/_lib.php';
require __DIR__ . '/../api/_resources.php';

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'self'; style-src 'unsafe-inline'; frame-ancestors 'none'; form-action 'self'");

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? '') === '443';
session_name('ab_admin');
session_set_cookie_params(['lifetime' => 0, 'path' => '/admin/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Lax']);
session_start();

function h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function csrf(): string { if (empty($_SESSION['csrf'])) { $_SESSION['csrf'] = bin2hex(random_bytes(32)); } return $_SESSION['csrf']; }
function csrf_ok(): bool { return isset($_POST['csrf'], $_SESSION['csrf']) && hash_equals($_SESSION['csrf'], (string)$_POST['csrf']); }
function go(string $qs = ''): void { header('Location: /admin/' . $qs); exit; }

function page(string $title, string $body, bool $withChrome = true): void
{
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex,nofollow"><link rel="icon" href="/favicon.ico">'
        . '<title>' . h($title) . ' - Ali Baba Admin</title><style>' . admin_css() . '</style></head><body>'
        . ($withChrome ? '<div class="shell">' . $body . '</div>' : $body) . '</body></html>';
    exit;
}

function admin_css(): string
{
    return '
:root{--maroon:#9e1b26;--maroon-dark:#7a141d;--ink:#1d1a19;--ink-soft:#49423d;--line:#e8e1d6;--bg:#f6f3ee;--card:#fff;--muted:#8a8178}
*{box-sizing:border-box}
body{font:15px/1.55 "Segoe UI",system-ui,Arial,sans-serif;margin:0;background:var(--bg);color:var(--ink)}
.shell{display:flex;min-height:100vh}
.sidebar{width:232px;flex:0 0 232px;background:var(--ink);color:#fff;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto}
.sidebar .brand{padding:20px 18px 14px;font-weight:700;font-size:17px;letter-spacing:.2px;border-bottom:1px solid rgba(255,255,255,.08)}
.sidebar .brand span{display:block;font-weight:400;font-size:12px;opacity:.55;margin-top:2px}
.navgroup{padding:14px 10px}
.navgroup .label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.4);padding:6px 10px 4px}
.sidebar a{display:block;color:rgba(255,255,255,.78);text-decoration:none;padding:8px 10px;border-radius:7px;font-size:13.5px;margin:1px 0}
.sidebar a:hover{background:rgba(255,255,255,.06);color:#fff}
.sidebar a.on{background:var(--maroon);color:#fff}
.sidebar .foot{margin-top:auto;padding:14px 10px;border-top:1px solid rgba(255,255,255,.08)}
.sidebar .foot a{opacity:.7}
.main{flex:1;min-width:0}
.topbar{background:var(--card);border-bottom:1px solid var(--line);padding:14px 24px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:5}
.topbar h1{font-size:19px;margin:0;flex:1;font-weight:700}
content{display:block;max-width:1180px;margin:22px auto;padding:0 24px}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:20px;margin-bottom:18px;box-shadow:0 1px 2px rgba(29,26,25,.03)}
.card h2{margin:0 0 14px;font-size:16px}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:10px;overflow:hidden}
th,td{padding:10px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top;font-size:13.5px}
th{background:#faf8f4;color:var(--ink-soft);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.04em}
tr:last-child td{border-bottom:0}
label{display:block;font-size:13px;font-weight:600;color:var(--ink-soft);margin-bottom:5px}
input,select,textarea{font:inherit;padding:9px 10px;border:1px solid #d8d0c3;border-radius:7px;width:100%;box-sizing:border-box;background:#fff}
input:focus,select:focus,textarea:focus{outline:2px solid var(--maroon);outline-offset:-1px;border-color:var(--maroon)}
input[type=checkbox]{width:auto;accent-color:var(--maroon)}
button,.btn{font:inherit;font-size:13.5px;padding:8px 14px;border:0;border-radius:7px;background:var(--maroon);color:#fff;cursor:pointer;text-decoration:none;display:inline-block;transition:background .15s}
button:hover,.btn:hover{background:var(--maroon-dark)}
button.g,.btn.g{background:#eee6da;color:var(--ink)}button.g:hover,.btn.g:hover{background:#e3d9c8}
button.r{background:#fbe9e9;color:#b3261e}button.r:hover{background:#f6d4d4}
.tag{padding:3px 10px;border-radius:99px;background:#eef0ea;color:#3d6b34;font-size:11.5px;font-weight:600}
.tag.new{background:#fde8ea;color:var(--maroon)}
.small{font-size:12px;color:var(--muted);display:block;margin-top:4px}
pre{white-space:pre-wrap;margin:0;font:13px/1.4 ui-monospace,monospace}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.imgpreview{max-width:64px;max-height:64px;border-radius:6px;border:1px solid var(--line);object-fit:cover;display:block;margin-bottom:6px}
.field-image .row{align-items:flex-start}
.statgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:18px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px}
.stat b{font-size:24px;display:block}.stat span{font-size:12.5px;color:var(--muted)}
textarea.mono{font:13px/1.4 ui-monospace,monospace}
@media(max-width:860px){.shell{flex-direction:column}.sidebar{width:100%;flex:none;height:auto;position:relative;flex-direction:row;flex-wrap:wrap;align-items:center}
.sidebar .brand{border:0;padding:12px 14px}.navgroup{display:none}.sidebar .foot{margin:0 0 0 auto;border:0}
content{margin:14px auto;padding:0 14px}th,td{font-size:12.5px;padding:7px}}
';
}

function nav(string $active): string
{
    $out = '<nav class="sidebar"><div class="brand">Ali Baba<span>Admin panel</span></div>';
    $out .= '<div class="navgroup"><div class="label">Overview</div>';
    $out .= '<a href="/admin/?a=leads"' . ($active === 'leads' ? ' class="on"' : '') . '>Enquiries</a>';
    $out .= '<a href="/admin/?a=reviews"' . ($active === 'reviews' ? ' class="on"' : '') . '>Reviews</a>';
    $out .= '<a href="/admin/?a=settings"' . ($active === 'settings' ? ' class="on"' : '') . '>Site Settings</a>';
    $out .= '</div><div class="navgroup"><div class="label">Content</div>';
    foreach (ab_resources() as $key => $cfg) {
        $out .= '<a href="/admin/?a=res&r=' . urlencode($key) . '"' . ($active === $key ? ' class="on"' : '') . '>' . h($cfg['label']) . '</a>';
    }
    $out .= '</div><div class="foot"><a href="/" target="_blank" rel="noopener">&larr; View live site</a>'
        . '<form method="post" action="/admin/?a=logout" style="margin-top:8px"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><button class="g" type="submit" style="width:100%">Log out</button></form></div></nav>';
    return $out;
}


/** Render one form field's input control for a resource's add/edit form. */
function res_field_input(array $f, $value): string
{
    $name = h($f['name']);
    $req = !empty($f['required']) ? ' required' : '';
    switch ($f['type']) {
        case 'textarea':
            return '<textarea name="' . $name . '" rows="4"' . $req . '>' . h((string)$value) . '</textarea>';
        case 'json':
            $text = is_string($value) ? $value : json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            return '<textarea name="' . $name . '" rows="5" class="mono">' . h((string)$text) . '</textarea>';
        case 'boolean':
            return '<input type="checkbox" name="' . $name . '" value="1"' . ($value ? ' checked' : '') . ' style="width:auto">';
        case 'date':
            return '<input type="date" name="' . $name . '" value="' . h((string)$value) . '"' . $req . '>';
        case 'number':
            return '<input type="number" name="' . $name . '" value="' . h((string)$value) . '"' . $req . '>';
        case 'select':
            $out = '<select name="' . $name . '"' . $req . '>';
            foreach ($f['options'] as $opt) {
                $out .= '<option value="' . h($opt) . '"' . ((string)$value === $opt ? ' selected' : '') . '>' . h($opt) . '</option>';
            }
            return $out . '</select>';
        case 'image':
            $v = (string)$value;
            $preview = $v !== '' ? '<img src="' . h($v) . '" class="imgpreview" alt="">' : '';
            return '<div class="field-image">' . $preview
                . '<div class="row"><input type="text" name="' . $name . '" value="' . h($v) . '" placeholder="/uploads/... or paste a path" style="flex:1;min-width:160px">'
                . '<input type="file" name="upload_' . $name . '" accept="image/jpeg,image/png,image/webp,image/gif" style="flex:1;min-width:160px"></div>'
                . '<span class="small">Upload a new image, or type/paste a path directly. Uploading replaces the path above when you save.</span></div>';
        default:
            return '<input type="text" name="' . $name . '" value="' . h((string)$value) . '"' . $req . '>';
    }
}

/** Parse $_POST into a column => value map ready for a prepared INSERT/UPDATE, validating JSON fields. */
function res_parse_post(array $resource, ?string &$error): ?array
{
    $row = [];
    foreach ($resource['fields'] as $f) {
        $name = $f['name'];
        if ($f['type'] === 'boolean') {
            $row[$name] = isset($_POST[$name]) ? 1 : 0;
            continue;
        }
        $raw = (string)($_POST[$name] ?? '');
        if ($f['type'] === 'json') {
            $trimmed = trim($raw);
            if ($trimmed === '') {
                if (!empty($f['required'])) { $error = h($f['label']) . ' is required.'; return null; }
                $row[$name] = null;
                continue;
            }
            $decoded = json_decode($trimmed, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $error = h($f['label']) . ': invalid JSON (' . json_last_error_msg() . ')';
                return null;
            }
            $row[$name] = json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            continue;
        }
        if ($f['type'] === 'date') {
            $row[$name] = $raw !== '' ? $raw : null;
            continue;
        }
        if ($f['type'] === 'number') {
            $row[$name] = $raw !== '' ? (int)$raw : 0;
            continue;
        }
        if ($f['type'] === 'image') {
            $uploaded = ab_upload_image('upload_' . $name);
            $row[$name] = $uploaded ?? ($raw !== '' ? $raw : null);
            if (!empty($f['required']) && empty($row[$name])) {
                $error = h($f['label']) . ' is required.';
                return null;
            }
            continue;
        }
        if (!empty($f['required']) && trim($raw) === '') {
            $error = h($f['label']) . ' is required.';
            return null;
        }
        $row[$name] = $raw;
    }
    return $row;
}

/** Render the add/edit form for one resource row (empty $row = new). */
function res_form(string $key, array $resource, array $row, string $error = ''): string
{
    $isNew = empty($row['id']);
    $b = nav($key) . '<div class="main"><content><div class="card"><h2>' . ($isNew ? 'Add ' : 'Edit ') . h($resource['singular']) . '</h2>';
    if ($error !== '') {
        $b .= '<p style="color:#b3261e">' . $error . '</p>';
    }
    $b .= '<form method="post" action="/admin/?a=res_save&r=' . urlencode($key) . '" enctype="multipart/form-data">'
        . '<input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)($row['id'] ?? 0) . '">';
    foreach ($resource['fields'] as $f) {
        $b .= '<p><label>' . h($f['label']) . '<br>' . res_field_input($f, $row[$f['name']] ?? '') . '</label>';
        if (!empty($f['helpText'])) {
            $b .= '<span class="small">' . h($f['helpText']) . '</span>';
        }
        $b .= '</p>';
    }
    $b .= '<div class="row"><button type="submit">Save</button><a class="btn g" href="/admin/?a=res&r=' . urlencode($key) . '">Cancel</a></div></form></div></content></div>';
    return $b;
}

/** Render the list view for one resource. */
function res_list(string $key, array $resource, PDO $pdo): string
{
    $rows = $pdo->query('SELECT * FROM ' . $resource['table'] . ' ORDER BY ' . (in_array('sort_order', array_column($resource['fields'], 'name'), true) ? 'sort_order ASC, id DESC' : 'id DESC'))->fetchAll();
    $b = nav($key) . '<div class="main"><content><div class="row" style="justify-content:space-between"><h2>' . h($resource['label']) . '</h2>'
        . '<a class="btn" href="/admin/?a=res&r=' . urlencode($key) . '&new=1">+ Add ' . h($resource['singular']) . '</a></div><table><tr>';
    foreach ($resource['listColumns'] as $col) {
        $b .= '<th>' . h(str_replace('_', ' ', ucfirst($col))) . '</th>';
    }
    $b .= '<th></th></tr>';
    foreach ($rows as $r) {
        $b .= '<tr>';
        foreach ($resource['listColumns'] as $col) {
            $v = $r[$col] ?? '';
            if ($col === 'published' || $col === 'featured') {
                $b .= '<td>' . ((int)$v ? '<span class="tag">' . ($col === 'featured' ? 'Featured' : 'Published') . '</span>' : '<span class="tag new">' . ($col === 'featured' ? '—' : 'Draft') . '</span>') . '</td>';
            } else {
                $b .= '<td>' . h((string)$v) . '</td>';
            }
        }
        $b .= '<td><div class="row">'
            . '<a class="btn g" href="/admin/?a=res&r=' . urlencode($key) . '&edit=' . (int)$r['id'] . '">Edit</a>';
        if (array_key_exists('published', $r)) {
            $b .= '<form method="post" action="/admin/?a=res_toggle&r=' . urlencode($key) . '"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)$r['id'] . '"><button class="g" type="submit">' . ((int)$r['published'] ? 'Unpublish' : 'Publish') . '</button></form>';
        }
        $b .= '<form method="post" action="/admin/?a=res_delete&r=' . urlencode($key) . '" onsubmit="return confirm(\'Delete this ' . h(strtolower($resource['singular'])) . '?\')"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)$r['id'] . '"><button class="r" type="submit">Delete</button></form>'
            . '</div></td></tr>';
    }
    if (!$rows) {
        $b .= '<tr><td colspan="' . (count($resource['listColumns']) + 1) . '">No ' . h(strtolower($resource['label'])) . ' yet.</td></tr>';
    }
    return $b . '</table></content></div>';
}

$c = ab_config();
$action = (string)($_GET['a'] ?? 'leads');

// ---------- Login ----------
if (empty($_SESSION['ok'])) {
    $error = '';
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
        if (!csrf_ok() || !ab_same_origin()) {
            $error = 'Session expired. Try again.';
        } elseif (!ab_rate_ok('login', 8, 900)) {
            $error = 'Too many attempts. Wait 15 minutes.';
        } else {
            $u = (string)($_POST['user'] ?? '');
            $p = (string)($_POST['pass'] ?? '');
            $stored = (string)($c['admin_pass'] ?? '');
            $passOk = $stored !== '' && (strpos($stored, '$2y$') === 0 ? password_verify($p, $stored) : hash_equals($stored, $p));
            $userOk = hash_equals((string)($c['admin_user'] ?? ''), $u);
            if ($passOk && $userOk) {
                session_regenerate_id(true);
                $_SESSION['ok'] = true;
                $_SESSION['csrf'] = bin2hex(random_bytes(32));
                go();
            }
            $error = 'Wrong username or password.';
        }
    }
    page('Log in', '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px">'
        . '<div class="card" style="width:100%;max-width:380px"><h2 style="margin-top:0">Ali Baba Admin</h2>'
        . ($error ? '<p style="color:#b3261e">' . h($error) . '</p>' : '')
        . '<form method="post" action="/admin/"><input type="hidden" name="csrf" value="' . h(csrf()) . '">'
        . '<p><label>Username<input name="user" autocomplete="username" required></label></p>'
        . '<p><label>Password<input name="pass" type="password" autocomplete="current-password" required></label></p>'
        . '<button type="submit" style="width:100%">Log in</button></form></div></div>', false);
}

$pdo = ab_db();

// ---------- Actions (POST + CSRF) ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!csrf_ok() || !ab_same_origin()) {
        http_response_code(403);
        page('Error', '<div class="main"><content><div class="card">Invalid session token. Go back and reload the page.</div></content></div>');
    }
    $id = (int)($_POST['id'] ?? 0);
    switch ($action) {
        case 'logout':
            $_SESSION = [];
            session_destroy();
            go();
        case 'lead_status':
            $status = in_array($_POST['status'] ?? '', ['new', 'contacted', 'closed'], true) ? $_POST['status'] : 'new';
            $pdo->prepare('UPDATE ab_leads SET status = ? WHERE id = ?')->execute([$status, $id]);
            go('?a=leads&s=' . urlencode((string)($_POST['back'] ?? '')));
        case 'lead_delete':
            $pdo->prepare('DELETE FROM ab_leads WHERE id = ?')->execute([$id]);
            go('?a=leads');
        case 'review_toggle':
            $pdo->prepare('UPDATE ab_reviews SET published = 1 - published WHERE id = ?')->execute([$id]);
            go('?a=reviews');
        case 'review_delete':
            $pdo->prepare('DELETE FROM ab_reviews WHERE id = ?')->execute([$id]);
            go('?a=reviews');
        case 'review_add':
            $name = ab_clean((string)($_POST['name'] ?? ''), 80);
            $loc = ab_clean((string)($_POST['location'] ?? ''), 60);
            $text = ab_clean((string)($_POST['text'] ?? ''), 1000);
            $rating = max(1, min(5, (int)($_POST['rating'] ?? 5)));
            if (mb_strlen($name) >= 2 && mb_strlen($loc) >= 2 && mb_strlen($text) >= 10) {
                $pdo->prepare('INSERT INTO ab_reviews (name, location, rating, text, published, created_at) VALUES (?,?,?,?,1,NOW())')
                    ->execute([$name, $loc, $rating, $text]);
            }
            go('?a=reviews');
        case 'settings_save':
            $cols = ['phone', 'phone_secondary', 'whatsapp_number', 'email', 'facebook_url', 'instagram_url',
                'youtube_url', 'announcement_text', 'announcement_href', 'youtube_subscribers', 'happy_customers_stat'];
            $vals = [];
            foreach ($cols as $c) {
                $vals[$c] = ab_clean((string)($_POST[$c] ?? ''), 255);
            }
            $vals['announcement_active'] = isset($_POST['announcement_active']) ? 1 : 0;
            // VALUES(col) (not a repeated :placeholder) because native prepared
            // statements (PDO::ATTR_EMULATE_PREPARES => false) reject binding the
            // same named parameter twice in one query.
            $set = implode(', ', array_map(fn($c) => "$c = VALUES($c)", array_keys($vals)));
            $pdo->prepare(
                'INSERT INTO ab_site_settings (id, ' . implode(', ', array_keys($vals)) . ') VALUES (\'main\', '
                . implode(', ', array_map(fn($c) => ":$c", array_keys($vals))) . ") ON DUPLICATE KEY UPDATE $set"
            )->execute($vals);
            go('?a=settings');
        case 'res_toggle':
        case 'res_delete':
        case 'res_save':
            $rKey = (string)($_GET['r'] ?? '');
            $resources = ab_resources();
            if (!isset($resources[$rKey])) {
                go();
            }
            $resource = $resources[$rKey];
            $table = $resource['table'];
            if ($action === 'res_toggle') {
                $pdo->prepare("UPDATE $table SET published = 1 - published WHERE id = ?")->execute([$id]);
                go('?a=res&r=' . urlencode($rKey));
            }
            if ($action === 'res_delete') {
                $pdo->prepare("DELETE FROM $table WHERE id = ?")->execute([$id]);
                go('?a=res&r=' . urlencode($rKey));
            }
            // res_save
            $resError = null;
            $data = res_parse_post($resource, $resError);
            if ($data === null) {
                $row = $_POST;
                $row['id'] = $id;
                page('Error', res_form($rKey, $resource, $row, $resError ?? 'Invalid input.'));
            }
            if ($resource['hasSlug'] && isset($data['slug'])) {
                $data['slug'] = preg_replace('/[^a-z0-9-]+/', '-', strtolower(trim((string)$data['slug'])));
                $data['slug'] = trim($data['slug'], '-');
            }
            $cols = array_keys($data);
            if ($id > 0) {
                $set = implode(', ', array_map(fn($c) => "$c = :$c", $cols));
                try {
                    $st = $pdo->prepare("UPDATE $table SET $set WHERE id = :__id");
                    $params = $data;
                    $params['__id'] = $id;
                    $st->execute($params);
                } catch (Throwable $e) {
                    page('Error', res_form($rKey, $resource, array_merge($data, ['id' => $id]), 'Could not save: ' . h($e->getMessage())));
                }
            } else {
                $placeholders = implode(', ', array_map(fn($c) => ":$c", $cols));
                try {
                    $pdo->prepare('INSERT INTO ' . $table . ' (' . implode(', ', $cols) . ") VALUES ($placeholders)")->execute($data);
                } catch (Throwable $e) {
                    page('Error', res_form($rKey, $resource, $data, 'Could not save: ' . h($e->getMessage())));
                }
            }
            go('?a=res&r=' . urlencode($rKey));
    }
    go();
}

// ---------- CSV export ----------
if ($action === 'export') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="enquiries-' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fwrite($out, "\xEF\xBB\xBF");
    fputcsv($out, ['ID', 'Date', 'Type', 'Status', 'Page', 'Name', 'Phone', 'City', 'Details (JSON)']);
    foreach ($pdo->query('SELECT * FROM ab_leads ORDER BY id DESC') as $r) {
        $d = json_decode($r['data'], true) ?: [];
        // Prefix cells starting with = + - @ so spreadsheets do not run them as formulas.
        $safe = function ($v) { $v = (string)$v; return preg_match('/^[=+\-@\t\r]/', $v) ? "'" . $v : $v; };
        fputcsv($out, [$r['id'], $r['created_at'], $r['type'], $r['status'], $r['source'],
            $safe($d['fullName'] ?? $d['name'] ?? ''), $safe($d['phone'] ?? ''), $safe($d['city'] ?? ''), $safe($r['data'])]);
    }
    exit;
}

// ---------- Reviews ----------
if ($action === 'reviews') {
    $rows = $pdo->query('SELECT * FROM ab_reviews ORDER BY published ASC, id DESC')->fetchAll();
    $b = nav('reviews') . '<div class="main"><content><div class="card"><h2>Add a review</h2>'
        . '<p class="small">Only add real reviews from real clients (with their permission). Published reviews appear on the home and success-stories pages within a few minutes.</p>'
        . '<form method="post" action="/admin/?a=review_add"><input type="hidden" name="csrf" value="' . h(csrf()) . '">'
        . '<div class="row"><input name="name" placeholder="Client name" required style="flex:1;min-width:160px"><input name="location" placeholder="City or &quot;Google Review&quot;" required style="flex:1;min-width:160px">'
        . '<select name="rating" style="width:90px"><option>5</option><option>4</option><option>3</option></select></div><p><textarea name="text" rows="3" placeholder="Review text" required></textarea></p>'
        . '<button type="submit">Publish review</button></form></div><h2>All reviews</h2><table><tr><th>Status</th><th>Review</th><th></th></tr>';
    foreach ($rows as $r) {
        $b .= '<tr><td>' . ($r['published'] ? '<span class="tag">Published</span>' : '<span class="tag new">Pending</span>') . '</td><td><strong>' . h($r['name']) . '</strong> · ' . h($r['location'])
            . ' · ' . (int)$r['rating'] . '/5<br>' . h($r['text']) . '<div class="small">' . h($r['created_at']) . '</div></td><td><div class="row">'
            . '<form method="post" action="/admin/?a=review_toggle"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)$r['id'] . '"><button class="g" type="submit">' . ($r['published'] ? 'Unpublish' : 'Approve') . '</button></form>'
            . '<form method="post" action="/admin/?a=review_delete" onsubmit="return confirm(\'Delete this review?\')"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)$r['id'] . '"><button class="r" type="submit">Delete</button></form></div></td></tr>';
    }
    page('Reviews', $b . ($rows ? '' : '<tr><td colspan="3">No reviews yet.</td></tr>') . '</table></content></div>');
}

// ---------- Generic content resources (offices, tours, guides, etc.) ----------
if ($action === 'res') {
    $rKey = (string)($_GET['r'] ?? '');
    $resources = ab_resources();
    if (!isset($resources[$rKey])) {
        go();
    }
    $resource = $resources[$rKey];
    if (isset($_GET['new'])) {
        page($resource['singular'], res_form($rKey, $resource, []));
    }
    if (isset($_GET['edit'])) {
        $st = $pdo->prepare('SELECT * FROM ' . $resource['table'] . ' WHERE id = ?');
        $st->execute([(int)$_GET['edit']]);
        $row = $st->fetch();
        if (!$row) {
            go('?a=res&r=' . urlencode($rKey));
        }
        page($resource['singular'], res_form($rKey, $resource, $row));
    }
    page($resource['label'], res_list($rKey, $resource, $pdo));
}

// ---------- Site settings (singleton) ----------
if ($action === 'settings') {
    $s = $pdo->query("SELECT * FROM ab_site_settings WHERE id = 'main'")->fetch() ?: [];
    $field = function (string $name, string $label, string $type = 'text', string $help = '') use ($s) {
        $v = h((string)($s[$name] ?? ''));
        $input = $type === 'textarea'
            ? '<textarea name="' . $name . '" rows="2">' . $v . '</textarea>'
            : '<input type="text" name="' . $name . '" value="' . $v . '">';
        return '<p><label>' . h($label) . '</label>' . $input . ($help ? '<span class="small">' . h($help) . '</span>' : '') . '</p>';
    };
    $b = nav('settings') . '<div class="main"><content><div class="card"><h2>Site Settings</h2>'
        . '<p class="small">Phone numbers, email, social links and homepage stats shown across the site. Changes go live on the next automatic rebuild (within about 20 minutes), or trigger one manually from the GitHub Actions tab.</p>'
        . '<form method="post" action="/admin/?a=settings_save"><input type="hidden" name="csrf" value="' . h(csrf()) . '">'
        . $field('phone', 'Primary Phone', 'text', 'e.g. +92 311 1666076')
        . $field('phone_secondary', 'Secondary Phone (optional)')
        . $field('whatsapp_number', 'WhatsApp Number', 'text', 'Digits only with country code, e.g. 923111666076')
        . $field('email', 'Contact Email')
        . $field('facebook_url', 'Facebook URL')
        . $field('instagram_url', 'Instagram URL')
        . $field('youtube_url', 'YouTube URL')
        . '<hr style="border:0;border-top:1px solid var(--line);margin:16px 0">'
        . $field('announcement_text', 'Announcement Bar Text')
        . $field('announcement_href', 'Announcement Bar Link', 'text', 'e.g. /locations/karachi')
        . '<p><label><input type="checkbox" name="announcement_active" value="1" style="width:auto"' . (!empty($s['announcement_active']) ? ' checked' : '') . '> Show announcement bar</label></p>'
        . '<hr style="border:0;border-top:1px solid var(--line);margin:16px 0">'
        . $field('happy_customers_stat', 'Happy Customers Stat', 'text', 'e.g. 7,500+')
        . $field('youtube_subscribers', 'YouTube Subscribers Stat', 'text', 'e.g. 58,500+')
        . '<button type="submit">Save Settings</button></form></div></content></div>';
    page('Site Settings', $b);
}

// ---------- Leads (default) ----------
$status = in_array($_GET['s'] ?? '', ['new', 'contacted', 'closed'], true) ? $_GET['s'] : '';
$perPage = 40;
$pageNo = max(1, (int)($_GET['p'] ?? 1));
$where = $status !== '' ? 'WHERE status = ' . $pdo->quote($status) : '';
$total = (int)$pdo->query("SELECT COUNT(*) FROM ab_leads $where")->fetchColumn();
$rows = $pdo->query("SELECT * FROM ab_leads $where ORDER BY id DESC LIMIT $perPage OFFSET " . (($pageNo - 1) * $perPage))->fetchAll();
$newCount = (int)$pdo->query("SELECT COUNT(*) FROM ab_leads WHERE status='new'")->fetchColumn();

$b = nav('leads') . '<div class="main"><content><div class="row" style="justify-content:space-between"><h2>Enquiries <span class="tag new">' . $newCount . ' new</span></h2>'
    . '<div class="row"><a class="btn g" href="/admin/?a=leads">All</a><a class="btn g" href="/admin/?a=leads&s=new">New</a><a class="btn g" href="/admin/?a=leads&s=contacted">Contacted</a><a class="btn g" href="/admin/?a=leads&s=closed">Closed</a><a class="btn" href="/admin/?a=export">Download CSV</a></div></div>'
    . '<table><tr><th>Date</th><th>Details</th><th>Status</th></tr>';
foreach ($rows as $r) {
    $d = json_decode($r['data'], true) ?: [];
    $b .= '<tr><td>' . h($r['created_at']) . '<div class="small">' . h($r['type']) . '<br>' . h($r['source']) . '</div></td><td><pre>';
    foreach ($d as $k => $v) {
        $b .= h($k) . ': ' . h(is_bool($v) ? ($v ? 'yes' : 'no') : $v) . "\n";
    }
    $b .= '</pre></td><td><form method="post" action="/admin/?a=lead_status" class="row"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)$r['id'] . '"><input type="hidden" name="back" value="' . h($status) . '">'
        . '<select name="status" onchange="this.form.submit()" style="width:120px">';
    foreach (['new', 'contacted', 'closed'] as $s) {
        $b .= '<option value="' . $s . '"' . ($r['status'] === $s ? ' selected' : '') . '>' . ucfirst($s) . '</option>';
    }
    $b .= '</select></form><form method="post" action="/admin/?a=lead_delete" onsubmit="return confirm(\'Delete this enquiry?\')" style="margin-top:6px"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)$r['id'] . '"><button class="r" type="submit">Delete</button></form></td></tr>';
}
if (!$rows) {
    $b .= '<tr><td colspan="3">No enquiries yet.</td></tr>';
}
$b .= '</table><p class="row">';
if ($pageNo > 1) { $b .= '<a class="btn g" href="/admin/?a=leads&s=' . h($status) . '&p=' . ($pageNo - 1) . '">Newer</a>'; }
if ($pageNo * $perPage < $total) { $b .= '<a class="btn g" href="/admin/?a=leads&s=' . h($status) . '&p=' . ($pageNo + 1) . '">Older</a>'; }
page('Enquiries', $b . '</p></content></div>');
