import React, { Component } from 'react'
import Auxillary from '../Auxillary'
import Modal from '../../components/UI/Modal/Modal'
const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component {

      

        state={
            error:null
        }

        componentWillMount(){
           this.requestInterceptor= axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            })
            this.responseInterceptor=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.request.eject(this.responseInterceptor)
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Auxillary>
        <Modal modalClosed={this.errorConfirmedHandler} show={this.state.error}> {this.state.error?this.state.error.message:null}</Modal>
        <WrappedComponent {...this.props}/>
    </Auxillary>
            )
        }
    }
}
export default withErrorHandler