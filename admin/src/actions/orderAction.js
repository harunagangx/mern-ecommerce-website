import {
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  ADMIN_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  CLEAR_ERRORS,
} from '../constants/orderConstants';

import axios from 'axios';

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDER_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/orders`);

    dispatch({
      type: ADMIN_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, orderStatus) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      orderStatus,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
