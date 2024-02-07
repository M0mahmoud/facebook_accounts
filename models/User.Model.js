const { Schema, model } = require("mongoose");

// Define the User schema
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 5,
  },
});

const User = model("User", userSchema);

module.exports = User;
