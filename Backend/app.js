const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');
const server = app.listen(3001, process.env.IP, () => {
    console.log('Server Listening on Port 3001');
});
const io = socket(server);
const errorHandler = require('./handlers/errorHandler');
require('dotenv').config();
// Middleware
const { loginRequired, ensureCorrectUser } = require('./middleware');

// Database
require('./models/index');

// ROutes
const authRoutes = require('./routes/auth');
const communityRoutes = require('./routes/community.js');
const internshipRoutes = require('./routes/internship')


app.use(bodyParser.json());
app.use(cors());

// Incuding Riutes
app.use('/api/auth',authRoutes);
app.use('/api/community',communityRoutes);
app.use('/api/internship', internshipRoutes);


app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);
