import * as actionTypes from './actions'

const initialState={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0,
    },
    price:200
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
        default:
            return state;
    }
    
}

export default rootReducer;