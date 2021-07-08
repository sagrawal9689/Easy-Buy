import Axios from "axios"

export const listProducts =() => async(dispatch)=>{
    try
    {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' })

        const {data} = await Axios.get('/api/products');

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

        const {data} = await Axios.get(`/api/products/${id}`);

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