
const express = require('express');
const { registerUser, loginUser, verifyToken, updateUser, logout } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verifytoken',authMiddleware, verifyToken); 
router.put('/update', authMiddleware, updateUser); 
router.post('/logout', logout)


module.exports = router;

