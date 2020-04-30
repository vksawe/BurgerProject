import React from 'react'
import classes from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom';
const navigationitem=(props)=>{

return(
    <ul className={classes.NavigationItem}>
    <NavLink 
    activeClassName={classes.active} exact={props.exact}
    to={props.link} >{props.children}
    </NavLink>
    </ul>
)

}
export default navigationitem;