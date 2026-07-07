const SettingsMenu = {
  selects: {},
  activeTab: "language",

  open() {
    document
      .querySelectorAll(".settings-fullscreen")
      .forEach((el) => el.remove());

    const overlay = document.createElement("div");
    overlay.className = "settings-fullscreen";

    const left = document.createElement("div");
    left.className = "settings-left";

    left.innerHTML = `
      <div class="settings-title">SETTINGS</div>

      <div class="settings-tabs">
        <div class="settings-tab active" data-tab="language">LANGUAGE</div>
        <div class="settings-tab" data-tab="subtitle">SUBTITLE</div>
        <div class="settings-tab" data-tab="audio">AUDIO</div>
        <div class="settings-tab" data-tab="data">DATA</div>
      </div>

      <div class="settings-version">
    <div>IS THIS A JOKE?</div>
    <small>Version 1.0.0</small>
    <small>KAZU STUDIO</small>
</div>
    `;

    const right = document.createElement("div");
    right.className = "settings-right";

    right.innerHTML = `
      <div class="settings-section-title">LANGUAGE</div>
      <div id="settingsPanel" class="settings-panel"></div>
    `;

    overlay.appendChild(left);
    overlay.appendChild(right);

    const actions = document.createElement("div");
    actions.className = "settings-actions";

    const saveBtn = new GameButton({
      text: "SAVE SETTINGS",
      onClick: () => {
        this.save();

        Popup.show({
          title: "SETTINGS",
          text: "Settings saved.",
          type: "success",
          duration: 2000,
        });
      },
    });

    const backBtn = new GameButton({
      text: "BACK",
      onClick: () => {
        overlay.classList.add("closing");

        setTimeout(() => {
          overlay.remove();
          document
            .querySelectorAll(".game-select-portal")
            .forEach((el) => el.remove());
        }, 250);
      },
    });

    actions.appendChild(saveBtn.getElement());
    actions.appendChild(backBtn.getElement());
    left.appendChild(actions);

    document.body.appendChild(overlay);

    this.renderTab("language");

    overlay.querySelectorAll(".settings-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        overlay
          .querySelectorAll(".settings-tab")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        GameAudio.play("click");
        this.renderTab(tab.dataset.tab);
      });
    });
  },

  renderTab(tabName) {
    this.activeTab = tabName;

    const panel = document.getElementById("settingsPanel");
    const title = document.querySelector(".settings-section-title");

    if (!panel || !title) return;

    panel.innerHTML = "";
    this.selects = {};

    title.textContent = tabName.toUpperCase();

    if (tabName === "language") this.renderLanguageTab(panel);
    if (tabName === "subtitle") this.renderSubtitleTab(panel);
    if (tabName === "audio") this.renderAudioTab(panel);
    if (tabName === "data") {
      this.renderDataTab(panel);
    }

    this.load();
    this.bind();
  },

  renderLanguageTab(panel) {
    panel.className = "settings-panel settings-grid";

    this.selects.menuLang = this.addSelect(
      panel,
      "Menu Language",
      "settingMenuLang",
      [
        { label: "Uzbek", value: "uz" },
        { label: "Russian", value: "ru" },
        { label: "English", value: "en" },
      ],
    );

    this.selects.subtitleLang = this.addSelect(
      panel,
      "Subtitle Language",
      "settingSubtitleLang",
      [
        { label: "Uzbek", value: "uz" },
        { label: "Russian", value: "ru" },
        { label: "English", value: "en" },
      ],
    );

    this.selects.voiceLang = this.addSelect(
      panel,
      "Voice Language",
      "settingVoiceLang",
      [
        { label: "Uzbek", value: "uz" },
        { label: "Russian", value: "ru" },
        { label: "English", value: "en" },
      ],
    );
  },

  renderSubtitleTab(panel) {
    panel.className = "settings-panel settings-grid";

    const previewWrap = document.createElement("div");
    previewWrap.id = "settingsSubtitlePreview";
    previewWrap.innerHTML = `
      <div class="subtitle-preview-box">
        UNKNOWN<br>
        DO YOU THINK THIS IS JUST A GAME?
      </div>
    `;
    panel.appendChild(previewWrap);

    this.selects.subtitles = this.addSelect(
      panel,
      "Subtitles",
      "settingSubtitles",
      [
        { label: "ON", value: "on" },
        { label: "OFF", value: "off" },
      ],
    );

    this.selects.subtitleSize = this.addSelect(
      panel,
      "Subtitle Size",
      "settingSubtitleSize",
      [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    );

    this.selects.subtitleBg = this.addSelect(
      panel,
      "Subtitle Background",
      "settingSubtitleBg",
      [
        { label: "ON", value: "on" },
        { label: "OFF", value: "off" },
      ],
    );

    this.selects.subtitlePosition = this.addSelect(
      panel,
      "Subtitle Position",
      "settingSubtitlePosition",
      [
        { label: "Bottom", value: "bottom" },
        { label: "Top", value: "top" },
      ],
    );
  },

  renderAudioTab(panel) {
    panel.className = "settings-panel settings-grid";

    panel.innerHTML = `
  <div class="settings-row audio-row">
    <div class="audio-top">
      <span>Master Volume</span>
      <span id="masterPercent">70%</span>
    </div>
    <input id="settingMasterVolume" type="range" min="0" max="100" value="70">
  </div>

  <div class="settings-row audio-row">
    <div class="audio-top">
      <span>Music Volume</span>
      <span id="musicPercent">70%</span>
    </div>
    <input id="settingMusicVolume" type="range" min="0" max="100" value="70">
  </div>

  <div class="settings-row audio-row">
    <div class="audio-top">
      <span>Voice Volume</span>
      <span id="voicePercent">70%</span>
    </div>
    <input id="settingVoiceVolume" type="range" min="0" max="100" value="70">
  </div>

  <div class="settings-row audio-row">
    <div class="audio-top">
      <span>SFX Volume</span>
      <span id="sfxPercent">70%</span>
    </div>
    <input id="settingSFXVolume" type="range" min="0" max="100" value="70">
  </div>
`;
  },

  renderDataTab(panel) {
    panel.className = "settings-panel settings-grid";

    panel.innerHTML = `
      <div class="settings-row locked-setting">
        <span>Reset Progress</span>
        <span>COMING SOON</span>
      </div>

      <div class="settings-row locked-setting">
        <span>Delete Save</span>
        <span>COMING SOON</span>
      </div>
    `;
  },

  addSelect(content, label, id, options) {
    const row = document.createElement("div");
    row.className = "settings-row";

    const text = document.createElement("span");
    text.textContent = label;

    const select = new GameSelect({
      id,
      options,
    });

    row.appendChild(text);
    row.appendChild(select.getElement());
    content.appendChild(row);

    return select;
  },

  bind() {
    const master = document.getElementById("settingMasterVolume");
    const music = document.getElementById("settingMusicVolume");
    const voice = document.getElementById("settingVoiceVolume");
    const sfx = document.getElementById("settingSFXVolume");

    function updatePercent(input, percentId) {
      const percent = document.getElementById(percentId);
      if (input && percent) {
        percent.textContent = input.value + "%";
      }
    }

    if (master) {
      master.addEventListener("input", () => {
        updatePercent(master, "masterPercent");
        GameAudio.setMasterVolume(Number(master.value) / 100);
      });
      if (master) {
  master.addEventListener("change", () => {
    GameAudio.playSFX("testSfx");
  });
}
    }

    if (music) {
      music.addEventListener("input", () => {
        updatePercent(music, "musicPercent");
        GameAudio.setMusicVolume(Number(music.value) / 100);
      });
    }

    if (voice) {
      voice.addEventListener("input", () => {
        updatePercent(voice, "voicePercent");
        GameAudio.setVoiceVolume(Number(voice.value) / 100);
      });
      if (voice) {
  voice.addEventListener("change", () => {
    GameAudio.playTestVoice();
  });
}
    }

    if (sfx) {
  sfx.addEventListener("input", () => {
    updatePercent(sfx, "sfxPercent");
    GameAudio.setSFXVolume(Number(sfx.value) / 100);
  });

  sfx.addEventListener("change", () => {
    GameAudio.playSFX("testSfx");
  });
}

    updatePercent(master, "masterPercent");
    updatePercent(music, "musicPercent");
    updatePercent(voice, "voicePercent");
    updatePercent(sfx, "sfxPercent");
  },

  bindSubtitlePreview() {
    const preview = document.querySelector(".subtitle-preview-box");
    if (!preview) return;

    const updatePreview = () => {
      const subtitleLang =
        this.selects.subtitleLang?.getValue?.() ||
        this.getSavedSetting("subtitleLang", "uz");
      const subtitles =
        this.selects.subtitles?.getValue?.() ||
        this.getSavedSetting("subtitles", "on");
      const size =
        this.selects.subtitleSize?.getValue?.() ||
        this.getSavedSetting("subtitleSize", "medium");
      const bg =
        this.selects.subtitleBg?.getValue?.() ||
        this.getSavedSetting("subtitleBg", "on");
      const position =
        this.selects.subtitlePosition?.getValue?.() ||
        this.getSavedSetting("subtitlePosition", "bottom");

      const texts = {
        uz: "BU SHUNCHAKI O‘YIN DEB O‘YLAYSANMI?",
        ru: "ТЫ ДУМАЕШЬ, ЭТО ПРОСТО ИГРА?",
        en: "DO YOU THINK THIS IS JUST A GAME?",
      };

      preview.className = "subtitle-preview-box";
      preview.classList.add(`preview-${size}`);

      if (bg === "off") {
        preview.classList.add("preview-bg-off");
      }

      if (subtitles === "off") {
        preview.innerHTML = "SUBTITLES DISABLED";
      } else {
        preview.innerHTML = `UNKNOWN<br>${texts[subtitleLang] || texts.en}`;
      }

      const previewWrap = document.getElementById("settingsSubtitlePreview");

      if (previewWrap) {
        previewWrap.classList.toggle("preview-top", position === "top");
        previewWrap.classList.toggle("preview-bottom", position === "bottom");
      }
    };

    document.addEventListener("click", () => {
      setTimeout(updatePreview, 50);
    });

    updatePreview();
  },

  save() {
    const old = JSON.parse(localStorage.getItem("gameSettings") || "{}");

    const settings = {
      ...old,
      masterVolume:
        document.getElementById("settingMasterVolume")?.value ??
        old.masterVolume ??
        70,
      musicVolume:
        document.getElementById("settingMusicVolume")?.value ??
        old.musicVolume ??
        70,
      voiceVolume:
        document.getElementById("settingVoiceVolume")?.value ??
        old.voiceVolume ??
        70,
      sfxVolume:
        document.getElementById("settingSFXVolume")?.value ??
        old.sfxVolume ??
        70,
      menuLang: this.selects.menuLang?.getValue?.() ?? old.menuLang ?? "en",
      subtitleLang:
        this.selects.subtitleLang?.getValue?.() ?? old.subtitleLang ?? "uz",
      voiceLang: this.selects.voiceLang?.getValue?.() ?? old.voiceLang ?? "en",
      subtitles: this.selects.subtitles?.getValue?.() ?? old.subtitles ?? "on",
      subtitleSize:
        this.selects.subtitleSize?.getValue?.() ?? old.subtitleSize ?? "medium",
      subtitleBg:
        this.selects.subtitleBg?.getValue?.() ?? old.subtitleBg ?? "on",
      subtitlePosition:
        this.selects.subtitlePosition?.getValue?.() ??
        old.subtitlePosition ??
        "bottom",
    };

    localStorage.setItem("gameSettings", JSON.stringify(settings));

    GameAudio.setMasterVolume(Number(settings.masterVolume) / 100);
    GameAudio.setMusicVolume(Number(settings.musicVolume) / 100);
    GameAudio.setVoiceVolume(Number(settings.voiceVolume) / 100);
    GameAudio.setSFXVolume(Number(settings.sfxVolume) / 100);

    LanguageManager.setMenuLanguage(settings.menuLang);
    LanguageManager.subtitleLanguage = settings.subtitleLang;
    LanguageManager.voiceLanguage = settings.voiceLang;

    if (typeof SubtitleManager !== "undefined") {
      SubtitleManager.applySettings();
    }
  },

  load() {
    const saved = localStorage.getItem("gameSettings");
    if (!saved) return;

    const settings = JSON.parse(saved);

    const master = document.getElementById("settingMasterVolume");
    const music = document.getElementById("settingMusicVolume");
    const voice = document.getElementById("settingVoiceVolume");
    const sfx = document.getElementById("settingSFXVolume");

    if (master) master.value = settings.masterVolume ?? 70;
    if (music) music.value = settings.musicVolume ?? 70;
    if (voice) voice.value = settings.voiceVolume ?? 70;
    if (sfx) sfx.value = settings.sfxVolume ?? 70;

    if (document.getElementById("masterPercent")) {
      document.getElementById("masterPercent").textContent =
        (settings.masterVolume ?? 70) + "%";
    }
    if (document.getElementById("musicPercent")) {
      document.getElementById("musicPercent").textContent =
        (settings.musicVolume ?? 70) + "%";
    }
    if (document.getElementById("voicePercent")) {
      document.getElementById("voicePercent").textContent =
        (settings.voiceVolume ?? 70) + "%";
    }
    if (document.getElementById("sfxPercent")) {
      document.getElementById("sfxPercent").textContent =
        (settings.sfxVolume ?? 70) + "%";
    }

    if (this.selects.menuLang)
      this.selects.menuLang.setValue(settings.menuLang ?? "uz");
    if (this.selects.subtitleLang)
      this.selects.subtitleLang.setValue(settings.subtitleLang ?? "uz");
    if (this.selects.voiceLang)
      this.selects.voiceLang.setValue(settings.voiceLang ?? "uz");
    if (this.selects.subtitles)
      this.selects.subtitles.setValue(settings.subtitles ?? "on");
    if (this.selects.subtitleSize)
      this.selects.subtitleSize.setValue(settings.subtitleSize ?? "medium");
    if (this.selects.subtitleBg)
      this.selects.subtitleBg.setValue(settings.subtitleBg ?? "on");
    if (this.selects.subtitlePosition)
      this.selects.subtitlePosition.setValue(
        settings.subtitlePosition ?? "bottom",
      );

    GameAudio.setMasterVolume(Number(settings.masterVolume ?? 70) / 100);
    GameAudio.setMusicVolume(Number(settings.musicVolume ?? 70) / 100);
    GameAudio.setVoiceVolume(Number(settings.voiceVolume ?? 70) / 100);
    GameAudio.setSFXVolume(Number(settings.sfxVolume ?? 70) / 100);
  },

  getSavedSetting(key, fallback) {
    const saved = JSON.parse(localStorage.getItem("gameSettings") || "{}");
    return saved[key] ?? fallback;
  },
};
