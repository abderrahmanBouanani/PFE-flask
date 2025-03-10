document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("#cart-items"); // Corps du tableau du panier
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Récupérer le panier du stockage local

    // Fonction pour afficher le panier
    function renderCart() {
      cartTableBody.innerHTML = ""; // Effacer le corps du tableau
      cart.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td class="product-thumbnail"><img src="${
                  product.image
                }" alt="${
          product.name
        }" class="img-fluid" style="mix-blend-mode: multiply;"></td>
                <td class="product-name"><h2 class="h5 text-black">${
                  product.name
                }</h2></td>
                <td>${product.price} DH</td>
                <td>
                    <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
                        <button class="btn btn-outline-black decrease" type="button">&minus;</button>
                        <input type="text" class="form-control text-center quantity-amount" value="${
                          product.quantity
                        }" readonly>
                        <button class="btn btn-outline-black increase" type="button">&plus;</button>
                    </div>
                </td>
                <td class="total-price">${(
                  product.price * product.quantity
                ).toFixed(2)} DH</td>
                <td><a href="#" class="btn btn-black btn-sm remove-item">X</a></td>
            `;
        cartTableBody.appendChild(row);
      });
      calculateTotal(); // Calculer le total après le rendu
      attachEventListeners(); // Réattacher les écouteurs d'événements
    }

    // Fonction pour calculer le total
    function calculateTotal() {
      let subtotal = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      document.getElementById("subtotal").innerText =
        subtotal.toFixed(2) + " DH";
      document.getElementById("total").innerText =
        subtotal.toFixed(2) + " DH"; // Mettre à jour le total affiché
    }

    // Fonction pour attacher les écouteurs aux boutons après chaque rendu
    function attachEventListeners() {
      document
        .querySelectorAll(".increase, .decrease")
        .forEach((button) => {
          button.addEventListener("click", function () {
            const input = this.closest(".quantity-container").querySelector(
              ".quantity-amount"
            );
            let value = parseInt(input.value);
            if (this.classList.contains("increase")) {
              value++;
            } else if (value > 1) {
              value--;
            }
            input.value = value;

            // Mettre à jour la quantité dans le panier
            const row = this.closest("tr");
            const name = row.querySelector(".product-name h2").innerText;
            const product = cart.find((item) => item.name === name);
            if (product) {
              product.quantity = value;
              localStorage.setItem("cart", JSON.stringify(cart)); // Mettre à jour le stockage local
              row.querySelector(".total-price").innerText =
                (product.price * product.quantity).toFixed(2) + " DH";
              calculateTotal(); // Recalculer le total
            }
          });
        });

      // Supprimer un produit
      cartTableBody.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", function () {
          const row = this.closest("tr");
          const name = row.querySelector(".product-name h2").innerText;
          cart = cart.filter((item) => item.name !== name);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart(); // Réafficher le panier
        });
      });
    }

    renderCart(); // Afficher le panier initial

    // Gestion du code promo
    document.getElementById("applyCoupon").addEventListener("click", () => {
      const couponCode = document
        .getElementById("coupon")
        .value.toUpperCase();
      const subtotal = parseFloat(
        document.getElementById("subtotal").textContent
      );

      // Liste des codes promo
      const coupons = {
        PROMO10: 0.1, // Réduction de 10%
        PROMO20: 0.2, // Réduction de 20%
      };

      if (coupons[couponCode]) {
        const discount = subtotal * coupons[couponCode];
        document.getElementById("discount").textContent =
          discount.toFixed(2) + " DH";
        document.getElementById("total").textContent =
          (subtotal - discount).toFixed(2) + " DH";
        alert("Code promo appliqué avec succès !");
      } else {
        alert("Code promo invalide");
      }
    });
  });