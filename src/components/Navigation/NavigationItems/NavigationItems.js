import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

const navigationitems=(props)=>{

return(
    <div className={classes.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/"  >Checkout</NavigationItem>
    </div>
)

}
export default navigationitems;