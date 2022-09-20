<?php

const REGEX = '/^\s*RewriteCond\s+%{TIME}\s+<\s*(?P<epoch>\d+)\s*$/m';
const HTACCESS = '/var/www/vhosts/ladonacion.es/httpdocs/.htaccess';
const URL = 'https://ladonacion.es';

$htaccess = file_get_contents(HTACCESS);
$status = preg_match(REGEX, $htaccess, $matches);

$url = URL;
$epoch = 'ERROR';

if ($status && !empty($matches['epoch']) && strtotime($matches['epoch'])) {
  $epoch = strtotime($matches['epoch']);
}

echo json_encode(compact('epoch', 'url'));
