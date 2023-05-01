import { Key } from "./Key";

export class CreateKeyboard {
  constructor(en, rus) {
    this.language = localStorage.lang ? localStorage.lang : "ru";
    this.rusKeyboard = rus;
    this.engKeyboard = en;
    this.capsActive = 0;
    this.shiftActive = 0;
    this.inputPosition = 0;
    this.keyBoard = document.querySelector(".keyboard__controls");
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
      event.preventDefault();
      document.querySelectorAll(".key").forEach((el) => {
        if (event.code === el.getAttribute("data-key")) {
          el.classList.add("active");
        }
      });
      if (this.shiftActive === 1 && event.key === "Control") {
        this.changeLanguage();
      }
      if (event.key === "Shift" && !this.shiftActive) {
        this.shiftEvent();
      } else if (event.key === "CapsLock") {
        this.capsEvent();
      } else if (event.key !== "Shift" && event.key !== "CapsLock") {
        this.changeInput(event.code);
      }
    });
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      document.querySelectorAll(".key").forEach((el) => {
        if (event.code === el.getAttribute("data-key")) {
          if (event.code !== "CapsLock") {
            el.classList.remove("active");
          }
        }
      });
      if (event.key === "Shift") {
        this.shiftEvent();
      }
    });
  }

  addHandler() {
    const keys = document.querySelectorAll(".key");
    keys.forEach((el) => {
      el.addEventListener("mousedown", (event) => {
        if (
          event.target.getAttribute("data-key") === "ShiftLeft" ||
          event.target.getAttribute("data-key") === "ShiftRight"
        ) {
          this.shiftEvent();
        } else if (event.target.getAttribute("data-key") === "CapsLock") {
          this.capsEvent();
        } else {
          event.target.classList.add("active");
          this.changeInput(event.target.getAttribute("data-key"));
        }
      });
      el.addEventListener("mouseup", (event) => {
        if (
          event.target.getAttribute("data-key") === "ShiftLeft" ||
          event.target.getAttribute("data-key") === "ShiftRight"
        ) {
          this.shiftEvent();
        } else if (event.target.getAttribute("data-key") !== "CapsLock") {
          event.target.classList.remove("active");
        }
      });
    });
  }

  changeLanguage() {
    if (this.language === "ru") {
      this.language = "en";
      localStorage.setItem("lang", "en");
    } else {
      this.language = "ru";
      localStorage.setItem("lang", "ru");
    }
  }

  shiftEvent() {
    if (this.shiftActive === 0) {
      this.shiftActive = 1;
    } else {
      this.shiftActive = 0;
    }
    this.init();
  }

  capsEvent() {
    if (this.capsActive === 0) {
      this.capsActive = 1;
    } else {
      this.capsActive = 0;
    }
    this.init();
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
            if (this.shiftActive !== this.capsActive) {
              if (this.capsActive) {
                if (
                  code.substring(0, 3) === "Key" ||
                  code === "Comma" ||
                  code === "Period" ||
                  code === "Period" ||
                  code === "Semicolon" ||
                  code === "Quote" ||
                  code === "Backslash" ||
                  code === "BracketLeft" ||
                  code === "BracketRight"
                ) {
                  symbol = element.keyCaps;
                } else {
                  symbol = element.key;
                }
              } else {
                symbol = element.keyCaps;
              }
            } else {
              if (this.shiftActive === 1) {
                if (
                  code.substring(0, 3) === "Key" ||
                  code === "Comma" ||
                  code === "Period" ||
                  code === "Period" ||
                  code === "Semicolon" ||
                  code === "Quote" ||
                  code === "Backslash" ||
                  code === "BracketLeft" ||
                  code === "BracketRight"
                ) {
                  symbol = element.key;
                } else {
                  symbol = element.keyCaps;
                }
              } else {
                symbol = element.key;
              }
            }
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
