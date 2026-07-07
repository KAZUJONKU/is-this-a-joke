const SubtitleManager = {
  box: null,
  timeout: null,

  init() {
    this.box = document.getElementById("subtitleBox");
    this.applySettings();
  },

  show(text, duration = 3000) {
    if (!this.box) return;

    const settings = this.getSettings();

    if (settings.subtitles === "off") return;

    this.applySettings();

    this.box.textContent = text;
    this.box.classList.add("show");

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.hide();
    }, duration);
  },

  hide() {
    if (!this.box) return;
    this.box.classList.remove("show");
  },

  getSettings() {
    const saved = localStorage.getItem("gameSettings");

    if (!saved) {
      return {
        subtitles: "on",
        subtitleSize: "medium",
        subtitleBg: "on",
        subtitlePosition: "bottom"
      };
    }

    return JSON.parse(saved);
  },

  applySettings() {
    if (!this.box) return;

    const settings = this.getSettings();

    this.box.classList.remove(
      "subtitle-small",
      "subtitle-medium",
      "subtitle-large",
      "subtitle-top",
      "subtitle-bottom",
      "subtitle-bg-off"
    );

    this.box.classList.add(`subtitle-${settings.subtitleSize || "medium"}`);
    this.box.classList.add(`subtitle-${settings.subtitlePosition || "bottom"}`);

    if (settings.subtitleBg === "off") {
      this.box.classList.add("subtitle-bg-off");
    }
  }
};