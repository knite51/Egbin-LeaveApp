import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import Header from './component/header/Header';
import Home from './component/home/Home';
import Footer from './component/footer/Footer'
import EmployeeDashboard from './component/dashboard/employee/Employee-Dashboard'
import NewAbsenceForm from './component/dashboard/new-absence/NewAbsence'

import { BrowserRouter ,Route, Switch } from 'react-router-dom'
import Login from './component/auth/login/Login';
import Register from './component/auth/register/Register';
import AdminRegister from './component/auth/admin/AdminRegister'
import TeamView from './component/dashboard/team-view/TeamView';
import Confirm from './component/auth/confirm/Confirm';
import ResetPassword from './component/auth/reset-pasword/ResetPassword';
class App extends Component {
  render() {
    return (
      <div>
    <BrowserRouter>
        <div>
          
             {/* <Header /> */}
         
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin-register" component={AdminRegister} />
            <Route exact path="/confirm/:token" component={Confirm}/>
            <Route exact path="/reset-password/:token" component={ResetPassword}/>
            <Route exact path="/employee-dashboard" component={EmployeeDashboard} />
            <Route exact path="/team-view" component={TeamView} />
            <Route exact path="/new-absence" component={NewAbsenceForm} />

          </Switch> 
          <Footer />
        </div>
     </BrowserRouter>

      </div>
    );
  }
}

export default App;
