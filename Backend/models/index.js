const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose
    .connect(
        process.env.MONGODB_URI2,
        // 'mongodb+srv://vedant:1234@cluster0.blpd9.mongodb.net/linkedin?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            keepAlive: true
        }
    )
    .then(() => {
        console.log('Connected');
    })
    .catch((err) => {
        console.log(err.message);
    });

module.exports.User = require('./user');
module.exports.Post = require('./posts');
module.exports.Internship = require('./internship');
module.exports.Notification = require('./notification');
module.exports.InternshipDetails = require('./internshipDetails');
module.exports.Comment = require('./comments');
module.exports.Message = require('./messages');
module.exports.Conversation = require('./conversation');
module.exports.Update = require('./updates');
module.exports.File = require('./files');
module.exports.Application = require('./application');
module.exports.Certificate = require('./certificate')
module.exports.Experience = require('./experience')
module.exports.Project = require('./project');
module.exports.CouncilMember = require('./councilMembers')
