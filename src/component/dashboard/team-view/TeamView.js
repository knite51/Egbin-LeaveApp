import React , { Component } from 'react'
// import { Link } from 'react-router-dom'
import './style.css'
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from './../../header/Header'

class TeamView extends Component {
    state = {
        allLeaveRequest: null,
        pendingLeave: null,
    }
    convertToshorDate = (date) => {
        return new Date(date).toLocaleDateString();
    }
    getStatusColor(status) {
        switch (status) {
            case 'declined':
                return 'badge-danger'
            case 'approved': 
                return 'badge-success'
            default:
                return 'badge-warning'
        }
    }
    componentDidMount() {
    const token = JSON.parse(localStorage.getItem('currentUserTimeOff')).token;
    axios.get(`${process.env.REACT_APP_TimeOffURL}/leave/all`, 
    {headers: { 'Authorization': `Bearer ${token}`}})
        .then((data) => {
            const leaves = data.data.data
            this.getPendingLeaves(leaves)
            this.setState({allLeaveRequest: leaves,})
        })
        .catch(err => {
            console.log(err.response);
        })
    }
    confirmAction = (item, status) => {
        let text = status === 'approved' ? 'approve' : 'decline'
        Swal.fire({
            title: 'Are you sure?',
            html: `You want to <strong>${text}</strong>, <b>${item.name}</b> leave request`,
            type: 'warning',
            showCloseButton: true,
        }).then((result) => {
            if (result.value) {
               this.updateLeave(item._id, status)
            }
        })
    }

    alertSuccess() {
        Swal.fire({
            title: 'Success',
            html: `leave request updated`,
            type: 'success',
            showCloseButton: true,
        })
    }
    async  updateLeave(id, status){
        try {
            const token = JSON.parse(localStorage.getItem('currentUserTimeOff')).token;
            await axios.put(`${process.env.REACT_APP_TimeOffURL}/leave/${id}`, {status}, 
                                            {headers: { 'Authorization': `Bearer ${token}`}})
            this.alertSuccess()
            this.componentDidMount()
        } catch (error) {
            console.log(error);
        }
    }
    getPendingLeaves(leaves) {
        const leave =  leaves.filter(item => item.status === 'pending')
        this.setState({pendingLeave: leave})
    }   
    render() {
        return (
        <div>          
           <Header isLogin={true} />
            <div className="container mt-3 mb-5">
            <h4>Admin Dashboard</h4>    
            <h6 className="text-info mb-2">Leave Request To Approve Or Decline</h6> 
            {
                !this.state.pendingLeave ? 
                <p>Loading.....</p> : 
                <div>
                    {
                        !this.state.pendingLeave.length ? 
                        <p>No Pending Leave Request Available</p> : 
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Date Of Request</th>
                  <th>Leave Date</th>
                  <th>Type</th>
                  <th>More Actions</th>
                </tr>
              </thead>
              <tbody>
                  {
                      this.state.pendingLeave.map((item , index) => {
                          return <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.department}</td>
                          <td>{this.convertToshorDate(item.date_created)}</td>
                          <td>{this.convertToshorDate(item.from_date)} - {this.convertToshorDate(item.to_date)}</td>
                          <td>{item.leave_type}</td>
                          <td>
                              <button onClick={() => this.confirmAction(item, 'approved')} className="btn btn-success btn-sm mr-2">Approve</button>
                              <button onClick={() => this.confirmAction(item, 'declined')} className="btn btn-danger btn-sm">Decline</button>
                          </td>
                        </tr>
                      })
                  }

              </tbody>
            </table>
          
                    }
                </div>
            }    
            
          <h6 className="text-info mt-5 mb-2"> All Leaves</h6>
          <div className="col-md-12 text-center">
                        {
                            !this.state.allLeaveRequest ? <div>
                                <h6>Loading <i className="fa fa-spinner"></i></h6>
                            </div> : 
                            <React.Fragment> 
                                {
                                    !this.state.allLeaveRequest.length ? 
                                    <h6>No  Available Leave Request</h6> :
                                    <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Employee</th>
                                        <th>Date Requested</th>
                                        <th>Leave Date</th>
                                        <th>Approved By</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                  
                                        {
                                            this.state.allLeaveRequest.map((item, index) => {
                                                return <tr key={index}>
                                                <td>{item.leave_type}</td>
                                                <td>{item.name}</td>
                                                <td>{this.convertToshorDate(item.date_created)}</td>
                                                <td>{this.convertToshorDate(item.from_date)} - {this.convertToshorDate(item.to_date)}</td>
                                                <td>{item.approved_by ? item.approved_by : '--'}</td>
                                                <td> <span className={`badge ${this.getStatusColor(item.status)} text-light bgd`}>{item.status}</span> </td>
                                            </tr>
                                            })
                                        }
                           
                                    </tbody>
                            </table>
                            }
                           </React.Fragment>
                        }
                
                        </div>
                    </div>
               
          
          </div>
  
 
          
        )
    }

}

export default TeamView