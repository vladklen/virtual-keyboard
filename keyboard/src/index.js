import { CreateKeyboard } from "./js/CreateKeyboard ";
import { enKeys, rusKeys } from "./js/keys";

async function render() {
  const wrapper = document.createElement("div");
  wrapper.classList.add("keyboard", "wrapper");
  const textArea = document.createElement("textarea");
  textArea.classList.add("keyboard__input");
  const keyBoard = document.createElement("div");
  keyBoard.classList.add("keyboard__controls");

  textArea.value = "This elements was created by js";

  console.log(wrapper);
  document.body.appendChild(wrapper);
  wrapper.appendChild(textArea);
  wrapper.appendChild(keyBoard);

  const getKeys = new CreateKeyboard(enKeys, rusKeys);
  getKeys.init();
}

render();
