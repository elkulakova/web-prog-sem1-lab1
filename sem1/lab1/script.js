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

function openModal(modal) {
    modal.classList.add('is-open');
}

function closeModal(modal) {
    modal.classList.remove('is-open');
}

openCartBtn.addEventListener('click', () => {
    renderCart();
    openModal(cartModal);
});

closeCartBtn.addEventListener('click', () => closeModal(cartModal));
closeOrderBtn.addEventListener('click', () => closeModal(orderModal));
closeSuccessBtn.addEventListener('click', () => closeModal(successModal));

gotoOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    closeModal(cartModal);
    openModal(orderModal);
});

[cartModal, orderModal, successModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});
