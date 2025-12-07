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

	  // Calculer la hauteur totale nécessaire
	  const lineHeight = parseInt(getComputedStyle(consoleEl).lineHeight) || 20;
	  consoleEl.style.minHeight = `${lines.length * lineHeight}px`;

	  function startConsoleAnimation() {
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
		  // on prend toutes les lignes complètes + la portion de la ligne en cours
		  let displayLines = lines.slice(0, i).join('\n');
		  if(i < lines.length) displayLines += (displayLines ? '\n' : '') + lines[i].slice(0, charIndex);
		  consoleEl.textContent = displayLines + (showCursor ? '█' : ' ');
		}

		function tick() {
		  if(i >= lines.length) return;
		  const line = lines[i];
		  charIndex++;
		  if(charIndex > line.length) {
			charIndex = 0;
			i++;
			setTimeout(tick, 700); // pause après chaque ligne
		  } else {
			setTimeout(tick, 40); // vitesse d'écriture
		  }
		  updateConsoleDisplay();
		}

		tick();
	  }

	  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
		startConsoleAnimation();
		setInterval(startConsoleAnimation, 30000); // relance toutes les 30 secondes
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

		function animate() {
		  let x = parseFloat(span.style.left);
		  let y = parseFloat(span.style.top);

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
	
	document.addEventListener("DOMContentLoaded", () => {
		const logo = document.querySelector('.logo-mark');
		logo.addEventListener('click', () => {
			logo.classList.toggle('show-tux');
			console.log("Classe .show-tux ajoutée ? →", logo.classList.contains('show-tux'));
		});
	});
	
	(function(){
		// Création dynamique de l'élément audio (invisible dans le code source)
		const audio = document.createElement('audio');
		audio.id = 'hack';
		audio.src = '/index/easteregg/hacking-music.mp3';
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
	  
	  // Optionnel : vibration supplémentaire aléatoire simulant ambiance underground
	  setInterval(() => {
		const dy = (Math.random() - 0.5) * 2; // -1 à 1 px
		el.style.transform = `translateY(${dy}px)`;
	  }, 400);
	})();
	
	(function() {
		const footer = document.querySelector('footer');
		const canvas = document.getElementById('fireworks-canvas');
		const ctx = canvas.getContext('2d');
		let width = canvas.width = window.innerWidth;
		let height = canvas.height = window.innerHeight;
		let fireworks = [];
		let particles = [];
		let running = false;

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
			// Lancer un feu d'artifice toutes les 0.5s
			fireInterval = setInterval(() => {
				fireworks.push(new Firework(Math.random()*width*0.8 + width*0.1, height*0.3 + Math.random()*100));
			}, 500);
		});

		footer.addEventListener('mouseleave', () => {
			running = false;
			clearInterval(fireInterval);
			fireworks = [];   // vider les feux en cours
			particles = [];   // vider les particules
			ctx.clearRect(0, 0, width, height); // effacer le canvas
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
	const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';

	// Fonction typing Matrix
	function typeStoryMatrix(targetContainer, text) {
		if (index < text.length) {
			const charToShow = text[index];

			if (charToShow === '\n') {
				targetContainer.innerHTML += '<br>';
				index++;
				typingInterval = setTimeout(() => typeStoryMatrix(targetContainer, text), 15);
				return;
			}

			let randomIterations = 3;
			let i = 0;

			function randomCharEffect() {
				if (i < randomIterations) {
					const span = document.createElement('span');
					span.textContent = charset[Math.floor(Math.random() * charset.length)];
					targetContainer.appendChild(span);

					setTimeout(() => {
						targetContainer.removeChild(span);
						i++;
						randomCharEffect();
					}, 20);
				} else {
					const span = document.createElement('span');
					span.textContent = charToShow;
					targetContainer.appendChild(span);

					index++;
					targetContainer.scrollTop = targetContainer.scrollHeight;
					typingInterval = setTimeout(() => typeStoryMatrix(targetContainer, text), 5);
				}
			}

			randomCharEffect();
		}
	}

	// Fonction pour charger le contenu via AJAX
	async function loadModalContent(modalKey) {
		try {
			const response = await fetch('/index/php/modales_content.php', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
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

	// Fermer si clic hors modale
	window.addEventListener('click', (e) => {
		if (e.target === mitnickModal) {
			mitnickModal.style.display = 'none';
			clearTimeout(typingInterval);
		}
		if (e.target === helpModal) {
			helpModal.classList.remove('show');
		}
	});
