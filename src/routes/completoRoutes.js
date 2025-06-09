const express = require('express');
const { createCompleto, readAllCompletos, readOneCompleto, updateCompleto, deleteCompleto } = require('../controllers/completoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createCompleto); 
router.get('/readall', readAllCompletos);
router.get('/readone/:id', readOneCompleto);
router.put('/update/:id', authMiddleware,  updateCompleto); 
router.delete('/delete/:id', authMiddleware, deleteCompleto); 



module.exports = router;
