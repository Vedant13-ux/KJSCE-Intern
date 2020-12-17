const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    member: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InternshipDetails',
        }
    ],
    position: String
})

module.exports = mongoose.model('CouncilMember', memberSchema);