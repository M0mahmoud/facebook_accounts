const { connect } = require("mongoose");

async function connectDB() {
  try {
    await connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error("MongoDB Error", error);
  }
}
module.exports = connectDB;
