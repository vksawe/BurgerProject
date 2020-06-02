import * as actionTypes from './actionTypes'
import axios from 'axios'


export const auth_start=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const auth_success=(data)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        payload:data
    }
}

export const auth_fail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}


export const auth=(email,password,isSignup )=>{
    const Body={
        email:email,
        password:password,
        returnSecureToken:true
    }
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB08-VJ2Wz0GhLV490ldWQF2JQzUa0eo14';
    if(!isSignup){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB08-VJ2Wz0GhLV490ldWQF2JQzUa0eo14'
    }
    return dispatch=>{
        dispatch(auth_start())
        axios.post(url,Body).then((response)=>{
            console.log(response.data)
            dispatch(auth_success(response.data))
        }).catch((error)=>{
            
            dispatch(auth_fail(error.response.data.error.message))
        })
    }
}