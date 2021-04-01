import React from 'react';
import Header from './../../header/Header';
import axios from 'axios';

class ResetPassword extends React.Component {
    componentDidMount(){
        console.log(this.props.match.params.token);
    }
   async confirmToken(token) {
        try {
            token = this.props.match.params.token
            const res = await axios.post(`${process.env.REACT_APP_TimeOffURL}/reset-password`, {token});
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div>
                    <Header isLogin={false} />
                    <div className="jumbotron text-center bg-teal ">
                    <h1>Reset Password </h1>
                </div>
                <form className="container">
                    <div>

                    </div>
                </form>
            </div>
        )
    }
}
export default ResetPassword;