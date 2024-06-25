let currentNumber = '';
let previousNumber = '';
let operation = null;
let selectedOperatorButton = null;

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener('mouseleave', () => {
    drawing = false;
});

function appendNumber(number) {
    if (currentNumber.includes('.') && number === '.') return;
    currentNumber = currentNumber.toString() + number.toString();
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = currentNumber || '0';
}

function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    if (selectedOperatorButton) {
        selectedOperatorButton.classList.remove('selected-operator');
    }
    updateDisplay();
}

function chooseOperation(op, buttonId) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    highlightOperator(buttonId);
}

function highlightOperator(buttonId) {
    if (selectedOperatorButton) {
        selectedOperatorButton.classList.remove('selected-operator');
    }
    selectedOperatorButton = document.getElementById(buttonId);
    selectedOperatorButton.classList.add('selected-operator');
}

function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    displayCalculation(`${prev} ${operation} ${current} = ${result}`);
    currentNumber = result;
    operation = null;
    previousNumber = '';
    updateDisplay();
    if (selectedOperatorButton) {
        selectedOperatorButton.classList.remove('selected-operator');
    }
}

function displayCalculation(calculation) {
    const calculationDiv = document.createElement('div');
    calculationDiv.className = 'calculation';
    calculationDiv.innerText = calculation;

    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);

    calculationDiv.style.left = `${x}px`;
    calculationDiv.style.top = `${y}px`;

    document.body.appendChild(calculationDiv);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const calculations = document.querySelectorAll('.calculation');
    calculations.forEach(calculation => calculation.remove());
}
