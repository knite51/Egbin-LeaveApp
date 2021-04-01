import React from 'react';
import './register.css'
import Header from './../../header/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const onlyLetterRegex = RegExp(/^\d*$/)
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
    return valid;
  };
class Register extends React.Component{
  displaySuccessAlert() {
    Swal.fire(
      'Success',
      'Please Verify Your Email Address',
      'success'
    ).then(() => {
      this.props.history.push('/login');
      this.props.history.push('/register');
    })
  }

  
 async componentDidMount() {
    try {
      const res = await axios.get('https://restcountries.eu/rest/v2/all')    
      this.setState({listOfCountry: res.data})
    } catch (error) {
      console.log(error);
    }
  }
    constructor(props) {
        super(props);
        this.errorSate = {
          companyNameError: false
        }
    
        this.state = {
          companyName: null,
          firstName: null,
          lastName: null,
          email: null,
          department: null,
          dob: null,
          manager: null,
          password: null,
          invaildError: false,
          errorResponse: false,
          listOfCountry: null,
          successResponse: false,
          loading: false,
          formErrors: {
            companyName: '',
            firstName: "",
            lastName: "",
            email: "",
            department: '',
            dob: '',
            manager: '',
            password: ""
          }
        };
      }

    
      handleSubmit = e => {
        e.preventDefault(); 
        if (formValid(this.state)) {
          const body = {
            firstName: this.state.firstName,
            companyName: this.state.companyName,
            lastName: this.state.lastName,
            dob: this.state.dob,
            department: this.state.department,
            manager: this.state.manager,
            email: this.state.email,
            password: this.state.password
          };
          this.setState({loading: true, errorResponse: false})
          axios.post(`${process.env.REACT_APP_TimeOffURL}/employee/register`, body).then((data) => {
            this.setState({loading: false})
            this.displaySuccessAlert();
            
          })
          .catch(err => {
            const errorMsg = err.response ? err.response.data.message : err.response;
            this.setState({errorResponse: errorMsg, loading: false})
            console.log(err.response)
          })
         
        } else {
          this.setState({invaildError: true})
        }
      };
    
      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
            case "companyName":
            formErrors.companyName =  value.length < 3 || onlyLetterRegex.test(value)
            ? "company name must be up to 3 character (alphabet only)"
            : "";
          break;
          case "firstName":
              formErrors.firstName =  value.length < 3 || onlyLetterRegex.test(value)
              ? "first name must be up to 3 characters (alphabet only)"
              : "";
            break;
          case "lastName":
          formErrors.lastName =  value.length < 3 || onlyLetterRegex.test(value)
          ? "last name must be up to 3 characters (alphabet only)"
          : "";
          break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
        case "department":
        formErrors.department =  value.length < 3 || onlyLetterRegex.test(value)
          ? "department must be up to 3 characters (alphabet only)"
          : "";
        break;  
        case "dob":
        formErrors.dob =  value.length < 3
        ? "date of birth must be up to 3 characters (alphabet only)"
        : "";
        break;
        case "manager":
        formErrors.manager =  value.length < 3 || onlyLetterRegex.test(value)
        ? "manager must be up to 3 characters (alphabet only)"
        : "";
      break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
      };
    render() {
        const { formErrors } = this.state;
        return(
            <div>
              <Header isLogin={false} />
                <div className="jumbotron text-center bg-teal ">
                    <h1>Register Form </h1>
                </div>
                <div className="text-center">
                    <h5><Link to="/admin-register">Register As An Admin</Link></h5>
                </div>
            
                <form className="container mb-5" onSubmit={this.handleSubmit} noValidate style={{padding: '2% 20%' }}>
                {this.state.errorResponse ? <div className="alert alert-danger text-center">{this.state.errorResponse}</div> : ''}
                 {this.state.loading ? <h6 className="text-center">Loading...</h6> : ''}
                <div className="row">
                    <div className="form-group col-md-6">
                    <label >Company Name</label>
                    <input type="text" className="form-control"  placeholder="Company Name" 
                          name="companyName"  noValidate onChange={this.handleChange}/>
                    {this.state.invaildError && (this.state.companyName === null) ? 
                    <p className="text-danger">* company name is required</p> : '' } 
                    {(<span className="text-danger">{formErrors.companyName}</span>)}
                   </div>
                   <div className="form-group col-md-6">
                    <label >Email address</label>
                    <input type="email" className="form-control"  placeholder="Enter email" 
                          name="email"  noValidate onChange={this.handleChange}/>
                    {this.state.invaildError && (this.state.email === null) ? 
                    <p className="text-danger">* email is required</p> : '' } 
                      {formErrors.email.length > 0 && (
                         <span className="text-danger">{formErrors.email}</span>
              )}
                   </div>
                   <div className="form-group col-md-6">
                    <label >First Name</label>
                    <input type="text" className="form-control"  placeholder="First Name" 
                          name="firstName"  noValidate onChange={this.handleChange}/>
                        {this.state.invaildError && (this.state.firstName === null) ? 
                    <p className="text-danger">* first name is required</p> : '' } 
                      {formErrors.firstName.length > 0 && (
                         <span className="text-danger">{formErrors.firstName}</span>)}
                   </div>
                   <div className="form-group col-md-6">
                    <label >Last Name</label>
                    <input type="text" className="form-control"  placeholder="Last Name" 
                          name="lastName"  noValidate onChange={this.handleChange}/>
                    {this.state.invaildError && (this.state.lastName === null) ? 
                    <p className="text-danger">* last name is required</p> : '' } 
                      {formErrors.lastName.length > 0 && (
                         <span className="text-danger">{formErrors.lastName}</span>
              )}
                   </div>
  



                    <div className="form-group col-md-6">
                    <label >Department</label>
                    <input type="text" className="form-control"  placeholder="Dpartment" 
                          name="department"  noValidate onChange={this.handleChange}/>
                    {this.state.invaildError && (this.state.department === null) ? 
                    <p className="text-danger">* dpartment is required</p> : '' } 
                      {formErrors.department.length > 0 && (
                         <span className="text-danger">{formErrors.department}</span>
              )}
                   </div>

                      <div className="form-group col-md-6">
                    <label >Date Of Birth</label>
                    <input type="date" className="form-control"   
                          name="dob"  noValidate onChange={this.handleChange}/>
                    {this.state.invaildError && (this.state.dob === null) ? 
                    <p className="text-danger">* date of birth is required</p> : '' } 
                      {formErrors.dob.length > 0 && (
                         <span className="text-danger">{formErrors.dob}</span>
              )}
                   </div>

                  <div className="form-group col-md-6">
                    <label >Manager</label>
                    <input type="text" className="form-control" placeholder="manager"
                          name="manager"  noValidate onChange={this.handleChange}/>
                    {this.state.invaildError && (this.state.manager === null) ? 
                    <p className="text-danger">* manager is required</p> : '' } 
                      {formErrors.manager.length > 0 && (
                         <span className="text-danger">{formErrors.manager}</span>
              )}
                   </div>
                <div className="form-group col-md-6">
                    <label >Password</label>
                    <input type="password" className="form-control"  placeholder="Password" 
                                    name="password"
                                    noValidate
                                    onChange={this.handleChange}/>
                    {this.state.invaildError && (this.state.password === null) ? 
                    <p className="text-danger">* password is required</p> : '' } 
                     {formErrors.password.length > 0 && (
                <span className="text-danger">{formErrors.password}</span>
              )}
                </div>
                <div className="form-group col-md-6">
                    <label >Country</label>
                    <select className="form-control" id="sel1">
                        <option>Select Country</option>
                        {
                          this.state.listOfCountry && this.state.listOfCountry.length ? 
                          this.state.listOfCountry.map((item, index) => {
                            return <option key={index}>{item.name}</option>
                          }) : ''
                        }
                    </select>
                    </div>
                    <div className="form-group col-md-6">
                    <label >Time Zone</label>
                    <select className="form-control" id="seld">
                        <option>West Africa/ Lagos</option>
                        <option>Europe/London</option>
                        <option>America/Califonia</option>
                        <option>India/New Delhi</option>
                    </select>
                    </div>
            
                    <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                    </div>
             
                    </div>
                </form>
            </div>

        )
    }
}
export default Register;