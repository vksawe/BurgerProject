import React from 'react'
import classes from './input.module.css'
const input=(props)=>{
    let inputelement=null;
    let inputClasses=[classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch(props.inputtype){
        case('input'):
            inputelement=<input  className={inputClasses.join(' ')}  {...props} onChange={props.changed}  />
            break;
        case('textarea'):
            inputelement=<textarea  className={inputClasses.join(' ')}   {...props} onChange={props.changed} />
            break;
        case('select'):
            inputelement=<select  className={inputClasses.join(' ')}   {...props} onChange={props.changed}>
                {props.options.map((option)=>{
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>
            break;
        default:
            inputelement=<input className={inputClasses.join(' ')} onChange={props.changed} {...props } />

    }

return(
    <div className={classes.Input}>
    <label classes={classes.Label}>{props.label}</label>
    {inputelement}
    </div>
);
}
export default input