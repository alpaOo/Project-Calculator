const displayOutput = document.querySelector('.displayOutput');
const keys = document.querySelectorAll('.key');

let index = 0;
let operator = 0;
let inputString = '';
let values = 0;
let valueBefore = 0;
let valueAfter = 0;
displayOutput.value = '';
displayOutput.textContent = '0';

function toClearInput() {
  displayOutput.value = '';
  displayOutput.textContent = '0';
}

function backspace() {
  if (displayOutput.value.length > 1) {
    displayOutput.value = displayOutput.value.slice(0, -1);
    displayOutput.textContent = displayOutput.value;
  } else {
    displayOutput.value = '';
    displayOutput.textContent = '0';
  }
}

function isOperator(value) {
  return (value === '+' || value === '-' || value === 'x' || value === '÷');
}

function isSingleOperator(value) {
  if (isOperator(displayOutput.value.charAt(displayOutput.value.length - 1))) {
    displayOutput.value = displayOutput.value.slice(0, displayOutput.value.length - 1);
  }
  displayOutput.value += value;
  displayOutput.textContent = displayOutput.value;
}

// eslint-disable-next-line consistent-return
function toOperate(params) {
  inputString = params;
  values = inputString.split('');
  console.log(values);

  index = values.findIndex((value) => (value === '+' || value === '-' || value === 'x' || value === '÷'));

  operator = values[index];

  if (!operator) {
    valueBefore = +values.join('');
    valueAfter = 0;
  } else {
    valueBefore = +values.slice(0, index).join('');
    valueAfter = +values.slice(index + 1).join('');
  }

  // console.log(valueBefore, operator, valueAfter);


  // eslint-disable-next-line default-case
  switch (operator) {
    case '+': return Math.round((valueBefore + valueAfter) * 10000000) / 10000000;
    case '-': return Math.round((valueBefore - valueAfter) * 10000000) / 10000000;
    case 'x': return Math.round((valueBefore * valueAfter) * 10000000) / 10000000;
    case '÷': return Math.round((valueBefore / valueAfter) * 10000000) / 10000000;
  }
}

keys.forEach((key) => {
  const value = key.dataset.key;

  key.addEventListener('click', () => {
    if (value === 'clear') {
      toClearInput();
    } else if (value === 'backspace') {
      backspace();
    } else if (value === '=') {
      displayOutput.textContent = toOperate(displayOutput.value);
      displayOutput.value = '';
    } else if (isOperator(value)) {
      isSingleOperator(value);
    } else {
      displayOutput.value += value;
      displayOutput.textContent = displayOutput.value;
    }
  });
});
