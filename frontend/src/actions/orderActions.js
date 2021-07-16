import axios from 'axios'
import {logout} from './../actions/userActions'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ORDER_CREATE_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/orders`, order, config)
  
      dispatch({
        type: 'ORDER_CREATE_SUCCESS',
        payload: data,
      })
      dispatch({
        type: 'CART_CLEAR_ITEMS',
        payload: data,
      })
      localStorage.removeItem('cartItems')
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        if (message === 'Invalid token. Please log in again!' || message === 'Your token has expired! Please log in again.' || message==='jwt expired') {
          dispatch(logout())
        }
      dispatch({
        type: 'ORDER_CREATE_FAIL',
        payload: message,
      })
    }
  }

  export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ORDER_DETAILS_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/${id}`, config)
  
      dispatch({
        type: 'ORDER_DETAILS_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Invalid token. Please log in again!' || message === 'Your token has expired! Please log in again.' || message==='jwt expired') {
        dispatch(logout())
      }
       dispatch({
        type: 'ORDER_DETAILS_FAIL',
        payload: message,
      })
    }
  }
