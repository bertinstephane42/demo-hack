<?php
// page.php — charge une page interne sans révéler son URL

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
	header('Location: https://cours-reseaux.fr/index.php');
    exit("Method not allowed");
}

header('X-Content-Type-Options: nosniff');
header('Content-Type: text/html; charset=utf-8');

// Vérification de l'ID
$id = $_POST['id'] ?? null;

$allowedIds = ['contact', 'sitemap'];
if (!in_array($id, $allowedIds, true)) {
    http_response_code(404);
    exit("Unknown code");
}

// Routes internes invisibles
$routes = [
    'contact' => __DIR__ . '/../php/contact.php',
    'sitemap' => __DIR__ . '/../php/sitemap.php',
];

if (!$id || !isset($routes[$id])) {
    http_response_code(404);
    exit("Path not found");
}

if (!is_file($routes[$id]) || !is_readable($routes[$id])) {
    http_response_code(500);
    exit("Internal routing error");
}

function safe_include($file) {
    include $file;
}

// Capture tout l'affichage de la page
ob_start();
safe_include($routes[$id]);
$content = ob_get_clean();

// Sinon, affiche le contenu normal
echo $content;
exit;