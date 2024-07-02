const buttons = document.querySelector(".buttons");
const operator_btns = document.querySelectorAll(".operator-btns");
let result = document.querySelector(".result");
let equal_btn = document.querySelector(".equal-btn");
let clear_btn = document.querySelector(".clear-btn");
let history_show = document.querySelector(".history");
let backspace_btn = document.querySelector(".backspace-btn");


let operation = "";

buttons.addEventListener("click", (e) => {
      if (e.target.classList.contains("operator-btns")) {
            result.innerHTML += e.target.innerText;
      }
})

equal_btn.addEventListener("click", () => {
      operation = result.innerHTML;
      result.innerHTML = eval(operation);
      history_show.innerHTML = operation + " = " + result.innerHTML;
})

clear_btn.addEventListener("click", () => {
      result.innerHTML = "";
})

backspace_btn.addEventListener("click", () => {
      result.innerHTML = result.innerHTML.slice(0, -1);
})

document.addEventListener("keydown", (e) => {
      const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "%"];

      if (allowedKeys.includes(e.key)) {
            result.innerHTML += e.key;
      }
})

document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
            result.innerHTML = "";
      }
})

document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
            operation = result.innerHTML;
            result.innerHTML = eval(operation);
            history_show.innerHTML = operation + " = " + result.innerHTML;
      }
})


document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
            result.innerHTML = result.innerHTML.slice(0, -1);
      }
})

// document.addEventListener("keydown", (e) => {
//       if (e.key.toLowerCase() === "r") {
//             let currentResult = parseFloat(result.innerHTML);
//             if (!isNaN(currentResult)) {
//                   result.innerHTML = Math.sqrt(currentResult);
//                   history_show.innerHTML = "√" + currentResult + " = " + result.innerHTML;
//             }
//       }
// });