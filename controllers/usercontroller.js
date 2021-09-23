// const { Router } = require('express');
const router = require('express').Router();
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');

router.post('/create', (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    campaignManager: req.body.firstName + ' ' + req.body.lastName,
    role: req.body.role,
  })
    .then(function registrationSuccess(user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({
        user: user,
        message: "You're signed up!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        // res.json({ user: user })
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

              res.status(200).json({
                user: user,
                message: 'Welcome Back!',
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: 'Login Failed' });
            }
          }
        );
      } else {
        res
          .status(500)
          .json({ error: "I don't think we have you signed up yet." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/update/:id', validateSession, (req, res) => {
  const updateUser = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.req,
  };

  const query = { where: { id: req.params.id } };

  User.update(updateUser, query)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
});

router.get('/', (req, res) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error }));
});

router.delete('/delete/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };

  User.destroy(query)
    .then(() => res.status(200).json({ message: 'User removed' }))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
