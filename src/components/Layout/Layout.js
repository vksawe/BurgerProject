import React, { Component } from 'react'
import Auxillary from '../../hoc/Auxillary'
import Toolbar from '../../components/Navigation/ToolBar/ToolBar'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component{
    state={
        showSideDrawer:true
    }
    showSideDrawerHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Auxillary>
                 
                <Toolbar show={this.sideDrawerToggleHandler}/>
               
                <div><SideDrawer open={this.state.showSideDrawer} closed={this.showSideDrawerHandler}/></div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>)
    }
        }
export default Layout;