// // const { Router } = require('express');
// const router = require('express').Router();
// const { User } = require('../models/index');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const validateSession = require('../middleware/validate-session');
// const validateAdmin = require('../middleware/validate-admin');

// router.post('/create', validateSession, validateAdmin, (req, res) => {
//   User.create({
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 13),
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     campaignManager: req.body.firstName + ' ' + req.body.lastName,
//     role: req.body.role,
//   })
//     .then((user) => {
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24,
//       });

//       res.status(200).json({
//         user: user,
//         message: "You're signed up!",
//         sessionToken: token,
//       });
//     })
//     .catch((err) => res.status(500).json({ error: err }));
// });

// router.post('/login', (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((user) => {
//       if (user) {
//         // res.json({ user: user })
//         bcrypt.compare(
//           req.body.password,
//           user.password,
//           function (err, matches) {
//             if (matches) {
//               let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//                 expiresIn: 60 * 60 * 24,
//               });

//               res.status(200).json({
//                 user: user,
//                 message: 'Welcome Back!',
//                 sessionToken: token,
//               });
//             } else {
//               res.status(502).send({ error: 'Login Failed' });
//             }
//           }
//         );
//       } else {
//         res
//           .status(500)
//           .json({ error: "I don't think we have you signed up yet." });
//       }
//     })
//     .catch((err) => res.status(500).json({ error: err }));
// });

// router.put('/update/:id', validateSession, (req, res) => {
//   const updateUser = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     campaignManager: req.body.firstName + ' ' + req.body.lastName,
//     role: req.body.role,
//   };

//   const query = { where: { id: req.params.id } };

//   User.update(updateUser, query)
//     .then((user) => res.status(200).json(user))
//     .catch((error) => res.status(500).json(error));
// });

// router.get('/', (req, res) => {
//   User.findAll()
//     .then((users) => res.status(200).json(users))
//     .catch((error) => res.status(500).json(error));
// });

// router.delete('/delete/:id', validateSession, validateAdmin, (req, res) => {
//   const query = { where: { id: req.params.id } };

//   User.destroy(query)
//     .then(() => res.status(200).json({ message: 'User removed' }))
//     .catch((error) => res.status(500).json(error));
// });
// module.exports = router;
const router = require('express').Router();
const { User } = require('../models/index');
const { SignJWT } = require('jose');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const validateAdmin = require('../middleware/validate-admin');
const { TextEncoder } = require('util'); // Required for encoding the secret key

// Utility function to create a JWT
const createToken = async (userId) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';

  const token = await new SignJWT({ id: userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
};

router.post('/create', validateSession, validateAdmin, async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      campaignManager: req.body.firstName + ' ' + req.body.lastName,
      role: req.body.role,
    });

    const token = await createToken(user.id);

    res.status(200).json({
      user: user,
      message: "You're signed up!",
      sessionToken: token,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      const matches = await bcrypt.compare(req.body.password, user.password);
      if (matches) {
        const token = await createToken(user.id);

        res.status(200).json({
          user: user,
          message: 'Welcome Back!',
          sessionToken: token,
        });
      } else {
        res.status(502).send({ error: 'Login Failed' });
      }
    } else {
      res
        .status(500)
        .json({ error: "I don't think we have you signed up yet." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/update/:id', validateSession, async (req, res) => {
  const updateUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    campaignManager: req.body.firstName + ' ' + req.body.lastName,
    role: req.body.role,
  };

  const query = { where: { id: req.params.id } };

  try {
    const user = await User.update(updateUser, query);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete(
  '/delete/:id',
  validateSession,
  validateAdmin,
  async (req, res) => {
    const query = { where: { id: req.params.id } };

    try {
      await User.destroy(query);
      res.status(200).json({ message: 'User removed' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
