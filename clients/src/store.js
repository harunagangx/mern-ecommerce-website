import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

import {
  productsReducer,
  productDetailReducer,
} from './reducers/productReducer';

import { categoryReducer } from './reducers/categoryReducer';

import { userReducer, userProfileReducer } from './reducers/userReducer';

import { cartReducer } from './reducers/cartReducer';

import {
  createOrderReducer,
  myOrderReducer,
  orderDetailsReducer,
  deleteOrderReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailReducer,
  categories: categoryReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  cart: cartReducer,
  newOrder: createOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  deleteOrder: deleteOrderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
