let addbtn = document.querySelector(".add-btn");
let input_value = document.getElementById("input-value");
let item_container = document.querySelector(".item-container");


let getlist = () => {
      return JSON.parse(localStorage.getItem("Inputitem"));
}

let local_item = getlist() || [];

const additem = (e) => {
      e.preventDefault();
      if (!local_item.includes(input_value.value) && input_value.value !== "") {
            input_value.value = input_value.value.trim();
            if (input_value.value === "") {
                  alert("Please enter a valid item");
            } else {
                  local_item.push(input_value.value);
                  local_item = [...new Set(local_item)];
                  localStorage.setItem("Inputitem", JSON.stringify(local_item));
                  let item = document.createElement("div");
                  item.classList.add("item");
                  item.innerHTML = `<p>${input_value.value}</p><button class="deletebtn">Delete</button>`;
                  item_container.append(item);
                  input_value.value = "";
            }
      }
      else {
            input_value.value = "";
            alert("This item is already added");
      }
};

item_container.addEventListener("click", (e) => {
      if (e.target.classList.contains("deletebtn")) {
            e.target.parentElement.remove();
            local_item.splice(local_item.indexOf(e.target.previousElementSibling.innerText), 1);
            localStorage.setItem("Inputitem", JSON.stringify(local_item));
      }
});

addbtn.addEventListener("click", (e) => {
      additem(e);
});

window.addEventListener("load", () => {
      local_item.forEach((ind) => {
            let item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `<p>${ind}</p><button class="deletebtn">Delete</button>`;
            item_container.append(item);
      })
});