import React from 'react'
import classes from './NavigationItem.module.css'
const navigationitem=(props)=>{

return(
    <ul className={classes.NavigationItem}>
    <a  
    className={props.active?classes.active:null}
    href={props.link} >{props.children}</a>
    </ul>
)

}
export default navigationitem;