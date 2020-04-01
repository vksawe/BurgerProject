import React,{Component} from 'react'
import Burger from '../../components/Burger/Burger'
import Auxillary from "../../hoc/Auxillary"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:1,
            bacon:1,
            cheese:2,
            meat:1      }
    }

    

    render(){
        const addMoreIngredient=(type)=>{

           let currentIngredientvalue=this.state.ingredients[type];
           let newIngredientValue=currentIngredientvalue+1;
           let newObject={...this.state.ingredients}
            newObject[type]=newIngredientValue;
           this.setState({ingredients:newObject});

        }
        const   removeIngredient=(type)=>{

            let currentIngredientvalue=this.state.ingredients[type];
            let newIngredientValue=currentIngredientvalue-1;
            let newBurgerObject={...this.state.ingredients}
            newBurgerObject[type]=newIngredientValue;
            this.setState({ingredients:newBurgerObject});
 
         }
        return(
            <Auxillary>
               <Burger ingredients={this.state.ingredients}/>
               <BuildControls addIngredient={addMoreIngredient} reduceIngredient={removeIngredient} />
            </Auxillary>
        )
    }
}
export default BurgerBuilder;