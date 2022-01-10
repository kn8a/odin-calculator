let mainArray = [];
let pointer = 0;
let aNum='';

const numbers = document.querySelectorAll('.number'); //number buttons array
const clear = document.querySelector('.clear'); //clear button
const back = document.querySelector('.back'); //back button
let topText = document.querySelector('.topText'); //top text variable

const operators = document.querySelectorAll('.operator'); //operator buttons array


console.log(clear);


numbers.forEach(number => {
    number.addEventListener('click', () => {
        aNum=aNum + number.getAttribute('data-num')
        console.log(aNum);
        updateDisplay(aNum);
    })
})

back.addEventListener('click', () => {
    aNum = aNum.substring(0, aNum.length - 1);
    updateDisplay(aNum);

})

clear.addEventListener('click', () => {
    mainArray = [];
    pointer = 0;
    updateDisplay('');
    aNum = '';
})

function updateDisplay(arg) {
    topText.textContent=arg;
}