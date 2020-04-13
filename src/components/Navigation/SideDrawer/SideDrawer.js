import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Auxillary from '../../../hoc/Auxillary'
import Backdrop from '../../UI/Backdrop/Backdrop'
const sidedrawer=(props)=>{

        let attachedClasses=[classes.SideDrawer,classes.Close]
        if(props.open){
            attachedClasses=[classes.SideDrawer,classes.Open]
        }
    return(
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed}/>
        
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                <Logo />
                </div>
                <nav><NavigationItems/></nav>
            </div>
            </Auxillary>    
    )

}

export default sidedrawer 