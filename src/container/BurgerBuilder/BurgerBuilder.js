import React,{Component} from 'react'
import Burger from '../../components/Burger/Burger'
import Auxillary from "../../hoc/Auxillary"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import ComputeOrderSummary from './computeOrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../order-instance'
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
            purchasing:false,
            loading:false
    }

  

    render(){
        

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
            this.setState({loading:true})
            const data={
                ingredients:this.state.ingredients,
                price:this.state.totalPrice,
                customer:{
                    name:'Victor Sawe',
                    address:{
                        street:'Ngong rd',
                        zipcode:'1427',
                        county:'Nairobi'
                    },
                    email:'vskiprotich@gmail.com'
                },
                deliverymethod:'tuktuk'
            }
            axios.post('/orders.json',data).then((response)=>{
                this.setState({loading:false,purchasing:false})
                console.log(response)
            }).catch((error)=>{
                this.setState({loading:false,purchasing:false})
                console.log(error)
            });
            
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

         let orderSummary=<ComputeOrderSummary sum={this.state.totalPrice} purchaseContinue={purchaseContinueHandler}  purchaseCancel={purchaseCancelHandler} ingredients={this.state.ingredients} />
      

        if(this.state.loading){
           orderSummary=<Spinner/>            
        }
        const purchaseHandler=()=>{
            this.setState({purchasing:true})
        }

        return(
            <Auxillary>
                <Modal modalClosed={purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                    </Modal>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls purchasing={purchaseHandler} purchasable={!this.state.purchaseable} valuation={this.state.totalPrice} disabled={disabledbutton} addIngredient={addMoreIngredient} reduceIngredient={removeIngredient} />
            </Auxillary>
        )
    }
}

export default BurgerBuilder;