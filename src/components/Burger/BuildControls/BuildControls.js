import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]

const BuildControls=(props)=>{

    return(
        <div className={classes.BuildControls}>
            <div><h1>Current Price:<strong>{props.valuation}</strong></h1></div>
            {controls.map((ctrl)=>{
                return <BuildControl addMoreingredients={()=>props.addIngredient(ctrl.type)} 
                                     removeIngredients= {()=>props.reduceIngredient(ctrl.type)} 
                                     key={ctrl.label} label={ctrl.label} 
                                     disabledButton={props.disabled[ctrl.type]}/>
            })}
        <button onClick={props.purchasing} disabled={props.purchasable} className={classes.OrderButton}>Checkout</button>
        </div>
    )
    

}

export default BuildControls;