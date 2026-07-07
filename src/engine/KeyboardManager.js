const KeyboardManager = {
  pressedKeys: new Set(),

  init() {
    document.addEventListener("keydown", (e) => {
      this.pressedKeys.add(e.key);
      this.checkSecretExit(e);
    });

    document.addEventListener("keyup", (e) => {
      this.pressedKeys.delete(e.key);
    });

    window.addEventListener("blur", () => {
      this.pressedKeys.clear();
    });
  },

  checkSecretExit(e) {
    const combo = SecretExit.getCombo();
    if (!combo) return;

    const hasModifiers = combo.modifiers.every((key) => {
      if (key === "Control") return e.ctrlKey;
      if (key === "Shift") return e.shiftKey;
      if (key === "Alt") return e.altKey;
      return false;
    });

    const pressedKey = e.key.toUpperCase();
    const comboKey = combo.key.toUpperCase();

    if (hasModifiers && pressedKey === comboKey) {
      e.preventDefault();
      this.secretExitSuccess();
    }
  },

  secretExitSuccess() {
    SubtitleManager.show("You found the way out.", 1200);

    if (typeof triggerGlitchFlash === "function") {
      triggerGlitchFlash();
    }

    GameAudio.playSFX("glitch");

    setTimeout(() => {
      window.electronAPI.safeExit();
    }, 900);
  }
};