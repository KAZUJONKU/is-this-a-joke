const MainMenu = {
  buttons: {},

  init() {
    const container = document.getElementById("mainMenuButtons");
    if (!container) return;

    container.innerHTML = "";
    this.buttons = {};

    this.buttons.start = this.addButton(container, LanguageManager.t("startGame"), "startBtn", () => {
      SecretExit.reset();
SecretExit.generate();
      SubtitleManager.show("Do you think this is just a game?", 4000);
    });

    this.buttons.settings = this.addButton(container, LanguageManager.t("settings"), "settingsBtn", () => {
      SettingsMenu.open();
    });

    this.buttons.credits = this.addButton(container, LanguageManager.t("credits"), "creditsBtn", () => {
      const win = new GameWindow({
        title: LanguageManager.t("credits"),
        content: `
          <p><b>IS THIS A JOKE?</b></p>
          <p>Psychological Horror / Puzzle / Meme / Action</p>
          <br>
          <p>Created by <b>KAZU STUDIO</b></p>
          <p>Version 1.0.0</p>
        `,
        buttons: [
          {
            text: "BACK",
            onClick: () => win.close()
          }
        ]
      });

      win.open();
    });

    this.buttons.exit = this.addButton(container, LanguageManager.t("exit"), "exitBtn", () => {
      GameAudio.play("denied");
      addTerminalLine("Exit request denied.");
      alert("ACCESS DENIED\nComplete the game to unlock exit.");
    });

    LanguageManager.applyMenuTexts();
  },

  addButton(container, text, id, action) {
    const btn = new GameButton({
      text,
      id,
      onClick: action
    });

    container.appendChild(btn.getElement());
    return btn;
  },

  refreshTexts() {
    if (this.buttons.start) this.buttons.start.setText(LanguageManager.t("startGame"));
    if (this.buttons.settings) this.buttons.settings.setText(LanguageManager.t("settings"));
    if (this.buttons.credits) this.buttons.credits.setText(LanguageManager.t("credits"));
    if (this.buttons.exit) this.buttons.exit.setText(LanguageManager.t("exit"));
  },

  getButtons() {
    return Object.values(this.buttons).map(btn => btn.getElement());
  }
};