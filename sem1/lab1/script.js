const cartModal = document.getElementById('cart-modal');
const orderModal = document.getElementById('order-modal');
const successModal = document.getElementById('success-modal');

const openCartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const closeOrderBtn = document.getElementById('close-order-btn');
const closeSuccessBtn = document.getElementById('close-success-btn');

const gotoOrderBtn = document.getElementById('goto-order-btn');
const orderForm = document.getElementById('order-form');

const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCountEl = document.getElementById('cart-count');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone');

const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const addressError = document.getElementById('address-error');
const phoneError = document.getElementById('phone-error');
