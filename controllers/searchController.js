import axios from "axios";
import { ADMIN_05, ADMIN_USF, collectionName } from "../config.js";
import connectToDatabases from "../db/database.js";
import UserDB from "../db/users.js";
import RecentSearch from "../models/RecentSearch.Model.js";
import User from "../models/User.Model.js";

export const withIdController = async (req, res) => {
  const { code, id, facebook_id } = req.body;
  try {
    if (!facebook_id) {
      return res.json({ msg: "Value Required!" }).status(400);
    }
    await UserDB();
    const user = await User.findOne({ id });
    if (!user) {
      return res
        .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" })
        .status(404);
    }
    if (user.code !== code) {
      return res
        .json({
          msg: "انت غير مشترك في بوت التليجرام قم بـ الاشتراك للحصول علي كود تسجيل دخول",
        })
        .status(404);
    }
    if (user.points === 0) {
      return res
        .json({ msg: "عدد النقاط لديك لا يسمح بـ إجراء عمليه البحث" })
        .status(200);
    }

    let recent = await RecentSearch.findOne({ id });
    if (!recent) {
      recent = new RecentSearch({ code, id });
    }
    let keyArr = `https://www.facebook.com/profile.php/?id=${facebook_id}`;
    if (user.id !== ADMIN_05) {
      recent.key.push(keyArr);
    }
    // Save Recent Search For All.
    await recent.save();

    // const databases = await connectToDatabases();
    let accountFound = false;
    let accounts = [];

    // for (const db of databases) {
    //   const collection = db.collection(collectionName);
    //   const account = await collection.findOne({ id: facebook_id });
    //   console.log("account:", account);
    //   if (account) {
    //     accountFound = true;
    //     accounts.push(account);
    //     break;
    //   }
    // }

    axios
      .get(`http://174.129.144.145/search?term=${facebook_id}`)
      .then((response) => {
        const result = response.data;
        console.log("🚀 ~ .then ~ result:", result);
        if (!result) {
          accountFound = false;
          return res
            .status(404)
            .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" });
        } else {
          accountFound = true;
          accounts.push({
            firstname: result.data.first_name,
            lastname: result.data.last_name,
            phone: result.data.phone,
            url: result.data.url,
            id: result.data.id,
          });
        }

        if (accountFound) {
          if (user.id !== ADMIN_05 && user.id !== ADMIN_USF) {
            user.points = user.points - 1;
          }
          user.save();
          return res.json({ data: accounts, points: user.points }).status(200);
        } else {
          return res
            .status(404)
            .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" });
        }
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(404)
          .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" });
      });
  } catch (err) {
    console.error(err);
    return res
      .json({ msg: "خطأ بالإتصال بالإنترنت", error: err.message })
      .status(404);
  }
};

export const searchWithPhone = async (req, res) => {
  const { code, id, phone } = req.body;
  try {
    if (!phone) {
      return res.json({ msg: "Value Required!" }).status(400);
    }
    // const phone_number = `+2${phone}`;
    await UserDB();
    const user = await User.findOne({ id });
    if (!user) {
      return res
        .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" })
        .status(404);
    }
    if (user.code !== code) {
      return res
        .json({
          msg: "انت غير مشترك في بوت التليجرام قم بـ الاشتراك للحصول علي كود تسجيل دخول",
        })
        .status(404);
    }
    if (user.points === 0) {
      return res
        .json({ msg: "عدد النقاط لديك لا يسمح بـ إجراء عمليه البحث" })
        .status(200);
    }

    let recent = await RecentSearch.findOne({ id });
    if (!recent) {
      recent = new RecentSearch({ code, id });
    }

    if (user.id !== ADMIN_05) {
      recent.key.push(phone);
    }
    // Save Recent Search For all.
    await recent.save();

    // const databases = await connectToDatabases();
    let accountFound = false;
    let accounts = [];

    // for (const db of databases) {
    // const collection = db.collection(collectionName);
    // const account = await collection.findOne({ phone: phone_number });
    // if (account) {
    // accountFound = true;
    // accounts.push(account);
    // break;
    // }
    // }

    axios
      .get(`http://174.129.144.145/search?term=${phone}`)
      .then(async (response) => {
        const result = response.data;
        if (!result) {
          accountFound = false;
          return res
            .status(404)
            .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" });
        } else {
          accountFound = true;
          accounts.push({
            firstname: result.data.first_name,
            lastname: result.data.last_name,
            phone: result.data.phone,
            id: result.data.id,
            url: result.data.url,
          });
        }

        if (accountFound) {
          if (user.id !== ADMIN_05 && user.id !== ADMIN_USF) {
            user.points = user.points - 1;
          }
          await user.save();
          return res.json({ data: accounts, points: user.points }).status(200);
        } else {
          return res
            .status(404)
            .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" });
        }
      })
      .catch((err) => {
        console.error(err);
        return res
          .json({ msg: "خطأ بالإتصال بالإنترنت", error: err.message })
          .status(404);
      });
  } catch (err) {
    console.error(err);
    return res
      .json({ msg: "خطأ بالإتصال بالإنترنت", error: err.message })
      .status(404);
  }
};
