// actions/cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_ITEM_DETAILS = 'UPDATE_ITEM_DETAILS';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INIT_CART = 'INIT_CART';

// Дія для ініціалізації кошика з localStorage
export const initCart = () => ({
    type: INIT_CART,
    payload: JSON.parse(localStorage.getItem('cart')) || [],
});

// Дія для додавання товару в кошик
export const addToCart = (bookWithDetails) => ({
    type: ADD_TO_CART,
    payload: bookWithDetails,
});

// Дія для оновлення деталей товару (кількість, обкладинка)
export const updateItemDetails = (id, numbers, cover) => ({
    type: UPDATE_ITEM_DETAILS,
    payload: { id, numbers, cover },
});

// Дія для видалення товару з кошика
export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});
