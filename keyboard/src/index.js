import { CreateKeyboard } from "./js/CreateKeyboard ";
import { enKeys, rusKeys } from "./js/keys";

async function render() {
  const wrapper = document.createElement("div");
  wrapper.classList.add("keyboard", "wrapper");
  const textArea = document.createElement("textarea");
  textArea.classList.add("keyboard__input");
  const keyBoard = document.createElement("div");
  keyBoard.classList.add("keyboard__controls");

  document.body.appendChild(wrapper);
  wrapper.appendChild(textArea);
  wrapper.appendChild(keyBoard);

  textArea.addEventListener("click", () => {
    getKeys.inputPosition = textArea.selectionStart;
  });

  const getKeys = new CreateKeyboard(enKeys, rusKeys);
  getKeys.init();
  getKeys.keyBoardHandlers();
}

render();
