<?php

const DEBUG = false;

const USER_AGENT = '/^Twitterbot.*/';

const REGEX = '/^\s*export\s*const\s*\w+\s*=\s*/';

const TEMPLATE = <<<TEMPLATE
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@JaimeObregon" />
    <meta name="twitter:creator" content="@JaimeObregon">
    <meta name="twitter:title" content="%%TITLE%%" />
    <meta name="twitter:description" content="%%DESCRIPTION%%" />
    <meta name="twitter:image" content="%%IMAGE%%" />
    <meta name="description" content="%%DESCRIPTION%%">
    <meta name="author" content="Jaime Gómez-Obregón">
    <title>%%TITLE%%</title>
  </head>
  <body>
    <img src="%%IMAGE%%">
    <h1>%%TITLE%%</h1>
    <p>%%DESCRIPTION%%</p>
  </body>
</html>
TEMPLATE;

const MAPPING = [
  'persons' => 'entramado',
  'entities' => 'entramado',
  'places' => 'mapa',
  'events' => 'cronologia',
  'documents' => 'biblioteca',
  'articles' => 'biblioteca',
];

function fail() {
  if (DEBUG) {
    debug_print_backtrace();
    die;
  }

  $header = sprintf('Location: https://%s/', $_SERVER['HTTP_HOST']);
  header($header);
  die;
}

define('DATABASE', $_SERVER['DOCUMENT_ROOT'] . '/twitter/ladonacion.js');

$isTwitterBot = preg_match(USER_AGENT, $_SERVER['HTTP_USER_AGENT']);
if (!DEBUG && !$isTwitterBot) {
  fail();
}

if (empty($_SERVER['REQUEST_URI'])) {
  fail();
}

list(, $path, $id) = explode('/', mb_strtolower($_SERVER['REQUEST_URI']));
if (empty($path) || empty($id)) {
  fail();
}

if (!in_array($path, array_values(MAPPING))) {
  fail();
}

$contents = file_get_contents(DATABASE);
if (!$contents) {
  fail();
}

$string = preg_replace(REGEX, '', $contents);
$json = json_decode($string, true);
if (!$json) {
  fail();
}

$items = [];
foreach (MAPPING as $model => $slug) {
  if ($path === $slug) {
    $found = array_filter($json[$model], fn($item) => $item['id'] === $id);
    if ($found) {
      $result = array_values($found)[0];
      break;
    }
  }
}

if (!$result) {
  fail();
}

$data = [
  '%%TITLE%%' => $result['metadata']['title'],
  '%%DESCRIPTION%%' => $result['metadata']['description'],
  '%%IMAGE%%' => $result['metadata']['image'],
];

$substitutions = array_map(fn($value) => htmlspecialchars($value), array_values($data));
$response = str_replace(array_keys($data), $substitutions, TEMPLATE);

echo $response;
