let mainArray = [];
let sumArray = [];
let pointer = 0;
let aNum='';

const numbers = document.querySelectorAll('.number'); //number buttons array
const clear = document.querySelector('.clear'); //clear button
const back = document.querySelector('.back'); //back button
let topText = document.querySelector('.topText'); //top text variable
let bottomText = document.querySelector('.bottomText'); //bottom text variable
const operators = document.querySelectorAll('.operator'); //operator buttons array
const equalbtn = document.querySelector('.equal');


numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (number.getAttribute('data-num') == 0 && aNum==0) { //to not repeat 0 when its already 0
            aNum="0";
        }
        else {
            aNum=aNum + number.getAttribute('data-num') //add to current number string
        }
        console.log(aNum);
        miniDisplay(aNum); //display on topText
    })
})

/*
equalbtn.addEventListener('click', () => {
    if (aNum.length > 0) {
        if (pointer>3 && sumArray.length==0) {
            calculation = operation(mainArray[pointer-4], mainArray[pointer-2], mainArray[pointer-3]);
            sumArray.push(calculation);
            largeDisplay(calculation);
        }
    
        else if (sumArray!=0) {

            console.log(mainArray);
            console.log(pointer);
            console.log(mainArray[pointer-1]);
            console.log(mainArray[pointer-4], mainArray[pointer-3], mainArray[pointer-2]);

            calculation = operation(sumArray[sumArray.length-1], mainArray[pointer-2], mainArray[pointer-3]);
            sumArray.push(calculation);
            largeDisplay(calculation);
            console.log('sumarray '+sumArray);
        }
    }
});
*/


operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (operator.getAttribute('data-opr')=='=' && aNum.length>0 && mainArray.length==2){
            mainArray.push(aNum);
            aNum='';
            mainArray.push('=');
            let calculation=operation(mainArray[0], mainArray[2], mainArray[1])
            sumArray.push(calculation);
            largeDisplay(calculation);
            miniDisplay('');
        } //WORKS!!!! RETURNS [NUM, OP, NUM, =]
        
                
        if (operator.getAttribute('data-opr')=='=' && aNum.length>0 && sumArray!=0) {         
            mainArray.push(aNum);
            mainArray.push('=');
            aNum='';
            let calculation = operation(sumArray[sumArray.length-1], mainArray[mainArray.length-2], mainArray[mainArray.length-3]);
            sumArray.push(calculation);
            largeDisplay(calculation);
            miniDisplay('');
            //WORKS
        }

        if (aNum.length==0 && operator.getAttribute('data-opr')!='=') {
            mainArray.push(sumArray[sumArray.length-1]);
            mainArray.push(operator.getAttribute('data-opr'));
            console.log(mainArray);
            miniDisplay('');
        }
        
        else if (aNum.length > 0 && operator.getAttribute('data-opr')!='=') {
            mainArray.push(aNum); //add previous number to array
            aNum=''; //reset number variable
            action = operator.getAttribute('data-opr'); //get operator type
            mainArray.push(action); //add operator to array
            miniDisplay('');

            if (mainArray.length>3 && sumArray.length==0 && mainArray[mainArray.length-3]!='=') {
                let calculation = operation(mainArray[mainArray.length-4], mainArray[mainArray.length-2], mainArray[mainArray.length-3]);
                sumArray.push(calculation);
                largeDisplay(calculation);
            }
            else if (sumArray!=0 && mainArray[mainArray.length-3]!='=') {
                let calculation = operation(sumArray[sumArray.length-1], mainArray[mainArray.length-2], mainArray[mainArray.length-3]);
                sumArray.push(calculation);
                largeDisplay(calculation);
                console.log('sumarray '+sumArray);
            }
        }
    })
})



//back button
back.addEventListener('click', () => {
    aNum = aNum.substring(0, aNum.length - 1); //remove the last digit
    miniDisplay(aNum); //update top display
    //if (aNum.length == 0 && (mainArray[pointer-1] % 2 != 0)){
    //    mainArray.splice(-1);
    //    pointer=pointer-1;
    //}
    //miniDisplay(aNum+'');

})

//clear button
clear.addEventListener('click', () => {
    mainArray = [];
    sumArray = [];
    pointer = 0;
    miniDisplay('');
    largeDisplay('0');
    aNum = '';
    calculation = 0;
})

function miniDisplay(arg) { //function to update top text
    topText.textContent=mainArray.join('') + arg; //update topText
}

function largeDisplay(result) { //function to update top text
    bottomText.textContent=result; //update topText
}

function operation(num1, num2, action) {
    let result=0;
    switch (action) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = substract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        case '^':
            result = power(num1, num2);   
            break;
    }
    return result;
}

//math functions
function add(num1,num2) {
	return Number(num1) + Number(num2); //add 2 numbers
};

function substract(num1, num2) {
	return Number(num1) - Number(num2); //substract 2 numbers
};

function multiply(num1, num2) {
    return Number(num1) * Number(num2); //multiply 2 numbers
};

function divide(num1, num2) {
    return Number(num1) / Number(num2); //divide 2 numbers
};

function power(num1, num2) {
	let sum=num1; //initiate sum to first variable for case of 0 or 1 on num2
  for (let j = 1; j < num2; j++) { //loop based on num2
    sum = sum * num1; //multiply num1
  }
  return sum;
};