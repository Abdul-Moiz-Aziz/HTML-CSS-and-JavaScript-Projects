import { allProducts } from "./products";
import { handleCartProducts, handleWishlistItems, localItems, wishlistLocalItems } from "./utils";

let subCategoryTemplate = document.getElementById("sub-category-template");
const showingCategoryName = document.querySelector(".showing-category-name");
const mainProductTemplate = document.getElementById("main-product-template");
const subCategories = document.querySelector(".sub-categories");
const categorySectionImage = document.querySelector(".category-section-image");
let specificProductNumbers = document.querySelector(".specific-product-numbers");
let sortingProductsElements = document.querySelector('.sorting-products-element');
let faList = document.querySelector(".fa-list");
let gridList = document.querySelector(".grid-list");
let showCategoryName = document.querySelector(".show-name-category");
let sortingIcons = document.querySelector(".sorting-icons");
let subCatName = document.querySelectorAll(".sub-cat-name");
let getCategoryName = new URLSearchParams(window.location.search);
let categoryName = getCategoryName.get("c")?.replace("_", " & ").replace(/-/g, " ");
let subCategoryName = getCategoryName.get("sub-c")?.replace("_", " & ").replace(/-/g, " ");
let categoryIdentifier = document.querySelectorAll(".search-category");

let allCategoriesButton = document.querySelector(".all-categories");

export let getCategories = () => {

      let checkCategoryName = () => {
            if (allCategoriesButton) {
                  allCategoriesButton.style.display = "none";
            }
            let filterCategory = Array.from(categoryIdentifier).find((element) => element.textContent === categoryName);

            filterCategory.parentElement.nextElementSibling.style.height = "auto";
      }

      let displayProducts = (filteredProducts) => {
            if (filteredProducts.length > 0) {
                  filteredProducts.forEach((product) => {
                        const { name, id, price, category, subCategory, image } = product;
                        let productClone = document.importNode(mainProductTemplate.content, true);
                        productClone.querySelector(".main-product-elem").setAttribute("id", `product${id}`);
                        productClone.querySelector(".main-product-elem").setAttribute("category", `${category}`);
                        productClone.querySelector(".main-product-elem").setAttribute("sub-category", `${subCategory}`);
                        productClone.querySelector("a").setAttribute("href", `product.html?i=${id}&name=${name}`);
                        productClone.querySelector(".product-name").textContent = name;
                        productClone.querySelector(".product-image").src = image;
                        productClone.querySelector(".product-price").textContent = `$${price}`;
                        productClone.querySelector(".cart-btn").addEventListener("click", (event) => {
                              handleCartProducts(event, id, category, subCategory);
                              localItems();
                              updateCounts();
                        });
                        productClone.querySelector(".wishlist-heart").addEventListener("click", (e) => {
                              handleWishlistItems(e, id);
                        })
                        subCategories.appendChild(productClone);
                  });
                  specificProductNumbers.textContent = filteredProducts.length;
            }
      }

      if (!categoryName) {
            if (sortingProductsElements) {
                  sortingProductsElements.style.display = "none";
                  showingCategoryName.innerHTML = `<a href="index.html">Home</a> > <span style="color: var(--gray-color)">All Categories</span>`;
                  showCategoryName.textContent = "All Categories";
                  subCategories.style.gridTemplateColumns = "repeat(3, 1fr)";
            }

            let displayedSubCategories = new Set();

            allProducts.forEach((allCategories) => {
                  const { image, category } = allCategories;

                  if (!displayedSubCategories.has(category)) {
                        let categoryClone = document.importNode(subCategoryTemplate.content, true);
                        categoryClone.querySelector(".sub-category-name").textContent = category;
                        categoryClone.querySelector(".sub-category-image").src = image;
                        categoryClone.querySelector(".specific-sub-category-link").setAttribute("href",
                              `category.html?c=${category.replace(" & ", "_").replace(/\s+/g, "-")}`
                        );
                        subCategories.appendChild(categoryClone);
                        displayedSubCategories.add(category);
                  }
            });
      }

      else if (categoryName && !subCategoryName) {
            categoryIdentifier.forEach((element) => {
                  if (element.textContent === categoryName) {
                        element.style.color = "var(--brand-color)";
                        if (element.nextElementSibling) {
                              element.nextElementSibling.style.color = "var(--brand-color)";
                        }
                  }
            })
            let filteredCategories = allProducts.filter(product => product.category === categoryName && product.subCategory);

            if (filteredCategories.length > 0) {
                  sortingProductsElements.style.display = "none";
                  showingCategoryName.innerHTML = `<a href="index.html">Home</a> > <span style="color: var(--gray-color)">${categoryName}</span>`;
                  showCategoryName.textContent = categoryName + " Categories";
                  let displayedSubCategories = new Set();

                  filteredCategories.forEach((category) => {
                        const { image, subCategory } = category;

                        if (!displayedSubCategories.has(subCategory)) {
                              let categoryClone = document.importNode(subCategoryTemplate.content, true);
                              categoryClone.querySelector(".sub-category-name").textContent = subCategory;
                              categoryClone.querySelector(".sub-category-image").src = image;
                              categoryClone.querySelector(".specific-sub-category-link").setAttribute("href",
                                    `category.html?c=${categoryName.replace(" & ", "_").replace(/\s+/g, "-")}&sub-c=${subCategory.replace(" & ", "_").replace(/\s+/g, "-")}`
                              );
                              subCategories.appendChild(categoryClone);
                              displayedSubCategories.add(subCategory);
                        }
                  });
            }
            else {
                  showingCategoryName.innerHTML = `<a href="index.html">Home</a> > <span style="color: var(--gray-color)">${categoryName}</span>`;
                  showCategoryName.textContent = categoryName;
                  let filteredProducts = allProducts.filter(product => product.category === categoryName);
                  displayProducts(filteredProducts);
            }
      }
      else if (categoryName && subCategoryName) {
            if (subCategories) {
                  subCategories.classList.add("sub-categories-products");
            }
            categorySectionImage.style.display = "none";
            subCatName.forEach((subCat) => {
                  if (subCat.textContent === subCategoryName) {
                        subCat.style.color = "var(--brand-color)";
                  }
            })
            showingCategoryName.innerHTML = `<a href="index.html">Home</a> > <a href="category.html?c=${categoryName.replace(" & ", "_").replace(/\s+/g, "-")}">${categoryName}</a>   >   <span style="color: var(--gray-color)">${subCategoryName}</span>`;
            showCategoryName.textContent = subCategoryName;
            let filteredProducts = allProducts.filter(product => product.category === categoryName && product.subCategory === subCategoryName);
            displayProducts(filteredProducts);
      }
      gridList.classList.add("active-icon");
      sortingIcons.addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-list")) {
                  faList.classList.add("active-icon");
                  gridList.classList.remove("active-icon");
                  subCategories.classList.remove("sub-categories-products");
                  subCategories.classList.add("sub-categories-2");
                  document.querySelectorAll(".main-product-elem").forEach((element) => {
                        element.classList.add("main-product-elem-2");
                  });
                  document.querySelectorAll(".product-info").forEach((element) => {
                        element.classList.add("product-info-2");
                  });
                  document.querySelectorAll(".product-name").forEach((element) => {
                        element.classList.add("product-name-2");
                        element.classList.remove("grid-product-name");
                  });
                  document.querySelectorAll(".product-price").forEach((element) => {
                        element.classList.add("product-price-2");
                  });
                  document.querySelectorAll(".cart-options").forEach((element) => {
                        element.classList.add("cart-options-2");
                  });
            }
            else if (e.target.classList.contains("grid-list")) {
                  faList.classList.remove("active-icon");
                  gridList.classList.add("active-icon");
                  subCategories.classList.remove("sub-categories-2");
                  subCategories.classList.add("sub-categories-products");
                  document.querySelectorAll(".main-product-elem").forEach((element) => {
                        element.classList.remove("main-product-elem-2");
                  });
                  document.querySelectorAll(".product-info").forEach((element) => {
                        element.classList.remove("product-info-2");
                  });
                  document.querySelectorAll(".product-name").forEach((element) => {
                        element.classList.add("grid-product-name");
                        element.classList.remove("product-name-2");
                  });
                  document.querySelectorAll(".product-price").forEach((element) => {
                        element.classList.remove("product-price-2");
                  });
                  document.querySelectorAll(".cart-options").forEach((element) => {
                        element.classList.remove("cart-options-2");
                  });
            }
      });
      if (document.querySelectorAll(".main-product-elem")) {
            let wishlistItems = wishlistLocalItems();
            let products = document.querySelectorAll(".main-product-elem");
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
      }
      checkCategoryName();
};
