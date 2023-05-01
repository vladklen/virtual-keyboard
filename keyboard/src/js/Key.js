export class Key {
  constructor(element, shift, caps) {
    this.key = element;
    this.shift = shift;
    this.caps = caps;
  }

  createKey() {
    const button = document.createElement("div");
    button.setAttribute("data-key", this.key.code);
    if (this.key.key === "Backspace") {
      button.innerHTML = `&#8656`;
      button.classList.add("big");
    } else if (
      this.key.code === "Delete" ||
      this.key.code === "CapsLock" ||
      this.key.code === "Enter" ||
      this.key.code === "ShiftLeft" ||
      this.key.code === "AltLeft" ||
      this.key.code === "AltRight"
    ) {
      button.classList.add("big");
      button.innerHTML = this.key.key;
    } else if (this.key.key === "Control") {
      button.classList.add("big");
      button.innerHTML = "Ctrl";
    } else if (this.key.key === " ") {
      button.classList.add("space");
    } else if (this.key.key === "ArrowUp") {
      button.innerHTML = `↑`;
    } else if (this.key.key === "ArrowDown") {
      button.innerHTML = `↓`;
    } else if (this.key.key === "ArrowLeft") {
      button.innerHTML = `←`;
    } else if (this.key.key === "ArrowRight") {
      button.innerHTML = `→`;
    } else if (this.key.code === "ShiftRight") {
      button.innerHTML = `Shift`;
    } else if (this.key.key === "Meta") {
      button.innerHTML = `Cmd`;
    } else if (this.key.code === "Tab") {
      button.innerHTML = "Tab";
    } else {
      this.shift === this.caps
        ? button.classList.add("low")
        : button.classList.add("upp");
      this.shift === this.caps
        ? (button.innerHTML = this.key.key)
        : (button.innerHTML = this.key.keyCaps);
    }
    return button;
  }
}
