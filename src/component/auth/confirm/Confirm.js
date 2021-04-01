import React from 'react';
import Header from './../../header/Header';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

class Confirm extends React.Component {
    state = {
        loading: true,
        response: null,
        showResend: false,
        email: null
    }
    componentDidMount(){
        this.confirmToken(this.props.match.params.token)
    }
    displaySuccessAlert(status) {
        const text = status === 200 ? 'Confirmation mail has been sented' : 'You are already verified'
        if (status ===  200 || status === 422) {
            Swal.fire(
                'Success',
                text,
                'success'
              ).then(() => {
                this.props.history.push('/login');
              }) 
        } else  {
            Swal.fire(
                'Error',
                'Email Address Not Found',
                'error'
              ).then(() => {
                this.props.history.push('/register');
              }) 
        }
  
      }
   async confirmToken(token) {
        try {
            token = this.props.match.params.token
            await axios.post(`${process.env.REACT_APP_TimeOffURL}/employee/confirm`, {token});
            this.setState({loading: false, response: 200})
        } catch (error) {
            console.log(error.response);
            this.setState({loading: false, response: error.response.status})
        }
    }
    async resendMaill(email) {
        try {
           const res = await axios.post(`${process.env.REACT_APP_TimeOffURL}/employee/resend`, {email});
           this.displaySuccessAlert(res.status)   
        } catch (error) {
            console.log(error.response);
            this.displaySuccessAlert(error.response.status)
        }
    }
   showResend = (e) => {
       e.preventDefault()
       this.setState({showResend: true})
   }
   handleEmail = e => {
       this.setState({email: e.target.value})
   }
   resend = (e) => {
    e.preventDefault()
    this.resendMaill(this.state.email)
   }

    render() {
        return(
            <div>
                <Header isLogin={false} />
                <div className="jumbotron text-center bg-teal ">
                    <h1>Confirmation </h1>
                </div>
                <div className="container">
                {
                    !this.state.showResend ?
                
                    <div className="row">
                        <div className="col-md-12 text-center">
                            {
                                this.state.loading ? <i className="fa fa-spinner fa-5x fa-spin"></i> : 
                                <React.Fragment>
                                    {
                                        this.state.response === 200 ? 
                                        <div>
                                            <h5>Your Email have Being Verified</h5>
                                            <Link to="/login" className="btn btn-success">Login</Link>
                                        </div> : 
                                        <React.Fragment>
                                            {
                                                this.state.response === 422 ? 
                                                <div>
                                                    <h5>Account has already being Verified</h5>
                                                    <Link to="/login" className="btn btn-success">Login</Link>
                                                </div> : 
                                                <div>
                                                    <i className="fa fa-exclamation-circle text-warning fa-3x"></i>
                                                    <h5>Account activation failed. <br />Your verification link may have expired.</h5>
                                                    <button className="btn btn-primary" onClick={this.showResend}>Click to resend</button>
                                                </div>
                                            }
                                        </React.Fragment> 
                                        
                                    }
                                </React.Fragment>
                            }
                        </div>
                    </div> :
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                       <form onSubmit={this.resend}>
                       <input  onChange={this.handleEmail}  className="form-control" type="email" 
                                    placeholder="Enter email" required email="true" />
                       <button type="submit" className="btn btn-primary mt-2">Resend</button>
                       </form>
                    </div>
                </div>
               
               }
                </div>
            </div>
        )
    }
}
export default Confirm