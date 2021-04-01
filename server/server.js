const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
const EmployeeRoute = require('./routes/EmployeeRoute');
const LeaveRoute = require('./routes/LeaveRoute');
const port = process.env.PORT || 6004; 
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('✌🏾 Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('An error occured while conencting to MongoDB', err);
  });

// Use express static
app.use(express.static(path.join(__dirname, '../build')));

app.use(cors());

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/employee', EmployeeRoute);
app.use('/leave', LeaveRoute);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port).on('listening', () => {
  console.log('We are live on ' + port);
});
