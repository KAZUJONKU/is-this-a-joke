const TransitionEngine = {
  play(type = "glitch", callback = () => {}) {
    const transition = document.getElementById("screenTransition");

    if (!transition) {
      callback();
      return;
    }

    transition.className = "";
    transition.classList.add("active", type);

    setTimeout(() => {
      callback();
    }, 250);

    setTimeout(() => {
      transition.className = "";
    }, 700);
  }
};