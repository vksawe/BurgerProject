import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../ContactData/ContactData'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
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
        let summary=<Redirect to="/"/>
        console.log(this.props)
        if(this.props.ings){
            const purchasedRedirect=this.props.purchased?<Redirect to="/"/>:null;
            summary=(
                <div>
                    {purchasedRedirect}
                <CheckoutSummary 
            onCheckoutCancelled={this.onCheckoutCancelledHandler}
            onCheckoutContinue={this.onCheckoutContinueHandler}
            ingredients={this.props.ings}/>
            <Route path={this.props.match.path+'/contact-data'} 
            component={ContactData}/>
            </div>
            )
        }
        return summary;
           
        
    }


}

const mapStatetoProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onInitPurchase:()=>dispatch(actions.purchaseInit())
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)( Checkout);