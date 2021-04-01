const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'motherfucker#^^';
const ArticleModel = require('../models/ArticleModel');
const AuthMiddleWare = require('../middlewares/auth');
const dotevn =  require('dotenv');
dotevn.config();


// creating an article
router.post('/', AuthMiddleWare, async function (req, res) {
    try {
        const article = await ArticleModel.create({
            title: req.body.title,
            content: req.body.content,
            writer: req.user
        })
        res.status(200).json({status: 'success', data: article})
        
    } catch (error) {
       res.status(500).json({status:'error', message: error});
    }
})

// get a writer's article
router.get('/', AuthMiddleWare,  async function (req, res) {
    try {
        const article = await ArticleModel.find({writer: req.user});
        res.status(200).json({status: 'success', data: article})      
    } catch (error) {
       res.status(500).json({status:'error', message: error});
    }
})

module.exports = router;