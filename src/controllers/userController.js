const User = require('../models/userModel');
const Cart = require('../models/cart.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'Usuario ya existe' });

//     const user = await User.create({ name, email, password: await bcryptjs.hash(password, 10) });
//     const newCart = await Cart.create({ user: user._id });
//     res.status(201).json({ id: user._id, token: generateToken(user._id) });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.registerUser = async (req, res) => {
    // obtener usuario, email y password de la petición
  const { name, email, password } = req.body;
  try {
    // Generemos un fragmento aleatorio para usarse con el password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newCart = await Cart.create({});

    const respuestaDB = await User.create({
      name,
      email,
      password: hashedPassword,
      cart: newCart
    });
    // usuario creado
    return res.json(respuestaDB);
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};


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
            { expiresIn: '1d' },
            (error, token) => {
                if (error) throw error
                const isProd = process.env.NODE_ENV === 'production';
                res
                  .cookie('token', token, {
                    httpOnly: true,
                    secure: isProd, 
                    sameSite: isProd ? 'None' : 'Lax', // 'None' for cross-site cookies in production
                    maxAge: 24 * 60 * 60 * 1000 // 30 minutes
                  })
                  .json({ message: 'Inicio de sesión exitoso' });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.verifyToken = (req, res) => {
  res.json({ message: 'Token válido', user: req.user });
};

// exports.updateUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id); 
//     if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (password) user.password = await bcryptjs.hash(password, 10); 

//     await user.save();
//     res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateUser = async (req, res) => {
  const newDataForOurUser = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      newDataForOurUser,
      { new: true }
    ).select("-password");

    res.json({
      msg: "Usuario actualizado con éxito.",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hubo un error actualizando el usuario.",
    });
  }
};

// exports.updateUser = async (req, res) => {
//   const newDataForOurUser = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       newDataForOurUser,
//       { new: true }
//     ).select("-password");
//     res.json({
//       msg: "Usuario actualizado con éxito.",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Hubo un error actualizando el usuario.",
//     });
//   }
// };

exports.logout = (req, res) => {
res.clearCookie('token', {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
})
return res.json({ msg: 'Logout sucessful' });
}
