// const jwt = require('jsonwebtoken');
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({ message: 'No se proporciona ningún token' });
//     }
//     const token = authHeader.split(' ')[1]; // Extrae el token después de "Bearer"
//     if (!token) {
//         return res.status(401).json({ message: 'Formato de token Inválido' });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Tokén inválido o expirado' });
//         }
//         req.user = decoded; // Guarda la info del usuario en `req.user`
//         next();
//     });
// };
// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }

  try {
    const openToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = openToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token", error });
  }
};