
const express = require('express');
const app = express();

require("express-async-errors");


//useful packages
require('dotenv').config();

//error handlers , authentication and not found
const errorHandler = require('./Middleware/errorHandler');
const notFound = require('./Middleware/not-found');
const authenticationMiddleware = require('./Middleware/authentication');

const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/user');

const connect = require('./db/connect');

//port number
const port = process.env.PORT || 80;

app.use(express.json())

//API routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/',authenticationMiddleware,userRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async() =>{
    try {
        await connect(process.env.MONGO_URI )
        app.listen(port,()=> console.log(`listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start();
