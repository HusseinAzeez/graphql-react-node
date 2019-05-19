const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = Schema({
  name: String,
  age: String,
});

module.exports = mongoose.model('authors', authorSchema);
