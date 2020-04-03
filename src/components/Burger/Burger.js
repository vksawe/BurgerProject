import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
const burger=(props)=>{
    console.log(props.ingredients)
    let transformedIngredients=Object.keys(props.ingredients).map(Igrkey=>{
        return [...Array(props.ingredients[Igrkey])].map((_,i)=>{
            return <BurgerIngredients key={Igrkey+i} type={Igrkey} />
        })
    }).reduce((prevValue,currValue)=>{
        return prevValue.concat(currValue);
    },[]);
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please Start Adding Ingredients!s</p>
    }



return(

    <div className={classes.Burger}> 
    
    <BurgerIngredients type="bread-top"/>
    {transformedIngredients}
    <BurgerIngredients type="bread-bottom"/>
    </div>
    )
}

export default burger;