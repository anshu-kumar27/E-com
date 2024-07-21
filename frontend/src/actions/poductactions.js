import axios from 'axios' 
import {
    All_PRODUCT_FAIL,
    All_PRODUCT_SUCCESS,
    All_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL
    } from '../constants/productconstants'

export const getProduct = () => async(dispatch)=>{
    try{
        dispatch({type:All_PRODUCT_REQUEST});
        const {data} = await axios.get('http://localhost:8085/api/v1/products')
        console.log(data)
        dispatch({
            type:All_PRODUCT_SUCCESS,
            payload:data,            
        })
    }catch(error){
        dispatch({
            type:All_PRODUCT_FAIL,
            payload:error.message,
        })
    }
}

export const getProductDetails = (id) => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`http://localhost:8085/api/v1/product/${id}`)
        console.log('this api for single product is working ',data);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,            
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.message,
        })
    }
}


//Clearing errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}