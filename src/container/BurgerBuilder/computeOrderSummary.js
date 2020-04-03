import React from 'react'
import Auxillary from '../../hoc/Auxillary'
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
            <p>Continue to check out?</p>
        </Auxillary>
    ) 

}
export default computeOrderSummary