/* ==========================================
   1. GLOBAL STATE VARIABLES & DISPLAY MOTOR
   ========================================== */
let firstNumber = "";
let operator = "";
let secondNumber = "";

function updateDisplay() {
    let displayString = firstNumber;
    
    if (operator !== "") {
        displayString += " " + operator;
    }
    if (secondNumber !== "") {
        displayString += " " + secondNumber;
    }
    
    display.textContent = displayString || "0";
}

/* ==========================================
   2. CORE ARITHMETIC ENGINES
   ========================================== */
function add(num1, num2) {
    return num1 + num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

// Fixed missing semicolon on this function
function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Nice try, Einstein!";
    }
    return num1 / num2;
}

/* ==========================================
   3. MASTER SWITCH ROUTER
   ========================================== */
function operate(op, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (op) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2); 
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        default:  return null;
    }
}

/* ==========================================
   4. DOM INTERFACE SELECTORS
   ========================================== */
const display = document.querySelector('#display');
const digits = document.querySelectorAll('.digit');
const clearButton = document.querySelector('#clear');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');
const backspaceButton = document.querySelector('#backspace');

/* ==========================================
   5. INTERACTIVE EVENT HANDLERS
   ========================================== */

// Digit Subscriptions
digits.forEach(button => {
    button.addEventListener('click', () => {
        if (operator === "") {
            firstNumber += button.textContent;
        } else {
            secondNumber += button.textContent;
        }
        updateDisplay();
    });
});

// Structural Clear Action
clearButton.addEventListener('click', () => {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    updateDisplay();
});

// Sequential Operator Tracking
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber !== "" && secondNumber !== "") {
            let result = operate(operator, firstNumber, secondNumber);
            firstNumber = result.toString();
            secondNumber = "";
        }
        
        if (firstNumber !== "") {
            operator = button.textContent;
            updateDisplay();
        }
    });
});

// Master Evaluation & Secret Easter Egg Injection
equalsButton.addEventListener('click', () => {
    // 🐣 EASTER EGG: Detects "hello" typed upside down
    if (firstNumber === "07734" || firstNumber === "7734") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        return;
    }

    if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
        let result = operate(operator, firstNumber, secondNumber);
        display.textContent = result;
        
        firstNumber = result.toString();
        operator = "";
        secondNumber = "";
    }
});

// Decimal Input Matrix Guards
decimalButton.addEventListener('click', () => {
    if (operator === "") {
        if (!firstNumber.includes('.')) {
            if (firstNumber === "") firstNumber = "0";
            firstNumber += ".";
            updateDisplay();
        }
    } else {
        if (!secondNumber.includes('.')) {
            if (secondNumber === "") secondNumber = "0";
            secondNumber += ".";
            updateDisplay();
        }
    }
});

// Destructive Input Backspacing Loops
backspaceButton.addEventListener('click', () => {
    if (secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
    } else if (operator !== "") {
        operator = "";
    } else if (firstNumber !== "") {
        firstNumber = firstNumber.slice(0, -1);
    }
    updateDisplay();
});

// Native Numpad Keyboard Support API
window.addEventListener('keydown', (event) => {
    let key = event.key;

    if (key === 'Enter') key = '=';
    if (key === 'Escape') key = 'Clear';
    if (key === 'Backspace') {
        const backspaceBtn = document.querySelector('#backspace');
        if (backspaceBtn) backspaceBtn.click();
        return;
    }

    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        if (button.textContent === key) {
            button.click();
        }
    });
});
