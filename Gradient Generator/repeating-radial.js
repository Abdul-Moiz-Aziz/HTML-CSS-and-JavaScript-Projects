let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let displayDiv = document.getElementById("display-div");
let background_display;
var result1 = "#7a3f97";
var result2 = "#224962";

let consColor = () => {
      let arr_1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
      let color_1 = "";
      let final_color_1;
      let color_loop_1 = arr_1.forEach((cur, index, arr1) => {
            let random = arr1[Math.floor(Math.random() * 16)];
            color_1 = color_1 + random;
      })
      final_color_1 = "#" + color_1.slice(0, 6);
      return final_color_1;
}

let clickbutton1 = () => {
      result1 = consColor();
      var gradient = `repeating-radial-gradient(circle, ${result1} 40px, ${result2} 10%)`
      document.body.style.backgroundImage = gradient;
      background_display = `background-image: ${gradient};`;
      displayDiv.innerText = background_display;
      btn1.innerHTML = result1;
}

let clickbutton2 = () => {
      result2 = consColor();
      var gradient = `repeating-radial-gradient(circle, ${result1} 40px, ${result2} 10%)`
      document.body.style.backgroundImage = gradient;
      background_display = `background-image: ${gradient};`;
      displayDiv.innerText = background_display;
      btn2.innerHTML = result2;
}
function copyText() {
      let tempTextArea = document.createElement('textarea');
      tempTextArea.value = displayDiv.innerText;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      tempTextArea.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
}
displayDiv.addEventListener('click', copyText);

btn1.addEventListener("click", () => {
      clickbutton1();
})

btn2.addEventListener("click", () => {
      clickbutton2();
})