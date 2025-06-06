
const express = require('express');
const { registerUser, loginUser, verifyToken, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verifytoken', verifyToken); 
router.put('/update/:id', authMiddleware, updateUser); 

module.exports = router;

