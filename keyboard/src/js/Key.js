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
    } else if (this.key.code === "CapsLock" && this.caps) {
      button.classList.add("active", "big");
      button.innerHTML = this.key.key;
    } else if (
      this.key.code === "ShiftLeft" ||
      this.key.code === "ShiftRight"
    ) {
      button.innerHTML = "Shift";
      if (this.key.code === "ShiftLeft") {
        button.classList.add("big");
      }
      if (this.shift) {
        button.classList.add("active");
      }
    } else if (
      this.key.code === "Delete" ||
      this.key.code === "CapsLock" ||
      this.key.code === "Enter" ||
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
    } else if (this.key.key === "Meta") {
      button.innerHTML = `Cmd`;
    } else if (this.key.code === "Tab") {
      button.innerHTML = "Tab";
    } else {
      if (this.shift === this.caps) {
        if (this.caps === 1) {
          if (this.key.code.substring(0, 3) === "Key") {
            button.innerHTML = this.key.key;
            button.classList.add("low");
          } else {
            button.innerHTML = this.key.keyCaps;
            button.classList.add("upp");
          }
        } else {
          button.classList.add("low");
          button.innerHTML = this.key.key;
        }
      } else {
        button.classList.add("upp");
        if (this.caps) {
          if (this.key.code.substring(0, 3) === "Key") {
            button.innerHTML = this.key.keyCaps;
          } else {
            button.innerHTML = this.key.key;
          }
        } else {
          button.innerHTML = this.key.keyCaps;
        }
      }
    }
    return button;
  }
}
