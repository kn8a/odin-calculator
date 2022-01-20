# Calculator
### Background
This project is written in HTML, CSS, JS to answer the [Calculator problem](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator) in [The Odin Project](https://www.theodinproject.com/).
My goal was to make a calculator that fully functional and interactive, as well as, to look cool while keeping the UI clean.

Live demo: [https://kn8a.github.io/odin-calculator/](https://kn8a.github.io/odin-calculator/)

### Project Requirments

 - ✔️ Contain all functions of a basic calculator: ✔️add ✔️subtract
   ✔️multiply ✔️divide
 - ✔️ HTML calculator with buttons for each digit, each of the above
   functions and an “Equals” key.
 - ✔️ There should also be a display and a "clear" button.
 - ✔️ You’ll need to store the first number that is input into the
   calculator when a user presses an operator, and also save which
   operation has been chosen and then operate() on them when the user
   presses the “=” key.
 - ✔️ Once an operation has been called, update the display with the
   ‘solution’ to the operation.
 - ✔️ Users should be able to string together several operations and get
   the right answer, with each pair of numbers being evaluated at a
   time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of
   the behavior we’re looking for would be this student solution. Your
   calculator should not evaluate more than a single pair of numbers at
   a time.
 - ✔️ You should round answers with long decimals so that they don’t
   overflow the screen.
 - ✔️ Pressing “clear” should wipe out any existing data.. make sure the
   user is really starting fresh after pressing “clear”
 - ✔️ Display a snarky error message if the user tries to divide by Zero…
   don’t let it crash your calculator!
 - ✔️⭐ (EXTRA CREDIT) Add a . button and let users input decimals.
 - ✔️⭐ (EXTRA CREDIT) Make it look nice!
 - ✔️⭐ (EXTRA CREDIT) Add a “backspace” button, so the user can undo if
   they click the wrong number.
 - ✔️⭐ (EXTRA CREDIT) Add keyboard support!

### ⭐ Extras that I added
|Functionality|Look and feel|
|--|--|
|Operators perform "=" operation when possible.|Hover & MouseDown effects|
|Ability to enter negative numbers.|Click sounds & error sounds.|
|Power ("^") Operator|Custom font.|
|Extra "display" to display previous operations|Display "neon flickering" effect.|
 
### Where I struggled

 - Making operators perform equal function when two numbers already
   present with an operator between them.
 - Writing logics that can handle all possible entries, including
   invalid entries.
 - Implementing the minus sign to be used on newly entered numbers to
   make them negative.
 - Implementing keyboard support
 - Keeping track of the code and logics - need to simplify code or find
   simpler logics for future projects.

### What I Learned

 - Working with decimals using: `Math.round(result  *  Math.pow(x,y))  /  Math.pow(x,y)`
 - Formatting a string using: 
 `const numberFormatter = Intl.NumberFormat('en-US');
 textVariable = numberFormatter.format(textVariable);`
 - Array to string using `.join()` method. 
 - Adding sound effects to events and errors feedback.
 - Adding keyboard support using: `window.onkeydown`
