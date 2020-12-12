const mongoose = require('mongoose');
const certScehma = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    link: String,
    title: String,
    provider: String
});

module.exports = mongoose.model('Certificate', certScehma);