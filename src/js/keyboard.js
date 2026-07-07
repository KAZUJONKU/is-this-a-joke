let escCount = 0;

function showAccessDenied() {
  alert("ACCESS DENIED");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    e.preventDefault();
    showAccessDenied();
    return;
  }
  if (e.key === "Escape") {
    e.preventDefault();
    escCount++;
    showAccessDenied();

    if (escCount >= 5) {
      window.electronAPI.safeExit();
    }

    setTimeout(() => {
      escCount = 0;
    }, 3000);
  }
});

window.electronAPI.onExitBlocked(() => {
  showAccessDenied();
});