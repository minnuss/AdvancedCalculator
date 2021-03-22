
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        // convert value to string and slice last value when delete button is clicked
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // check to see if dot already exist and make sure that only one dot can be typed
        if (number === '.' && this.currentOperand.includes('.')) return;
        // convert numbers to string so it can be places one after another
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // check to see if values are added and then let operand to be clicked
        if (this.currentOperand === '') return;
        // call compute() function if someone click an operand, and on previous screen there is already an values entered
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const current = parseFloat(this.currentOperand);
        const prev = parseFloat(this.previousOperand);
        // check to see if values are clicked, if not, just return, do not compute
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString({ maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        // add to current sreen line
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand);
        if (this.operation != null) {
            // add to previous screen line and concat with operand if clicked
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-value]');
const currentOperandTextElement = document.querySelector('[data-current-value]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// adding numbers to screen with appendNumber function
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log(button.innerText)
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// adding operation buttons to screen with chooseOperation function
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log(button.innerText)
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// when equal button is clicked, call compute function
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

// clear all when AC button is clicked with clear function
allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

// clear last value when delete button is clicked with delete function
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})