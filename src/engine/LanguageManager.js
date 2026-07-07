const LanguageManager = {
  currentMenuLang: "en",

  init() {
    const saved = localStorage.getItem("gameSettings");

    if (saved) {
      const settings = JSON.parse(saved);
      this.currentMenuLang = settings.menuLang || "en";
      this.voiceLanguage = settings.voiceLang || "en";
    }
  },

  t(key) {
    return (
      Translations[this.currentMenuLang]?.[key] || Translations.en[key] || key
    );
  },

  setMenuLanguage(lang) {
    this.currentMenuLang = lang;

    this.applyMenuTexts();
  },

  applyMenuTexts() {
    const subtitle = document.querySelector(".menu-subtitle");

    if (subtitle) {
      subtitle.textContent = this.t("menuSubtitle");
    }

    if (typeof MainMenu !== "undefined") {
      MainMenu.refreshTexts();
    }
  },

  getSubtitleLanguage() {
    return this.subtitleLanguage;
  },

  getVoiceLanguage() {
    return this.voiceLanguage;
  },

  getMenuLanguage() {
    return this.currentMenuLang;
  },
};
