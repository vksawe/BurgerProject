import * as actionTypes from '../actions/actionTypes'

let initialState={
    token:null,
    userId:null,
    error:null,
    loading:false
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return {...state,loading:true,error:null};
        case actionTypes.AUTH_SUCCESS:
            
            return {...state, userId:action.payload.localId, error:null,
                token:action.payload.idToken,loading:false};
        case actionTypes.AUTH_FAIL:
            console.log(action.error)
            return {...state,loading:false,error:action.error};
        default:
            return state;    }
}

export default authReducer;