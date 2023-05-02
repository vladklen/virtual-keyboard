import CreateKeyboard from './js/CreateKeyboard ';
import { enKeys, rusKeys } from './js/keys';

async function render() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('keyboard', 'wrapper');
  const textArea = document.createElement('textarea');
  textArea.classList.add('keyboard__input');
  const keyBoard = document.createElement('div');
  keyBoard.classList.add('keyboard__controls');
  const info = document.createElement('div');
  info.classList.add('keyboard__info');
  info.innerHTML = `<h1>Клавиатура создана в операционной системе MacOS </h1>
<h2>Для переключения языка комбинация: <span>Shift+Ctrl</span> </h2>`;

  document.body.appendChild(wrapper);
  wrapper.appendChild(textArea);
  wrapper.appendChild(keyBoard);
  wrapper.appendChild(info);

  const getKeys = new CreateKeyboard(enKeys, rusKeys);
  textArea.addEventListener('click', () => {
    getKeys.inputPosition = textArea.selectionStart;
  });
  getKeys.init();
  getKeys.keyBoardHandlers();
}

render();
