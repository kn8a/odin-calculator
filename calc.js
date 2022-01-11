let mainArray = [];
let sumArray = [];
let aNum='';
let tooLarge = false;
let zeroDiv = false;

const numbers = document.querySelectorAll('.number'); //number buttons array
const clear = document.querySelector('.clear'); //clear button
const back = document.querySelector('.back'); //back button
let topText = document.querySelector('.topText'); //top text variable
let bottomText = document.querySelector('.bottomText'); //bottom text variable
const operators = document.querySelectorAll('.operator'); //operator buttons array
const decPeriod = document.querySelector('.period');
const sound = new Audio("button.mp3");
const errorSnd = new Audio("error.mp3");


numbers.forEach(number => {
    number.addEventListener('click', () => {
        sound.play();
        sound.currentTime=0;
        if (tooLarge==true || zeroDiv==true) {return false;}
        if (number.getAttribute('data-num') == 0 && aNum==0) { //to not repeat 0 when its already 0
            aNum="0";
        }
        else {
            aNum=aNum + number.getAttribute('data-num') //add to current number string
        }
        miniDisplay(aNum); //display on topText
    })
})

decPeriod.addEventListener('click', () => {
    sound.play();
    sound.currentTime=0;
    if (aNum.toString().indexOf('.') == -1) {
        aNum = aNum + '.';
    }
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        sound.play();
        sound.currentTime=0;
        if (operator.getAttribute('data-opr')=='-' && aNum.length==0 && aNum.toString().indexOf('-') == -1) {
            console.log(aNum);
            aNum = '-' + aNum;
            console.log(aNum);
            return;
        }
        if (aNum.length==0 && sumArray.length==0) {
            return;} //in case operator clicked without a number and without a previous operation
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
            }
        }
    if (tooLarge == true) {
        miniDisplay('......Number too long.......');
        errorSnd.play();
        sound.currentTime=0;
    }
    if (zeroDiv == true) {
        miniDisplay('Divide by zero? Really???');
        errorSnd.play();
        sound.currentTime=0;
    }
    
    })
})

//back button
back.addEventListener('click', () => {
    sound.play();
    sound.currentTime=0;
    aNum = aNum.substring(0, aNum.length - 1); //remove the last digit
    miniDisplay(aNum); //update top display
})

//clear button
clear.addEventListener('click', () => {
    sound.play();
    sound.currentTime=0;
    mainArray = [];
    sumArray = [];
    pointer = 0;
    miniDisplay('');
    largeDisplay('0');
    aNum = '';
    calculation = 0;
    tooLarge = false;
    zeroDiv = false;
})

function miniDisplay(arg) { //function to update top text
    let tempText=mainArray.join('') + arg +'';
    if (tempText.length>27) {
        tempText = "..." + tempText.substring(tempText.length-25, tempText.length-1);
    }
    topText.textContent=tempText; //update topText
}

function largeDisplay(result) { //function to update top text
    let tempText = "" + result;
    console.log(tempText);
    if (tempText.length>14) {
        tempText = "Error";
        tooLarge = true;   
    }
    if (tempText == "Infinity" || tempText == "-Infinity") {
        tempText = "User Failed";
        zeroDiv = true;
    }
    bottomText.textContent=tempText; //update topText
}

function operation(num1, num2, action) {
    let result=0;
    if (num1 == undefined) { //if statement sent to calculate without first number
        num1=0; //first number to be 0
    }
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
    result = Math.round(result * Math.pow(10,6)) / Math.pow(10,6)
    if (result == 40353607.00000001) {result=40353607;} //for some unknown reason, this is what 7^9 returns
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
	let sum=Number(num1); //initiate sum to first variable for case of 0 or 1 on num2
  for (let j = 1; j < Number(num2); j++) { //loop based on num2
    sum = sum * num1; //multiply num1
  }
  return sum;
};