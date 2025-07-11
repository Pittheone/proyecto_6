
const express = require('express');
const { registerUser, loginUser, verifyToken, updateUser, logout, getUserById } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { get } = require('mongoose');



const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verifytoken', verifyToken); 
router.put('/update', authMiddleware, updateUser); 
router.post('/logout', logout)
router.get('/:id', getUserById);

module.exports = router;

