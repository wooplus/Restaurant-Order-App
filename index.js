import { menuArray } from "./data.js";

const consentForm = document.querySelector("#consent-form");

function render() {
  let foodItemsEl = document.querySelector("#foodItems");
  let foodsEl = getFoodArray();
  foodItemsEl.innerHTML = foodsEl;
  document.querySelector(".eachOrderList").innerHTML = getFoodOrderList();
  document.querySelector(".orderlist-total").innerHTML = getTotalFoodPrice();
}

function getFoodArray() {
  let foodEl = "";
  menuArray.forEach((menu) => {
    foodEl += `
            <div class="food-item">
          <div class="food-desc">
            <p class="food-logo">${menu.emoji}</p>
            <div class="food-about">
              <h1 class="food-name">${menu.name}</h1>
              <p class="ingredients">${menu.ingredients}</p>
              <p class="price">$${menu.price}</p>
            </div>
          </div>

          <div class="quantity-icons"><i class="fa-solid fa-circle-plus" data-increase=${menu.id}></i>
          <span class="quantity">${menu.quantity}</span>
          <i class="fa-solid fa-circle-minus" data-decrease=${menu.id} ></i>
          </div>
        </div>
        `;
  });
  return foodEl;
}

consentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newFormData = new FormData(consentForm);
  let fullName = newFormData.get("fullName");
  document.querySelector(".order-form-modal").style.display = "none";
  document.querySelector(
    ".orderlist"
  ).innerHTML = `<h1 class='order-answer'>Thanks ${fullName} ,your order is on its way 🚚 👨🏻‍🍳 🍲.</h1>`;
});

document.addEventListener("click", (e) => {
  if (e.target.dataset) {
    if (e.target.dataset.increase) {
      increaseHandleEvent(e.target.dataset.increase);
    }
    if (e.target.dataset.decrease) {
      decreaseHandleEvent(e.target.dataset.decrease);
    }
  }
  if (e.target.id === "order-btn") {
    showModalHandleEvent();
  }
});

render();

function increaseHandleEvent(foodId) {
  document.querySelector(".orderlist").style.display = "block";
  let targetObj = menuArray.filter((menu) => menu.id == foodId)[0];
  console.log(targetObj);
  targetObj.quantity += 1;
  render();
}

function decreaseHandleEvent(foodId) {
  let targetObj = menuArray.filter((menu) => menu.id == foodId)[0];
  if (targetObj.quantity !== 0) {
    targetObj.quantity--;
    render();
  }
}

function getFoodOrderList() {
  let orderlistDetailEl = "";
  menuArray.forEach((menu) => {
    if (menu.quantity > 0) {
      orderlistDetailEl += `
                 <div class="orderlist-detail">
   <h1 class="orderlist-name">${menu.name}(x${menu.quantity})</h1>
   <h2 class="price">$${menu.quantity * menu.price}</h2>
 </div>`;
    }
  });
  return orderlistDetailEl;
}

function getTotalFoodPrice() {
  let totalPrice = 0;
  menuArray.forEach((menu) => {
    totalPrice += menu.quantity * menu.price;
  });

  let totalFoodEl = `
                    <h1 class="orderlist-name">Total Price</h1>
        <h2 class="price">$${totalPrice}</h2>
            `;
  return totalFoodEl;
}

function showModalHandleEvent() {
  document.querySelector(".order-form-modal").style.display = "block";
}
