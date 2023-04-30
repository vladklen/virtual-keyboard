import { Key } from "./key";

export class CreateKeyboard {
  constructor(en, rus) {
    this.language = localStorage.len ? localStorage.len : "ru";
    this.rusKeyboard = rus;
    this.engKeyboard = en;
    this.keys = [];
  }

  init() {
    const keyBoard = document.querySelector(".keyboard__controls");
    const newKeyBoard =
      this.language === "ru" ? this.rusKeyboard : this.engKeyboard;
    newKeyBoard.forEach((element) => {
      const button = new Key(element);
      const key = button.createKey();
      key.classList.add("controls__key", "key");
      keyBoard.append(key);
    });
  }
}
