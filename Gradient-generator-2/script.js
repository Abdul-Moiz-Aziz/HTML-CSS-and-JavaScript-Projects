let btn = document.getElementById("btn");
let displayDiv = document.getElementById("display-div");
let final_color_1;
let final_color_2;
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

let clickbutton = () => {
      // First color generate
      let color_1 = "";
      let final_color_1;
      let color_loop_1 = arr.forEach((cur, index, arr1) => {
            let random = arr1[Math.floor(Math.random() * 16)];
            color_1 = color_1 + random;
            return color_1;
      });
      final_color_1 = "#" + color_1.slice(0, 6);

      // Second color generate
      let color_2 = "";
      let final_color_2;
      let color_loop_2 = arr.forEach((cur, index, arr2) => {
            let random = arr2[Math.floor(Math.random() * 16)];
            color_2 = color_2 + random;
            return color_2;
      });

      // Add colors to body background
      final_color_2 = "#" + color_2.slice(0, 6);
      let gradient = `linear-gradient(to top left, ${final_color_1} 40%, ${final_color_2})`;
      document.body.style.backgroundImage = gradient;
      let background_display = `background: ${gradient}`;
      displayDiv.innerText = background_display;
};

// For copy text
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

btn.addEventListener("click", () => {
      clickbutton();
});