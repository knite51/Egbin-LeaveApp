const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    leave_type: {
        type: String,
        required: true
    },
    from_date: {
        type: Date,
        required: true
    },
    to_date:{
        type: Date,
        required: true
    },
    comment: {
        type: String,
    },
    date_created: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    approved_by: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        required: true
    }
});

const LeaveModel = mongoose.model('Leave', LeaveSchema);

module.exports = LeaveModel;