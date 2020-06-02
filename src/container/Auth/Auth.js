import React, {Component} from 'react'
import {connect} from 'react-redux'
import Input from '../../components/UI/input/input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as  actions from '../../store/actions/index'
class Auth extends Component{
    state={
        controls:{  email:
        {
                        elementType:'input',
                        elementConfig:{
                        type:'email',
                        placeholder:'Email Address'
                        },
                        value:'',
                        valid:false,
                        validation:{
                        required:true,
                        isEmail:true
                        },
                        
                        touched:false
    },
    password:
        {
                    elementType:'input',
                    elementConfig:{
                    type:'password',
                    placeholder:'password'
                    },
                value:'',
                valid:false,
                validation:{
                    required:true,
                    minLenth:6
                    
                    },
               
                touched:false
    }
    
    },
    isSignup:false
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    switchAuthModeHandler=()=>{
        this.setState((prevState)=>{
          return{  isSignup:!prevState.isSignup}
        })
    }

    inputChangedHandler=(event,key)=>{

        event.preventDefault();
        // let updatedForm={...this.state}
        // let updatedFormElement={...updatedForm.controls}
        let newState={...this.state,controls:{...this.state.controls,[key]:{...this.state.controls[key],value:event.target.value}}}
        this.setState(newState)
        
       // console.log(newState)

    }

    formSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onFormSubmit(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }
    

    render(){

        let formElements=[]
    
        for (let key in this.state.controls){
            formElements.push(
                <Input inputtype={this.state.controls[key].elementType} 
                type={this.state.controls[key].elementConfig.type} 
                key={key} 
                name={key} 
                value={this.state.controls[key].value}
                placeholder={this.state.controls[key].elementConfig.placeholder}
                options={this.state.controls[key].elementConfig.options||null}
                changed={(event)=>this.inputChangedHandler(event,key)}
                invalid={!this.state.controls[key].valid}
                shouldValidate={this.state.controls[key].validation}
                touched={this.state.controls[key].touched}
                
                />
            )
        }

        if(this.props.loading){
            formElements=<Spinner/>
        }
        let apiError=null;
        if(this.props.error){
            apiError=this.props.error;
        }
        return(
            <div className={classes.Auth}>
                <form onSubmit={this.formSubmitHandler}>
                    {apiError}
                    {formElements}
                    <Button btnType="Success">Submit</Button>
                </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignup? 'Sign In':'Sign Up'} </Button>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
    error:state.auth.error,
    loading:state.auth.loading
}
}
const mapDispatchToProps=(dispatch)=>({
    onFormSubmit:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup))
})

export default connect(mapStateToProps,mapDispatchToProps)( Auth);