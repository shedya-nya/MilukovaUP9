const cart = [];
const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeButton = document.querySelector(".modal__close");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const cartCountElement = document.querySelector(".header__cart-count");
const span = document.querySelector(".gray")

// Open modal
cartButton.addEventListener("click", () => {
  cartModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// Close modal
closeButton.addEventListener("click", () => {
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Add to cart functionality
document.querySelectorAll(".product-card__add-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const name = this.dataset.name;
    const price = parseFloat(this.dataset.price);
    const image = this.dataset.image;

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name,
        price,
        image,
        quantity: 1,
      });
    }

    updateCart();
  });
});

// Update cart display
function updateCart() {
  // Update count
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = itemCount;

  // Update cart items
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotalElement.textContent = "$0.00";
    span.classList.add("hidden");
    return;
  }

  else if (cart.length > 0){
    span.classList.remove("hidden");
  }

  let total = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item__image">
      <div class="cart-item__name">${item.name}
      <div class="color"
      <p>Цвет:</p>
      <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12.5" cy="12" r="12" fill="#309F85" />
              </svg>
              </div>
      </div>
      <div class="cart-item__size">
      <p>Размер</p>
      <span>XS</span></div>
      <div class="cart-item__quantity">
        <p>Кол-во</p>
        <div class="buttons">
          <button class="cart-item__quantity-btn minus" data-name="${
          item.name
        }">-</button>
          <span>${item.quantity}</span>
          <button class="cart-item__quantity-btn plus" data-name="${
          item.name
        }">+</button>
        </div>
      </div>
      <div class="cart-item__price">$${item.price.toFixed(2)}</div>
      <button class="cart-item__remove" data-name="${item.name}">
        <i class="fa-solid fa-close"></i>
      </button>
    `;

    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Handle quantity changes and removal
cartItemsContainer.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const name = target.dataset.name;
  const item = cart.find((item) => item.name === name);

  if (target.classList.contains("minus")) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart.splice(cart.indexOf(item), 1);
    }
  } else if (target.classList.contains("plus")) {
    item.quantity++;
  } else if (target.classList.contains("cart-item__remove")) {
    cart.splice(cart.indexOf(item), 1);
  }

  updateCart();
});

