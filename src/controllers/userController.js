const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Usuario ya existe' });

    const user = await User.create({ name, email, password: await bcryptjs.hash(password, 10) });
    res.status(201).json({ id: user._id, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(400).json({ message: 'Credenciales inválidas' });
//     }
//     res.status(200).json({ id: user._id, token: generateToken(user._id) });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email })
        if (!foundUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const foundedPassword = await bcryptjs.compare(password, foundUser.password);
        if (!foundedPassword) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrecta' });
        }
        const payload = { user: { id: foundUser.id }}
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30m' },
            (error, token) => {
                if (error) {
                    return res.status(500).json({
                        msg: 'Error al generar el token',
                        error: error.message
                    })
                }
                return res.json( token );
            }
        );
    } catch (error) {
    }
}

exports.verifyToken = (req, res) => {
  res.json({ message: 'Token válido', user: req.user });
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(id); 
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcryptjs.hash(password, 10); 

    await user.save();
    res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

