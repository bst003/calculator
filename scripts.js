/*/////////////////////////////////////////
Global Variables
/////////////////////////////////////////*/

// Empty values for valueA and value B.
// Once an operator is clicked the valueAFilled will be set to true.
// If valueAFilled is true then the next num-button values will be set to valueB.
// If both valueAFilled and valueBFilled are true and an operator is clicked
// then valueA and valueB will be evaluate by the proper operator and the result will be set to valueA.
// currentOperator and valueB will then be set to empty again.

let valueA = '';
let valueAFilled = false;

let valueB = '';
let valueBFilled = false;

let currentOperator = '';

let displayValue = ``;


const numberButtons = document.querySelectorAll('.num-button');
const operatorButtons = document.querySelectorAll('.operator-button');

const enterButton = document.querySelector('#enter');

const message = document.querySelector('#message');


/*/////////////////////////////////////////
Functions
/////////////////////////////////////////*/

// Helper Functions
////////////////////

function add( a, b) {
    return Number(a) + Number(b);
}

function subtract( a, b) {
    return Number(a) - Number(b);
}

function multiply( a, b) {
    return Number(a) * Number(b);
}

function divide( a, b) {
    return Number(a) / Number(b);
}


function operate( val1, val2, operator) {

    let result;

    switch(operator){

        case '+':
            result = add(val1, val2);
            break;

        case '-':
            result = subtract(val1, val2);
            break;

        case '*':
            result = multiply(val1, val2);
            break;

        case '/':
            result = divide(val1, val2);
            break;  

    }

    return result;

}

function updateDisplay() {

    const screen = document.querySelector('#screen');

    displayValue = `${valueA} ${currentOperator} ${valueB}`;

    screen.innerText = displayValue;

}


// Main Functions
////////////////////

function assignNumberValues(e) {

    let currentValue = e.currentTarget.getAttribute('data-value');

    if( !valueAFilled ){
        valueA += currentValue;
        console.log(valueA);
    } else {
        valueB += currentValue;
        console.log(valueB);
    }

    updateDisplay();

}


function assignOperatorValues(e) {

    let currentValue = e.currentTarget.getAttribute('data-value');

    // if both values are filled and operator is set
    if( valueAFilled && currentOperator !== '' && valueB.length > 0 ){

        valueA = operate( valueA, valueB, currentOperator );
        currentOperator = currentValue;

        valueB = '';

    } else {

        currentOperator = currentValue;
        valueAFilled = true;
        console.log(currentOperator);

    }

    updateDisplay();

}


function evaluateValues() {

    if( valueAFilled && currentOperator !== '' && valueB.length > 0 ){

        valueA = operate( valueA, valueB, currentOperator );

        valueB = '';
        currentOperator ='';

    } else {

        console.log('test');

    }

    updateDisplay();

}


numberButtons.forEach( (numberButton) => {
    numberButton.addEventListener( 'click', assignNumberValues);
});


operatorButtons.forEach( (operatorButton) => {
    operatorButton.addEventListener( 'click', assignOperatorValues);
});


enterButton.addEventListener( 'click', evaluateValues );