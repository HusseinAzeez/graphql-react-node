const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = Schema({
  title: String,
  genre: String,
  authorId: String,
});

module.exports = mongoose.model('books', bookSchema);
