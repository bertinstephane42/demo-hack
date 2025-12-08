<?php
// --------------------------------------------
// ENVOI D'EMAIL VIA SMTP LWS (PHPMailer)
// --------------------------------------------
$success = false;
$errorMsg = "";

// --- Validation du mail renforcée ---
function isValidEmail(string $email): bool {
    // 1) Validation standard (syntaxe correcte)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    // 2) Regex plus stricte (évite des cas borderline : '..', débuts/fin incorrects, etc.)
    $pattern = "/^(?!.*\.\.)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i";
    if (!preg_match($pattern, $email)) {
        return false;
    }

    // 3) Vérification DNS MX : le domaine existe et peut recevoir des mails
    $domain = substr(strrchr($email, "@"), 1);
    if (!checkdnsrr($domain, "MX")) {
        return false;
    }

    return true;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

	if ($name !== "" && isValidEmail($email) && $message !== "") {

        // Sujet
        $subject = "Nouveau message depuis Cours-Reseaux.fr";

        // Contenu HTML du mail
        $body  = "Nouveau message envoyé depuis le site :\n\n";
        $body .= "Nom : $name\n";
        $body .= "Email : $email\n\n";
        $body .= "Message :\n$message\n";

        // Headers à la manière de DokuWiki
        $headers = [];
        $headers[] = "From: Cours-Reseaux <contact@cours-reseaux.fr>";
        $headers[] = "Reply-To: $name <$email>";
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/plain; charset=UTF-8";

        $headerString = implode("\r\n", $headers);

        // Envoi via la fonction mail() (comme DokuWiki)
        if (mail("contact@cours-reseaux.fr", $subject, $body, $headerString)) {
            $success = true;
        } else {
            $errorMsg = "L’envoi du message a échoué. Merci de réessayer ultérieurement.";
        }

    } else {
            if ($name === "") {
				$errorMsg = "Merci de renseigner votre nom.";
			}
			elseif ($email === "") {
				$errorMsg = "Merci de renseigner votre adresse email.";
			}
			elseif (!isValidEmail($email)) {
				$errorMsg = "L’adresse email saisie n’est pas valide. Vérifiez le format et le domaine.";
			}
			elseif ($message === "") {
				$errorMsg = "Merci d’écrire un message.";
			}
			else {
				// Cas improbable (sécurité)
				$errorMsg = "Les informations fournies ne sont pas valides.";
			}
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cours-Réseaux — Formation BTS SIO • CPI • Expert Cyber</title>
  <meta name="description" content="Cours-Réseaux.fr — Ressources pédagogiques informatiques (BTS SIO, Bac+3 CPI, Bac+5 Expert Cyber). DokuWiki sécurisé, outils pédagogiques et proxys applicatifs.">
  <link rel="canonical" href="https://cours-reseaux.fr/">

  <!-- Bootswatch Spacelab via CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/spacelab/bootstrap.min.css">

  <!-- Google font fallback -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/index.css">
</head>

<body>

  <div class="float-bg" aria-hidden="true">
    <!-- decorative floating SVG shapes animated by JS -->
    <svg class="float-item" id="float1" width="260" height="260" viewBox="0 0 260 260" style="left:-60px; top:-40px;">
      <defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#4a8fe7"/><stop offset="1" stop-color="#2f6fd6"/></linearGradient></defs>
      <circle cx="130" cy="130" r="110" fill="url(#g1)"/>
    </svg>
    <svg class="float-item" id="float2" width="220" height="220" viewBox="0 0 220 220" style="right:-50px; bottom:-70px;">
      <rect x="10" y="10" width="200" height="200" rx="36" fill="#e9f2ff"/>
    </svg>
  </div>

  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div class="container d-flex align-items-center justify-content-between">
    <!-- Logo + texte regroupés dans le lien -->
    <a class="navbar-brand d-flex align-items-center gap-3">
      <span class="logo-mark position-relative">
        CN
      </span>
      <div class="d-none d-md-block">
        <div style="font-weight:700">Contactez-nous</div>
        <small class="text-muted">Nous répondons rapidement aux étudiants et formateurs.</small>
      </div>
    </a>
	<div class="text-center mb-4">
		<a href="https://cours-reseaux.fr/index.php" class="btn btn-outline-secondary">
			Retour à l'accueil
		</a>
	</div>
	</div>
	</nav>

<header class="hero">
<div class="container">
  <div class="contact-wrapper">
    <?php if ($success): ?>
      <div class="alert alert-success">Votre message a bien été envoyé. Merci !</div>
    <?php elseif ($errorMsg): ?>
      <div class="alert alert-danger"><?= htmlspecialchars($errorMsg) ?></div>
    <?php endif; ?>

    <form action="" method="POST">
      <div class="form-floating mb-3">
        <input type="text" name="name" class="form-control" id="nameInput" placeholder="Votre nom" required>
        <label for="nameInput">Votre nom et prénom</label>
      </div>

      <div class="form-floating mb-3">
        <input type="email" name="email" class="form-control" id="emailInput" placeholder="Votre email" required>
        <label for="emailInput">Votre email</label>
      </div>

      <div class="form-floating mb-4">
        <textarea name="message" class="form-control" id="messageInput" placeholder="Votre message" style="height:160px" required></textarea>
        <label for="messageInput">Votre message</label>
      </div>

      <div class="text-center">
        <button type="submit" class="btn-cta">Envoyer le message</button>
      </div>
    </form>

  </div>
 </header>

  <footer class="text-center mt-4 mb-4">
    <small>© <?= date("Y") ?> Cours-Réseaux.fr – Tous droits réservés</small>
  </footer>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
  document.addEventListener("contextmenu", event => event.preventDefault());
  document.addEventListener("keydown", function (e) {
	  if (
		e.key === "F12" ||
		(e.ctrlKey && e.shiftKey && e.key === "I") ||
		(e.ctrlKey && e.key === "U")
	  ) {
		e.preventDefault();
	  }
  });
</script>
</body>
</html>