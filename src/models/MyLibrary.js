const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myLibrarySchema = new Schema({
  bookUuid: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
    max: 255,
  },
  bookAuthor: {
    type: String,
    required: true,
    max: 255,
  },
  bookImage: {
    type: String,
    required: true,
  },
  bookRate: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("MyLibrary", myLibrarySchema);
