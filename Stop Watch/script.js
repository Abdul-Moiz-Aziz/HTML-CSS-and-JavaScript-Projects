let display = document.getElementById("display-div");
let stop = document.querySelector(".stop")
let start = document.querySelector(".start")
let getTime = document.querySelector(".gettime")
let clear = document.querySelector(".clear")
let reset = document.querySelector(".reset")
let displayTime = document.querySelector(".display-time");

let count = 0;
display.innerText = count;
let intervalID;

start.addEventListener("click", () => {
      intervalID = setInterval(() => {
            count++;
            display.innerText = count;
      }, 1000);
});

stop.addEventListener("click", () => {
      clearInterval(intervalID);
})

clear.addEventListener("click", () => {
      clearInterval(intervalID);
      displayTime.innerText = "";
})

getTime.addEventListener("click", () => {
      let divide = Math.floor(count / 60);
      let modulus = count % 60;
      if (count !== 0) {
            if (count === 60) {
                  if (modulus === 0) {
                        modulus = "";
                        displayTime.innerText = `${divide} minute`;
                  }
            }
            else if (count > 120) {
                  display.innerText = count;
                  if (modulus === 0) {
                        modulus = "";
                        displayTime.innerText = `${divide} minutes`;
                  }
                  else {
                        displayTime.innerText = `${divide} minutes : ${modulus} seconds`;
                  }
            }
            else if (count > 60) {
                  display.innerText = count;
                  if (modulus === 0) {
                        modulus = "";
                        displayTime.innerText = `${divide} minutes`;
                  }
                  else {
                        displayTime.innerText = `${divide} minute : ${modulus} seconds`;
                  }
            }
            else {
                  displayTime.innerText = `${count} seconds`
            }
      }
      else {
            count = 0;
      }
})

reset.addEventListener("click", () => {
      clearInterval(intervalID);
      display.innerText = 0;
})