const NewGameIntro = {
  subtitles: [
    { text: "Salom.", duration: 2600, delay: 1700 },
    { text: "Is This a Joke? video o'yiniga xush kelibsiz.", duration: 4200, delay: 4300 },
    { text: "Bu o'yinda siz oddiy o'yindan chiqish uchun o'yinni oxirigacha o'ynashingiz kerak.", duration: 6200, delay: 8500 },
    { text: "Siz o'yindan shunchaki chiqib keta olmaysiz.", duration: 4800, delay: 15000, danger: true }
  ],

  start() {
    const intro = document.createElement("div");
    intro.className = "new-game-intro cinematic-void";
    intro.innerHTML = `
      <div class="new-game-dust"></div>
      <div class="void-vignette"></div>
    `;
    document.body.appendChild(intro);

    GameAudio?.playVoice?.(GameAudio.voices.introUz);

    this.subtitles.forEach((line) => {
      setTimeout(() => {
        if (line.danger) {
          document.body.classList.add("subtitle-danger");
          GameAudio?.play?.("warning");
        }

        SubtitleManager.show(line.text, line.duration);
      }, line.delay);
    });

    setTimeout(() => {
      document.body.classList.remove("subtitle-danger");
      intro.classList.add("hide");

      setTimeout(() => {
        intro.remove();
        this.showExitGuide();
      }, 1200);
    }, 20500);
  },

  showExitGuide() {
    const arrow = document.createElement("div");
    arrow.className = "exit-arrow";
    arrow.innerHTML = `
      <div class="exit-arrow-line"></div>
      <div class="exit-arrow-text">EXIT</div>
      <div class="alt-f4-hint">ALT + F4</div>
    `;
    document.body.appendChild(arrow);

    SubtitleManager.show("Try leaving.", 3000);
    GameAudio?.play?.("warning");
  }
};

window.NewGameIntro = NewGameIntro;