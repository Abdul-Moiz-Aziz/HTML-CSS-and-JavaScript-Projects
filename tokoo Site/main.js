import { allProducts, allCategories } from "./products";
import "./style.css";
import "./responsive.css";
import { deleteCartItems, handleCartProducts, localItems, updateItemQuantity, emptyCartDisplay, updateCounts, calculateTotalPriceWithShipping, applySavedShippingOption, handleWishlistItems, deleteWishlistItems, wishlistLocalItems, wishCounts, emptyWishlistDisplay, showMiniCartItems } from "./utils";
import { teamMembers } from "./team";
import { getCategories } from "./categories";

const mainProductTemplate = document.getElementById("main-product-template");
const mainLargeRatingTemplate = document.getElementById("main-large-product-template");
const mainCartProductSection = document.querySelector(".main-cart-products-sec");
const cartProductTemplate = document.getElementById("items-shows-main");
const wishlistItemTemplate = document.getElementById("wishlist-item-template");
const mainWishlistProductsSec = document.querySelector(".main-wishlist-products-sec");
const leftArrivals = document.querySelector(".left-arrival");
const rightArrivals = document.querySelector(".right-arrival");
const mainProductSection = document.querySelector(".main-large-rating-product");
const containerShows = document.querySelector(".categories-shows");
const categoryList = document.querySelector(".category-list");
const dullBody = document.getElementById("dull-body");
const footerCategoriesColumn = document.querySelector(".footer-categories-column");
const homeCategoriesTemplate = document.getElementById("home-categories-template");
const showingAllCategories = document.querySelector(".showing-all-categories");
const salesContainer = document.querySelector(".sales-container");
const ratingProductsParent = document.querySelector(".rating-products-parent");
const daysLeft = document.querySelector(".days-left");
const hoursLeft = document.querySelector(".hours-left");
const minutesLeft = document.querySelector(".minutes-left");
const secondsLeft = document.querySelector(".seconds-left");
const endTimeText = document.querySelector(".end-timing-text");
const header = document.querySelector("header");
const ourTeamInfoContainer = document.querySelector(".our-team-information-container");
const teamTemplate = document.getElementById("teamTemplate");

const updateTimer = () => {
  let currentDate = new Date();
  let month = 8;
  let day = 10;
  let endTime = new Date(`2024-${month}-${day} 18:00`);
  let difference = (endTime - currentDate) / 1000;
  if (difference < 0) {
    if (endTimeText) {
      endTimeText.textContent = "End of Sale!";
      return;
    }
  }
  if (daysLeft && hoursLeft && minutesLeft && secondsLeft) {
    daysLeft.textContent = Math.floor(difference / 3600 / 24);
    hoursLeft.textContent = Math.floor((difference / 3600) % 24);
    minutesLeft.textContent = Math.floor((difference / 60) % 60);
    secondsLeft.textContent = Math.floor(difference % 60);
  }
}
setInterval(updateTimer, 1000)

document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("scroll", function () {
    const headerHeight = header.offsetHeight;
    const scrollTop = window.scrollY;
    if (document.querySelector(".mini-cart-items-main-container")) {
      const miniCartItemsMainContainer = document.querySelector(".mini-cart-items-main-container");
      if (scrollTop > headerHeight - 50) {
        miniCartItemsMainContainer.style.height = "100vh";
        miniCartItemsMainContainer.style.top = "0";
      }
      else {
        miniCartItemsMainContainer.style.height = "";
        miniCartItemsMainContainer.style.top = "103px";
      }
    }
  });

  let productSet = new Set();

  const renderProducts = (appendSection, productTemplate, childrenQuantity) => {
    if (productSet.size === 0) {
      allProducts.forEach((element) => {
        productSet.add(element)
      })
    }
    productSet.forEach((product) => {
      if (appendSection.children.length >= childrenQuantity) {
        return;
      }
      if (appendSection.querySelector(`#product${product.id}`)) {
        return;
      }
      const { name, id, price, category, subCategory, image } = product;
      if (productTemplate) {
        let productClone = document.importNode(productTemplate.content, true);
        productClone.querySelector(".products").setAttribute("id", `product${id}`);
        productClone.querySelector(".products").setAttribute("category", `${category}`);
        productClone.querySelector(".products").setAttribute("sub-category", `${subCategory}`);
        productClone.querySelector("a").setAttribute("href", `product.html?i=${id}&n=${name}`);
        productClone.querySelector(".name").textContent = name;
        productClone.querySelector(".image").src = image;
        productClone.querySelector(".price").textContent = `$${price}`;
        productClone.querySelector(".cart-btn").addEventListener("click", (event) => {
          handleCartProducts(id, category, subCategory);
          localItems();
          updateCounts();
          calculateTotalPriceWithShipping();
        });
        productClone.querySelector(".wishlist-heart").addEventListener("click", (e) => {
          handleWishlistItems(e, id);
        })
        appendSection.append(productClone);
        productSet.delete(product);
      }
    })
  }

  let memberSet = new Set();

  const renderMembers = (teamContainer, teamTemplate) => {
    memberSet.clear();

    teamMembers.forEach((member) => {
      memberSet.add(JSON.stringify(member));
    })
    memberSet.forEach((memberString) => {
      const member = JSON.parse(memberString);
      const { id, name, designation, image } = member;
      const teamTemplateClone = document.importNode(teamTemplate.content, true);
      teamTemplateClone.querySelector(".team-member-info").setAttribute("id", `member${id}`);
      teamTemplateClone.querySelector(".member-name").textContent = name;
      teamTemplateClone.querySelector(".member-designation").textContent = designation;
      teamTemplateClone.querySelector(".member-image").src = image;
      teamContainer.append(teamTemplateClone);
    })
  }

  if (leftArrivals) {
    renderProducts(leftArrivals, mainProductTemplate, 4);
  }

  if (rightArrivals) {
    renderProducts(rightArrivals, mainProductTemplate, 4)
  }

  if (mainProductSection) {
    renderProducts(mainProductSection, mainLargeRatingTemplate, 1);
  }

  if (salesContainer) {
    renderProducts(salesContainer, mainProductTemplate, 8);
  }
  if (ratingProductsParent) {
    renderProducts(ratingProductsParent, mainProductTemplate, 12);
  }


  if (ourTeamInfoContainer) {
    renderMembers(ourTeamInfoContainer, teamTemplate);
  }
  allCategories.forEach((category) => {
    let categoryListItem = document.createElement("li");
    categoryListItem.innerHTML = `
      <a href="category.html?c=${category.replace(" & ", "_").replace(/\s+/g, "-")}" class="category ">
        <div class="showingCategories">
        <span class="category-name search-category">${category}</span>
        </div>
        <ul class="sub-category-element"></ul>
      </a>
    `;
    categoryList.append(categoryListItem);
    const subCategoryElement = categoryListItem.querySelector(".sub-category-element");
    let hasSubCategories = false;
    allProducts.forEach((product) => {
      if (product.category === category && product.subCategory) {
        let subCategoryExists = Array.from(subCategoryElement.children).some((subCatItem) =>
          subCatItem.querySelector(".sub-cat-name").textContent === product.subCategory
        );

        if (!subCategoryExists) {
          hasSubCategories = true;
          let subCategoryItem = document.createElement("li");
          let encodedSubCategory = product.subCategory
            .replace(" & ", "_")
            .replace(/\s+/g, "-");

          subCategoryItem.innerHTML = `
        <a href="category.html?c=${category.replace(" & ", "_").replace(/\s+/g, "-")}&sub-c=${encodedSubCategory}">
          <span class="sub-cat-name">${product.subCategory}</span>
        </a>
      `;
          subCategoryElement.append(subCategoryItem);
        }
      }
    });
    if (footerCategoriesColumn) {
      let footerCategoryItem = document.createElement("a");
      footerCategoryItem.classList.add("footer-links");
      footerCategoryItem.href = `category.html?c=${category.replace(" & ", "_").replace(/\s+/g, "-")}`;
      footerCategoryItem.textContent = category;
      footerCategoriesColumn.appendChild(footerCategoryItem);
    }

  });

  if (showingAllCategories) {
    let displayedHomeCategories = new Set();

    allProducts.forEach((allCategories) => {
      if (showingAllCategories.children.length === 8) {
        return;
      }
      const { image, category } = allCategories;

      if (!displayedHomeCategories.has(category)) {
        let categoryClone = document.importNode(homeCategoriesTemplate.content, true);
        categoryClone.querySelector(".home-category-name").textContent = category;
        categoryClone.querySelector(".home-category-image").src = image;
        categoryClone.querySelector(".category-link").setAttribute("href",
          `category.html?c=${category.replace(" & ", "_").replace(/\s+/g, "-")}`
        );
        const filteredCategories = allProducts.filter(product => product.category === category && product.subCategory);
        const displayedSubCategories = new Set();

        filteredCategories.forEach(product => {
          displayedSubCategories.add(product.subCategory);
        });

        if (displayedSubCategories.size === 1) {
          categoryClone.querySelector(".home-sub-categories-amount").textContent = `${displayedSubCategories.size} Sub category`;
        }
        else {
          categoryClone.querySelector(".home-sub-categories-amount").textContent = `${displayedSubCategories.size} Sub categories`;
        }

        if (displayedSubCategories.size === 0) {
          categoryClone.querySelector(".home-sub-categories-amount").style.display = "none";
        }
        showingAllCategories.append(categoryClone);
        displayedHomeCategories.add(category);
      }
    });
  }
  const subCategory = document.querySelectorAll(".sub-category-element");
  subCategory.forEach((element) => {
    if (element.children.length !== 0) {
      let createDownIcon = document.createElement("span");
      createDownIcon.classList.add("subDownIcon");
      createDownIcon.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
      element.previousElementSibling.append(createDownIcon);
    }
  })

  for (let i = 0; i < 6; i++) {
    let createAnchorElement = document.createElement("a");
    createAnchorElement.classList.add("categories");
    createAnchorElement.textContent = allCategories[i];
    createAnchorElement.href = `category.html?c=${allCategories[i].replace(" & ", "_").replace(/\s+/g, "-")}`;
    containerShows.append(createAnchorElement);
  }


  calculateTotalPriceWithShipping();
  applySavedShippingOption();
  updateCounts();
  showMiniCartItems()

  const getFormInfo = new URLSearchParams(window.location.search);
  const name = getFormInfo.get("name");
  const email = getFormInfo.get("email");
  const phone = getFormInfo.get("phone");
  const message = getFormInfo.get("message");

  if (document.querySelector(".main-thanks-container")) {
    let fillingName = document.querySelector("#filling-name");
    let fillingEmail = document.querySelector("#filling-email");
    let fillingPhone = document.querySelector("#filling-phone");
    let fillingMessage = document.querySelector("#filling-message");

    let getFormInfo = new URLSearchParams(window.location.search);

    let nameValue = decodeURIComponent(getFormInfo.get("name"));
    let emailValue = decodeURIComponent(getFormInfo.get("email"));
    let phoneValue = decodeURIComponent(getFormInfo.get("phone"));
    let messageValue = decodeURIComponent(getFormInfo.get("message"));

    if (nameValue) {
      fillingName.textContent = nameValue;
    }
    if (emailValue) {
      fillingEmail.textContent = emailValue;
    }
    if (phoneValue) {
      fillingPhone.textContent = phoneValue;
    }
    fillingMessage.textContent = messageValue || "Not provided";

    const returnUrl = `contact.html?name=${encodeURIComponent(nameValue)}&email=${encodeURIComponent(emailValue)}&phone=${encodeURIComponent(phoneValue)}&message=${encodeURIComponent(messageValue)}`;
    document.querySelector(".return-btn").href = returnUrl;
  }

  if (name || email || phone || message) {
    if (name) document.getElementById("name").value = decodeURIComponent(name);
    if (email) document.getElementById("email").value = decodeURIComponent(email);
    if (phone) document.getElementById("phone").value = decodeURIComponent(phone);
    if (message) document.getElementById("message").value = decodeURIComponent(message);
  }

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = encodeURIComponent(document.getElementById("name").value);
      const email = encodeURIComponent(document.getElementById("email").value);
      const phone = encodeURIComponent(document.getElementById("phone").value);
      const message = encodeURIComponent(document.getElementById("message").value);

      const url = `thanks.html?name=${name}&email=${email}&phone=${phone}&message=${message}`;

      window.location.href = url;
    });
  }

  let wishlistItems = wishlistLocalItems();

  const products = document.querySelectorAll(".products");

  products.forEach((product) => {
    wishlistItems.forEach((wishlistItem) => {
      if (product.id === `product${wishlistItem.id}`) {
        let heartIcon = product.querySelector(".fa-heart");
        if (heartIcon) {
          heartIcon.classList.add("fa-solid", "active-icon");
          heartIcon.classList.remove("fa-regular");
        }
      }
    });
  });

  allProducts.forEach((wishlistItem) => {
    wishlistItems.some((curProduct) => {
      if (wishlistItem.id == curProduct.id) {
        if (wishlistItemTemplate) {
          const { name, image, price, id, category, subCategory } = wishlistItem;
          const finalWishlistProductClone = document.importNode(wishlistItemTemplate.content, true);
          finalWishlistProductClone.querySelector(".mainProductWishlist").setAttribute("id", `product${id}`);
          finalWishlistProductClone.querySelector(".wishlist-product-image").src = image;
          finalWishlistProductClone.querySelector(".wishlist-product-name").textContent = name;
          finalWishlistProductClone.querySelector(".wishlist-product-price").textContent = `$${price}`;
          finalWishlistProductClone.querySelector(".remove-product-from-wish").addEventListener("click", () => {
            dullBody.style.display = "block";
            document.body.style.cursor = "progress";
            setTimeout(() => {
              deleteWishlistItems(id);
              dullBody.style.display = "none";
              document.body.style.cursor = "default";
            }, 2000);
          });
          finalWishlistProductClone.querySelector(".wishlist-cart-btn").addEventListener("click", () => {
            handleCartProducts(id, category, subCategory);
            localItems();
            calculateTotalPriceWithShipping();
          });

          mainWishlistProductsSec.append(finalWishlistProductClone);

          document.querySelectorAll(".products").forEach((product) => {
            if (product.id == `product${id}`) {
              let heartIcon = product.querySelector(".fa-heart");
              heartIcon.classList.add("fa-solid");
              heartIcon.classList.add("active-icon");
              heartIcon.classList.remove("fa-regular");
            }
          });
        }
      }
    });
  });
  getCategories();
  wishCounts();
  emptyWishlistDisplay();
  updateTimer();
});

let localStorageItems = localItems();

allProducts.forEach((element) => {
  localStorageItems.some((curProduct) => {
    if (element.id == curProduct.id) {
      const { name, image, price, id, stocks } = element;
      if (cartProductTemplate) {
        const finalProductClone = document.importNode(cartProductTemplate.content, true);
        finalProductClone.querySelector(".cartProductsTemplate").setAttribute("id", `product${id}`);
        finalProductClone.querySelector(".cart-product-image").src = image;
        finalProductClone.querySelector(".cart-product-name").textContent = name;
        finalProductClone.querySelector(".cart-product-price").textContent = `$${price}`;
        finalProductClone.querySelector(".remove-product").addEventListener("click", (event) => {
          dullBody.style.display = "block";
          document.body.style.cursor = "progress";
          setTimeout(() => {
            deleteCartItems(id);
            dullBody.style.display = "none";
            document.body.style.cursor = "default";
            updateCounts();
            emptyCartDisplay();
            calculateTotalPriceWithShipping();
          }, 2000);
        });
        finalProductClone.querySelector(".item-quantity").value = curProduct.quantity;
        finalProductClone.querySelector(".item-quantity").addEventListener("change", () => {
          updateItemQuantity(id, stocks);
          updateCounts();
          calculateTotalPriceWithShipping();
        });
        finalProductClone.querySelector(".single-item-subtotal").textContent = curProduct.price;
        mainCartProductSection.append(finalProductClone);
      }
    }
  });
});
emptyCartDisplay();