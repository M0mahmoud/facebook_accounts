const axios = require("axios");
const UserDB = require("../db/users");
const User = require("../models/User.Model");
const { FACEBOOK_DB, ADMIN } = require("../config");

const codeSearch = async (req, res) => {
  const { code, id, key } = req.body;
  try {
    if (!key) {
      return res.json({ msg: "Value Required!" }).status(400);
    }
    await UserDB();
    const user = await User.findOne({ id });
    if (!user) {
      return res.json({ msg: "Oops, User Not Found" }).status(404);
    }
    if (user.code !== code) {
      return res.json({ msg: "Oops, Code Not Found!" }).status(404);
    }
    if (user.points === 0) {
      return res.json({ msg: "your trial has expired!" }).status(200);
    }
    let facebook;
    try {
      const { data } = await axios.get(`${FACEBOOK_DB}search?key=${key}`);
      facebook = data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        facebook = { data: "User Not Found" };
      } else {
        throw error;
      }
    }
    if (user.id !== ADMIN_05 && user.id !== ADMIN_USF) {
      user.points = user.points - 1;
    }
    await user.save();
    return res.json({ facebook, points: user.points }).status(200);
  } catch (error) {
    console.error("Internal Server Error");
    return res.json({ msg: "Internal Server Error" }).status(404);
  }
};

module.exports = codeSearch;
