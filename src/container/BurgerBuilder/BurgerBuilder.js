import React,{Component} from 'react'
import Burger from '../../components/Burger/Burger'
import Auxillary from "../../hoc/Auxillary"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import ComputeOrderSummary from './computeOrderSummary'
const INREDIENTS_PRICE={
            salad:50,
            cheese:30,
            meat:50,
            bacon:35
}

class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0     },
            totalPrice:200,
            purchaseable:false,
            purchasing:false
    }

  

    render(){

        const purchaseHandler=()=>{
            this.setState({purchasing:true})
        }

        const isPurchasable=()=>{
           let ingredientsObject={...this.state.ingredients}
           let sum=Object.keys(ingredientsObject).map((igrKey)=>{
                return ingredientsObject[igrKey]
           }).reduce((prevValue,currValue)=>{
               return prevValue+currValue;
           },0)

       this.setState({purchaseable:sum>0})

        }
    

        const disabledbutton={...this.state.ingredients}
        for(let key in disabledbutton){
            disabledbutton[key]=disabledbutton[key]<=0
        }

        const addMoreIngredient=(type)=>{
            
           let currentIngredientvalue=this.state.ingredients[type];
           let newIngredientValue=currentIngredientvalue+1;
           let newObject={...this.state}
            newObject.ingredients[type]=newIngredientValue;
            let currentPrice=this.state.totalPrice;
            newObject.totalPrice=currentPrice+INREDIENTS_PRICE[type];
           this.setState(newObject);
           
            isPurchasable();

        }

        const purchaseCancelHandler=()=>{
            this.setState({purchasing:false})
        }

        const purchaseContinueHandler=()=>{
            alert('You Continue')
        }

        const   removeIngredient=(type)=>{

            let currentIngredientvalue=this.state.ingredients[type];
            let newIngredientValue=0;
            if(currentIngredientvalue!==0){
             newIngredientValue=currentIngredientvalue-1;
            
            }
            
            let newBurgerObject={...this.state}
            newBurgerObject.ingredients[type]=newIngredientValue;
            let currentPrice=this.state.totalPrice;
            let newPrice=currentPrice-INREDIENTS_PRICE[type];
            if(newPrice<200){
                newBurgerObject.totalPrice=200;
                this.setState(newBurgerObject);
                return
            }
            newBurgerObject.totalPrice=newPrice
           this.setState(newBurgerObject);
           isPurchasable();
         }
        return(
            <Auxillary>
                <Modal modalClosed={purchaseCancelHandler} show={this.state.purchasing}>
                    <ComputeOrderSummary sum={this.state.totalPrice} purchaseContinue={purchaseContinueHandler}  purchaseCancel={purchaseCancelHandler} ingredients={this.state.ingredients} />
                </Modal>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls purchasing={purchaseHandler} purchasable={!this.state.purchaseable} valuation={this.state.totalPrice} disabled={disabledbutton} addIngredient={addMoreIngredient} reduceIngredient={removeIngredient} />
            </Auxillary>
        )
    }
}

export default BurgerBuilder;