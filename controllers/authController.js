const UserDB = require("../db/users");
const User = require("../models/User.Model");

const authController = async (req, res) => {
  const code = req.body.code;

  try {
    await UserDB();
    // Check if the user exists
    let user = await User.findOne({ code }).select("-_id -__v");
    if (!user) {
      return res.json({ msg: "Oops, Code Not Found!" }).status(404);
    }
    res.json(user).status(200);
  } catch (error) {
    console.error("Error generating code:", error);
  }
};
module.exports = authController;
