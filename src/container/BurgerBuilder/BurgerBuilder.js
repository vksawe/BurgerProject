import React,{Component} from 'react'
import {connect} from 'react-redux'
import Burger from '../../components/Burger/Burger'
import Auxillary from "../../hoc/Auxillary"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import ComputeOrderSummary from './computeOrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../order-instance'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'
class BurgerBuilder extends Component {
    state={
            
            
            purchaseable:false,
            purchasing:false,
            error:false,
            // loading:false,
            // error:false
    }


    componentDidMount(){
    //     console.log(this.props)
    //     axios.get("https://burger-project-f4a00.firebaseio.com/ingredients.json").then((response)=>{
    //         this.setState({ingredients:response.data})
    //     }).catch((error)=>{
    //         this.setState({error:true})
    //     })
        this.props.onInitIngredients();
        console.log(this.props)
        
     }
  

    render(){
        
        

    //     }
    
    const updatePurchaseState=()=>{
        let ingredientsObject=this.props.ings
        let sum=Object.keys(ingredientsObject).map((igrKey)=>{
             return ingredientsObject[igrKey]
        }).reduce((prevValue,currValue)=>{
            return prevValue+currValue;
        },0)

    return sum>0
     }

        const disabledbutton={...this.props.ings}
        for(let key in disabledbutton){
            disabledbutton[key]=disabledbutton[key]<=0
        }

        // const addMoreIngredient=(type)=>{
            
        //    let currentIngredientvalue=this.state.ingredients[type];
        //    let newIngredientValue=currentIngredientvalue+1;
        //    let newObject={...this.state}
        //     newObject.ingredients[type]=newIngredientValue;
        //     let currentPrice=this.props.price;
        //     newObject.totalPrice=currentPrice+INREDIENTS_PRICE[type];
        //    this.setState(newObject);
           
        //     isPurchasable();

        // }

        const purchaseCancelHandler=()=>{
            this.setState({purchasing:false})
        }

        const purchaseContinueHandler=()=>{
          
            this.props.onInitPurchase();
                
            this.props.history.push('/checkout')
                   
    
            }


        //This method passes Ingredients to Contact data Via query params
        // const purchaseContinueHandler=()=>{
          
        //     const queryParams=[];
        //     for(let i in this.props.ingredients){
        //         queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        //     }
        //     queryParams.push('price='+this.props.price)
        //     const queryString=queryParams.join('&')
        //     this.props.history.push({
        //         pathname:'/checkout',
        //         search:'?'+queryString})

        // }

        // const   removeIngredient=(type)=>{

        //     let currentIngredientvalue=this.state.ingredients[type];
        //     let newIngredientValue=0;
        //     if(currentIngredientvalue!==0){
        //      newIngredientValue=currentIngredientvalue-1;
            
        //     }
            
        //     let newBurgerObject={...this.state}
        //     newBurgerObject.ingredients[type]=newIngredientValue;
        //     let currentPrice=this.props.price;
        //     let newPrice=currentPrice-INREDIENTS_PRICE[type];
        //     if(newPrice<200){
        //         newBurgerObject.totalPrice=200;
        //         this.setState(newBurgerObject);
        //         return
        //     }
        //     newBurgerObject.totalPrice=newPrice
        //    this.setState(newBurgerObject);
        //    isPurchasable();
        //  }

         
        let orderSummary=null;
       
        const purchaseHandler=()=>{
            this.setState({purchasing:true})
        }

        let burger=this.props.error?<p>Ingredients Cant be Loaded</p>:<Spinner/>
        if(this.props.ings){

         burger=(<Auxillary>
             
            <Burger ingredients={this.props.ings} />
            <BuildControls purchasing={purchaseHandler} purchasable={!updatePurchaseState()} valuation={this.props.price} disabled={disabledbutton} addIngredient={this.props.onIngredientAdded} reduceIngredient={this.props.onIngredientRemoved} />
            </Auxillary>
         )
          orderSummary=<ComputeOrderSummary sum={this.props.price} purchaseContinue={purchaseContinueHandler}  purchaseCancel={purchaseCancelHandler} ingredients={this.props.ings} />
          if(this.state.loading){
            orderSummary=<Spinner/>            
         }
        }

        return(
            <Auxillary>
                <Modal modalClosed={purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                    </Modal>
                    {burger}
               </Auxillary>
        )
    }
}

 const mapStateToProps=state=>{
    return{
        error:state.burgerBuilder.error,
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price
    }
 }

 const mapDispatchToProps=dispatch=>{
     return{
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngridients()),
        onIngredientAdded:(ingredientName)=>dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved:(ingredientName)=>dispatch(burgerBuilderActions.removeIngredient(ingredientName))
        ,onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler( BurgerBuilder,axios));