<?php
/**
 * Copy this file to  /home/CPANELUSER/alibaba-config.php  (ONE level ABOVE
 * public_html, so it can never be downloaded) and fill in the values.
 * If you cannot place it above public_html, save it as public_html/config.php
 * instead (the site's .htaccess blocks web access to it).
 */
return [
    // cPanel -> MySQL Databases: create a database + user and give the user ALL privileges.
    'db_host' => 'localhost',
    'db_name' => 'cpaneluser_alibaba',
    'db_user' => 'cpaneluser_alibaba',
    'db_pass' => 'CHANGE-ME',

    // Admin panel login (https://alibabatraveladvisor.com/admin/).
    'admin_user' => 'admin',
    // Either a plain password (12+ characters) or a bcrypt hash starting with $2y$.
    // To make a hash in cPanel Terminal:  php -r "echo password_hash('your-password', PASSWORD_DEFAULT);"
    'admin_pass' => 'CHANGE-ME-TO-A-LONG-PASSWORD',

    // New enquiries and new reviews are emailed here.
    'notify_email' => 'info@alibabatraveladvisor.com',
    // Must be a real mailbox on your domain so messages are not marked as spam.
    'from_email' => 'info@alibabatraveladvisor.com',
];
