var calculatorButtons = document.querySelectorAll('div.calculator-button');
var calculatorOutput = document.querySelector('div.calculator-output');
var output = '';
var errorMessage = 'Syntax Error';
var answerDisplayed = false; //TODO 

window.addEventListener('keydown', keyDown);

calculatorButtons.forEach((button) => {
    button.addEventListener('click', (e)=>buttonPress(e));
});

function keyDown(e){
    //TODO key down
}



function buttonPress(e){
    if (output == errorMessage) {
        output ='';
    }
    var key = e.target.getAttribute('data-key');
    if (answerDisplayed == true){
        if (isNaN(Number(key)) == false || key =='.') output = '';
        answerDisplayed = false;
    }
    if (key == '='){
        operate(output);
    } else if (key == 'clear'){
        output = '';
    } else if (key == 'backspace'){
        console.log('backspace ' + output);
        output = output.substring(0, output.length -1);
        console.log('backspace ' + output);
    } else {
        output += key;
    }
    displayOutput();
}

function displayOutput(){
    calculatorOutput.textContent = output.replace(/~/g,"");
}

function checkOperationError(i, o){
    // 0 == ''
    if (String(o[i-1]) == '' || String(o[i+1]) == '' || isNaN(o[i-1]) || isNaN(o[i+1])) {
        output = errorMessage;
        displayOutput();
        return true;
    }
    return false;
}

function checkNumberError(num){
    console.log(num);
    if (isNaN(num)){
        output = errorMessage;
        displayOutput();
        return true;
    }
    return false;
}

function operate(o){
    var output1 = o.split("~");
    if(checkNumberError(output1[0])) return;
    
    var output2 = [];

    var newOutputLength = 0;
    var operationResult;

    //first pass
    for (i=0; i<output1.length; i++){
        if (output1[i] == 'x'){
            if (checkOperationError(i, output1)) return;
            operationResult = Number(output1[i-1]) * Number(output1[i+1]);
            newOutputLength--;
            output2[newOutputLength] = operationResult;
            output1[i+1] = operationResult;
            i++;
        } else if (output1[i] == '÷'){
            if (checkOperationError(i, output1)) return;
            operationResult = Number(output1[i-1]) / Number(output1[i+1]);
            newOutputLength--;
            output2[newOutputLength] = operationResult;
            output1[i+1] = operationResult;  
            i++;    
        } else {
            output2[newOutputLength] = output1[i];
        }
        newOutputLength++;
        console.log(output1);
        console.log(output2);
    }

    output1 = [];
    newOutputLength = 0;

    //second pass
    console.log('second pass');
    for (i=0; i<output2.length; i++){
        if (output2[i] == '+'){
            if (checkOperationError(i, output2)) return;
            operationResult = Number(output2[i-1]) + Number(output2[i+1]);
            newOutputLength--;
            output1[newOutputLength] = operationResult;
            output2[i+1] = operationResult;
            i++;
        } else if (output2[i] == '-'){
            if (checkOperationError(i, output2)) return;
            operationResult = Number(output2[i-1]) - Number(output2[i+1]);
            newOutputLength--;
            output1[newOutputLength] = operationResult;
            output2[i+1] = operationResult;  
            i++;    
        } else {
            output1[newOutputLength] = output2[i];
        }
        newOutputLength++;
        console.log(output1);
        console.log(output2);
    }

    output1[0] = +Number(output1[0]).toFixed(5);
    output = String(output1[0]);
    answerDisplayed = true;
    displayOutput();
}