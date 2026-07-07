const loadingScreen = document.getElementById("loadingScreen");
const mainMenu = document.getElementById("mainMenu");
const loadingFill = document.getElementById("loadingFill");
const loadingPercent = document.getElementById("loadingPercent");
const loadingText = document.getElementById("loadingText");
const terminalLines = document.getElementById("terminalLines");

ScreenManager.init("loadingScreen");
LanguageManager.init();
SubtitleManager.init();
KeyboardManager.init();
MainMenu.init();

const loadingSteps = [
  "Initializing joke.exe...",
  "Loading interface...",
  "Loading dialogues...",
  "Loading subtitle system...",
  "Loading voice system...",
  "Checking exit permissions...",
  "Preparing fake virus effects...",
  "Launching game..."
];

let progress = 0;
let stepIndex = 0;

function addTerminalLine(text) {
  GameAudio.play("type");

  const line = document.createElement("div");
  line.textContent = "> " + text;
  terminalLines.appendChild(line);
}

function showScreen(screen) {
  ScreenManager.show(screen.id, "glitch");
}

const loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 12) + 6;

  if (progress > 100) progress = 100;

  loadingFill.style.width = progress + "%";
  loadingPercent.textContent = progress + "%";

  if (stepIndex < loadingSteps.length) {
    loadingText.textContent = loadingSteps[stepIndex];
    addTerminalLine(loadingSteps[stepIndex]);
    stepIndex++;
  }

  if (progress >= 100) {
    clearInterval(loadingInterval);

    setTimeout(() => {
      GameAudio.play("glitch");
      addTerminalLine("ACCESS CHECK FAILED");
      loadingText.textContent = "ACCESS CHECK FAILED";
    }, 600);

    setTimeout(() => {
  showScreen(mainMenu);
  GameAudio.playMusic(GameAudio.music.menu);
}, 1800);
  }
}, 500);

let menuButtons = [];
let selectedMenuIndex = 0;
let keyboardMode = true;

function initMenuNavigation() {
  menuButtons = MainMenu.getButtons();

  if (!menuButtons.length) return;

  selectedMenuIndex = 0;
  keyboardMode = true;

  menuButtons.forEach((btn, index) => {
    btn.addEventListener("mouseenter", () => {
      keyboardMode = false;
      selectedMenuIndex = index;
      updateMenuSelection();
    });

    btn.addEventListener("mouseleave", () => {
      keyboardMode = true;
      updateMenuSelection();
    });
  });

  updateMenuSelection();
}

function updateMenuSelection() {
  menuButtons.forEach((btn, index) => {
    btn.classList.toggle("selected", keyboardMode && index === selectedMenuIndex);
  });
}

initMenuNavigation();

document.addEventListener("keydown", (e) => {
  if (!mainMenu.classList.contains("active")) return;
  if (!menuButtons.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    keyboardMode = true;
    selectedMenuIndex++;

    if (selectedMenuIndex >= menuButtons.length) {
      selectedMenuIndex = 0;
    }

    GameAudio.play("hover");
    updateMenuSelection();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    keyboardMode = true;
    selectedMenuIndex--;

    if (selectedMenuIndex < 0) {
      selectedMenuIndex = menuButtons.length - 1;
    }

    GameAudio.play("hover");
    updateMenuSelection();
  }

  if (e.key === "Enter") {
    e.preventDefault();
    GameAudio.play("click");
    menuButtons[selectedMenuIndex].click();
  }
});