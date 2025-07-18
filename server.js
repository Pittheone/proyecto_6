const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');
const completoRoutes = require('./src/routes/completoRoutes');
const cartRouter = require('./src/routes/cart.routes');

const PORT = process.env.PORT || 5000;
connectDB();

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

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
