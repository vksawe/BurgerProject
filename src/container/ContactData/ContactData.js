import React, {Component} from 'react'
import axios from '../../order-instance'
import Button from '../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    OrderHandler=(event)=>{
        event.preventDefault();
          this.setState({loading:true})
            const data={
                ingredients:this.props.ingredients,
                price:this.props.totalPrice,
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
                this.setState({loading:false})
                this.props.history.push('/')
                console.log(response)
            }).catch((error)=>{
                this.setState({loading:false})
                console.log(error)
            });
    }
    render(){
        let form=<form>
        <input className={classes.Input} type='text' name='name' placeholder='your nmae'/>
        <input className={classes.Input} type='text' name='email' placeholder='email'/>
        <input className={classes.Input} type='text' name='street' placeholder='street'/>
        <input className={classes.Input} type='text' name='postal' placeholder='Postal code'/>
        <Button btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
    </form>
        if(this.state.loading){
            form=<Spinner/>

        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;