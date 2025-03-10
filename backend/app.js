const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const cors = require('cors')
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true,
    }));
//Route imports for product
const product = require('./routes/productR');
app.use('/api/v1',product)

//Route imports for user
const users = require('./routes/userR');
app.use('/api/v1',users)

//Route imports for order
const order = require('./routes/orderR');
app.use('/api/v1' , order)

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
