//Global variables
let mainArray = []; //used for display and for calculations
let sumArray = []; //stores totals of calculations
let aNum=''; //to store currently entered number
let tooLarge = false; //boolean for error checking
let zeroDiv = false; //boolean for erro checking
//DOM elements
const numbers = document.querySelectorAll('.number'); //number buttons array
const clear = document.querySelector('.clear'); //clear button
const back = document.querySelector('.back'); //back button
let topText = document.querySelector('.topText'); //top text variable
let bottomText = document.querySelector('.bottomText'); //bottom text variable
const operators = document.querySelectorAll('.operator'); //operator buttons array
const decPeriod = document.querySelector('.period'); //decimal period
const sound = new Audio("button.mp3"); //click sound
const errorSnd = new Audio("error.mp3"); //error sound

//NUMBER BUTTONS
numbers.forEach(number => {
    number.addEventListener('click', () => {
        sound.play(); //click sound
        sound.currentTime=0; //reset sound time
        if (tooLarge==true || zeroDiv==true) {return false;} //if one of the errors is true
        if (number.getAttribute('data-num') == 0 && aNum==0) { //to not repeat 0 when its already 0
            aNum="0";
        }
        else {
            aNum=aNum + number.getAttribute('data-num') //add to current number string
        }
        miniDisplay(aNum); //display on topText
    })
})

//DECIMAL POINT
decPeriod.addEventListener('click', () => {
    sound.play(); //click sound
    sound.currentTime=0; //reset sound time
    if (aNum.toString().indexOf('.') == -1) { //if period not present in string
        aNum = aNum + '.'; //add period to string
    }
})

//OPERATORS
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        //sound
        sound.play(); //click sound
        sound.currentTime=0; //reset sound time

        //Negative input
        if (operator.getAttribute('data-opr')=='-' && aNum.length==0 && aNum.toString().indexOf('-') == -1) {
            aNum = '-' + aNum; //add minus sign to num if minus doesnt already exist
                return;
            }
                
        if (aNum.length==0 && sumArray.length==0) {
            return; //in case operator clicked without a number and without a previous operation
        }
        
        //to be able to perform additional operation after = button
        if (aNum.length==0 && operator.getAttribute('data-opr')!='=') {
            mainArray.push(sumArray[sumArray.length-1]); //add previous total to main array
            mainArray.push(operator.getAttribute('data-opr')); //add current operator to array
            miniDisplay(''); //update mini display
            return;
        }
            
        //Equal button - for first operation
        if (operator.getAttribute('data-opr')=='=' && aNum.length>0 && mainArray.length==2){
            mainArray.push(aNum); //add num to array
            aNum=''; //clear num variable
            mainArray.push('='); //add operator to array
            let calculation=operation(mainArray[0], mainArray[2], mainArray[1]) //calculate
            sumArray.push(calculation); //add result to totals array
            largeDisplay(calculation); //display result on large screen
            miniDisplay(''); //update small screen            
        }
        
        //Equal button - for all operations after 1st    
        if (operator.getAttribute('data-opr')=='=' && aNum.length>0 && sumArray!=0) {         
            mainArray.push(aNum); //add num to array
            mainArray.push('='); //add operator to array
            aNum=''; //clear number
            let calculation = operation(sumArray[sumArray.length-1], mainArray[mainArray.length-2], mainArray[mainArray.length-3]); //calculation
            sumArray.push(calculation); //add calculation to totals array
            largeDisplay(calculation); //result on main screen
            miniDisplay(''); //update small screen            
        }

        //Operator buttons        
        else if (aNum.length > 0 && operator.getAttribute('data-opr')!='=') { //check conditions to perform an operation
            mainArray.push(aNum); //add previous number to array
            aNum=''; //reset number variable
            action = operator.getAttribute('data-opr'); //get operator type
            mainArray.push(action); //add operator to array
            miniDisplay('');
            //perform first operation
            if (mainArray.length>3 && sumArray.length==0 && mainArray[mainArray.length-3]!='=') {
                let calculation = operation(mainArray[mainArray.length-4], mainArray[mainArray.length-2], mainArray[mainArray.length-3]); //calculation on items from array
                sumArray.push(calculation); //add result to totals array
                largeDisplay(calculation); //result to large display                
            }
            //operations after first
            else if (sumArray!=0 && mainArray[mainArray.length-3]!='=') {
                let calculation = operation(sumArray[sumArray.length-1], mainArray[mainArray.length-2], mainArray[mainArray.length-3]); //calculation on items from array
                sumArray.push(calculation); //add result to totals array
                largeDisplay(calculation); //result to large display                
            }
        }   
        //Error checking - string too large for large display
        if (tooLarge == true) { //if result string too long
            miniDisplay('......Number too long.......');
            errorSnd.play(); //error sound
            sound.currentTime=0; //reset sound time
            return;
        }
        //Error checking - division by 0
        if (zeroDiv == true) { //if divided by 0
            miniDisplay('Divide by zero? Really???');
            errorSnd.play(); //error sound
            sound.currentTime=0; //reset sound time
            return;
    }
    })
})//END OPERATORS

//BACK BUTTON
back.addEventListener('click', () => {
    sound.play(); //click sound
    sound.currentTime=0; //reset sound time
    aNum = aNum.substring(0, aNum.length - 1); //remove the last digit
    miniDisplay(aNum); //update top display
    return;
})

//CLEAR BUTTON
clear.addEventListener('click', () => {
    sound.play(); //click sound
    sound.currentTime=0; //reset sound time
    mainArray = []; //reset main array
    sumArray = []; //reset total array
    miniDisplay(''); //update mini display
    largeDisplay('0'); //reset large display
    aNum = ''; //reset number
    calculation = 0; //reset calculation
    tooLarge = false; //reset text too large to fit var
    zeroDiv = false; //reset divide by zero var
    window.location.reload();
    return;
})

//DISPLAY FUNCTIONS
//mini display
function miniDisplay(arg) { //function to update top text
    let tempText=mainArray.join('') + arg +''; //add argument to (joined) array
    if (tempText.length>27) { //if string fills display
        tempText = "..." + tempText.substring(tempText.length-25, tempText.length-1); //fill display with last parts of string
    }
    topText.textContent=tempText; //update topText
    return;
}
//large display
function largeDisplay(result) { //function to update top text
    let tempText = "" + result; //conver result to string
    if (tempText.length>11) { //if string longer than 14
        tempText = "Error"; //display error
        tooLarge = true; //error variable true
    }
    if (tempText == "Infinity" || tempText == "-Infinity") { //if divided by 0
        tempText = "User Failed"; //display error
        zeroDiv = true; //error variable true
    }
    if (zeroDiv == false && tooLarge == false){
        const numberFormatter = Intl.NumberFormat('en-US');
        tempText = numberFormatter.format(tempText);
    }
    bottomText.textContent=tempText; //update topText
    return;
}

//MATH FUNCTIONS
//function to call other functions based on type of operator
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
    result = Math.round(result * Math.pow(10,6)) / Math.pow(10,6) //decimal point limiter
    if (result == 40353607.00000001) {result=40353607;} //for some unknown reason, this is what 7^9 returns
    return result;
}

//calculation functions
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

//KEYBOARD
window.onkeydown = function(keyPress) {
    let inputKey=(keyPress.key);
    let press;
    switch (inputKey) {
        case '0':
            press=document.querySelector('#n0');
            press.click();
            return;
        case '1':
            press=document.querySelector('#n1');
            press.click();
            return;
        case '2':
            press=document.querySelector('#n2');
            press.click();
            return;
        case '3':
            press=document.querySelector('#n3');
            press.click();
            return;
        case '4':
            press=document.querySelector('#n4');
            press.click();
            return;
        case '5':
            press=document.querySelector('#n5');
            press.click();
            return;           
        case '6':
            press=document.querySelector('#n6');
            press.click();
            return;
        case '7':
            press=document.querySelector('#n7');
            press.click();
            return;
        case '8':
            press=document.querySelector('#n8');
            press.click();
            return;
        case '9':
            press=document.querySelector('#n9');
            press.click();
            return;
        case '.':
            press=document.querySelector('#dot');
            press.click();
            return;
        //case '=':
            //press=document.querySelector('#equal');
            //press.click();
            //return;
        case 'Enter':
            press=document.querySelector('#equal');
            press.click();
            return;
        case '+':
            press=document.querySelector('#plus');
            press.click();
            return;
        case '-':
            press=document.querySelector('#minus');
            press.click();
            return;
        case '*':
            press=document.querySelector('#times');
            press.click();
            return;
        case '/':
            press=document.querySelector('#divide');
            press.click();
            return;
        case '^':
            press=document.querySelector('#power');
            press.click();
            return;
        case '/':
            press=document.querySelector('#divide');
            press.click();
            return;
        case 'Delete':
            press=document.querySelector('#del');
            press.click();
            return;
        case 'Backspace':
            press=document.querySelector('#del');
            press.click();
            return;
        case 'Escape':
            press=document.querySelector('#ac');
            press.click();
            return;
    }
}