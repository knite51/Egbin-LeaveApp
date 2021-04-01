import React , { Component } from 'react';
import Swal from 'sweetalert2';

import Header from './../../header/Header'
import axios from 'axios';
import dateFunction from '../function/date';
import './style.css';
const typeOfTimeOff = [
    {name: '-- Select Leave Type --', day: 1},
    {name: 'Vacation', days: 2},
    {name: 'Maternity Leave', days: 10},
    {name: 'Medical Checkup', days: 5},
    {name: 'Marriage Purpose', days: 7},
]
let date = new Date();
let month = date.getMonth(); let day = date.getDate()
day = day.toString().length === 1 ? `0${day}` : day;
month = month.toString().length === 1 ? `0${month + 1}` : month + 1;

date = `${date.getFullYear()}-${month}-${day}`

class NewAbsenceForm extends Component {
    state = {
        leaveType: '',
        startTime: date,
        stopTime: date,
        FromDay: 'All Day',
        ToDay: 'All Day',
        comment: '',
        diffStartTimeStopTime: 0,
        showError: false
    }
    handleStartTime = e => {
        let startTimeValue = e.target.value;
        this.setState({startTime: startTimeValue})
        let diff = dateFunction(startTimeValue, this.state.stopTime)
        this.setState({diffStartTimeStopTime: diff})
    }

    handleStopTime = e => {
        let stopTimeValue = e.target.value;
        this.setState({stopTime: stopTimeValue})
        let diff = dateFunction(this.state.startTime, stopTimeValue)
        this.setState({diffStartTimeStopTime: diff})
    }
    handleDayChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }
    handeleLeavetype = e => {
        this.setState({leaveType: e.target.value})
    }
    handleComment = e => {
        this.setState({comment: e.target.value})
    }
    hamdleFormSubmit = () => {
        if ((this.state.diffStartTimeStopTime !== 0) && 
            (this.state.leaveType !== '-- Select Leave Type --' && this.state.leaveType !== '')) {
                const token = JSON.parse(localStorage.getItem('currentUserTimeOff')).token;
                const comment = this.state.comment.length ? this.state.comment : 'No Comment'
                const body = {
                    "leave_type": this.state.leaveType,
                   "from_date": this.state.startTime,
                   "to_date": this.state.stopTime,
                   "comment": comment
               }   
                axios.post(`${process.env.REACT_APP_TimeOffURL}/leave`, body, 
                {headers: { 'Authorization': `Bearer ${token}`}})
                    .then((data) => {
                        Swal.fire(
                            'Success',
                            'Your Leave Request Has Being Submitted',
                            'success'
                          ).then(() => {
                            this.clearAllField()
                          })
                    }).catch((err) => {
                        if (err && err.response && err.response.staus !== 500) {
                            Swal.fire(
                                'Error',
                                `${err.response.data.message}`,
                                'error'
                              )
                        }
                        console.log(err.response);
                        
                    })
           
        } else {
            this.setState({showError: true})
        } 
        if (this.state.diffStartTimeStopTime === 0) {
            this.setState({showError: true})
        } 
    } 
    clearAllField = () => {
        document.getElementById('leaveType').value = '-- Select Leave Type --'
        this.setState({
            leaveType: '',
            startTime: date,
            stopTime: date,
            diffStartTimeStopTime: 0,
            showError: false
        })
    } 
 
    render() {
        return(
            <div>
            <Header isLogin={true} />
                       <div className="container absence mt-3 align-center ">
                <div className="card align-center">
  <div className="card-header text-center">
  <h5>Request For Leave</h5>
  </div>
  <div className="card-body">
    <div className="row">
        <div className="col-12">
            <div className="form-group">
                    <label htmlFor="leaveType"><h6>Leave Type</h6></label>
                    <select onClick={this.handeleLeavetype} className="form-control" id="leaveType">
                    {
                        typeOfTimeOff.map((item, index) => {
                            return <option key={index}>{item.name}</option>
                        })
                    }
                    
                    </select>
                {
                    (this.state.leaveType !== '-- Select Leave Type --') ? '' : 
                    <p className="text-danger">select valid leave type</p>
                }
                {
                     (this.state.leaveType === '' && this.state.showError) ? 
                     <p className="text-danger">*leave type is required</p> : 
                    ''
                }
            </div>
        </div>
    </div>
    <h6>From:</h6>
    <div className="row">
        <div className="col-4">
            <select name="FromDay" onClick={this.handleDayChange} className="form-control">
                <option>All day</option>
                <option>Morning</option>
                <option>Afternoon</option>
            </select>
        </div>
        <div className="col-8">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1"><i className="fa fa-calendar" ></i></span>
                </div>
                <input type="date" min={date} value={this.state.startTime} onChange={this.handleStartTime}
                className="form-control"  />
            </div>
        </div>
    </div>
    <h6>To:</h6>
    <div className="row">
   
        <div className="col-4">
            <select name="ToDay" onClick={this.handleDayChange} className="form-control">
                <option>All day</option>
                <option>Morning</option>
                <option>Afternoon</option>
            </select>
        </div>
        <div className="col-8">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1"><i className="fa fa-calendar" ></i></span>
                </div>
                <input value={this.state.stopTime} onChange={this.handleStopTime} type="date" 
                min={this.state.startTime} className="form-control"  />
            </div>
        </div>
    </div>
    <h6>Duration</h6>
    <div className="row">
        <div className="col-12">
            <input 
                value={this.state.diffStartTimeStopTime === 0 ? '0 Day' : `${this.state.diffStartTimeStopTime} Day(s)` } 
                className="form-control" disabled />
            {
                ((this.state.diffStartTimeStopTime === 0) 
                && this.state.showError) ? 
                <span className="text-danger">invalid duration must be more than 0 Days</span> : '' 
            }
        </div>
    </div>

    <div className="row">
        <div className="col-12">
            <div className="form-group">
                <label ><h6>Comment (Optional)</h6></label>
                <textarea onChange={this.handleComment} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
             </div>
        </div>
    </div>
  </div>
  <div className="card-footer">
    <button onClick={this.hamdleFormSubmit} className="btn btn-primary">Submit</button>
  </div>
</div>
            </div>
        </div>
        )
    }
}
export default NewAbsenceForm;