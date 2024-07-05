let plus_btn = document.querySelectorAll(".plus");
let minus_btn = document.querySelectorAll(".minus");
let total = document.querySelector(".total");
let total_toggle = document.querySelector(".toggle-button");
const priceElements = document.querySelectorAll('.pricing');
const priceDisplay = document.querySelectorAll('.price');
const number = document.querySelectorAll('.number');
const main_price = document.querySelectorAll(".main-price");
const total_price = document.querySelector(".total-price");
const productName = document.querySelectorAll(".product-name");
const all_prices_total = document.querySelector(".all-prices-total");

total_toggle.addEventListener("click", () => {
      total_price.classList.toggle("switch");
      if (total_price.classList.contains("switch")) {
            total_toggle.innerHTML = "<i class='fa-solid fa-chevron-right'></i>";
            total_toggle.style.animation = "none";
      }

      else {
            total_toggle.innerHTML = "<i class='fa-solid fa-chevron-left'></i>";
            total_toggle.style.animation = "animate 1s infinite alternate";
      }
});

let totalPrice = 0;

priceElements.forEach((priceElem, ind) => {
      let quantity = 0;

      number[ind].innerHTML = quantity;

      const price = parseFloat(priceElem.querySelector('.price').textContent.replace('Calculated $: ', '')) + parseFloat(main_price[ind].textContent.replace("$", ""));

      plus_btn[ind].addEventListener("click", () => {
            if (quantity >= 15) {
                  return alert("The maximum limit for purchasing products is 15.");
            }

            else {
                  quantity++;
                  updatePrice(ind, price, quantity);
            }
      });

      minus_btn[ind].addEventListener("click", () => {
            if (quantity > 0) {
                  quantity--;
                  updatePrice(ind, price, quantity);
            }
      });
});

function updatePrice(index, price, quantity) {
      priceDisplay[index].textContent = 'Calculated $: ' + (price * quantity).toFixed(2);
      number[index].innerHTML = quantity;

      let existingElement = total_price.querySelector(`.total-div[data-index="${index}"]`);

      if (quantity === 0) {
            if (existingElement) {
                  existingElement.remove();
            }
      }

      else if (quantity === 1) {
            if (!existingElement) {
                  let createElement = document.createElement("div");
                  createElement.classList.add("total-div");
                  createElement.setAttribute("data-index", index);
                  createElement.innerHTML = `
                  <span class="total-product-name">${productName[index].innerHTML}</span>
                  <span class="total-quantity-name">${quantity}</span>
                  <span class="total-price-name">${priceDisplay[index].textContent.replace("Calculated", "")}</span>`;
                  total_price.append(createElement);
            }
            else {
                  existingElement.querySelector(".total-quantity-name").innerHTML = quantity;
                  existingElement.querySelector(".total-price-name").innerHTML = priceDisplay[index].textContent.replace("Calculated", "");
            }
      }

      else {
            if (existingElement) {
                  existingElement.querySelector(".total-quantity-name").innerHTML = quantity;
                  existingElement.querySelector(".total-price-name").innerHTML = priceDisplay[index].textContent.replace("Calculated", "");
            }
      }
      updateTotalPrice();
}

function updateTotalPrice() {
      totalPrice = Array.from(priceDisplay).reduce((acc, priceElem) => {
            return acc + parseFloat(priceElem.textContent.replace('Calculated $: ', ''));
      }, 0);
      all_prices_total.textContent = "Your total price is:  $" + totalPrice.toFixed(2);
}

updateTotalPrice();