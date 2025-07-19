const User = require('../models/userModel');
const Cart = require('../models/cart.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
                    sameSite: isProd ? 'None' : 'Lax', 
                    maxAge: 24 * 60 * 60 * 1000 
                  })
                  .json({ message: 'Inicio de sesión exitoso', token });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({user});
  } catch (error) {
    return res.status(500).json({
      msg:"Error al validar usuario",
      error
    })
  }
};



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
