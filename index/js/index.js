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

 // Floating background subtle motion
    (function(){
      const floats = [document.getElementById('float1'), document.getElementById('float2')];
      let t = 0;
      function animate(){
        t += 0.006;
        floats.forEach((el,i)=>{
          if(!el) return;
          const x = Math.sin(t*(0.6 + i*0.2)) * 12; const y = Math.cos(t*(0.4 + i*0.12))*8;
          el.style.transform = `translate(${x}px, ${y}px) rotate(${t*6*(i+1)}deg)`;
        });
        requestAnimationFrame(animate);
      }
      if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(animate);
    })();

    // Mini console animation
    (function(){
	  const consoleEl = document.getElementById('console');
	  const lines = [
		"[info] Initialisation des environnements pédagogiques...",
		"[ok] Proxy applicatif démarré — isolation: ON",
		"[ok] CloudFlare: protections WAF actives",
		"$ git clone https://cours-reseaux.fr/dev/check-php.git",
		"$ docker-compose up -d --build",
		"[warn] Nouvelles lecons disponibles: RGPD, gestion incidents"
	  ];

	  let showCursor = true;
	  let cursorInterval;
	  let animationRunning = false;

	  const lineHeight = parseInt(getComputedStyle(consoleEl).lineHeight) || 20;
	  consoleEl.style.minHeight = `${lines.length * lineHeight}px`;
	  consoleEl.style.color = "#0f0"; // couleur initiale

	  function startConsoleAnimation() {
		if (animationRunning) return;
		animationRunning = true;
		let i = 0;
		let charIndex = 0;

		consoleEl.textContent = ''; // réinitialiser le contenu

		// Clignotement du curseur
		if(cursorInterval) clearInterval(cursorInterval);
		cursorInterval = setInterval(() => {
		  showCursor = !showCursor;
		  updateConsoleDisplay();
		}, 500);

		function updateConsoleDisplay() {
		  let displayLines = lines.slice(0, i).join('\n');
		  if(i < lines.length) displayLines += (displayLines ? '\n' : '') + lines[i].slice(0, charIndex);
		  consoleEl.textContent = displayLines + (showCursor ? '█' : ' ');
		}

		function tick() {
		  if (i >= lines.length) {
				animationRunning = false;
				return;
			}
		  const line = lines[i];
		  charIndex++;
		  if(charIndex > line.length) {
			charIndex = 0;
			i++;
			setTimeout(tick, 700);
		  } else {
			setTimeout(tick, 40);
		  }
		  updateConsoleDisplay();
		}

		tick();
	  }

	  // --- Nouvelle partie : changement de couleur au passage de la souris ---
	  consoleEl.addEventListener('mouseenter', () => {
		  consoleEl.style.color = "#0f0"; // couleur tranchée
		  consoleEl.style.textShadow = `
			0 0 5px #0f0,
			0 0 10px #0f0,
			0 0 20px #0f0,
			0 0 30px #0f0
		  `; // effet néon
		});

		consoleEl.addEventListener('mouseleave', () => {
		  setTimeout(() => {
			consoleEl.style.textShadow = "none"; // suppression effet néon
		  }, 2000);
		});

	  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
		startConsoleAnimation();
		setInterval(startConsoleAnimation, 25000);
	  }

	})();

    // Hover micro-animations for tech chips to add small confetti-like burst
    (function(){
      const chips = document.querySelectorAll('.tech-chip');
      chips.forEach(chip=>{
        chip.addEventListener('mouseenter', ()=>{
          chip.animate([
            {transform: 'translateY(0) scale(1)', boxShadow:'0 6px 20px rgba(20,40,80,0.06)'},
            {transform: 'translateY(-8px) scale(1.04)', boxShadow:'0 18px 48px rgba(30,80,160,0.12)'}
          ], {duration:300, easing:'cubic-bezier(.2,.9,.3,1)'});
        });
      });
    })();

    // subtle entrance animations on scroll
    (function(){
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(ent=>{
          if(ent.isIntersecting) ent.target.classList.add('animate-in');
        });
      }, {threshold:.12});
      // simple CSS injection for animate-in
      const style = document.createElement('style');
      style.innerHTML = `.will-animate.animate-in{opacity:1; transform:none; transition:all .6s cubic-bezier(.2,.9,.3,1);}`;
      document.head.appendChild(style);
    })();

    // Accessibility: focus on CTA when arriving with query ?focus=cta
    (function(){
      try{
        const params = new URLSearchParams(location.search);
        if(params.get('focus')==='cta') document.getElementById('visitBtn').focus();
      }catch(e){}
    })();
	
	document.getElementById('visitBtn').addEventListener('click', () => {
	  window.location.href = '/bts_sio/doku.php/start';
	});
	
	(function(){
	  const words = [
		"RGPD", "ITIL", "DevOps", "Systèmes", "Cybersécurité", "GNU/Linux", "Windows",
		"PowerShell", "Bash", "Perl", "Golang", "HTML", "JavaScript", "PHP",
		"OSINT", "Supervision", "CI/CD", "Docker", "Ansible", "Reverse Engineering",
		"Monitoring", "Sécurité Web", "Cloud", "API", "Forensics", "Pentest", "SSH",
		"TCP/IP", "DNS", "DHCP", "Logs", "Vim", "Git"
	  ];

	  const container = document.getElementById("wordCloudInner");
	  container.innerHTML = ''; 
	  const containerWidth = container.clientWidth;
	  const containerHeight = container.clientHeight;

	  const minSpacing = 50; 
	  const positions = [];

	  function isFarEnough(x, y) {
		return positions.every(pos => {
		  const dx = pos.x - x;
		  const dy = pos.y - y;
		  return Math.sqrt(dx*dx + dy*dy) >= minSpacing;
		});
	  }

	  words.forEach(word => {
		const span = document.createElement('span');
		span.textContent = word;
		span.style.position = 'absolute';
		span.style.whiteSpace = 'nowrap';
		span.style.fontWeight = '600';
		span.style.color = 'var(--muted)';
		span.style.opacity = 0.9;

		let top, left;
		let attempts = 0;
		do {
		  top = Math.random() * (containerHeight - 24);
		  left = Math.random() * (containerWidth - 100);
		  attempts++;
		} while (!isFarEnough(left, top) && attempts < 100);
		positions.push({x: left, y: top});

		span.style.top = `${top}px`;
		span.style.left = `${left}px`;

		container.appendChild(span);

		let dx = (Math.random() * 0.5 + 0.1) * (Math.random() < 0.5 ? 1 : -1);
		let dy = (Math.random() * 0.3 + 0.05) * (Math.random() < 0.5 ? 1 : -1);
		
		let mouseX = containerWidth / 2;
		let mouseY = containerHeight / 2;
		let originalDx = dx;
		let originalDy = dy;
		let restoreTimer = null;

		// Suivi de la souris
		container.addEventListener('mousemove', e => {
			mouseX = e.clientX - container.getBoundingClientRect().left;
			mouseY = e.clientY - container.getBoundingClientRect().top;
		});

		function animate() {
			let x = parseFloat(span.style.left);
			let y = parseFloat(span.style.top);

			// Calcul distance souris
			const dxMouse = x + span.offsetWidth/2 - mouseX;
			const dyMouse = y + span.offsetHeight/2 - mouseY;
			const dist = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);

			const repelRadius = 100;

			if (dist < repelRadius) {
				const force = (repelRadius - dist) / repelRadius * 0.5;
				dx += (dxMouse / dist) * force;
				dy += (dyMouse / dist) * force;

				// Annule le timer précédent si souris toujours proche
				if (restoreTimer) clearTimeout(restoreTimer);

				// Restaure la vitesse initiale après 1 seconde
				restoreTimer = setTimeout(() => {
					dx = originalDx;
					dy = originalDy;
				}, 1000);
			}

			x += dx;
			y += dy;

			if (x < 0 || x + span.offsetWidth > containerWidth) dx *= -1;
			if (y < 0 || y + span.offsetHeight > containerHeight) dy *= -1;

			span.style.left = `${x}px`;
			span.style.top = `${y}px`;

			requestAnimationFrame(animate);
		}

		animate();
	  });
	})();
	
	(function(){
	  const logo = document.querySelector('.logo-mark');
	  if(!logo) return;

	  logo.addEventListener('mouseenter', () => {
		logo.classList.add('show-tux');
		setTimeout(() => logo.classList.remove('show-tux'), 1300);
	  });
	})();
	
	  const logo = document.querySelector('.logo-mark');
	  logo.addEventListener('mouseenter', () => {
		logo.classList.add('show-tux');
	  });
	  logo.addEventListener('mouseleave', () => {
		logo.classList.remove('show-tux');
	  });
	  
	  document.querySelector('.logo-mark').addEventListener('click', () => {
			document.querySelector('.logo-mark').classList.toggle('show-tux');
		});
	
	(function(){
		// Création dynamique de l'élément audio (invisible dans le code source)
		const audio = document.createElement('audio');
		audio.id = 'hack';
		audio.src = '/index/sound/hacking-music.mp3';
		audio.preload = 'auto';
		document.body.appendChild(audio);

		const tuxChip = document.querySelector('.tech-chip[title="GNU/Linux"]');
		
		let audioUnlocked = false; // vrai déclencheur après interaction
		let hoverTimeout; // stocke le timer de survol

		// Débloquer le son après un premier clic n'importe où
		document.addEventListener('click', () => {
			if (!audioUnlocked) {
				audio.play().then(() => {
					audio.pause();
					audio.currentTime = 0;
					audioUnlocked = true;
				}).catch(() => {});
			}
		}, { once: true });

		// Switch on/off au survol avec délai
		tuxChip.addEventListener('mouseenter', () => {
			if (!audioUnlocked) return;

			// Lance le timer de 1 seconde
			hoverTimeout = setTimeout(() => {
				if (audio.paused) {
					audio.currentTime = 0;
					audio.play().catch(e => console.log("Erreur play:", e));
				} else {
					audio.pause();
					audio.currentTime = 0;
				}
			}, 1000);
		});

		// Annule si la souris quitte avant 1 seconde
		tuxChip.addEventListener('mouseleave', () => {
			clearTimeout(hoverTimeout);
		});

	})();
	
	(function(){
	  const el = document.getElementById('search');
	  
	  setInterval(() => {
		const dy = (Math.random() - 0.5) * 2; // -1 à 1 px
		el.style.transform = `translateY(${dy}px)`;
	  }, 400);
	})();
	
	(function() {
		const footer = document.querySelector('footer');
		const canvas = document.getElementById('fireworks-canvas');
		const hint = document.getElementById('fireworks-hint');
		hint.textContent = "Cliquez pour activer le son des explosions";
		let hintTimer;
		const ctx = canvas.getContext('2d');
		let width = canvas.width = window.innerWidth;
		let height = canvas.height = window.innerHeight;
		let fireworks = [];
		let particles = [];
		let running = false;
		let soundEnabled = false;
		
		const boomSound = new Audio("https://cours-reseaux.fr/index/sound/fireboom.mp3");
		boomSound.volume = 0.4; // volume raisonnable

		function playFireworkSound() {
			if (!soundEnabled) return;  // si OFF → pas de son
			const s = boomSound.cloneNode();
			s.play();
		}

		// Gestion resize
		window.addEventListener('resize', () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		});

		class Firework {
			constructor(x, y) {
				this.x = x;
				this.y = height;
				this.targetY = y;
				this.speed = 5 + Math.random() * 3;
				this.color = `hsl(${Math.random()*360}, 100%, 50%)`;
				this.exploded = false;
			}
			update() {
				this.y -= this.speed;
				if(this.y <= this.targetY && !this.exploded) {
					this.explode();
					this.exploded = true;
				}
			}
			draw() {
				if(!this.exploded){
					ctx.beginPath();
					ctx.arc(this.x, this.y, 2, 0, Math.PI*2);
					ctx.fillStyle = this.color;
					ctx.fill();
				}
			}
			explode() {
				playFireworkSound();
				const count = 20 + Math.random()*20;
				for(let i=0; i<count; i++){
					particles.push(new Particle(this.x, this.y, this.color));
				}
			}
		}

		class Particle {
			constructor(x, y, color){
				this.x = x;
				this.y = y;
				this.color = color;
				this.alpha = 1;
				this.angle = Math.random()*Math.PI*2;
				this.speed = Math.random()*4+2;
				this.gravity = 0.05;
			}
			update(){
				this.x += Math.cos(this.angle)*this.speed;
				this.y += Math.sin(this.angle)*this.speed + this.gravity;
				this.alpha -= 0.02;
			}
			draw(){
				ctx.beginPath();
				ctx.arc(this.x, this.y, 2, 0, Math.PI*2);
				ctx.fillStyle = `rgba(${hexToRgb(this.color)},${this.alpha})`;
				ctx.fill();
			}
		}

		function hexToRgb(h) {
			let r,g,b;
			if(h.startsWith('hsl')){
				const [hue,s,l] = h.match(/[\d.]+/g).map(Number);
				// Convert HSL to RGB approximation
				const a = s/100 * Math.min(l/100,1-l/100);
				const f = n => l/100 - a*Math.max(-1,Math.min((n%12)-3,9-((n%12)-3),1));
				r = Math.round(255*f(hue/30+0));
				g = Math.round(255*f(hue/30+8));
				b = Math.round(255*f(hue/30+4));
			} else { r=g=b=255; }
			return `${r},${g},${b}`;
		}

		function animate() {
			ctx.clearRect(0,0,width,height);
			fireworks.forEach(fw => { fw.update(); fw.draw(); });
			particles.forEach((p,i)=> { p.update(); p.draw(); if(p.alpha<=0) particles.splice(i,1); });
			fireworks = fireworks.filter(fw => !fw.exploded);
			if(running) requestAnimationFrame(animate);
		}

		footer.addEventListener('mouseenter', () => {
			running = true;
			animate();
			clearTimeout(hintTimer);
			hintTimer = setTimeout(() => {
				hint.style.opacity = "1";
			}, 2000);
			// Lancer un feu d'artifice toutes les 0.5s
			fireInterval = setInterval(() => {
				fireworks.push(new Firework(Math.random()*width*0.8 + width*0.1, height*0.3 + Math.random()*100));
			}, 500);
		});

		footer.addEventListener('mouseleave', () => {
			running = false;
			clearTimeout(hintTimer);
			hint.style.opacity = "0";
			clearInterval(fireInterval);
			fireworks = [];   // vider les feux en cours
			particles = [];   // vider les particules
			ctx.clearRect(0, 0, width, height); // effacer le canvas
		});
		
		footer.addEventListener('click', () => {
			soundEnabled = !soundEnabled; // inverse ON/OFF

			// Feedback visuel (optionnel)
			hint.textContent = soundEnabled 
				? "Son des explosions activé"
				: "Son des explosions coupé";
		});
	})();

	// Sélection des éléments
	const mitnickBtn = document.getElementById('hackerBtn');
	const mitnickModal = document.getElementById('mitnickModal');
	const mitnickCloseBtn = document.getElementById('closeMitnick');
	const mitnickTitle = mitnickModal.querySelector('.mitnick-title');
	const mitnickStoryContainer = mitnickModal.querySelector('#mitnick-story');

	const helpBtn = document.getElementById('helpBtn');
	const helpModal = document.getElementById('helpModal');
	const helpCloseBtn = document.getElementById('closeHelp');
	const helpTitle = helpModal.querySelector('.hacker-title');
	const helpTextContainer = helpModal.querySelector('.hacker-text');

	let story = '';
	let index = 0;
	let typingInterval;

	// Fonction typing Matrix
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:',.<>/?";

	function typeStoryMatrix(targetContainer, text, index = 0) {
		if (index >= text.length) return;

		const charToShow = text[index];

		// Gestion du retour à la ligne
		if (charToShow === '\n') {
			targetContainer.innerHTML += '<br>';
			setTimeout(() => typeStoryMatrix(targetContainer, text, index + 1), 15);
			return;
		}

		let iterations = 2 + Math.floor(Math.random() * 2);
		let i = 0;

		function randomCharEffect() {
			if (i < iterations) {
				const span = document.createElement('span');
				span.textContent = charset[Math.floor(Math.random() * charset.length)];
				span.style.position = 'relative';
				span.style.left = `${Math.floor(Math.random() * 10 - 5)}px`;
				span.style.top = `${Math.floor(Math.random() * 10 - 5)}px`;
				span.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
				span.style.fontWeight = 'bold';
				targetContainer.appendChild(span);

				setTimeout(() => {
					span.remove();
					i++;
					randomCharEffect();
				}, 10 + Math.random() * 20); // un timing un peu plus large pour éviter les glitches
			} else {
				const span = document.createElement('span');
				span.textContent = charToShow;
				span.style.position = 'relative';
				span.style.left = '0px';
				span.style.top = '0px';
				span.style.color = '#0f0';
				targetContainer.appendChild(span);

				targetContainer.scrollTop = targetContainer.scrollHeight;

				// Passage au caractère suivant
				setTimeout(() => typeStoryMatrix(targetContainer, text, index + 1), 20);
			}
		}

		randomCharEffect();
	}

	// Fonction pour charger le contenu via AJAX
	async function loadModalContent(modalKey) {
		try {
			const response = await fetch('/index/json/data.php', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'X-Public-Token': '82969263953921582058'
				}
			});
			const data = await response.json();
			return data[modalKey];
		} catch (err) {
			console.error('Erreur de chargement du contenu:', err);
			return null;
		}
	}

	// Ouvrir Mitnick
	mitnickBtn.addEventListener('click', async () => {
		const content = await loadModalContent('mitnick');
		if (!content) return;

		mitnickTitle.textContent = content.title;
		mitnickStoryContainer.innerHTML = '';
		index = 0;
		story = content.story;	
		
		const lineHeight = parseInt(getComputedStyle(mitnickStoryContainer).lineHeight); // hauteur d'une ligne en px
		const lines = story.split('\n').length; // nombre de lignes dans le texte
		mitnickStoryContainer.style.minHeight = `${lineHeight * lines}px`;

		mitnickModal.style.display = 'block';
		typeStoryMatrix(mitnickStoryContainer, story);
	});

	// Fermer Mitnick
	mitnickCloseBtn.addEventListener('click', () => {
		mitnickModal.style.display = 'none';
		clearTimeout(typingInterval);
	});

	// Ouvrir Aide
	helpBtn.addEventListener('click', async () => {
		const content = await loadModalContent('help');
		if (!content) return;

		helpTitle.textContent = content.title;
		helpTextContainer.innerHTML = content.story;

		helpModal.classList.add('show'); // <-- affiche au centre avec flex
	});

	// Fermer Aide
	helpCloseBtn.addEventListener('click', () => {
		helpModal.classList.remove('show');
	});
	
	const badge = document.getElementById("cipherStrike");
	const modal = document.getElementById("hackerModal");
	const hackerAudio = document.getElementById("hackerAudio");
	const backButton = document.getElementById("backButton");
	let hoverTimer;
	hackerAudio.src = "https://cours-reseaux.fr/index/sound/hacker-demo.mp3";
	let audioStarted = false;

	badge.addEventListener("mouseenter", () => {
		hoverTimer = setTimeout(() => {
			modal.classList.add("show");
			// Lancer la démo ASCII
			startHackerDemo();
		}, 2000);
	});

	badge.addEventListener("mouseleave", () => clearTimeout(hoverTimer));

	// -------- FERMETURE --------
	modal.addEventListener("click", (e) => {
		if (!audioStarted && e.target !== backButton) {
			hackerAudio.play().catch(e => console.warn("Audio bloqué :", e));
			audioStarted = true;
		}
	});

	backButton.addEventListener("click", () => {
		modal.classList.remove("show");   // cache la modale
		hackerAudio.pause();              // stoppe la musique
		hackerAudio.currentTime = 0;      // reset audio
	});

	// ========================================================
	// FONCTION DEMO ASCII
	function startHackerDemo() {
	  const width = 120;
	  const height = 35;
	  const screen = document.getElementById("screen");
	  const scrollDiv = document.getElementById("scroller");
	  const skull = document.getElementById("skull");
	  let frame = 0;

	  // TRIG
	  const SIN = [];
	  for(let i=0;i<3600;i++) SIN[i] = Math.sin(i*0.01);

	  const PALETTE = " .,:;+*#%@";
	  const stars = Array.from({length:120}, ()=>({x:Math.random()*width, y:Math.random()*height, z:Math.random()*4+1}));
	  const rainCols = Array.from({length:width}, ()=>Math.floor(Math.random()*height));
	  const glitchProbability = 0.05;
	  let scrollText = "    *** CFAI LDA ASCII DEMOSCENE 2025 ***    " + 
					   "Hello — Code. Learn. Hack. Create.    " +
					   "Amiga style demo — Full ASCII — Realtime audio — 2025    ";
	  let musicText = "Click the mouse button to listen to the music";
	  let scrollPos=0, scrollAccumulator=0;

	  const skullFrames = [
`    _____
   /     \\
  | ^   ^ |
  |  o o  |
  |  ---  |
   \\_____/
     || 
    /||\\
   o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O o  |
  |  -^-  |
   \\_____/
     || 
    /||\\
    o||o`,

`    _____
   /     \\
  | ^   ^ |
  |  o O  |
  |  ~ v  |
   \\_____/
     || 
    /||\\
   o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O O  |
  |  v -  |
   \\_____/
     || 
    /||\\
   o||o`,

`    _____
   /     \\
  | ^ ~ ^ |
  |  o o  |
  |  ^ v  |
   \\_____/
     || 
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  o o  |
  |  - ~  |
   \\_____/
     || 
    /||\\
   o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O o  |
  |  v ^  |
   \\_____/
    \\ || /
     o||o`,

`    _____
   /     \\
  | ^   ^ |
  |  o O  |
  |  ~ -  |
   \\_____/
     || 
   / || \\
   o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  o o  |
  |  v ~  |
   \\_____/
     || 
  \\ /||\\ /
   o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O O  |
  |  ^ -  |
   \\_____/
     || 
   /||\\
  o||o`,

`    _____
   /     \\
  | ^ ~ ^ |
  |  o O  |
  |  - v  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O o  |
  |  v ~  |
   \\_____/
    /||\\
   o||o`,

`    _____
   /     \\
  | ^   ^ |
  |  o O  |
  |  ~ ^  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O O  |
  |  - v  |
   \\_____/
     || 
   /||\\
   o||o`,

`    _____
   /     \\
  | ^ ~ ^ |
  |  o o  |
  |  ^ -  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O o  |
  |  v ~  |
   \\_____/
    /||\\
   o||o`,

`    _____
   /     \\
  | ^   ^ |
  |  o O  |
  |  ~ ^  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O O  |
  |  - v  |
   \\_____/
     || 
   /||\\
   o||o`,

`    _____
   /     \\
  | ^ ~ ^ |
  |  o o  |
  |  ^ -  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O o  |
  |  v ~  |
   \\_____/
    /||\\
   o||o`,

`    _____
   /     \\
  | ^   ^ |
  |  o O  |
  |  ~ ^  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O O  |
  |  - v  |
   \\_____/
    /||\\
   o||o`,

`    _____
   /     \\
  | ^ ~ ^ |
  |  o o  |
  |  ^ -  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O o  |
  |  v ~  |
   \\_____/
    /||\\
   o||o`,

`    _____
   /     \\
  | ^   ^ |
  |  o O  |
  |  ~ ^  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O O  |
  |  - v  |
   \\_____/
    /||\\
   o||o`,

`    _____
   /     \\
  | ^ ~ ^ |
  |  o o  |
  |  ^ -  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O o  |
  |  v ~  |
   \\_____/
    /||\\
   o||o`,

`    _____
   /     \\
  | ^   ^ |
  |  o O  |
  |  ~ ^  |
   \\_____/
   \\ || /
    o || o`,

`    _____
   /     \\
  | ^   ^ |
  |  O O  |
  |  - v  |
   \\_____/
    /||\\
   o||o`
];

	  let skullFrameIndex = 0;

	  function generatePlasma(){
		let output="";
		for(let y=0;y<height;y++){
		  let line="";
		  for(let x=0;x<width;x++){
			let v = SIN[(x*10+frame)%3600]+
					SIN[(y*10+frame*2)%3600]+
					SIN[(x*5+y*4+frame*3)%3600]+
					SIN[(Math.floor(Math.hypot(x-60,y-17)*8)+frame*4)%3600];
			v = (v+4)/8;
			let idx = Math.floor(v*(PALETTE.length-1));
			line += PALETTE[idx];
		  }
		  output += line + "\n";
		}
		return output;
	  }

	  function addStars(asciiFrame){
		let lines = asciiFrame.split("\n");
		stars.forEach(s=>{
		  s.x -= s.z*0.2;
		  if(s.x<0){ s.x=width; s.y=Math.random()*height; s.z=Math.random()*4+1; }
		  let row = Math.floor(s.y);
		  let col = Math.floor(s.x);
		  if(row>=0 && row<height && col>=0 && col<width){
			let line = lines[row];
			lines[row] = line.substring(0,col)+"*"+line.substring(col+1);
		  }
		});
		return lines.join("\n");
	  }

	  function addRain(asciiFrame){
		let lines = asciiFrame.split("\n");
		for(let x=0;x<width;x++){
		  if(Math.random()<0.05) rainCols[x]=0;
		  let y = rainCols[x];
		  if(y>=0 && y<height){
			let line = lines[y];
			lines[y] = line.substring(0,x)+Math.floor(Math.random()*2)+line.substring(x+1);
		  }
		  rainCols[x]++;
		  if(rainCols[x]>=height) rainCols[x]=0;
		}
		return lines.join("\n");
	  }

	  function addGlitch(asciiFrame){
		let lines = asciiFrame.split("\n");
		for(let i=0;i<10;i++){
		  let y=Math.floor(Math.random()*height);
		  let x=Math.floor(Math.random()*width);
		  let line=lines[y];
		  lines[y]=line.substring(0,x)+String.fromCharCode(33+Math.floor(Math.random()*94))+line.substring(x+1);
		}
		return lines.join("\n");
	  }

	  scrollDiv.textContent = scrollText;
		let scrollX = 0;  // position en pixels
		let direction = 1; // 1 = vers la gauche, -1 = vers la droite

		function updateScroller() {
			const speed = 0.5; // vitesse de défilement
			const textWidth = scrollDiv.scrollWidth;
			const containerWidth = scrollDiv.parentElement.offsetWidth;

			// Défilement horizontal ping-pong
			scrollX += speed * direction;

			// Inversion du sens quand le texte atteint un bord
			if (scrollX > textWidth) {
				direction = -1; // repartir vers la droite
				scrollX = textWidth; // éviter un saut
			} else if (scrollX < 0) {
				direction = 1; // repartir vers la gauche
				scrollX = 0;
			}

			scrollDiv.style.transform = `translateX(${-scrollX}px)`;

			// Glitch ponctuel
			if (Math.random() < 0.02) {
				const chars = scrollText.split("").map(c => {
					return Math.random() < 0.05 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : c;
				}).join("");
				scrollDiv.textContent = chars;
			} else {
				scrollDiv.textContent = scrollText;
			}
		}
	  
	  function updateSkull(){
			skullFrameIndex = (skullFrameIndex + 1) % skullFrames.length;
			skull.textContent = skullFrames[skullFrameIndex];

			// Remonter le squelette de 150px
			skull.style.top = `calc(50% - 250px)`;
		}
	  
		const musicDiv = document.getElementById("musicText");
		let musicPos = 0;        // position actuelle
		let musicDirection = 1;  // 1 = vers la gauche, -1 = vers la droite

		function updateMusicText() { 
			musicDiv.innerHTML = "";

			// Affiche chaque caractère avec effet "serpent"
			for (let i = 0; i < musicText.length; i++) {
				const span = document.createElement("span");
				span.textContent = musicText[i];
				span.style.position = "relative";
				span.style.top = `${Math.floor(2 * Math.sin((frame + i * 2) * 0.1))}px`;
				musicDiv.appendChild(span);
			}

			const textWidth = musicDiv.scrollWidth;

			// Défilement horizontal ping-pong
			musicPos += 1 * musicDirection;
			const containerWidth = musicDiv.parentElement.offsetWidth;

			if (musicPos < 0) {
				musicPos = 0;
				musicDirection = 1;
			} else if (musicPos > textWidth - containerWidth) {
				musicPos = textWidth - containerWidth;
				musicDirection = -1;
			}

			// Centrer par rapport à #scroller
			const scrollRect = scrollDiv.getBoundingClientRect();
			const parentRect = musicDiv.parentElement.getBoundingClientRect();
			const centerOffset = scrollRect.left + scrollRect.width / 2 - parentRect.left;

			// Décalage supplémentaire vers la gauche pour éviter que le texte dépasse
			const leftShift = 900; // ajustable selon la longueur du texte

			// Applique la translation avec centrage ajusté
			musicDiv.style.transform = `translateX(${-musicPos + centerOffset - textWidth / 2 - leftShift}px)`;
		}

		// Boucle principale de la démo ASCII
		function loop() {
			frame++;

			let plasma = generatePlasma();
			let withStars = addStars(plasma);
			let withRain = addRain(withStars);
			let withGlitch = addGlitch(withRain);

			// Affiche l'ASCII généré
			screen.textContent = withGlitch;

			// Mise à jour du texte musical et scroller
			updateScroller();
			updateMusicText();

			// Animation du skull toutes les 10 frames
			if (frame % 20 === 0) updateSkull();

			requestAnimationFrame(loop);
		}

		// Démarrage de la boucle
		loop();
	}
	
	const progressContainer = document.querySelector('.progress');
	const progressBar = progressContainer.querySelector('.progress-bar');

	progressContainer.addEventListener('mousemove', (e) => {
		const rect = progressContainer.getBoundingClientRect();
		let mouseX = e.clientX - rect.left; // position de la souris relative à la barre
		let widthPercent = (mouseX / rect.width) * 100; // convertir en %
		if(widthPercent < 0) widthPercent = 0;
		if(widthPercent > 100) widthPercent = 100;
		progressBar.style.width = widthPercent + '%';
	});

	// Optionnel : réinitialiser à 0% quand la souris quitte la barre
	progressContainer.addEventListener('mouseleave', () => {
		progressBar.style.width = '72%';
	 });
	
	document.getElementById('btnDoku').addEventListener('click', () => {
	  window.location.href = '/bts_sio/doku.php/start';
	});
	
	function secureRedirect(id) {
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = '/index/proxy/page.php';

		const input = document.createElement('input');
		input.type = 'hidden';
		input.name = 'id';
		input.value = id;

		form.appendChild(input);
		document.body.appendChild(form);
		form.submit();
	}

	document.getElementById('btnContact').addEventListener('click', () => {
		secureRedirect('contact');
	});

	document.getElementById('btnPlan').addEventListener('click', () => {
		secureRedirect('sitemap');
	});
	  
	document.addEventListener("DOMContentLoaded", () => {
		const logo = document.querySelector('.logo-mark');
		logo.addEventListener('click', () => {
			logo.classList.toggle('show-tux');
			console.log("Classe .show-tux ajoutée ? →", logo.classList.contains('show-tux'));
		});
	});