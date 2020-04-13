import React from 'react'
import Auxillary from '../../hoc/Auxillary'
import Button from '../../components/UI/Button/Button'
const computeOrderSummary=(props)=>{
    const ingredientsKeyArray=Object.keys(props.ingredients)
    let Ordersummary=ingredientsKeyArray.map((igrKey)=>{
    return (<li key={igrKey} > 
    <span style={{textTransform:'capitalize'}}>{igrKey} </span> : {props.ingredients[igrKey]}
        </li>)
    })
   
    return(
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following Ingredients:</p>
            <ul>
                {Ordersummary}
            </ul>
    <strong><p>Sum Total: {props.sum}</p></strong>
            <p>Continue to check out?</p>
            <Button btnType="Success" clicked={props.purchaseContinue} >CONTINUE</Button>
            <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
        </Auxillary>
    ) 

}
export default computeOrderSummary