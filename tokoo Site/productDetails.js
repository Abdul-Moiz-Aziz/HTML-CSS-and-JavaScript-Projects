import { allProducts } from "./products";
import { calculateTotalPriceWithShipping, handleCartProducts, handleWishlistItems, localItems, updateCounts, updateItemQuantity, wishlistLocalItems } from "./utils";

export const getProductDetails = () => {
      const getproductId = new URLSearchParams(window.location.search);
      const productId = getproductId.get("i");
      let cartItems = localItems();
      let filterQuantity = cartItems.find((element) => {
            return element.id == productId;
      })

      if (productId) {
            const product = allProducts.find(prod => prod.id === Number(productId)); 
            
            if (product) {
                  const { id, stocks, name, price, description, image, category, subCategory } = product;
                  const template = document.getElementById("product-detail-template");
                  const clone = document.importNode(template.content, true);
                  const productDetailsElement = clone.querySelector(".main-product-details-parent");
                  productDetailsElement.setAttribute("id", `product${id}`);
                  clone.querySelector(".detail-product-name").textContent = name;
                  clone.querySelector(".detail-product-name").classList.add("product-name");
                  clone.querySelector(".main-show-image").src = image;
                  clone.querySelector(".product-price").textContent = `$${price}`;
                  clone.querySelector(".product-description-element").textContent = description;
                  clone.querySelector(".cart-btn").addEventListener("click", () => {
                        handleCartProducts(id, category, subCategory);
                        localItems();
                        updateCounts();
                        calculateTotalPriceWithShipping();
                  });
                  if (filterQuantity) {
                        clone.querySelector(".item-quantity").value = filterQuantity.quantity;
                  }
                  else {
                        clone.querySelector(".item-quantity").value = 1;
                  }
                  clone.querySelector(".item-quantity").addEventListener("change", () => {
                        updateItemQuantity(id, stocks);
                  });
                  clone.querySelector(".product-wishlist-heart").addEventListener("click", (e) => {
                        handleWishlistItems(e, id);
                  })
                  const productDetailsSection = document.querySelector(".product-details-section");
                  productDetailsSection.append(clone);


                  let wishlistItems = wishlistLocalItems();
                  const products = document.querySelector(".main-product-details-parent");
                  wishlistItems.forEach((wishlistItem) => {
                        if (products.id === `product${wishlistItem.id}`) {
                              let heartIcon = products.querySelector(".fa-heart");
                              if (heartIcon) {
                                    heartIcon.classList.add("fa-solid", "active-icon");
                                    heartIcon.classList.remove("fa-regular");
                              }
                        }
                  });
            }
      }
};
getProductDetails()
