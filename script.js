class Calculator {
  constructor(displayOutContent) {
    this.displayOutContent = displayOutContent;
    this.toClear();
  }

  toClear() {
    this.currentValue = '';
    this.previousValue = '';
  }

  toDelete() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  toAppendNumber(number) {
    if (number === '.' && this.currentValue.includes('.')) return;
    if (number === '0' && this.currentValue.startsWith('0')) return;
    this.currentValue += number.toString();
  }

  toChooseOperator(operator) {
    if (this.currentValue === '') return;
    if (this.previousValue !== '') {
      this.toCompute();
    }
    this.operator = operator;
    this.previousValue = this.currentValue;
    this.currentValue = '';
  }

  toCompute() {
    let result;
    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);

    if (!prev || !current) return;

    switch (this.operator) {
      case '+':
        result = Math.round((prev + current) * 1000000) / 1000000;
        break;
      case '-':
        result = Math.round((prev - current) * 1000000) / 1000000;
        break;
      case '*':
        result = Math.round((prev * current) * 1000000) / 1000000;
        break;
      case '÷':
        result = Math.round((prev / current) * 1000000) / 1000000;
        break;
      default:
        return;
    }
    this.currentValue = result;
    this.previousValue = '';
  }

  toUpdateDisplay() {
    if (this.currentValue !== '') {
      this.displayOutContent.innerText = this.currentValue;
    } else {
      this.displayOutContent.innerText = this.previousValue;
    }
  }
}

const allClear = document.querySelector('[data-all-clear]');
const del = document.querySelector('[data-delete]');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const displayOutContent = document.querySelector('[data-displayOut]');

const calculator = new Calculator(displayOutContent);

allClear.addEventListener('click', () => {
  calculator.toClear();
  calculator.toUpdateDisplay();
});

del.addEventListener('click', () => {
  calculator.toDelete();
  calculator.toUpdateDisplay();
});

equals.addEventListener('click', () => {
  calculator.toCompute();
  calculator.toUpdateDisplay();
});

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    calculator.toAppendNumber(number.innerText);
    calculator.toUpdateDisplay();
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    calculator.toChooseOperator(operator.innerText);
    calculator.toUpdateDisplay();
  });
});
