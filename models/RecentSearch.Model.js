const { Schema, model } = require("mongoose");

// Define the User schema
const keySchema = new Schema({
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
  key: [
    {
      type: String,
    },
  ],
});

const RecentSearch = model("RecentSearch", keySchema);

module.exports = RecentSearch;
