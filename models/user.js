const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function f(name, password) {
  return this.findOne({ name }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные логин или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные логин или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);