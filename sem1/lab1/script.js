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
