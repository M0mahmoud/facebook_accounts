const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  id: String,
  phone_number: String,
  name: String,
  facebook_url: String,
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
