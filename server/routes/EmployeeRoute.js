const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('../models/EmployeeModel');
const router = express.Router();
const dotevn = require('dotenv');
dotevn.config();
const AuthMiddleWare = require('../middlewares/auth');
const sendMail = require('../email');
// Create Employee Account
router.post('/register', async function (req, res) {
  let isAdmin = false;
  let callDB = true;
  if (req.body.licenseKey) {
    if (req.body.licenseKey === process.env.ADMIN_KEY) {
      isAdmin = true;
      callDB = true
    } else {
      res.status(412).json({
        status: 'error',
        message: 'invalid license key'
      });
      callDB = false
    }
  }
  if (callDB === true) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const employee = await EmployeeModel.create({
        isAdmin,
        ...req.body,
        isVerified: false,
        numberOfLeave: 20
      });
      const token = jwt.sign({
        id: employee._id
      }, process.env.SECRET, {
        expiresIn: '12h'
      });
      const result = employee.toJSON();
      delete result['password'];
      sendMail('confirm', employee.email, token);
      res.status(200).json({
        status: 'success',
        data: {
          result: result
        }
      });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({
          status: 'error',
          message: 'this email already exist'
        })
      } else {
        res.status(500).json({
          status: 'error',
          message: err,
        });
      }
    }
  }
});

// login 
router.post('/login', async function (req, res) {
  try {
    const employee = await EmployeeModel.findOne({
      email: req.body.email
    }, '+password');
    if (!employee) return res.status(404).json({
      status: 'not found',
      message: 'invalid password or email'
    });

    const isValidPassword = await bcrypt.compare(req.body.password, employee.password)
    if (!isValidPassword) return res.status(401).json({
      status: 'error',
      message: 'invalid password or email'
    })

    if (!employee.isVerified) return res.status(412).json({
      status: 'error',
      message: 'click on the verification link sent to your email address'
    })
    const result = employee.toJSON();
    delete result['password'];
    const token = jwt.sign({
      id: employee.id
    }, process.env.SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({
      result,
      token
    })

  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: 'error occured'
    })
  }
})
// get employee profile
router.get('/profile', AuthMiddleWare, async function (req, res) {
  try {
    const profile = await EmployeeModel.findById(req.user)
    if (!profile) return res.status(404).json({
      status: 'error',
      message: 'error occured'
    });
    res.status(200).json({
      status: 'success',
      data: profile
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'server error'
    })
  }

})
// verify email
router.post('/confirm', async function (req, res) {
  try {
    const token = req.body.token;
    const tokenData = jwt.verify(token, process.env.SECRET);

    const user = await EmployeeModel.findById(tokenData.id)
    if (user.isVerified) return res.status(422).json({
      status: 'error',
      message: 'account has already been verified'
    });

    const updateUser = await EmployeeModel.findByIdAndUpdate(tokenData.id, {
      isVerified: true
    }, {
      new: true
    });
    if (!updateUser) return res.status(403).json({
      status: 'error',
      message: 'user not found'
    })
    res.status(200).json({
      status: 'success',
      data: updateUser
    })
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'you are not authorizaed'
    });

  }
})
//resend email
router.post('/resend', async function (req, res) {
  try {
    const user = await EmployeeModel.findOne({email: req.body.email})
    if (!user) return res.status(404).json({status: 'error', message: 'user not found'});
    if (user.isVerified) return res.status(422).json({status: 'error', message: 'you are already verified'});
    const token = jwt.sign({
      id: user._id
    }, process.env.SECRET, {
      expiresIn: '1h'
    });
    sendMail('confirm', user.email, token);
    res.status(200).json({status: 'success', message: 'verification message has been sented'})
  } catch (error) {
    res.status(500).json({status:'error', message: 'server error'})
  }
})

router.post('/forget-password', async function (req, res) {
  try {
    const user = await EmployeeModel.findOne({email: req.body.email})
    if (user) {
      const token = jwt.sign({
        id: user._id
      }, process.env.SECRET, {
        expiresIn: 30
      });
      sendMail('reset-password', 'adisco4420@gmail.com', token);
    }
    res.status(200).json({status: 'success', message: 'reset password link has been sent to your email'})
  } catch (error) {
    res.status(500).json({status: 'error', message: 'server error'})
  }
})

router.put('/reset-password', async function (req, res) {
  try {
    if (!(req.body && req.body.token && req.body.password)) {
      return res.status(403).json({status: 'invalid params', message:  'email and token is required'})
    }
    const verifyToken = jwt.verify(req.body.token ,process.env.SECRET)
    
    const user = await EmployeeModel.findById(verifyToken.id);    
    if (!user) res.status(404).json({status: 'error', message: 'user not found'})
    
    const password = await bcrypt.hash(req.body.password, 10);
    console.log(user._id);
    const updatePassword = await EmployeeModel.findByIdAndUpdate(user._id, {password: password})
    
    res.status(200).json({status: 'success', message: updatePassword})
  } catch (error) {
    res.status(401).json({status: 'error', message: error})
  }
})



module.exports = router;
