import React, {Component} from 'react'
import axios from '../../order-instance'
import Button from '../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/input/input'
class ContactData extends Component{
    state={
        contactForm:{
            
                    name:
                        {elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Your name'
                        },
                        value:'',
                        valid:false,
                        validation:{
                            required:true

                        },
                        touched:false

                    },
                  street:
                            {elementType:'input',
                            elementConfig:{
                                type:'text',
                                placeholder:'Street'
                            },
                            value:'',
                            valid:false,
                            validation:{
                                required:true

                            },
                            touched:false

                        },
                    zipcode:
                            {elementType:'input',
                            elementConfig:{
                                type:'text',
                                placeholder:'Zip Code'
                            },
                            value:'',
                            valid:false,
                            validation:{
                                required:true,
                                minLength:5,
                                maxLength:5

                            },
                                    touched:false

                                },
                    county:
                                {elementType:'input',
                                elementConfig:{
                                    type:'text',
                                    placeholder:'Country'
                                },
                                value:'',
                                valid:false,
                                validation:{
                                    required:true

                                },
                                touched:false

                            },
                    email:
                                        {elementType:'input',
                                        elementConfig:{
                                            type:'text',
                                            placeholder:'Your email'
                                        },
                                        value:'',
                                        valid:false,
                                        validation:{
                                            required:true

                                        },
                                            touched:false
                                    },
                    deliverymethod:{elementType:'select',
                                        elementConfig:{
                                            options:[{value:'fastest', displayValue:'Fastest'},
                                                    {value:'cheapest', displayValue:'Cheapest'}                                      ]
                                        },
                                        valid:true,
                                        validation:{}
                                    }
                            },
                            formisValid:false,
                            value:'cheapest',
                            loading:false
                        }
    checkValidity(value,rules){
        let isValid=false;
        if(rules.required){
           
            isValid=value.trim()!=='';
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength
        }
        return isValid
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
       updatedformElement.valid=this.checkValidity(updatedformElement.value,updatedformElement.validation)
       updatedformElement.touched=true;
       updatedOrderForm[inputIdentifier]=updatedformElement
       
       
       let formValidity=true;
       
       for(let formInputIdentifier in updatedOrderForm){
           formValidity=updatedOrderForm[formInputIdentifier].valid && formValidity
       }
      
      
       this.setState({contactForm:updatedOrderForm,formisValid:formValidity})
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
                invalid={!this.state.contactForm[key].valid}
                shouldValidate={this.state.contactForm[key].validation}
                touched={this.state.contactForm[key].touched}
                
                />
            )
        }
        let form=<form onSubmit={this.OrderHandler}>
        {formElements}
        {console.log(this.state)}
        <Button disabled={!this.state.formisValid} btnType="Success" >ORDER</Button>
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