const customCursor = document.getElementById("customCursor");
const mouseLight = document.getElementById("mouseLight");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

let lightX = mouseX;
let lightY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("mousedown", () => {
  customCursor.classList.add("click");
});

document.addEventListener("mouseup", () => {
  customCursor.classList.remove("click");
});

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    customCursor.classList.add("hover");
  });

  btn.addEventListener("mouseleave", () => {
    customCursor.classList.remove("hover");
  });
});

function animateUI() {
  cursorX += (mouseX - cursorX) * 0.25;
  cursorY += (mouseY - cursorY) * 0.25;

  lightX += (mouseX - lightX) * 0.06;
  lightY += (mouseY - lightY) * 0.06;

  customCursor.style.left = cursorX + "px";
  customCursor.style.top = cursorY + "px";

  mouseLight.style.left = lightX + "px";
  mouseLight.style.top = lightY + "px";

  requestAnimationFrame(animateUI);
}

animateUI();