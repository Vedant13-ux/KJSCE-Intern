const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    facultyEmails: [{ type: String }],
    subscribed: [{ type: String }]
});