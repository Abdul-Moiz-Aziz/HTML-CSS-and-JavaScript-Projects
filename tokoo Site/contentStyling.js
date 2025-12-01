
let displayAllCategories = document.querySelector(".all-categories-element");
let allCategories = document.querySelector(".all-categories");
let faChevronRight = document.querySelector(".fa-chevron-right");
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");
let otherPagesElement = document.querySelector(".other-pages-element");
let showOtherPagesBtn = document.querySelector(".show-other-pages");
const shoppingCart = document.querySelector(".shopping_cart");
const miniCartItemsMainContainer = document.querySelector(".mini-cart-items-main-container")
const filterCategorBtn = document.querySelector(".filter-category-btn");
const faTimes = document.querySelector(".fa-times");
let productSliderImages = document.querySelectorAll(".image-slide");
let mainSliderImage = document.querySelector(".main-show-image");
let prevButton = document.querySelector(".prev-button");
let nextButton = document.querySelector(".next-button");
let slideCount = 0;
document.addEventListener("DOMContentLoaded", () => {

      const toggleSearchInput = () => {
            if (searchBtn.textContent === "search") {
                  searchInput.classList.add("active-search-input");
                  searchBtn.textContent = "close";
            }
            else {
                  searchInput.classList.remove("active-search-input");
                  searchBtn.textContent = "search";
            }
      };

      if (filterCategorBtn) {
            filterCategorBtn.addEventListener("click", () => {

                  displayAllCategories.classList.add("active-showing-sliding-categories");
                  if (otherPagesElement.classList.contains("active-other-pages")) {
                        otherPagesElement.classList.remove("active-other-pages")
                        showOtherPagesBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
                  };
                  if (miniCartItemsMainContainer.classList.contains("active-mini-cart-container")) {
                        miniCartItemsMainContainer.classList.remove("active-mini-cart-container");
                  }
            })
      }
      if (faTimes) {
            faTimes.addEventListener("click", () => {
                  displayAllCategories.classList.remove("active-showing-sliding-categories");
            })
      }
      const handleAllCategoriesClick = () => {
            if (displayAllCategories.classList.contains("showing-sliding-categories")) {
                  displayAllCategories.classList.remove("showing-sliding-categories")
            }
            console.log(displayAllCategories);

            displayAllCategories.classList.toggle("show-categories");
            faChevronRight.style.transform = displayAllCategories.classList.contains("show-categories") ? "rotate(180deg)" : "rotate(0deg)";
            if (otherPagesElement.classList.contains("active-other-pages")) {
                  otherPagesElement.classList.remove("active-other-pages")
                  showOtherPagesBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
            };
            if (miniCartItemsMainContainer.classList.contains("active-mini-cart-container")) {
                  miniCartItemsMainContainer.classList.remove("active-mini-cart-container");
            }
      };

      if (allCategories) {
            allCategories.addEventListener("click", () => handleAllCategoriesClick());
      }

      showOtherPagesBtn.addEventListener("click", () => {
            otherPagesElement.classList.toggle("active-other-pages");
            if (otherPagesElement.classList.contains("active-other-pages")) {
                  showOtherPagesBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
                  if (displayAllCategories.classList.contains("show-categories")) {
                        displayAllCategories.classList.remove("show-categories");
                        faChevronRight.style.transform = "rotate(0deg)"
                  }
                  if (miniCartItemsMainContainer.classList.contains("active-mini-cart-container")) {
                        miniCartItemsMainContainer.classList.remove("active-mini-cart-container");
                  }
                  if (displayAllCategories.classList.contains("active-showing-sliding-categories")) {
                        displayAllCategories.classList.remove("active-showing-sliding-categories")
                  }
            }
            else {
                  showOtherPagesBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
            }
      })
      if (shoppingCart) {
            shoppingCart.addEventListener("mouseover", () => {
                  miniCartItemsMainContainer.classList.add("active-mini-cart-container");
                  if (displayAllCategories && displayAllCategories.classList.contains("show-categories")) {
                        displayAllCategories.classList.remove("show-categories");
                        faChevronRight.style.transform = "rotate(0deg)";
                  }
                  if (otherPagesElement && otherPagesElement.classList.contains("active-other-pages")) {
                        otherPagesElement.classList.remove("active-other-pages");
                        showOtherPagesBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
                  }
                  if (displayAllCategories.classList.contains("active-showing-sliding-categories")) {
                        displayAllCategories.classList.remove("active-showing-sliding-categories")
                  }
                  setTimeout(() => {
                        miniCartItemsMainContainer.classList.remove("active-mini-cart-container");
                  }, 3000);
            });
      }

      const displayCategories = () => {
            if (displayAllCategories) {
                  if (window.innerWidth <= 992) {
                        if (!displayAllCategories.classList.contains("showing-sliding-categories")) {
                              displayAllCategories.classList.add("showing-sliding-categories");
                        }
                  }
                  else {
                        if (displayAllCategories.classList.contains("showing-sliding-categories")) {
                              displayAllCategories.classList.remove("showing-sliding-categories");
                        }
                  }
            }
      };


      const setupEventListeners = () => {

            if (window.innerWidth <= 640) {
                  searchBtn.addEventListener("click", toggleSearchInput);
            }
            else {
                  searchBtn.removeEventListener("click", toggleSearchInput);
            }
      };

      const displayingShortProducts = () => {
            let newArrivals = document.querySelectorAll(".new-arrivals");

            newArrivals.forEach((arrival) => {
                  arrival.querySelectorAll(".products").forEach((product, index) => {
                        if (window.innerWidth >= 645 && window.innerWidth <= 992 && index > 1) {
                              product.style.display = "none";
                        }
                        else {
                              product.style.display = "block";
                        }
                  })
            })
      }

      if (document.querySelectorAll('.slide')) {

            let slides = document.querySelectorAll('.slide');

            let counterNumber = 0;

            let slide = () => {
                  counterNumber++;
                  if (counterNumber === 8) {
                        counterNumber = 0;
                        slides.forEach((slide) => {
                              slide.classList.add("sliding-slide")
                        });
                  }
                  if (counterNumber < 8) {
                        slides.forEach((slide) => {
                              slide.style.transform = `translateX(-${counterNumber * 100}%)`;
                        });
                        slides[counterNumber - 1].classList.remove("sliding-slide")
                  }
            }
            setInterval(slide, 3000);
      }
      if (document.querySelectorAll(".image-slide")) {

            let updateSlideCount = (slideCount) => {
                  productSliderImages.forEach((element) => {
                        element.classList.remove("active-opac");
                  });
                  productSliderImages[slideCount].classList.add("active-opac");
                  mainSliderImage.src = productSliderImages[slideCount].src;
            }
            prevButton.addEventListener("click", () => {
                  slideCount--;
                  if (slideCount < 0) {
                        slideCount = productSliderImages.length - 1;
                  }
                  updateSlideCount(slideCount);
            })

            nextButton.addEventListener("click", () => {
                  slideCount++;
                  if (slideCount >= productSliderImages.length) {
                        slideCount = 0;
                  }
                  updateSlideCount(slideCount);
            })

            productSliderImages.forEach((element, ind, arr) => {
                  element.setAttribute("data-index", ind);
                  arr[0].classList.add("active-opac");
                  element.addEventListener("click", (e) => {
                        productSliderImages.forEach((el) => {
                              el.classList.remove("active-opac");
                        });
                        e.target.classList.add("active-opac");
                        mainSliderImage.src = e.target.src;
                        slideCount = Number(e.target.getAttribute("data-index"));
                  })
            });
      }

      setupEventListeners()
      displayCategories();
      displayingShortProducts();

      window.addEventListener("resize", () => {
            displayCategories()
            setupEventListeners();
            displayingShortProducts();
      });
})