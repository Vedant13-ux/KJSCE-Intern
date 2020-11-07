const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose
    .connect(
        'mongodb://localhost:27017/kjintern' || 'mongodb+srv://huzaifa:1234@cluster0.blpd9.mongodb.net/linkedin?retryWrites=true&w=majority',
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
        console.log("database nhi hora")
        console.log(err.message);
    });

module.exports.User = require('../models/user');
module.exports.Post = require('../models/posts');
module.exports.Internship = require('../models/internship');
module.exports.Notification = require('../models/notification');
module.exports.InternshipDetails = require('../models/internshipDetails');
module.exports.Comment = require('../models/comments');
module.exports.Message = require('../models/messages');
module.exports.Conversation = require('../models/conversation');
module.exports.Update = require('../models/updates');
module.exports.File = require('../models/files');
