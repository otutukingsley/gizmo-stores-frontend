import * as actionTypes from "../constants/userConstants"
import { GET_MY_ORDERS_RESET } from "../constants/orderConstants"
import http from '../config/http'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST,
    })

    const response = await http.post(
      "/api/users/login",
      {
        email,
        password,
      },
    )

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: response.data,
    })

    localStorage.setItem("userInfo", JSON.stringify(response.data))
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_REGISTER_REQUEST,
    })

    const response = await http.post(
      "/api/users",
      {
        name,
        email,
        password,
      }
    )

    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
    })

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: response.data,
    })

    localStorage.setItem("userInfo", JSON.stringify(response.data))
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_DETAILS_REQUEST,
    })

    const response = await http.get(`/api/users/${id}`)

    dispatch({
      type: actionTypes.USER_DETAILS_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_UPDATE_REQUEST,
    })

    const response = await http.put(`/api/users/profile`, user)

    dispatch({
      type: actionTypes.USER_UPDATE_SUCCESS,
      payload: response.data,
    })

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: response.data,
    })

    localStorage.setItem("userInfo", JSON.stringify(response.data))

  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminUsersList = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USERS_LIST_REQUEST,
    })

    const response = await http.get(`/api/users`)

    dispatch({
      type: actionTypes.USERS_LIST_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.USERS_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_DELETE_REQUEST,
    })

    const response = await http.delete(`/api/users/${id}`)

    dispatch({
      type: actionTypes.USER_DELETE_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editUser = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_EDIT_REQUEST,
    })

    const response = await http.put(`/api/users/${id}`, formData)

    dispatch({
      type: actionTypes.USER_EDIT_SUCCESS,
      payload: response.data.message,
    })
    dispatch({
      type: actionTypes.USER_DETAILS_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.USER_EDIT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({
    type: actionTypes.USER_LOGIN_OUT,
  })
  dispatch({
    type: actionTypes.USER_DETAILS_RESET,
  })
  dispatch({
    type: GET_MY_ORDERS_RESET,
  })
  dispatch({
    type: actionTypes.USERS_LIST_RESET,
  })
}

export const clearMessages = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_MSG,
  })
}

export const resetProfile = () => (dispatch) => {
  dispatch({
    type: actionTypes.USER_UPDATE_RESET,
  })
}
