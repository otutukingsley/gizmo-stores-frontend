import http from '../config/http'
import {
  ORDER_CREATE_ERROR,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_RETRIEVE_SUCCESS,
  ORDER_RETRIEVE_ERROR,
  ORDER_RETRIEVE_REQUEST,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_ERROR,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_ERROR,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_ERROR,
  DELIVER_ORDER_RESET,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const response = await http.post(`/api/orders`, order );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_RETRIEVE_REQUEST,
    });

    const response = await http.get(`/api/orders/${id}`);

    dispatch({
      type: ORDER_RETRIEVE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_RETRIEVE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const response = await http.put(
      `/api/orders/${id}/pay`,
      paymentResult
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder =
  (id, formData = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DELIVER_ORDER_REQUEST,
      });

      const response = await http.put(
        `/api/orders/${id}/deliver`,
        formData
      );

      console.log(response);

      dispatch({
        type: DELIVER_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELIVER_ORDER_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MY_ORDERS_REQUEST,
    });

    const response = await http.get(`/api/orders/myorders`);

    dispatch({
      type: GET_MY_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_ORDERS_REQUEST,
    });

    const { data } = await http.get(`/api/orders`);

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetDelivered = () => (dispatch) => {
  dispatch({
    type: DELIVER_ORDER_RESET,
  });
};
