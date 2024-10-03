import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

import {
  createCategoryReducer,
  categoriesReducer,
  categoryReducer,
} from './reducers/categoryReducer';

import {
  createProductReducer,
  productsReducer,
  productReducer,
  productDetailsReducer,
} from './reducers/productReducer';

import {
  ordersReducer,
  orderDetailsReducer,
  orderReducer,
} from './reducers/orderReducer';

import {
  userReducer,
  allUsersReducer,
  userDetailsReducer,
  deleteUserReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  product: productReducer,
  newProduct: createProductReducer,
  orders: ordersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  categories: categoriesReducer,
  newCategory: createCategoryReducer,
  category: categoryReducer,
  user: userReducer,
  users: allUsersReducer,
  userDetails: userDetailsReducer,
  deleteUser: deleteUserReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
