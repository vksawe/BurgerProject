import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary'
import {Route} from 'react-router-dom'
import ContactData from '../ContactData/ContactData'
import {connect} from 'react-redux';
class Checkout extends Component{

// componentDidMount(){
//     const query=new URLSearchParams(this.props.location.search);
//     const ingredients={}; 
//     let price=0;
   
//     for(let param of query.entries()){
        
//         if(param[0]==='price'){
//             price=param[1];
            
//         }else{
//             ingredients[param[0]]=+param[1]
//         }
        
//     }
//     this.setState({ingredients:ingredients,totalPrice:price})


    onCheckoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    onCheckoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return(
            <div>
            <CheckoutSummary 
            onCheckoutCancelled={this.onCheckoutCancelledHandler}
            onCheckoutContinue={this.onCheckoutContinueHandler}
            ingredients={this.props.ings}/>
            <Route path={this.props.match.path+'/contact-data'} 
            component={ContactData}/>
            </div>
        )
    }


}

const mapStatetoProps=state=>{
    return{
        ings:state.ingredients
    }
}


export default connect(mapStatetoProps)( Checkout);