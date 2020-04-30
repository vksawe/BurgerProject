import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from'./checkoutSummary.module.css'
const checkoutSummary=(props)=>{

    return(
        <div className={classes.checkoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', height:'400px', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.onCheckoutContinue} btnType="Success">Continue</Button>
            <Button clicked={props.onCheckoutCancelled} btnType="Danger">Cancel</Button>

        </div>
    )

}

export default checkoutSummary;