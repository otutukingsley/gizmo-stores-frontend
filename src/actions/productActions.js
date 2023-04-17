import http from '../config/http'
import * as actionTypes from "../constants/productsConstants";

export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_LIST_REQUEST,
      });

      const { data } = await http.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: actionTypes.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_LIST_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const eachProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_REQUEST,
    });

    const response = await http.get(`/api/products/${id}`);

    dispatch({
      type: actionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_REQUEST,
    });

    const response = await http.delete(`/api/products/${id}`);

    dispatch({
      type: actionTypes.PRODUCT_DELETE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSingleProduct =
  (formData = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REQUEST,
      });

      const { data } = await http.post(`/api/products`, formData);

      dispatch({
        type: actionTypes.PRODUCT_CREATE_SUCCESS,
        payload: {
          product: data,
          message: "Product created successfully",
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const clearMessages = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_MSG,
  });
};

export const resetReview = () => (dispatch) => {
  dispatch({
    type: actionTypes.PRODUCT_REVIEW_RESET,
  });
};

export const updateSingleProduct =
  (id, formData = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_REQUEST,
      });

      const { data } = await http.put(`/api/products/${id}`, formData);

      dispatch({
        type: actionTypes.PRODUCT_UPDATE_SUCCESS,
        payload: {
          product: data,
          message: "Product updated successfully",
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const reviewSingleProduct =
  (id, formData = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_REVIEW_REQUEST,
      });

      const { data } = await http.post(
        `/api/products/${id}/review`,
        formData
      );

      dispatch({
        type: actionTypes.PRODUCT_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_REVIEW_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const topProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.TOP_PRODUCTS_REQUEST,
    });

    const {
      data: { products },
    } = await http.get(`/api/products/top`);

    dispatch({
      type: actionTypes.TOP_PRODUCTS_SUCCESS,
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TOP_PRODUCTS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
