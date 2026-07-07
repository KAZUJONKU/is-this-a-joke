class GameWindow {
  constructor({ title, content, buttons = [] }) {
    this.title = title;
    this.content = content;
    this.buttons = buttons;
    this.element = null;
  }

  open() {
    this.closeExisting();

    const overlay = document.createElement("div");
    overlay.className = "game-window-overlay";

    const box = document.createElement("div");
    box.className = "game-window";

    const title = document.createElement("div");
    title.className = "game-window-title";
    title.textContent = this.title;

    const body = document.createElement("div");
    body.className = "game-window-body";

    if (typeof this.content === "string") {
      body.innerHTML = this.content;
    } else {
      body.appendChild(this.content);
    }

    const footer = document.createElement("div");
    footer.className = "game-window-footer";

    this.buttons.forEach((btnData) => {
      const btn = new GameButton({
        text: btnData.text,
        onClick: btnData.onClick
      });

      footer.appendChild(btn.getElement());
    });

    box.appendChild(title);
    box.appendChild(body);
    box.appendChild(footer);
    overlay.appendChild(box);

    document.body.appendChild(overlay);

    this.element = overlay;

    GameAudio.play("glitch");
  }

  close() {
    if (!this.element) return;

    this.element.classList.add("closing");

    setTimeout(() => {
      this.element.remove();
      this.element = null;
    }, 250);
  }

  closeExisting() {
    document.querySelectorAll(".game-window-overlay").forEach((el) => {
      el.remove();
    });
  }
}