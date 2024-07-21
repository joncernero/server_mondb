// const jwt = require('jsonwebtoken');
// const Models = require('../models');

// const validateSession = (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log('token -->', token);
//   if (!token) {
//     return res.status(403).send({ auth: false, message: 'No token provided' });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
//       if (!err && decodeToken) {
//         Models.User.findOne({
//           where: {
//             id: decodeToken.id,
//           },
//         })
//           .then((user) => {
//             if (!user) throw err;
//             console.log(user);
//             req.user = user;
//             return next();
//           })
//           .catch((err) => next(err));
//       } else {
//         req.errors = err;
//         return res.status(500).send('You Shall Not Pass!');
//       }
//     });
//   }
// };

// module.exports = validateSession;

const { jwtVerify } = require('jose');
const Models = require('../models');

const validateSession = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('token -->', token);
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  } else {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      Models.User.findOne({
        where: {
          id: payload.id,
        },
      })
        .then((user) => {
          if (!user) throw new Error('User not found');
          console.log(user);
          req.user = user;
          return next();
        })
        .catch((err) => next(err));
    } catch (err) {
      req.errors = err;
      return res.status(500).send('You Shall Not Pass!');
    }
  }
};

module.exports = validateSession;
