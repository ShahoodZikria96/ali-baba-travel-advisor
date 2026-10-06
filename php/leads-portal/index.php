<?php
// Leads portal: a separate login (users are managed in the admin panel under
// "Leads Portal Users") that shows website enquiries and nothing else. Users can
// search/filter, change a lead's status and download a CSV; they cannot delete
// anything or reach any other part of the site's backend.
// Single file, PHP 7.4+. Shares the helper library and database with the admin panel.
declare(strict_types=1);
require __DIR__ . '/../api/_lib.php';

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'self'; style-src 'unsafe-inline'; frame-ancestors 'none'; form-action 'self'");

const PORTAL_IDLE_SECONDS = 4 * 3600;

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? '') === '443';
session_name('ab_portal');
session_set_cookie_params(['lifetime' => 0, 'path' => '/leads-portal/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Lax']);
session_start();

function h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function csrf(): string { if (empty($_SESSION['csrf'])) { $_SESSION['csrf'] = bin2hex(random_bytes(32)); } return $_SESSION['csrf']; }
function csrf_ok(): bool { return isset($_POST['csrf'], $_SESSION['csrf']) && hash_equals($_SESSION['csrf'], (string)$_POST['csrf']); }
function go(string $qs = ''): void { header('Location: /leads-portal/' . $qs); exit; }

function portal_css(): string
{
    return '
:root{--maroon:#9e1b26;--maroon-dark:#7a141d;--ink:#1d1a19;--ink-soft:#49423d;--line:#e8e1d6;--bg:#f6f3ee;--card:#fff;--muted:#8a8178}
*{box-sizing:border-box}
body{font:15px/1.55 "Segoe UI",system-ui,Arial,sans-serif;margin:0;background:var(--bg);color:var(--ink)}
.top{background:var(--ink);color:#fff;padding:12px 24px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.top b{font-size:17px}.top span{opacity:.6;font-size:13px}.top .sp{flex:1}
.top form{margin:0}
.wrap{max-width:1180px;margin:22px auto;padding:0 20px}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:18px;margin-bottom:16px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:16px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.stat b{font-size:24px;display:block}.stat span{font-size:12.5px;color:var(--muted)}
label{display:block;font-size:12.5px;font-weight:600;color:var(--ink-soft);margin-bottom:4px}
input,select{font:inherit;padding:8px 10px;border:1px solid #d8d0c3;border-radius:7px;width:100%;background:#fff}
input:focus,select:focus{outline:2px solid var(--maroon);outline-offset:-1px;border-color:var(--maroon)}
button,.btn{font:inherit;font-size:13.5px;padding:8px 14px;border:0;border-radius:7px;background:var(--maroon);color:#fff;cursor:pointer;text-decoration:none;display:inline-block}
button:hover,.btn:hover{background:var(--maroon-dark)}
.btn.g,button.g{background:#eee6da;color:var(--ink)}.btn.g:hover,button.g:hover{background:#e3d9c8}
.top button.g{background:rgba(255,255,255,.12);color:#fff}
.filters{display:grid;grid-template-columns:2fr 1.2fr 1.2fr 1fr 1fr auto;gap:10px;align-items:end}
.filters .acts{display:flex;gap:6px;flex-wrap:wrap}
.stform{display:flex;gap:6px;align-items:center;margin:0}.stform select{width:118px;padding:6px 8px}.stform button{padding:6px 10px}
.st-new{background:#fde8ea;color:var(--maroon)}.st-contacted{background:#fff3d6;color:#8a5a00}.st-closed{background:#e4f1e2;color:#3d6b34}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:10px;overflow:hidden}
th,td{padding:10px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top;font-size:13.5px}
th{background:#faf8f4;color:var(--ink-soft);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.04em}
tr:last-child td{border-bottom:0}
.tag{padding:3px 10px;border-radius:99px;background:#fde8ea;color:var(--maroon);font-size:11.5px;font-weight:600;white-space:nowrap}
.small{font-size:12px;color:var(--muted);display:block;margin-top:3px;word-break:break-all}
dl{margin:0;display:grid;grid-template-columns:max-content 1fr;gap:2px 12px;font-size:13px}
dt{color:var(--muted)}dd{margin:0;word-break:break-word}
.pager{display:flex;gap:8px;align-items:center;margin:14px 0}
.err{color:#b3261e}
@media(max-width:860px){.filters{grid-template-columns:1fr 1fr}.stform{flex-wrap:wrap}.wrap{padding:0 12px}th,td{padding:8px;font-size:12.5px}}
';
}

function portal_page(string $title, string $body): void
{
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex,nofollow"><link rel="icon" href="/favicon.ico">'
        . '<title>' . h($title) . ' - Ali Baba Leads</title><style>' . portal_css() . '</style></head><body>' . $body . '</body></html>';
    exit;
}

function login_screen(string $error = ''): void
{
    portal_page('Log in', '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px">'
        . '<div class="card" style="width:100%;max-width:380px"><h2 style="margin:0 0 4px">Ali Baba Leads</h2>'
        . '<p class="small" style="margin:0 0 14px">Sign in to view website enquiries.</p>'
        . ($error !== '' ? '<p class="err">' . h($error) . '</p>' : '')
        . '<form method="post" action="/leads-portal/"><input type="hidden" name="csrf" value="' . h(csrf()) . '">'
        . '<p><label>Username</label><input name="user" autocomplete="username" required></p>'
        . '<p><label>Password</label><input name="pass" type="password" autocomplete="current-password" required></p>'
        . '<button type="submit" style="width:100%">Log in</button></form></div></div>');
}

/** Short fingerprint of the stored hash: changing the password ends every open session. */
function pw_fingerprint(string $hash): string { return substr(hash('sha256', $hash), 0, 20); }

$pdo = ab_db();
$user = null;

// ---------- Session check: the account must still exist, be active, and have the same password ----------
if (!empty($_SESSION['uid'])) {
    $st = $pdo->prepare('SELECT id, username, display_name, password_hash, active FROM ab_portal_users WHERE id = ?');
    $st->execute([(int)$_SESSION['uid']]);
    $row = $st->fetch();
    $idleOk = isset($_SESSION['last']) && (time() - (int)$_SESSION['last']) < PORTAL_IDLE_SECONDS;
    if ($row && (int)$row['active'] === 1 && $idleOk && hash_equals(pw_fingerprint((string)$row['password_hash']), (string)($_SESSION['pv'] ?? ''))) {
        $user = $row;
        $_SESSION['last'] = time();
    } else {
        $_SESSION = [];
    }
}

// ---------- Login / logout ----------
if ($user === null) {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        login_screen();
    }
    if (!csrf_ok() || !ab_same_origin()) {
        login_screen('Session expired. Please try again.');
    }
    if (!ab_rate_ok('plogin', 8, 900)) {
        login_screen('Too many attempts. Please wait 15 minutes.');
    }
    $u = strtolower(trim((string)($_POST['user'] ?? '')));
    $p = (string)($_POST['pass'] ?? '');
    $st = $pdo->prepare('SELECT id, password_hash, active FROM ab_portal_users WHERE username = ?');
    $st->execute([$u]);
    $row = $st->fetch();
    // Always run a hash check so response time does not reveal whether the username exists.
    $hash = $row ? (string)$row['password_hash'] : password_hash('no-such-user', PASSWORD_DEFAULT);
    $passOk = password_verify($p, $hash);
    if ($row && $passOk && (int)$row['active'] === 1) {
        session_regenerate_id(true);
        $_SESSION['uid'] = (int)$row['id'];
        $_SESSION['pv'] = pw_fingerprint((string)$row['password_hash']);
        $_SESSION['last'] = time();
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        $pdo->prepare('UPDATE ab_portal_users SET last_login = NOW() WHERE id = ?')->execute([(int)$row['id']]);
        go();
    }
    login_screen($row && $passOk ? 'This account is disabled. Contact the administrator.' : 'Wrong username or password.');
}

// ---------- Filters (shared by the list, the CSV export and status redirects) ----------
$statuses = ['new' => 'New', 'contacted' => 'Contacted', 'closed' => 'Closed'];
$labels = [
    'visa_assessment' => 'Visa assessment', 'tour_enquiry' => 'Tour enquiry', 'flight_enquiry' => 'Flight enquiry',
    'refusal_case' => 'Refusal case', 'contact' => 'Contact',
];
$type = (string)($_GET['t'] ?? '');
$type = isset($labels[$type]) ? $type : '';
$status = (string)($_GET['s'] ?? '');
$status = isset($statuses[$status]) ? $status : '';
$q = ab_clean((string)($_GET['q'] ?? ''), 80);
$from = preg_match('/^\d{4}-\d{2}-\d{2}$/', (string)($_GET['from'] ?? '')) ? (string)$_GET['from'] : '';
$to = preg_match('/^\d{4}-\d{2}-\d{2}$/', (string)($_GET['to'] ?? '')) ? (string)$_GET['to'] : '';

$where = [];
$args = [];
if ($type !== '') { $where[] = 'type = ?'; $args[] = $type; }
if ($status !== '') { $where[] = 'status = ?'; $args[] = $status; }
if ($q !== '') {
    $where[] = '(data LIKE ? OR source LIKE ?)';
    $like = '%' . addcslashes($q, '%_\\') . '%';
    $args[] = $like;
    $args[] = $like;
}
if ($from !== '') { $where[] = 'created_at >= ?'; $args[] = $from . ' 00:00:00'; }
if ($to !== '') { $where[] = 'created_at <= ?'; $args[] = $to . ' 23:59:59'; }
$whereSql = $where ? 'WHERE ' . implode(' AND ', $where) : '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!csrf_ok() || !ab_same_origin()) {
        http_response_code(403);
        portal_page('Error', '<div class="wrap"><div class="card">Invalid session token. Go back and reload the page.</div></div>');
    }
    if (($_GET['a'] ?? '') === 'logout') {
        $_SESSION = [];
        session_destroy();
        go();
    }
    if (($_GET['a'] ?? '') === 'status') {
        $newStatus = (string)($_POST['status'] ?? '');
        if (isset($statuses[$newStatus])) {
            $pdo->prepare('UPDATE ab_leads SET status = ? WHERE id = ?')->execute([$newStatus, (int)($_POST['id'] ?? 0)]);
        }
        // Return to the same filtered page; rebuild the query from known keys only.
        parse_str((string)($_POST['back'] ?? ''), $backIn);
        $backOut = [];
        foreach (['q', 't', 's', 'from', 'to', 'p'] as $k) {
            if (isset($backIn[$k]) && is_string($backIn[$k]) && $backIn[$k] !== '') { $backOut[$k] = $backIn[$k]; }
        }
        go($backOut ? '?' . http_build_query($backOut) : '');
    }
    go();
}

// ---------- CSV download (respects the current filters) ----------
if (($_GET['a'] ?? '') === 'export') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="leads-' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fwrite($out, "\xEF\xBB\xBF");
    fputcsv($out, ['ID', 'Date', 'Type', 'Status', 'Page', 'Name', 'Phone', 'City', 'Details (JSON)']);
    // Prefix cells starting with = + - @ so spreadsheets do not run them as formulas.
    $safe = function ($v) { $v = (string)$v; return preg_match('/^[=+\-@\t\r]/', $v) ? "'" . $v : $v; };
    $st = $pdo->prepare("SELECT * FROM ab_leads $whereSql ORDER BY id DESC");
    $st->execute($args);
    while ($r = $st->fetch()) {
        $d = json_decode((string)$r['data'], true) ?: [];
        fputcsv($out, [$r['id'], $r['created_at'], $labels[$r['type']] ?? $r['type'], $r['status'], $safe($r['source']),
            $safe($d['fullName'] ?? $d['name'] ?? ''), $safe($d['phone'] ?? ''), $safe($d['city'] ?? ''), $safe($r['data'])]);
    }
    exit;
}


$perPage = 25;
$pageNo = max(1, (int)($_GET['p'] ?? 1));
$st = $pdo->prepare("SELECT COUNT(*) FROM ab_leads $whereSql");
$st->execute($args);
$total = (int)$st->fetchColumn();
$st = $pdo->prepare("SELECT id, type, data, source, status, created_at FROM ab_leads $whereSql ORDER BY id DESC LIMIT $perPage OFFSET " . (($pageNo - 1) * $perPage));
$st->execute($args);
$rows = $st->fetchAll();

$all = (int)$pdo->query('SELECT COUNT(*) FROM ab_leads')->fetchColumn();
$today = (int)$pdo->query('SELECT COUNT(*) FROM ab_leads WHERE created_at >= CURDATE()')->fetchColumn();
$week = (int)$pdo->query('SELECT COUNT(*) FROM ab_leads WHERE created_at >= (CURDATE() - INTERVAL 6 DAY)')->fetchColumn();
$month = (int)$pdo->query("SELECT COUNT(*) FROM ab_leads WHERE created_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01')")->fetchColumn();

$b = '<div class="top"><b>Ali Baba Leads</b><span>Website enquiries</span><div class="sp"></div><span>' . h($user['display_name'] ?: $user['username']) . '</span>'
    . '<form method="post" action="/leads-portal/?a=logout"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><button class="g" type="submit">Log out</button></form></div><div class="wrap">'
    . '<div class="stats"><div class="stat"><b>' . $all . '</b><span>Total leads</span></div><div class="stat"><b>' . $today . '</b><span>Today</span></div>'
    . '<div class="stat"><b>' . $week . '</b><span>Last 7 days</span></div><div class="stat"><b>' . $month . '</b><span>This month</span></div></div>'
    . '<form class="card filters" method="get" action="/leads-portal/">'
    . '<div><label>Search</label><input name="q" value="' . h($q) . '" placeholder="Name, phone, country, page..."></div>'
    . '<div><label>Type</label><select name="t"><option value="">All types</option>';
foreach ($labels as $k => $lbl) {
    $b .= '<option value="' . h($k) . '"' . ($type === $k ? ' selected' : '') . '>' . h($lbl) . '</option>';
}
$b .= '</select></div><div><label>Status</label><select name="s"><option value="">All statuses</option>' . implode('', array_map(function ($k, $lbl) use ($status) {
        return '<option value="' . h($k) . '"' . ($status === $k ? ' selected' : '') . '>' . h($lbl) . '</option>';
    }, array_keys($statuses), $statuses)) . '</select></div><div><label>From</label><input type="date" name="from" value="' . h($from) . '"></div>'
    . '<div><label>To</label><input type="date" name="to" value="' . h($to) . '"></div>'
    . '<div class="acts"><button type="submit">Filter</button><a class="btn g" href="/leads-portal/">Reset</a><a class="btn g" href="/leads-portal/?' . h(http_build_query(array_filter(['a' => 'export', 'q' => $q, 't' => $type, 's' => $status, 'from' => $from, 'to' => $to]))) . '">Download CSV</a></div></form>'
    . '<p class="small" style="margin:0 0 8px">' . $total . ' lead' . ($total === 1 ? '' : 's') . ' found</p>'
    . '<table><tr><th>Date</th><th>Type</th><th>Details</th><th>Status</th></tr>';
foreach ($rows as $r) {
    $d = json_decode((string)$r['data'], true) ?: [];
    $b .= '<tr><td style="white-space:nowrap">' . h(substr((string)$r['created_at'], 0, 16)) . '</td><td><span class="tag">' . h($labels[$r['type']] ?? $r['type']) . '</span>'
        . ($r['source'] ? '<span class="small">' . h($r['source']) . '</span>' : '') . '</td><td><dl>';
    foreach ($d as $k => $v) {
        if ($v === '' || $v === null) { continue; }
        $b .= '<dt>' . h($k) . '</dt><dd>' . h(is_bool($v) ? ($v ? 'yes' : 'no') : $v) . '</dd>';
    }
    $b .= '</dl></td><td><form class="stform" method="post" action="/leads-portal/?a=status"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="id" value="' . (int)$r['id'] . '">'
        . '<input type="hidden" name="back" value="' . h((string)($_SERVER['QUERY_STRING'] ?? '')) . '"><select name="status" aria-label="Lead status">';
    foreach ($statuses as $k => $lbl) {
        $b .= '<option value="' . h($k) . '"' . ($r['status'] === $k ? ' selected' : '') . '>' . h($lbl) . '</option>';
    }
    $b .= '</select><button class="g" type="submit">Save</button></form></td></tr>';
}
if (!$rows) {
    $b .= '<tr><td colspan="4">No leads match.</td></tr>';
}
$qs = http_build_query(array_filter(['q' => $q, 't' => $type, 's' => $status, 'from' => $from, 'to' => $to]));
$b .= '</table><div class="pager">';
if ($pageNo > 1) { $b .= '<a class="btn g" href="/leads-portal/?' . h($qs . '&p=' . ($pageNo - 1)) . '">&larr; Newer</a>'; }
$b .= '<span class="small" style="margin:0">Page ' . $pageNo . ' of ' . max(1, (int)ceil($total / $perPage)) . '</span>';
if ($pageNo * $perPage < $total) { $b .= '<a class="btn g" href="/leads-portal/?' . h($qs . '&p=' . ($pageNo + 1)) . '">Older &rarr;</a>'; }
portal_page('Leads', $b . '</div></div>');
