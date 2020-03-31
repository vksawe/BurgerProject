import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
const burger=(props)=>{
    const transformedArray=Object.keys(props.ingredients).map(Igrkey=>{
        return [...Array(props.ingredients[Igrkey])].map((_,i)=>{
            return <BurgerIngredients key={Igrkey+i} type={Igrkey} />
        })
    })
return(

    <div className={classes.Burger}> 
    <BurgerIngredients type="bread-top"/>
    {transformedArray}
    <BurgerIngredients type="bread-bottom"/>
    </div>
    )
}

export default burger;