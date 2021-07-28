import { createStore, combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReduer, productDetailsReducer, productDeleteReducer, productCreateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducers'

const reducer= combineReducers({
    productList: productListReduer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer ,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer 
})

const cartItemsFromStorage= localStorage.getItem('cartItems') ? (JSON.parse(localStorage.getItem('cartItems'))): []
const userInfoFromStorage= localStorage.getItem('userInfo')? (JSON.parse(localStorage.getItem('userInfo'))): null

const initialState= { cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: {}   
},
    userLogin:{
        userInfo: userInfoFromStorage
    }
}

const middleware= [thunk]

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store