class GameButton {
  constructor({ text, id, onClick, className = "" }) {
    this.text = text;
    this.id = id;
    this.onClick = onClick;
    this.className = className;

    this.element = this.create();
  }

  create() {
    const button = document.createElement("button");

    button.className = `game-button ${this.className}`;
    button.textContent = this.text;

    if (this.id) {
      button.id = this.id;
    }

    button.addEventListener("mouseenter", () => {
      GameAudio.play("hover");
      button.classList.add("hovered");

      if (window.customCursor) {
        window.customCursor.classList.add("hover");
      }
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("hovered");

      if (window.customCursor) {
        window.customCursor.classList.remove("hover");
      }
    });

    button.addEventListener("click", () => {
      GameAudio.play("click");
      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 120);

      if (typeof this.onClick === "function") {
        this.onClick();
      }
    });

    return button;
  }

  setSelected(value) {
    this.element.classList.toggle("selected", value);
  }

  setText(text) {
    this.text = text;
    this.element.textContent = text;
  }

  getElement() {
    return this.element;
  }
}