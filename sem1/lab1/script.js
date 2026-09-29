let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

function resetOrderForm() {
    orderForm.reset();
    clearError(firstNameInput, firstNameError);
    clearError(lastNameInput, lastNameError);
    clearError(addressInput, addressError);
    clearError(phoneInput, phoneError);
}

function closeOrderModal() {
    closeModal(orderModal);
    resetOrderForm();
}

openCartBtn.addEventListener('click', () => {
    renderCart();
    openModal(cartModal);
});

closeCartBtn.addEventListener('click', () => closeModal(cartModal));
closeOrderBtn.addEventListener('click', closeOrderModal);
closeSuccessBtn.addEventListener('click', () => closeModal(successModal));

gotoOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    closeModal(cartModal);
    openModal(orderModal);
});

[cartModal, orderModal, successModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (modal === orderModal) {
                closeOrderModal();
            } else {
                closeModal(modal);
            }
        }
    });
});

function updateCartBadge() {
    let totalCount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCount += cart[i].quantity;
    }
    cartCountEl.textContent = totalCount;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function removeFromCart(id) {
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
}

function findCartItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            return cart[i];
        }
    }
    return null;
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-msg">здесь пока ничего нет 🛌</p>';
        cartTotalPrice.textContent = '0 ₽';
        gotoOrderBtn.disabled = true;
        return;
    }

    gotoOrderBtn.disabled = false;
    let totalSum = 0;
    cartItemsList.innerHTML = '';

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemTotal = item.price * item.quantity;
        totalSum += itemTotal;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML =
            '<div class="cart-item-info">' +
                '<div class="cart-item-title">' + item.title + '</div>' +
                '<div class="cart-item-price">' + item.price.toLocaleString('ru-RU') + ' ₽ × ' + item.quantity + '</div>' +
            '</div>' +
            '<div class="cart-item-actions">' +
                '<div class="qty-control">' +
                    '<button class="qty-btn" data-id="' + item.id + '" data-action="decrease">-</button>' +
                    '<span class="cart-item-qty">' + item.quantity + '</span>' +
                    '<button class="qty-btn" data-id="' + item.id + '" data-action="increase">+</button>' +
                '</div>' +
                '<button class="remove-btn" data-id="' + item.id + '" title="Удалить товар">&times;</button>' +
            '</div>';
        cartItemsList.appendChild(itemEl);

        const decreaseBtn = itemEl.querySelector('[data-action="decrease"]');
        const increaseBtn = itemEl.querySelector('[data-action="increase"]');
        const removeBtn = itemEl.querySelector('.remove-btn');

        decreaseBtn.addEventListener('click', function () {
            const cartItem = findCartItem(item.id);
            if (!cartItem) {
                return;
            }
            cartItem.quantity -= 1;
            if (cartItem.quantity <= 0) {
                removeFromCart(item.id);
            }
            saveCart();
            renderCart();
        });

        increaseBtn.addEventListener('click', function () {
            const cartItem = findCartItem(item.id);
            if (!cartItem) {
                return;
            }
            cartItem.quantity += 1;
            saveCart();
            renderCart();
        });

        removeBtn.addEventListener('click', function () {
            removeFromCart(item.id);
            saveCart();
            renderCart();
        });
    }

    cartTotalPrice.textContent = totalSum.toLocaleString('ru-RU') + ' ₽';
}

for (let i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].addEventListener('click', function (e) {
        const button = e.target;
        const card = button.closest('.product-card');
        const id = button.getAttribute('data-id');
        const title = card.querySelector('.product-title').textContent;
        const priceText = card.querySelector('.product-price').textContent;
        const price = parseInt(priceText.replace(/\s|₽/g, ''), 10);

        const existingItem = findCartItem(id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                title: title,
                price: price,
                quantity: 1
            });
        }

        saveCart();

        const originalText = button.textContent;
        button.textContent = 'добавлено 🤲🏼';
        button.style.backgroundColor = '#bd9386';

        setTimeout(function () {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 800);
    });
}

phoneInput.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '');

    if (digits.startsWith('7') || digits.startsWith('8')) {
        digits = digits.substring(1);
    }

    let formatted = '+7 ';
    if (digits.length > 0) {
        formatted += '(' + digits.substring(0, 3);
    }
    if (digits.length >= 4) {
        formatted += ') ' + digits.substring(3, 6);
    }
    if (digits.length >= 7) {
        formatted += '-' + digits.substring(6, 8);
    }
    if (digits.length >= 9) {
        formatted += '-' + digits.substring(8, 10);
    }

    e.target.value = digits.length === 0 ? '' : formatted;
    validatePhone();
});

function showError(input, errorEl, message) {
    input.classList.add('invalid');
    errorEl.textContent = message;
}

function clearError(input, errorEl) {
    input.classList.remove('invalid');
    errorEl.textContent = '';
}

function validateFirstName() {
    const val = firstNameInput.value.trim();
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,}$/;
    if (!val) {
        showError(firstNameInput, firstNameError, 'введите имя');
        return false;
    } else if (!nameRegex.test(val)) {
        showError(firstNameInput, firstNameError, 'имя должно содержать от 2 букв');
        return false;
    }
    clearError(firstNameInput, firstNameError);
    return true;
}

function validateLastName() {
    const val = lastNameInput.value.trim();
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,}$/;
    if (!val) {
        showError(lastNameInput, lastNameError, 'введите фамилию');
        return false;
    } else if (!nameRegex.test(val)) {
        showError(lastNameInput, lastNameError, 'фамилия должна содержать от 2 букв');
        return false;
    }
    clearError(lastNameInput, lastNameError);
    return true;
}

function validateAddress() {
    const val = addressInput.value.trim();
    if (!val) {
        showError(addressInput, addressError, 'укажите адрес доставки');
        return false;
    } else if (val.length < 5) {
        showError(addressInput, addressError, 'адрес слишком короткий (минимум 5 символов)');
        return false;
    }
    clearError(addressInput, addressError);
    return true;
}

function validatePhone() {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (!digits) {
        showError(phoneInput, phoneError, 'укажите номер телефона');
        return false;
    } else if (digits.length !== 11) {
        showError(phoneInput, phoneError, 'введите полный номер телефона (11 цифр)');
        return false;
    }
    clearError(phoneInput, phoneError);
    return true;
}

firstNameInput.addEventListener('input', validateFirstName);
lastNameInput.addEventListener('input', validateLastName);
addressInput.addEventListener('input', validateAddress);

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isAddressValid = validateAddress();
    const isPhoneValid = validatePhone();

    if (!isFirstNameValid || !isLastNameValid || !isAddressValid || !isPhoneValid) {
        return;
    }

    cart = [];
    saveCart();

    closeModal(orderModal);
    openModal(successModal);
    resetOrderForm();
});

updateCartBadge();