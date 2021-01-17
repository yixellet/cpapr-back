const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');

module.exports.login = (req, res) => {
  const { name, password } = req.body;
  User.findUserByCredentials(name, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).send({ jwt: token })
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name } = req.body;
    bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name, password: user.password,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: errorMessages.userExists});
      }
    });
};