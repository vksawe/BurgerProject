import React,{Component} from 'react'
import Burger from '../../components/Burger/Burger'
import Auxillary from "../../hoc/Auxillary"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import ComputeOrderSummary from './computeOrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../order-instance'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INREDIENTS_PRICE={
            salad:50,
            cheese:30,
            meat:50,
            bacon:35
}

class BurgerBuilder extends Component {
    state={
        ingredients:null,
            totalPrice:200,
            purchaseable:false,
            purchasing:false,
            loading:false,
            error:false
    }


    componentDidMount(){
        console.log(this.props)
        axios.get("https://burger-project-f4a00.firebaseio.com/ingredients.json").then((response)=>{
            this.setState({ingredients:response.data})
        }).catch((error)=>{
            this.setState({error:true})
        })
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
          
            const queryParams=[];
            for(let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
            }
            queryParams.push('price='+this.state.totalPrice)
            const queryString=queryParams.join('&')
            this.props.history.push({
                pathname:'/checkout',
                search:'?'+queryString})

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

         
        let orderSummary=null;
       
        const purchaseHandler=()=>{
            this.setState({purchasing:true})
        }

        let burger=this.state.error?<p>Ingredients Cant be Loaded</p>:<Spinner/>
        
        if(this.state.ingredients){
         burger=(<Auxillary>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls purchasing={purchaseHandler} purchasable={!this.state.purchaseable} valuation={this.state.totalPrice} disabled={disabledbutton} addIngredient={addMoreIngredient} reduceIngredient={removeIngredient} />
            </Auxillary>
         )
          orderSummary=<ComputeOrderSummary sum={this.state.totalPrice} purchaseContinue={purchaseContinueHandler}  purchaseCancel={purchaseCancelHandler} ingredients={this.state.ingredients} />
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

export default withErrorHandler( BurgerBuilder,axios);