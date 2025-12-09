<?php
// page.php — charge une page interne sans révéler son URL

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit("Method not allowed");
}

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

// Capture tout l'affichage de la page
ob_start();
include $routes[$id];
$content = ob_get_clean();

// Sinon, affiche le contenu normal
echo $content;
exit;
