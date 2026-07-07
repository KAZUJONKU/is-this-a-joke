const ScreenManager = {
  currentScreen: null,
  isTransitioning: false,

  init(defaultScreenId) {
    this.currentScreen = document.getElementById(defaultScreenId);

    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    if (this.currentScreen) {
      this.currentScreen.classList.add("active");
    }
  },

  show(screenId, type = "glitch") {
    if (this.isTransitioning) return;

    const nextScreen = document.getElementById(screenId);
    if (!nextScreen) {
      console.warn("Screen not found:", screenId);
      return;
    }

    this.isTransitioning = true;

    if (type === "instant") {
      this.switchTo(nextScreen);
      this.isTransitioning = false;
      return;
    }

    this.playTransition(type, () => {
      this.switchTo(nextScreen);
      this.isTransitioning = false;
    });
  },

  switchTo(nextScreen) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    nextScreen.classList.add("active");
    this.currentScreen = nextScreen;
  },

  playTransition(type, callback) {
  TransitionEngine.play(type, callback);
}
};