import * as actionTypes from './actionTypes'
import axios from '../../order-instance'

export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}


export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngridients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED,


    }
}

export const initIngridients=()=>{
    return dispatch=>{
          axios.get("https://burger-project-f4a00.firebaseio.com/ingredients.json").then((response)=>{
            dispatch(setIngridients(response.data));
        }).catch((error)=>{
            dispatch(fetchIngredientsFailed)
        })
    }
}