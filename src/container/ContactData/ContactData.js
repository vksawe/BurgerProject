import React, {Component} from 'react'
import axios from '../../order-instance'
import Button from '../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/input/input'
class ContactData extends Component{
    state={
        contactForm:{
            
                    name:{elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your name'
                    },
                    value:''

                },
                    street:{elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:''

                },
                    zipcode:{elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code'
                    },
                    value:''

                },
                    county:{elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:''

                },
                    email:{elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your email'
                    },
                    value:''
                },
                    deliverymethod:{elementType:'select',
                    elementConfig:{
                        options:[{value:'fastest', displayValue:'Fastest'},
                                {value:'cheapest', displayValue:'Cheapest'}                                      ]
                    }
                }
        },
        loading:false
    }

    OrderHandler=(event)=>{
        event.preventDefault();
          this.setState({loading:true})
          const formData={}
          for(let inputIdentifier in this.state.contactForm){
              formData[inputIdentifier]=this.state.contactForm[inputIdentifier].value
          }
          
            const data={
                customer:formData,
                ingredients:this.props.ingredients,
                price:this.props.price
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

    inputChangedHandler=(event,inputIdentifier)=>{
       const updatedOrderForm={...this.state.contactForm}
       const updatedformElement={...updatedOrderForm[inputIdentifier]}
       updatedformElement.value=event.target.value;
       updatedOrderForm[inputIdentifier]=updatedformElement
       this.setState({contactForm:updatedOrderForm})
    }
    
    render(){
        let formElements=[]
    
        for (let key in this.state.contactForm){
            formElements.push(
                <Input inputtype={this.state.contactForm[key].elementType} 
                type={this.state.contactForm[key].elementConfig.type} 
                key={key} 
                name={key} 
                value={this.state.contactForm[key].value}
                placeholder={this.state.contactForm[key].elementConfig.placeholder}
                options={this.state.contactForm[key].elementConfig.options||null}
                changed={(event)=>this.inputChangedHandler(event,key)}
                />
            )
        }
        let form=<form onSubmit={this.OrderHandler}>
        {formElements}
        <Button btnType="Success" >ORDER</Button>
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