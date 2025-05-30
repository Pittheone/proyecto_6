const connectDB = require('./src/config/db');
const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// const userRoutes = require('./src/routes/userRoutes');
const completoRoutes = require('./src/routes/completoRoutes');

dotenv.config();
const app = express();

app.use(express.json());

// app.use('/api/users', userRoutes);
app.use('/api/completo', completoRoutes);
app.use('/', (req, res) => {
    res.send('API is running...');
    });
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});