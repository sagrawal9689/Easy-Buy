import Axios from "axios"

export const login= (email,password) => async(dispatch)=>{

    try{
        dispatch({ type: 'USER_LOGIN_REQUEST' })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        const { data }= await Axios.post('/api/users/login',{ email, password },config)

        dispatch({ type: 'USER_LOGIN_SUCCESS' , payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(err)
    {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: 
            err.response && err.response.data.message?err.response.data.message: err.message
        })
    }
}

export const logout=()=> async(dispatch)=>{

    localStorage.removeItem('userInfo')
    dispatch({
        type: 'USER_LOGOUT'
    })

    dispatch({
      type: 'RESET_PAYMENT_METHOD'
    })

    dispatch({
      type: 'RESET_SHIPPING_ADDRESS'
    })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_REGISTER_REQUEST',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await Axios.post(
        '/api/users',
        { name, email, password },
        config
      )
  
      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      })
  
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_DETAILS_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await Axios.get(`/api/users/${id}`, config)
  
      dispatch({
        type: 'USER_DETAILS_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      if (message === 'Invalid token. Please log in again!' || message === 'Your token has expired! Please log in again.') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_DETAILS_FAIL',
        payload: message,
      })
    }
}



  