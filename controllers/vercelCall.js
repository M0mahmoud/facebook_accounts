import axios from "axios";

import UserDB from "../db/users.js";
import Call from "../models/Call.Model.js";
import User from "../models/User.Model.js";

const CALL_ENDPOINT = "https://sms-call.vercel.app/api/call";

const varcelCall = async (req, res) => {
  const phone = req.body.phone;
  const code = req.body.code;
  try {
    await UserDB();
    const user = await User.findOne({ code });
    if (!user) {
      return res
        .json({
          msg: "انت غير مشترك في بوت التليجرام قم بـ الاشتراك للحصول علي كود تسجيل دخول",
        })
        .status(404);
    }
    let callCode = await Call.findOne({ code });
    if (!callCode) {
      callCode = new Call({ code });
    }
    if (callCode.points === 0) {
      return res
        .json({ msg: "عدد النقاط لديك لا يسمح بـ إجراء عمليه البحث" })
        .status(200);
    }

    try {
      const response = await axios.post(
        CALL_ENDPOINT,
        { phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { message } = response.data;

      await callCode.save();
      return res
        .json({
          message,
          points: callCode.points,
        })
        .status(200);
    } catch (error) {
      console.error(error);
      return res.json({ message: "خطأ بالإتصال بالإنترنت" });
    }
  } catch (error) {
    return res
      .json({ msg: "خطأ بالإتصال بالإنترنت", error: error.message })
      .status(404);
  }
};

export default varcelCall;
