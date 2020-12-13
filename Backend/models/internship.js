const mongoose = require('mongoose');
const internshipSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipDetails'
  },
  enrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  updates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Update'
    }
  ],
});

module.exports = mongoose.model('Internship', internshipSchema)