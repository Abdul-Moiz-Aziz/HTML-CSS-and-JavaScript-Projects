let display_images = document.querySelector(".display-images");
let slider_image_area = document.querySelector(".slider-image-section");
let slide_image = document.querySelector(".slide-image");
let opac_images = document.querySelectorAll(".opac-image");
let prev_btn = document.querySelector(".prev");
let next_btn = document.querySelector(".next");
let show_images_bottom = document.querySelector(".show-images-bottom");
let cross_btn = document.querySelector(".cross");
let slide_count = 0;



display_images.addEventListener("click", (e) => {
      if (e.target.classList.contains("clickable-images")) {
            slide_image.src = e.target.src;
            slider_image_area.style.display = "block";
            slide_count = Array.from(display_images.children).indexOf(e.target);
      };
      opac_images.forEach((image) => {
            if (image.src === e.target.src) {
                  image.classList.add("image-opacity");
            }
            else {
                  image.classList.remove("image-opacity");
            }
      });
})


cross_btn.addEventListener("click", () => {
      slider_image_area.style.display = "none";
})

show_images_bottom.addEventListener("click", (e) => {
      if (e.target.classList.contains("click-image-2")) {
            slide_image.src = e.target.src;
            slide_count = Array.from(show_images_bottom.children).indexOf(e.target);
      };
      opac_images.forEach((image) => {
            if (image.src === e.target.src) {
                  image.classList.add("image-opacity");
            }
            else {
                  image.classList.remove("image-opacity");
            }
      });
})


let update_slide_image= () => {
      if (slide_count < 0) {
            slide_count = 5;
      }
      if (slide_count > 5) {
            slide_count = 0;
      }
      slide_image.src = `${slide_count + 1}.png`;
      opac_images.forEach((image, ind) => {
            if (ind === slide_count) {
                  image.classList.add("image-opacity");
            }
            else {
                  image.classList.remove("image-opacity");
            }
      });
}

prev_btn.addEventListener("click", () => {
      slide_count--;
      update_slide_image();
})

next_btn.addEventListener("click", () => {
      slide_count++;
      update_slide_image();
})
