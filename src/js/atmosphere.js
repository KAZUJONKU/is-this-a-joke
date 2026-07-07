const atmosphereCanvas = document.getElementById("atmosphereCanvas");
const ctx = atmosphereCanvas.getContext("2d");

let particles = [];

function resizeAtmosphere() {
  atmosphereCanvas.width = window.innerWidth;
  atmosphereCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeAtmosphere);
resizeAtmosphere();

function createParticles() {
  particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * atmosphereCanvas.width,
      y: Math.random() * atmosphereCanvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * -0.4 - 0.1,
      alpha: Math.random() * 0.6 + 0.2
    });
  }
}

createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, atmosphereCanvas.width, atmosphereCanvas.height);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.y < -10) {
      p.y = atmosphereCanvas.height + 10;
      p.x = Math.random() * atmosphereCanvas.width;
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 80, 80, ${p.alpha})`;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

function triggerRedPulse() {
  document.body.classList.add("pulse-red");

  setTimeout(() => {
    document.body.classList.remove("pulse-red");
  }, 1200);
}

function randomAtmosphereEvent() {
if (document.querySelector(".settings-fullscreen")) return;
  if (document.querySelector(".game-window-overlay")) return;
  if (!mainMenu.classList.contains("active")) return;

  triggerRedPulse();

  if (typeof Popup !== "undefined") {
    const warnings = [
      "Signal unstable.",
      "Do not trust the menu.",
      "This is not a normal game.",
      "Unknown process detected.",
      "Exit permission locked."
    ];

    Popup.show({
      title: "SYSTEM WARNING",
      text: warnings[Math.floor(Math.random() * warnings.length)],
      duration: 3000,
      type: "warning"
    });
  }
}

setInterval(randomAtmosphereEvent, 12000);