/*/////////////////////////////////////////
Global Variables
/////////////////////////////////////////*/


/*/////////////////////////////////////////
Functions
/////////////////////////////////////////*/

function add( a, b) {
    return a + b;
}

function subtract( a, b) {
    return a - b;
}

function multiply( a, b) {
    return a * b;
}

function divide( a, b) {
    return a / b;
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