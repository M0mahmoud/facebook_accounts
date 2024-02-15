const { Schema, model } = require("mongoose");

// Define the User schema
const CallSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  lastCallTime: {
    type: String,
  },
  points: {
    type: Number,
    default: 3,
  },
});

const Call = model("Call", CallSchema);

module.exports = Call;
