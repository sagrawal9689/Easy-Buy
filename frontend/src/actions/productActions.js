import axios from "axios"
import {logout} from './../actions/userActions'

export const listProducts =() => async(dispatch)=>{
    try
    {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' })

        const {data} = await axios.get('/api/products');

        dispatch({ type:'PRODUCT_LIST_SUCCESS', payload: data.products })
    }
    catch(err)
    {
        dispatch({ type: 'PRODUCT_LIST_FAIL' , 
        payload: 
            err.response && err.response.data.message?err.response.data.message: err.message
    })
    }
}

export const listProductDetails =(id) => async(dispatch)=>{
    try
    {
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })

        const {data} = await axios.get(`/api/products/${id}`);

        dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data })
    }
    catch(err)
    {
        dispatch({ type: 'PRODUCT_DETAILS_FAIL' , 
        payload: 
            err.response && err.response.data.message?err.response.data.message: err.message
    })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    
    try {
      dispatch({
        type: 'PRODUCT_DELETE_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/products/${id}`, config)
  
      dispatch({
        type: 'PRODUCT_DELETE_SUCCESS',
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed' || message === 'jwt expired') {
        dispatch(logout())
      }
      dispatch({
        type: 'PRODUCT_DELETE_FAIL',
        payload: message,
      })
    }
  }

export const createProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'PRODUCT_CREATE_REQUEST',
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products`, productData , config)

    dispatch({
      type: 'PRODUCT_CREATE_SUCCESS',
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed' || message === 'jwt expired') {
      dispatch(logout())
    }
    dispatch({
      type: 'PRODUCT_CREATE_FAIL',
      payload: message,
    })
  }
}