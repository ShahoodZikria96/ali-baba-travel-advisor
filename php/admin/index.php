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

function page(string $title, string $body): void
{
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex,nofollow"><title>' . h($title) . ' - Admin</title><style>'
        . 'body{font:15px/1.5 system-ui,Segoe UI,Arial,sans-serif;margin:0;background:#f6f3ee;color:#221e1c}'
        . 'header{background:#1d1a19;color:#fff;padding:12px 20px;display:flex;gap:18px;align-items:center;flex-wrap:wrap}'
        . 'header a{color:#fff;text-decoration:none;opacity:.8}header a.on{opacity:1;border-bottom:2px solid #c53341}'
        . 'main{max-width:1100px;margin:20px auto;padding:0 16px}table{width:100%;border-collapse:collapse;background:#fff}'
        . 'th,td{padding:8px 10px;border-bottom:1px solid #e5ddd2;text-align:left;vertical-align:top;font-size:14px}'
        . 'th{background:#f1ece4}.card{background:#fff;border:1px solid #e5ddd2;border-radius:8px;padding:16px;margin-bottom:16px}'
        . 'input,select,textarea{font:inherit;padding:8px;border:1px solid #cfc6ba;border-radius:6px;width:100%;box-sizing:border-box}'
        . 'button,.btn{font:inherit;padding:7px 12px;border:0;border-radius:6px;background:#9e1b26;color:#fff;cursor:pointer;text-decoration:none;display:inline-block}'
        . 'button.g,.btn.g{background:#5b524b}button.r{background:#b3261e}.tag{padding:2px 8px;border-radius:99px;background:#eee;font-size:12px}'
        . '.new{background:#fde8ea;color:#9e1b26}.small{font-size:12px;color:#6b625b}pre{white-space:pre-wrap;margin:0;font:13px/1.4 ui-monospace,monospace}'
        . '.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}@media(max-width:700px){th,td{font-size:13px;padding:6px}}'
        . '.navsep{width:1px;align-self:stretch;background:rgba(255,255,255,.15);margin:0 2px}'
        . 'textarea.mono{font:13px/1.4 ui-monospace,monospace}'
        . '</style></head><body>' . $body . '</body></html>';
    exit;
}

function nav(string $active): string
{
    $items = ['leads' => 'Enquiries', 'reviews' => 'Reviews'];
    $out = '<header><strong>Ali Baba Admin</strong>';
    foreach ($items as $k => $label) {
        $out .= '<a href="/admin/?a=' . $k . '"' . ($active === $k ? ' class="on"' : '') . '>' . $label . '</a>';
    }
    $out .= '<span class="navsep"></span>';
    foreach (ab_resources() as $key => $cfg) {
        $out .= '<a href="/admin/?a=res&r=' . urlencode($key) . '"' . ($active === $key ? ' class="on"' : '') . '>' . h($cfg['label']) . '</a>';
    }
    return $out . '<span style="flex:1"></span><a href="/" target="_blank" rel="noopener">View site</a>'
        . '<form method="post" action="/admin/?a=logout" style="margin:0"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><button class="g" type="submit">Log out</button></form></header>';
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
    $b = nav($key) . '<main><div class="card"><h2>' . ($isNew ? 'Add ' : 'Edit ') . h($resource['singular']) . '</h2>';
    if ($error !== '') {
        $b .= '<p style="color:#b3261e">' . $error . '</p>';
    }
    $b .= '<form method="post" action="/admin/?a=res_save&r=' . urlencode($key) . '">'
        . '<input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)($row['id'] ?? 0) . '">';
    foreach ($resource['fields'] as $f) {
        $b .= '<p><label>' . h($f['label']) . '<br>' . res_field_input($f, $row[$f['name']] ?? '') . '</label>';
        if (!empty($f['helpText'])) {
            $b .= '<span class="small">' . h($f['helpText']) . '</span>';
        }
        $b .= '</p>';
    }
    $b .= '<div class="row"><button type="submit">Save</button><a class="btn g" href="/admin/?a=res&r=' . urlencode($key) . '">Cancel</a></div></form></div></main>';
    return $b;
}

/** Render the list view for one resource. */
function res_list(string $key, array $resource, PDO $pdo): string
{
    $rows = $pdo->query('SELECT * FROM ' . $resource['table'] . ' ORDER BY ' . (in_array('sort_order', array_column($resource['fields'], 'name'), true) ? 'sort_order ASC, id DESC' : 'id DESC'))->fetchAll();
    $b = nav($key) . '<main><div class="row" style="justify-content:space-between"><h2>' . h($resource['label']) . '</h2>'
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
    return $b . '</table></main>';
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
    page('Log in', '<main style="max-width:380px"><div class="card"><h2>Admin login</h2>'
        . ($error ? '<p style="color:#b3261e">' . h($error) . '</p>' : '')
        . '<form method="post" action="/admin/"><input type="hidden" name="csrf" value="' . h(csrf()) . '">'
        . '<p><label>Username<input name="user" autocomplete="username" required></label></p>'
        . '<p><label>Password<input name="pass" type="password" autocomplete="current-password" required></label></p>'
        . '<button type="submit">Log in</button></form></div></main>');
}

$pdo = ab_db();

// ---------- Actions (POST + CSRF) ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!csrf_ok() || !ab_same_origin()) {
        http_response_code(403);
        page('Error', '<main><div class="card">Invalid session token. Go back and reload the page.</div></main>');
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
                    $st->execute([...$data, '__id' => $id]);
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
    $b = nav('reviews') . '<main><div class="card"><h2>Add a review</h2>'
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
    page('Reviews', $b . ($rows ? '' : '<tr><td colspan="3">No reviews yet.</td></tr>') . '</table></main>');
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

// ---------- Leads (default) ----------
$status = in_array($_GET['s'] ?? '', ['new', 'contacted', 'closed'], true) ? $_GET['s'] : '';
$perPage = 40;
$pageNo = max(1, (int)($_GET['p'] ?? 1));
$where = $status !== '' ? 'WHERE status = ' . $pdo->quote($status) : '';
$total = (int)$pdo->query("SELECT COUNT(*) FROM ab_leads $where")->fetchColumn();
$rows = $pdo->query("SELECT * FROM ab_leads $where ORDER BY id DESC LIMIT $perPage OFFSET " . (($pageNo - 1) * $perPage))->fetchAll();
$newCount = (int)$pdo->query("SELECT COUNT(*) FROM ab_leads WHERE status='new'")->fetchColumn();

$b = nav('leads') . '<main><div class="row" style="justify-content:space-between"><h2>Enquiries <span class="tag new">' . $newCount . ' new</span></h2>'
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
page('Enquiries', $b . '</p></main>');
