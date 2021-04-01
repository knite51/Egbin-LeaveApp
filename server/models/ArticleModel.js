const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    writer:{
        type: String,
        required: true
    }
});

const ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;