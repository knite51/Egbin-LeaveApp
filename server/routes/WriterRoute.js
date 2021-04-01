const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const WriterModel = require('../models/WriterModel');
const router = express.Router();
const dotevn =  require('dotenv');
dotevn.config();
const SECRET = process.env.SECRET;
// Create a writer
router.post('/', async function(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const writer = await WriterModel.create(req.body);
    const token = jwt.sign({id: writer._id}, SECRET, {expiresIn: '1h'})
    const result = writer.toJSON();
    delete result['password'];
    res.status(200).json({
      status: 'success',
      data: {writer: result, token},
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occured while creating your account 😭',
    });
  }
});

//  Get a writer profile
router.get('/profile', async function (req, res) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) 
      return res
        .status(401)
        .json({status: 401, message: 'unauthorization please specify'})
    const token = authHeader.split(' ')[1];
    const tokenData = jwt.verify(token, SECRET);

    const writer = await WriterModel.findById(tokenData.id);
    res.json({status: 'success', writer})
    // res.json({tokenData})
  } catch (error) {
    res.status(401).json({status: 'error', message: error.message})
    // console.log(error);
  }
})
// login 
// router.post('/login', async function (req, res) {
//   try {
//     const writer = await WriterModel.findOne({email: req.body.email}, '+password');
//     if(!writer) return res.status(404).json({status:'not found', message: 'user not found'});

//     const isValidPassword = await bcrypt.compare(req.body.password, writer.password)
//     if (!isValidPassword) return res.status(401).json({status:'error', message: 'Invalid password'})

//     const token = jwt.sign({id: writer.id}, SECRET);
//     res.status(200).json({token})

//   } catch (error) {
//     // console.log(error);
//   }
// })

router.post("/login", async function(req, res) {
  try {
    const writer = await WriterModel.findOne(
      { email: req.body.email },
      "+password"
    );

    if (!writer) {
      return res
        .status(401)
        .json({ status: "error", message: "Writer does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      writer.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid Password" });
    }
    const token = jwt.sign({ id: writer.id }, SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({status: "error", message:error})
  }
});

// Update a writer
router.put('/:email', async function(req, res) {
  try {
    const updatedWriter = await WriterModel.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );

    // Check if the writer was found and updated
    if (!updatedWriter) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry that writer does not exist 😭',
      });
    }

    res.json({
      status: 'success',
      data: updatedWriter,
    });
  } catch (err) {
    // console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while updating the writer 😭',
    });
  }
});

// Delete a writer
router.delete('/:email', async function(req, res) {
  try {
    const deletedWriter = await WriterModel.findOneAndDelete({
      email: req.params.email,
    });

    if (!deletedWriter) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry you cannot delete a writer that does not exist',
      });
      return;
    }

    res.json({
      status: 'success',
      message: '👋🏿 successfully deleted writer',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'An error occured while deleting the writer',
    });
  }
});

// Get a writer by email
router.get('/:email', async function(req, res) {
  try {
    const writer = await WriterModel.findOne({ email: req.params.email });

    // Check if a writer was found
    if (!writer) {
      res.status(404).json({
        status: 'error',
        message: 'The writer was not found',
      });
      return;
    }

    res.json({
      status: 'success',
      data: writer,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'An error occured while getting the writer 😭',
    });
  }
});

// Get all writers
router.get('', async function(req, res) {
  try {
    const search = req.query.gender ? { gender: req.query.gender } : {};

    const writers = await WriterModel.find(search);
    res.json({
      status: 'succcess',
      data: writers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "An error occured while getting writer's",
    });
  }
});

module.exports = router;
