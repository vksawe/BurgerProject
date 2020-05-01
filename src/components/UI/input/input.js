import React from 'react'
import classes from './input.module.css'
const input=(props)=>{
    let inputelement=null;
    switch(props.inputtype){
        case('input'):
            inputelement=<input  className={classes.InputElement}  {...props} onChange={props.changed}  />
            break;
        case('textarea'):
            inputelement=<textarea  className={classes.InputElement}   {...props} onChange={props.changed} />
            break;
        case('select'):
            inputelement=<select  className={classes.InputElement}   {...props} onChange={props.changed}>
                {props.options.map((option)=>{
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>
            break;
        default:
            inputelement=<input className={classes.InputElement} onChange={props.changed} {...props } />

    }

return(
    <div className={classes.Input}>
    <label classes={classes.Label}>{props.label}</label>
    {inputelement}
    </div>
);
}
export default input