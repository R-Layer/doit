const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timezonesSchema = new Schema({
  fromTime: {
    type: String,
    required: true
  },
  toTime: {
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
  key: {
    type: Number,
    required: true
  }
});

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
  timezones: {
    type: [timezonesSchema],
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
