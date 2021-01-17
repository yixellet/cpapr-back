const mongoose = require('mongoose');
const validator = require('validator');

const newItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: false,
    validate: {
      validator(link) {
        return validator.isURL(link,
          {
            protocols: ['http', 'https'],
            require_protocol: true,
            require_host: true,
          }
        );
      }
    }
  }
})

module.exports = mongoose.model('newItem', newItemSchema);
