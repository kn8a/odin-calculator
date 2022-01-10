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
        miniDisplay(aNum);
    })
})

//back button
back.addEventListener('click', () => {
    aNum = aNum.substring(0, aNum.length - 1); //remove the last digit
    miniDisplay(aNum); //update top display

})

clear.addEventListener('click', () => {
    mainArray = [];
    pointer = 0;
    miniDisplay('');
    aNum = '';
})

function miniDisplay(arg) {
    topText.textContent=arg;
}