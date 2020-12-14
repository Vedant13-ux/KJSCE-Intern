const mongoose = require('mongoose');
const certScehma = new mongoose.Schema({
    link: String,
    title: String,
    provider: String
});

module.exports = mongoose.model('Certificate', certScehma);