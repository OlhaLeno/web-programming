// store.js
import { createStore, applyMiddleware } from 'redux';
import cartReducer from '../redux/reducers';
import {thunk} from 'redux-thunk';

const store = createStore(
    cartReducer,
    applyMiddleware(thunk)
);

export default store;
