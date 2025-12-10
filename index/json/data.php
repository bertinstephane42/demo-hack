<?php
// Bloquer l'accès direct si ce n'est pas une requête Fetch/AJAX
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || ($_SERVER['HTTP_X_REQUESTED_WITH']) != 'XMLHttpRequest') {
    http_response_code(403);
    echo json_encode(['error' => 'Denied access']);
    exit;
}

if (empty($_SERVER['HTTP_X_PUBLIC_TOKEN']) || ($_SERVER['HTTP_X_PUBLIC_TOKEN']) != '82969263953921582058') {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid token']);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

$data = [
    'mitnick' => [
        'title' => 'Histoire de Kevin Mitnick',
        'story' => "
L'arrestation de Kévin Mitnick

1980s - 1990s : Kévin Mitnick devient célèbre dans le monde du hacking pour ses intrusions dans des systèmes informatiques à travers les États-Unis.

1994 : Tsutomu Shimomura, spécialiste en sécurité informatique, traque Mitnick après que ce dernier ait piraté son système.

- Shimomura utilise ses compétences en cybersécurité pour localiser Mitnick.
- L'affaire devient médiatique : les journaux s'emparent de l'histoire.

16 février 1995 : Kévin Mitnick est finalement arrêté par le FBI à Raleigh, Caroline du Nord.

Cette histoire est devenue emblématique du hacking et de la sécurité informatique moderne.

Conclusion :
Aujourd'hui, les connaissances en hacking peuvent être mises au service de la sécurité et de la protection des données. Devenir un hacker éthique signifie apprendre à identifier les failles pour les corriger, défendre les droits des utilisateurs et renforcer la confiance numérique.
"
    ],
    'help' => [
        'title' => 'Bienvenue sur le site cours-reseaux.fr',
        'story' => "
Cette page est une démonstration inspirée des <strong>démos hacker d’antan</strong>,
où créativité, curiosité et sens du détail formaient la base de la culture informatique.<br><br>

Vous êtes invité à découvrir <strong>5 easter eggs</strong> :<br>

- L’apparition furtive d’un symbole iconique du logiciel libre en survolant un objet<br>
- Un son au design futuriste, déclenchable via un élément bien placé<br>
- La véritable histoire d’un hacker célèbre, révélable par une interaction moins évidente<br>
- Un effet visuel saisonnier, activé en survolant une zone particulière<br>
- Une démo ASCII façon hacker en musique techno, activable via un élément visible.<br><br>

Le <strong>développement Web</strong> offre des possibilités illimitées :
avec un peu d’imagination, vous pouvez créer de véritables œuvres numériques.
Le coding n’est pas seulement une technique : <strong>c’est un art</strong>. La musique de la démo ASCII en est un clin d’œil, hommage à l’esprit du « Mozart de l’informatique ».<br><br>

Même en entreprise, même en tant qu’administrateur systèmes & réseaux,
<strong>créer vos propres outils</strong> reste un atout — à condition, bien sûr, d’obtenir
l’accord de votre supérieur. Les métiers évoluent, les compétences
s’hybrident, notamment grâce à l’essor de l’IA.<br><br>

Vous, étudiants du <strong>CFAI</strong>, immergez-vous dans ce nouveau monde
technologique pour devenir des <strong>hackers éthiques</strong>, compétents, créatifs
et capables d’innover.<br><br>

Et c’est <strong>votre génération</strong> qui nous <strong>donne de l’espoir.</strong>
"
    ]
];

echo json_encode($data);