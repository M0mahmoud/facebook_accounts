const axios = require("axios");
const UserDB = require("../db/users");
const User = require("../models/User.Model");
const { FACEBOOK_DB, ADMIN_05, ADMIN_USF } = require("../config");

const codeSearch = async (req, res) => {
  const { code, id, key } = req.body;
  try {
    if (!key) {
      return res.json({ msg: "Value Required!" }).status(400);
    }
    await UserDB();
    const user = await User.findOne({ id });
    if (!user) {
      return res.json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" }).status(404);
    }
    if (user.code !== code) {
      return res.json({ msg: "انت غير مشترك في بوت التليجرام قم بـ الاشتراك للحصول علي كود تسجيل دخول" }).status(404);
    }
    if (user.points === 0) {
      return res.json({ msg: "عدد النقاط لديك لا يسمح بـ إجراء عمليه البحث" }).status(200);
    }
    let facebook;
    try {
      const { data } = await axios.get(`${FACEBOOK_DB}s?key=${key}`);
      facebook = data;
      if (user.id !== ADMIN_05 && user.id !== ADMIN_USF) {
        user.points = user.points - 1;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        facebook = { data: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" };
      } else {
        throw error;
      }
    }
    await user.save();
    return res.json({ facebook, points: user.points }).status(200);
  } catch (error) {
    return res.json({ msg: 'خطأ بالإتصال بالإنترنت' , error:error.message }).status(404);
  }
};

module.exports = codeSearch;
