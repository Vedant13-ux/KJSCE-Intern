const mongoose = require('mongoose');
const certScehma = new mongoose.Schema({
    name: String,
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

module.exports = mongoose.model('Hashtag', certScehma);