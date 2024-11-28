// reducers/cartReducer.js
import {
    ADD_TO_CART,
    UPDATE_ITEM_DETAILS,
    REMOVE_FROM_CART,
    INIT_CART,
} from '../redux/actions.js';

const initialState = {
    cart: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_CART:
            return {
                ...state,
                cart: action.payload,
            };

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        case UPDATE_ITEM_DETAILS:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            numbers: action.payload.numbers,
                            cover: action.payload.cover,
                        }
                        : item
                ),
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };

        default:
            return state;
    }
};

export default cartReducer;
