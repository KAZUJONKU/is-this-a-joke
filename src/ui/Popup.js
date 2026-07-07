const Popup = {
  show({ title = "SYSTEM WARNING", text = "", duration = 3000, type = "warning" }) {
    const oldPopup = document.querySelector(".popup-box");
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement("div");
    popup.className = `popup-box ${type}`;

    popup.innerHTML = `
      <div class="popup-title">${title}</div>
      <div class="popup-text">${text}</div>
    `;

    document.body.appendChild(popup);

    GameAudio.play(type === "warning" ? "warning" : "glitch");

    setTimeout(() => {
      popup.classList.add("hide");

      setTimeout(() => {
        popup.remove();
      }, 300);
    }, duration);
  }
};