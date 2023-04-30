export class Key {
  constructor(element) {
    this.key = element;
  }

  createKey() {
    const button = document.createElement("div");
    if (this.key === "Backspace") {
      button.innerHTML = `&#8656`;
      button.classList.add("big");
    } else if (
      this.key === "Delete" ||
      this.key === "CapsLock" ||
      this.key === "Enter" ||
      this.key === "Shift" ||
      this.key === "Alt"
    ) {
      button.classList.add("big");
      button.innerHTML = this.key;
    } else if (this.key === "Control") {
      button.classList.add("big");
      button.innerHTML = "Ctrl";
    } else if (this.key === " ") {
      button.classList.add("space");
    } else if (this.key === "ArrowUp") {
      button.innerHTML = `↑`;
    } else if (this.key === "ArrowDown") {
      button.innerHTML = `↓`;
    } else if (this.key === "ArrowLeft") {
      button.innerHTML = `←`;
    } else if (this.key === "ArrowRight") {
      button.innerHTML = `→`;
    } else if (this.key === "ShiftRight") {
      button.innerHTML = `Shift`;
    } else {
      button.innerHTML = this.key;
    }
    return button;
  }
}
