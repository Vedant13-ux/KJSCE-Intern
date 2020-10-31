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
const User = require('./models/user');

// ROutes
const authRoutes = require('./routes/auth');


app.use(bodyParser.json());
app.use(cors());
// Incuding Riutes
app.use('/api/auth', authRoutes);


app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);
