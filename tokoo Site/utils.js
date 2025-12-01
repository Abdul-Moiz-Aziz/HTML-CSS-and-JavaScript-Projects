import { allProducts } from './products';

const mainCartContainer = document.querySelector(".main-cart-container");
const emptyCartSection = document.querySelector(".empty-cart-section");
const mainCartProductSection = document.querySelector(".main-cart-products-sec");
const itemsCount = document.querySelector(".items-no");
const cartCount = document.querySelector(".cart-count");
const totalPriceOfProducts = document.querySelector(".total-price-items");
const productRemoved = document.querySelector(".product-removed-name");
const mainTotalPriceElement = document.querySelector(".main-total-price-element");
const wishlistProductRemovedName = document.querySelector(".wishlist-removed-product-name");
const wishlistProductRemovedContainer = document.querySelector(".wishlist-product-removed");
const wishlistEmptySection = document.querySelector('.wishlist-empty-section');
const mainWishlistContainer = document.querySelector(".main-wishlist-container");
const mainWishlistProductsSec = document.querySelector(".main-wishlist-products-sec");
const miniCartItemsContainer = document.querySelector(".mini-cart-items-container");
const miniCartItemTemplate = document.getElementById("mini-cart-item");
const emptyMiniCartDisplay = document.querySelector(".empty-mini-cart");
const viewAllCartProducts = document.querySelector(".view-all-cart-products-element");
const dullBody = document.getElementById("dull-body");
let productRemovedName = document.querySelector(".removed-name");
let shippingOptions = document.querySelectorAll(".shipping-option");
let totalWithShipping = document.querySelector(".total-with-shipping");
let subTotalPrice = document.querySelector(".sub-total-price");
let wishlistItemNo = document.querySelector(".wishlist-item-no");
let notificationMessage = document.querySelector(".notification-element");

export const emptyCartDisplay = () => {
      if (mainCartProductSection) {
            if (mainCartProductSection.children.length === 0) {
                  emptyCartSection.style.display = "flex";
                  mainCartContainer.style.display = "none";
                  mainTotalPriceElement.style.display = "none";
            }
            else {
                  emptyCartSection.style.display = "none";
                  mainCartContainer.style.display = "flex";
                  mainTotalPriceElement.style.display = "grid";
            }
      }
};

export const emptyWishlistDisplay = () => {
      if (mainWishlistProductsSec) {
            if (mainWishlistProductsSec.children.length === 0) {
                  wishlistEmptySection.style.display = "flex";
                  mainWishlistContainer.style.display = "none";
            }
            else {
                  wishlistEmptySection.style.display = "none";
                  mainWishlistContainer.style.display = "flex";
            }
      }
}


export const localItems = () => {
      let items = JSON.parse(localStorage.getItem("CartItems"));
      return items || [];
};

let localStorageItems = localItems();

let cartItems = localItems();


export const wishlistLocalItems = () => {
      let items = JSON.parse(localStorage.getItem("WishlistItems"));
      return items || [];
}

export const handleWishlistItems = (e, id) => {
      let wishlistItems = wishlistLocalItems();
      if (e.target.classList.contains("fa-regular")) {
            let currentWishlist = document.querySelector(`#product${id}`);
            let name;
            if (currentWishlist.querySelector(".product-name")) {
                  let productName = currentWishlist.querySelector(".product-name");
                  name = productName.textContent;
            }
            let item = { name, id };
            let checkExistingItem = wishlistItems.find((elem) => elem.id === item.id);
            if (checkExistingItem) {
                  return;
            }
            else {
                  wishlistItems.push(item);
                  e.target.classList.add("fa-solid", "active-icon");
                  e.target.classList.remove("fa-regular");
                  localStorage.setItem("WishlistItems", JSON.stringify(wishlistItems));
                  wishCounts();
            }
      }
      else {
            e.target.classList.remove("fa-solid", "active-icon");
            e.target.classList.add("fa-regular");
            wishlistItems = wishlistItems.filter((item) => item.id !== id);
            localStorage.setItem("WishlistItems", JSON.stringify(wishlistItems));
            wishCounts();
      }
}

export const deleteWishlistItems = (id) => {
      let wishlistItems = wishlistLocalItems();
      wishlistItems = wishlistItems.filter((item) => item.id !== id);
      localStorage.setItem("WishlistItems", JSON.stringify(wishlistItems));
      let currentWishlist = document.querySelector(`#product${id}`);
      if (currentWishlist) {
            wishlistProductRemovedContainer.style.display = "flex";
            wishlistProductRemovedName.textContent = `"${currentWishlist.querySelector(".wishlist-product-name").textContent}" removed.`;
            currentWishlist.remove();
      }
      wishCounts();
      emptyWishlistDisplay()
      wishlistProductRemovedContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-xmark")) {
                  wishlistProductRemovedContainer.style.display = "none";
            }
      })
}

export const wishCounts = () => {
      let wishlistItems = wishlistLocalItems();
      if (wishlistItemNo) {
            if (wishlistItems.length === 1) {
                  wishlistItemNo.textContent = wishlistItems.length + " item";
            }
            else {
                  wishlistItemNo.textContent = wishlistItems.length + " items";
            }
      }
}

export const allCartProductsPrice = () => {
      let totalPrice = 0;
      cartItems.forEach((element) => {
            totalPrice += Number(element.price.replace("$", ""));
      });
      return `$${totalPrice.toFixed(2)}`;
};

export const calculateTotalPriceWithShipping = () => {
      if (shippingOptions.length) {
            shippingOptions.forEach((option) => {
                  const shippingPrice = Number(option.parentElement.nextElementSibling.textContent.replace("$", ""));
                  const cartPrice = Number(allCartProductsPrice().replace("$", ""));
                  const totalPriceWithShipping = `$${(shippingPrice + cartPrice).toFixed(2)}`;
                  if (option.checked) {
                        totalWithShipping.textContent = totalPriceWithShipping;
                  }
                  option.addEventListener('change', (event) => {
                        dullBody.style.display = "block";
                        document.body.style.cursor = "progress";
                        setTimeout(() => {
                              dullBody.style.display = "none";
                              document.body.style.cursor = "default";
                              if (event.target.checked) {
                                    const shippingPrice = Number(event.target.parentElement.nextElementSibling.textContent.replace("$", ""));
                                    const cartPrice = Number(allCartProductsPrice().replace("$", ""));
                                    const totalPriceWithShipping = `$${(shippingPrice + cartPrice).toFixed(2)}`;
                                    totalWithShipping.textContent = totalPriceWithShipping;
                              }
                        }, 2000)
                        localStorage.setItem("selectedShippingOption", event.target.parentElement.nextElementSibling.textContent)
                  });
            });
      };
};

export const applySavedShippingOption = () => {
      if (localStorage.getItem('selectedShippingOption')) {
            const savedOptionValue = localStorage.getItem('selectedShippingOption');
            if (savedOptionValue) {
                  shippingOptions.forEach((option) => {
                        if (option.parentElement.nextElementSibling.textContent === savedOptionValue) {
                              option.checked = true;
                              const shippingPrice = Number(option.parentElement.nextElementSibling.textContent.replace("$", ""));
                              const totalPrice = Number(allCartProductsPrice().replace("$", ""));
                              const totalPriceWithShipping = `$${(shippingPrice + totalPrice).toFixed(2)}`;
                              totalWithShipping.textContent = totalPriceWithShipping;
                        }
                  });
            }
      }
};

export const handleCartProducts = (id, category, subCategory) => {
      let currentCart = document.querySelector(`#product${id}`);
      let name;
      let productPrice;
      if (currentCart.querySelector(".product-name")) {
            let productName = currentCart.querySelector(".product-name");
            name = productName.textContent;
      }
      else if (currentCart.querySelector(".mini-cart-product-name")) {
            let productName = currentCart.querySelector(".mini-cart-product-name");
            name = productName.textContent;
      }
      if (currentCart.querySelector(".product-price")) {
            productPrice = currentCart.querySelector(".product-price").textContent.replace("$", "");
      }
      else if (currentCart.querySelector(".mini-cart-product-price")) {
            productPrice = currentCart.querySelector(".mini-cart-product-price").textContent.replace("$", "");
      }
      let quantity = 1;
      let item = { name, id, price: `$${(Number(productPrice) * quantity).toFixed(2)}`, category, subCategory, quantity };
      let checkExistingItem = cartItems.find((elem) => elem.id == item.id);

      if (checkExistingItem) {
            if (notificationMessage) {
                  notificationMessage.classList.add("show-notification");
                  notificationMessage.textContent = `Product is already added to Cart`;
                  setTimeout(() => {
                        notificationMessage.classList.remove("show-notification");
                  }, 2000);
            }
            return;
      }
      else {
            cartItems.push(item);
            document.querySelector(".cart-count").textContent = cartItems.length;
            localStorage.setItem("CartItems", JSON.stringify(cartItems));
            updateCounts()
            allCartProductsPrice();
            showMiniCartItems()
            if (notificationMessage) {
                  notificationMessage.classList.add("show-notification");
                  notificationMessage.textContent = `"${item.name}" added to cart`;
                  setTimeout(() => {
                        notificationMessage.classList.remove("show-notification");
                  }, 2000);
            }
      }
};

export const deleteCartItems = (id) => {
      cartItems = cartItems.filter((element) => {
            return element.id !== id;
      });
      localStorage.setItem("CartItems", JSON.stringify(cartItems));
      showMiniCartItems();
      let currentCart = document.querySelector(`#product${id}`);
      productRemoved.style.display = "flex";
      productRemovedName.textContent = `"${currentCart.querySelector(".cart-product-name").textContent}" removed.`;
      currentCart.remove();
      allCartProductsPrice();
      calculateTotalPriceWithShipping();
      emptyCartDisplay();
      productRemoved.addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-xmark")) {
                  productRemoved.style.display = "none";
            }
      })
};


export const updateItemQuantity = (id, stocks) => {
      let currentCart = document.querySelector(`#product${id}`);
      let actualPrice = currentCart.querySelector(".product-price").textContent.replace("$", "");
      let input = currentCart.querySelector(".item-quantity");
      input.max = stocks;
      let quantity = Number(input.value);

      cartItems.forEach((item) => {
            if (item.id === id) {
                  if (quantity <= stocks) {
                        item.quantity = quantity;
                        item.price = `$${(Number(actualPrice) * quantity).toFixed(2)}`;
                        if (currentCart.querySelector(".single-item-subtotal")) {
                              let totalSingleItemPrice = currentCart.querySelector(".single-item-subtotal");
                              totalSingleItemPrice.textContent = `$${(Number(actualPrice) * quantity).toFixed(2)}`;
                        }
                  }
                  else {
                        item.quantity = stocks;
                        item.price = `$${(Number(actualPrice) * stocks).toFixed(2)}`;
                        if (currentCart.querySelector(".single-item-subtotal")) {
                              let totalSingleItemPrice = currentCart.querySelector(".single-item-subtotal");
                              totalSingleItemPrice.textContent = `$${(Number(actualPrice) * stocks).toFixed(2)}`;
                        }
                        input.value = stocks;
                        alert("Not enough stocks.");
                  }
                  return;
            }
      });
      localStorage.setItem("CartItems", JSON.stringify(cartItems));
};

export function showMiniCartItems() {
      try {
            miniCartItemsContainer.innerHTML = "";
            const localItemsArray = localItems();
            if (localItemsArray.length === 0) {
                  miniCartItemsContainer.style.display = "none";
                  viewAllCartProducts.style.display = "none";
                  emptyMiniCartDisplay.style.display = "flex";
                  return;
            }

            localItemsArray.forEach((localItem) => {
                  const miniProduct = allProducts.find(product => product.id == localItem.id);
                  if (miniProduct) {
                        const { id, name, price, image } = miniProduct;
                        let miniCartItemClone = document.importNode(miniCartItemTemplate.content, true);
                        miniCartItemClone.querySelector(".mini-cart-item").setAttribute("id", `product${id}`);
                        miniCartItemClone.querySelector(".mini-cart-product-name").textContent = name;
                        miniCartItemClone.querySelector(".mini-cart-product-price").textContent = `$${price}`;
                        miniCartItemClone.querySelector('.mini-cart-product-image').src = image;
                        miniCartItemClone.querySelector(".remove-from-cart-btn").addEventListener("click", (e) => {
                              try {
                                    let cartItem = cartItems.find((item) => item.id === parseInt(e.target.parentNode.parentNode.id.replace("product", "")));

                                    if (cartItem) {
                                          cartItems = cartItems.filter((item) => item.id !== cartItem.id);
                                          localStorage.setItem("CartItems", JSON.stringify(cartItems));
                                          showMiniCartItems();
                                          updateCounts();
                                          emptyCartDisplay();
                                    }
                              } catch (error) {
                                    console.error("Error removing item from cart:", error);
                              }
                        });
                        miniCartItemsContainer.appendChild(miniCartItemClone);
                  }
            });

      } catch (error) {
            console.error("Error in showMiniCartItems:", error);
      }
}



export function updateCounts() {
      if (cartCount) {
            cartCount.textContent = localStorageItems.length;
      }
      if (itemsCount && totalPriceOfProducts && subTotalPrice) {
            if (localStorageItems.length === 1) {
                  itemsCount.textContent = localStorageItems.length + " item";
            }
            else {
                  itemsCount.textContent = localStorageItems.length + " items";
            }
            totalPriceOfProducts.textContent = allCartProductsPrice();
            subTotalPrice.textContent = allCartProductsPrice();
      }
};


