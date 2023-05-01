import { Key } from "./Key";

export class CreateKeyboard {
  constructor(en, rus) {
    this.language = localStorage.len ? localStorage.len : "ru";
    this.rusKeyboard = rus;
    this.engKeyboard = en;
    this.capsActive = 0;
    this.shiftActive = 0;
    this.inputPosition = 0;
    this.keyBoard = document.querySelector(".keyboard__controls");
    this.newKeyBoard = [];
  }

  init() {
    this.keyBoard.innerHTML = "";
    const newKeyBoard =
      this.language === "ru" ? this.rusKeyboard : this.engKeyboard;
    newKeyBoard.forEach((element) => {
      const button = new Key(element, this.shiftActive, this.capsActive);
      const key = button.createKey();
      key.classList.add("controls__key", "key");
      this.keyBoard.append(key);
    });
    this.addHandler();
  }

  keyBoardHandlers() {
    document.addEventListener("keydown", (event) => {
      this.newKeyBoard.push({ key: event.key, code: event.code, keyCaps: "" });
      console.log(this.newKeyBoard);
      event.preventDefault();
      document.querySelectorAll(".key").forEach((el) => {
        if (event.code === el.getAttribute("data-key")) {
          el.classList.add("active");
        }
      });
      if (event.key === "Shift") {
        this.shiftEvent();
      } else if (event.key === "CapsLock") {
        this.capsEvent();
      } else {
        this.changeInput(event.code);
      }
    });
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      document.querySelectorAll(".key").forEach((el) => {
        if (event.code === el.getAttribute("data-key")) {
          el.classList.remove("active");
        }
      });
      if (event.key === "Shift") {
        this.shiftEvent();
      } else if (event.key === "CapsLock") {
        this.capsEvent();
      }
    });
  }

  addHandler() {
    const keys = document.querySelectorAll(".key");
    keys.forEach((el) => {
      el.addEventListener("mousedown", (event) => {
        event.target.classList.add("active");
        this.changeInput(event.target.getAttribute("data-key"));
      });
      el.addEventListener("mouseup", (event) => {
        event.target.classList.remove("active");
      });
    });
  }

  shiftEvent() {
    if (this.shiftActive === 0) {
      this.shiftActive = 1;
    } else {
      this.shiftActive = 0;
    }
    this.init();
    if (this.shiftActive) {
      document
        .querySelector(".key[data-key=ShiftLeft]")
        .classList.add("active");
      document
        .querySelector(".key[data-key=ShiftRight]")
        .classList.add("active");
    }
  }

  capsEvent() {
    if (this.capsActive === 0) {
      this.capsActive = 1;
    } else {
      this.capsActive = 0;
    }
    this.init();
    if (this.capsActive) {
      document.querySelector(".key[data-key=CapsLock]").classList.add("active");
    }
  }

  changeInput(code) {
    const input = document.querySelector(".keyboard__input");

    let text = input.value;
    input.selectionEnd = this.inputPosition;

    let symbol;
    const newKeyBoard =
      this.language === "ru" ? this.rusKeyboard : this.engKeyboard;
    newKeyBoard.forEach((element) => {
      if (element.code === code) {
        if (element.code === "Backspace") {
          input.value =
            text.slice(0, this.inputPosition - 1) +
            text.slice(this.inputPosition);
          this.inputPosition -= 1;
          input.selectionEnd = this.inputPosition;
        } else if (element.code === "Delete") {
          input.value =
            text.slice(0, this.inputPosition) +
            text.slice(this.inputPosition + 1);
          input.selectionEnd = this.inputPosition;
        } else {
          if (element.code === "ArrowUp") {
            symbol = `↑`;
          } else if (element.code === "ArrowDown") {
            symbol = `↓`;
          } else if (element.code === "ArrowLeft") {
            symbol = `←`;
          } else if (element.code === "ArrowRight") {
            symbol = `→`;
          } else if (element.code === "Enter") {
            symbol = `\n`;
          } else if (element.code === "Tab") {
            symbol = `    `;
            this.inputPosition += 3;
          } else if (element.code === "Space") {
            symbol = ` `;
          } else if (
            element.code === "ControlLeft" ||
            element.code === "ControlRight" ||
            element.code === "AltLeft" ||
            element.code === "AltRight" ||
            element.code === "MetaLeft" ||
            element.code === "MetaRight"
          ) {
            symbol = ``;
            this.inputPosition -= 1;
          } else {
            this.shiftActive === 1 || this.capsActive === 1
              ? (symbol = element.keyCaps)
              : (symbol = element.key);
          }
          input.value =
            text.slice(0, this.inputPosition) +
            symbol +
            text.slice(this.inputPosition);
          this.inputPosition += 1;
          input.selectionEnd = this.inputPosition;
        }
      }
    });
  }
}
