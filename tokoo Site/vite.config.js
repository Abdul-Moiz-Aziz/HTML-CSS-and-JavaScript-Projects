import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
      build: {
            rollupOptions: {
                  input: {
                        main: resolve(__dirname, "index.html"),
                        about: resolve(__dirname, "about.html"),
                        contact: resolve(__dirname, "contact.html"),
                        product: resolve(__dirname, "product.html"),
                        cart: resolve(__dirname, "cart.html"),
                        category: resolve(__dirname, "category.html"),
                        thanks: resolve(__dirname, "thanks.html"),
                        wishlist: resolve(__dirname, "wishlist.html"),
                  },
            },
      },
});