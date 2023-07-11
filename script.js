const displayOutput = document.querySelector('.displayOutput');
const displayInput = document.querySelector('.displayInput');
const keys = document.querySelectorAll('.key');

let input = '';
const output = '';

displayOutput.innerText = 0;

// eslint-disable-next-line consistent-return
function toOperate(params) {
  const newInput = params;
  const values = newInput.split('');
  //
  const index = values.findIndex((value) => (value === '+' || value === '-' || value === '*' || value === '/'));
  //
  const operator = values[index];
  const valueBefore = +values.slice(0, index).join('');
  const valueAfter = +values.slice(index + 1).join('');
  //
  // eslint-disable-next-line default-case
  switch (operator) {
    case '+': return Math.round((valueBefore + valueAfter) * 10000000) / 10000000;
    case '-': return Math.round((valueBefore - valueAfter) * 10000000) / 10000000;
    case '*': return Math.round((valueBefore * valueAfter) * 10000000) / 10000000;
    case '/': return Math.round((valueBefore / valueAfter) * 10000000) / 10000000;
  }
}

keys.forEach((key) => {
  const value = key.dataset.key;

  key.addEventListener('click', () => {
    // eslint-disable-next-line default-case
    switch (value) {
      case 'clear':
        input = '';
        displayInput.textContent = input;
        displayOutput.textContent = 0;
        break;

      case 'backspace':
        input = displayOutput.textContent;
        displayOutput.textContent = input.slice(0, -1);
        input = displayOutput.textContent;
        break;

      case '=':
        input = displayOutput.textContent;
        displayOutput.textContent = toOperate(input);
        input = displayOutput.textContent;
        break;

      default:
        input += value;
        displayOutput.textContent = input;
    }
  });
});
