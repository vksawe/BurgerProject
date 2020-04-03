import React  from 'react'
import classes from './BuildControl.module.css'
const BuildControl=(props)=>{
console.log(props.label)
return( 
<div className={classes.BuildControl}>
<div className={classes.Label}>{props.label}</div>
<button  className={classes.Less} disabled={props.disabledButton} onClick={props.removeIngredients} >Less</button>
<button  className={classes.More} onClick={props.addMoreingredients}>More</button>
</div>
)
}
export default BuildControl;