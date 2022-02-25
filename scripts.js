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

let currentOperator = '';

let displayValue = ``;


const numberButtons = document.querySelectorAll('.num-button');
const operatorButtons = document.querySelectorAll('.operator-button');

const backButton = document.querySelector('#back');
const clearButton = document.querySelector('#clear');
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
    if( Number(b) === Number(0) ){
        message.innerText = 'You cannot divide by 0';
        return Number(0);
    } else {
        return Number(a) / Number(b);
    }
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

    if( result - Math.floor(result) !== 0 ){
        result = Math.round( result * 100) / 100;
    }

    return result;

}


function updateDisplay() {

    const screen = document.querySelector('#screen');

    displayValue = `${valueA} ${currentOperator} ${valueB}`;

    screen.innerText = displayValue;

}


function clearMessage() {

    if( message.innerText.length > 0 ){
        message.innerText = '';
    }

}


// Main Functions
////////////////////

function assignNumberValues(e) {

    let currentValue = e.currentTarget.getAttribute('data-value');

    if( !valueAFilled ){

        if( currentValue === '.' && valueA.includes('.') ){
            return;
        }

        valueA += currentValue;
        console.log(valueA);

    } else {

        if( currentValue === '.' && valueB.includes('.') ){
            return;
        } 

        valueB += currentValue;
        console.log(valueB);

    }

    updateDisplay();
    clearMessage();

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
    clearMessage();

}


function evaluateValues() {

    if( valueAFilled && currentOperator !== '' && valueB.length > 0 ){

        valueA = operate( valueA, valueB, currentOperator );
        valueAFilled = false;

        valueB = '';
        currentOperator ='';

    } else {

        message.innerText = 'You must have enter two values and an operator';

    }

    updateDisplay();

}


function clearValues() {

    valueA = '';
    valueAFilled = false;

    valueB = '';

    currentOperator = '';

    displayValue = ``;

    updateDisplay();
    clearMessage();

}


function deleteValue() {

    if( valueB.length > 0 ){

        valueB = valueB.substring(0, valueB.length - 1);

    } else if ( currentOperator.length > 0 ){

        currentOperator = currentOperator.substring(0, currentOperator.length - 1);
        // set valueAFilled as false in case user wants to add to valueA after deleting operator
        valueAFilled = false;

    } else if (valueA.length > 0 ){
        
        valueA = valueA.substring(0, valueA.length - 1);

    }

    updateDisplay();
    clearMessage();

}

function keyUpInput(e) {

    console.log(e);
    const keyPressed = e.keyCode;
    const selectedButton = document.querySelector(`button[data-key="${keyPressed}"]`);

    if( selectedButton ){
        selectedButton.click();
    }

    // If enter key is used evaluate values
    if( keyPressed === 13 ){
        evaluateValues();
    }

}


/*/////////////////////////////////////////
Setup and Interaction
/////////////////////////////////////////*/


numberButtons.forEach( (numberButton) => {
    numberButton.addEventListener( 'click', assignNumberValues);
});


operatorButtons.forEach( (operatorButton) => {
    operatorButton.addEventListener( 'click', assignOperatorValues);
});


window.addEventListener('keyup', keyUpInput);

backButton.addEventListener( 'click', deleteValue );

clearButton.addEventListener( 'click', clearValues );

enterButton.addEventListener( 'click', evaluateValues );