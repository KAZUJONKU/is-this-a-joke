class GameSelect {
  constructor({ id, options = [], value = null }) {
    this.id = id;
    this.options = options;
    this.value = value || options[0]?.value;
    this.element = this.create();
    this.portalList = null;
  }

  create() {
    const wrap = document.createElement("div");
    wrap.className = "game-select";
    wrap.id = this.id;

    const selected = document.createElement("div");
    selected.className = "game-select-selected";
    selected.textContent = this.getLabel(this.value);

    selected.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleList();
      GameAudio.play("hover");
    });

    wrap.appendChild(selected);
    return wrap;
  }

  toggleList() {
    if (this.portalList) {
      this.closeList();
    } else {
      this.openList();
    }
  }

  openList() {
    document.querySelectorAll(".game-select-portal").forEach(el => el.remove());

    const rect = this.element.getBoundingClientRect();

    const list = document.createElement("div");
    list.className = "game-select-portal";

    list.style.left = rect.left + "px";
    list.style.top = rect.bottom + 4 + "px";
    list.style.width = rect.width + "px";

    this.options.forEach((opt) => {
      const item = document.createElement("div");
      item.className = "game-select-item";
      item.textContent = opt.label;

      item.addEventListener("click", (e) => {
        e.stopPropagation();

        this.value = opt.value;
        this.element.querySelector(".game-select-selected").textContent = opt.label;

        this.closeList();
        GameAudio.play("click");
      });

      list.appendChild(item);
    });

    document.body.appendChild(list);
    this.portalList = list;
  }

  closeList() {
    if (this.portalList) {
      this.portalList.remove();
      this.portalList = null;
    }
  }

  getLabel(value) {
    const found = this.options.find(opt => opt.value === value);
    return found ? found.label : "";
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
    this.element.querySelector(".game-select-selected").textContent = this.getLabel(value);
  }

  getElement() {
    return this.element;
  }
}

document.addEventListener("click", () => {
  document.querySelectorAll(".game-select-portal").forEach(el => el.remove());
});