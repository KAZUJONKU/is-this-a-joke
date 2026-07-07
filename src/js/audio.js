const GameAudio = {
  masterVolume: 0.7,
  musicVolume: 0.7,
  voiceVolume: 0.7,
  sfxVolume: 0.7,

  currentMusic: null,

  music: {
  menu: "assets/audio/music/menu.mp3"
},

  voicePreview: null,
sfxPreviewCooldown: false,

  sounds: {
    click: "assets/audio/sfx/click.mp3",
    hover: "assets/audio/sfx/hover.mp3",
    denied: "assets/audio/sfx/denied.mp3",
    glitch: "assets/audio/sfx/glitch.mp3",
    type: "assets/audio/sfx/type.mp3",
    loading: "assets/audio/sfx/loading.mp3",
    warning: "assets/audio/sfx/warning.mp3",
    complete: "assets/audio/sfx/complete.mp3",
    testSfx: "assets/audio/sfx/test_sfx.mp3"
  },

  voices: {
  test: "assets/audio/sfx/test_sfx.mp3",
  introUz: "assets/audio/voice/intro_uz.mp3"
},

  getFinalVolume(channelVolume) {
    return this.masterVolume * channelVolume;
  },

  playSFX(name) {
    const src = this.sounds[name];

    if (!src) {
      console.warn("SFX not found:", name);
      return;
    }

    const audio = new Audio(src);
    audio.volume = this.getFinalVolume(this.sfxVolume);
    audio.play().catch(() => {});
  },

  play(name) {
    this.playSFX(name);
  },

  playMusic(src, loop = true) {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic = null;
    }

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = this.getFinalVolume(this.musicVolume);
    audio.play().catch(() => {});

    this.currentMusic = audio;
  },

  playVoice(src) {
    const audio = new Audio(src);
    audio.volume = this.getFinalVolume(this.voiceVolume);
    audio.play().catch(() => {});
    return audio;
  },

  playTestVoice() {

  if (this.voicePreview) {
    this.voicePreview.pause();
    this.voicePreview.currentTime = 0;
  }

  this.voicePreview = this.playVoice(this.voices.test);

},

  setMasterVolume(value) {
    this.masterVolume = Math.max(0, Math.min(1, value));
    this.updateActiveVolumes();
  },

  setMusicVolume(value) {
    this.musicVolume = Math.max(0, Math.min(1, value));
    this.updateActiveVolumes();
  },

  setVoiceVolume(value) {
    this.voiceVolume = Math.max(0, Math.min(1, value));
  },

  setSFXVolume(value) {
    this.sfxVolume = Math.max(0, Math.min(1, value));
  },

  setVolume(value) {
    this.setMasterVolume(value);
  },

  updateActiveVolumes() {
    if (this.currentMusic) {
      this.currentMusic.volume = this.getFinalVolume(this.musicVolume);
    }
  },

  stopMusic() {
  if (this.currentMusic) {
    this.currentMusic.pause();
    this.currentMusic.currentTime = 0;
    this.currentMusic = null;
  }
}
};

