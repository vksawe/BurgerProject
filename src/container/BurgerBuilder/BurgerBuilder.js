import React,{Component} from 'react'

import Auxillary from "../../hoc/Auxillary"

class BurgerBuilder extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Auxillary>
                <p>Burger</p>
                <p>Build Controls</p>
            </Auxillary>
        )
    }
}
export default BurgerBuilder;