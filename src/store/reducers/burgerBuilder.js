import * as actionTypes from '../actions/actionTypes'
const initialState={
    ingredients:null,
    price:200,
    error:false
}

const INREDIENTS_PRICE={
    salad:50,
    cheese:30,
    meat:50,
    bacon:35
}


const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1 
                },
                price:state.price+INREDIENTS_PRICE[action.ingredientName]

            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1 
                },
                price:state.price-INREDIENTS_PRICE[action.ingredientName]

            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        default:
            return state;
    }
    
}

export default rootReducer;