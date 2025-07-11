const connectDB = require('./src/config/db');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
// require('dotenv').config();

//const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
//donde va dotenv.config()?
dotenv.config();
const userRoutes = require('./src/routes/userRoutes');
const completoRoutes = require('./src/routes/completoRoutes');
const cartRouter = require('./src/routes/cart.routes');


connectDB();

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = isProd 
? process.env.FRONTEND_URL
: process.env.FRONTEND_URL_DEV;
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Permite el envío de cookies
  })
)
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/completo', completoRoutes);
app.use('/api/carts', cartRouter);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});