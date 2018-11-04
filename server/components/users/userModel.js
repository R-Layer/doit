const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    default: "Jhon Smith"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  days: {
    type: Array,
    required: true
  },
  contacts: {
    type: Array
  },
  avatarImage: {
    binaryData: Buffer,
    mimeType: String
  },
  avatarPath: {
    type: String,
    default: "public/placeholder.png"
  }
});

module.exports = mongoose.model("User", userSchema);
