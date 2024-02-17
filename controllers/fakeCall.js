const { ADMIN_USF, ADMIN_05 } = require("../config");
const UserDB = require("../db/users");
const Call = require("../models/Call.Model");
const User = require("../models/User.Model");
const { createHash } = require("crypto");

const fakeCall = async (req, res) => {
  const phoneNumber = req.body.phone;
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
      const generatedId = generateRandomString(5, "1234567890");
      const requestData = prepareRequestData(phoneNumber, generatedId);
      const message = await sendRequest(requestData, callCode, user);

      await callCode.save();
      return res
        .json({
          message,
          points: callCode.points,
        })
        .status(200);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "خطأ بالإتصال بالإنترنت" });
    }
  } catch (error) {
    return res
      .json({ msg: "خطأ بالإتصال بالإنترنت", error: error.message })
      .status(404);
  }
};

async function sendRequest(data, callCode, user) {
  const url = "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp";
  const headers = {
    Host: "account-asia-south1.truecaller.com",
    "content-type": "application/json",
    "content-length": Buffer.from(JSON.stringify(data)).length.toString(),
    "accept-encoding": "gzip",
    "user-agent": "Truecaller/11.37.6 (Android;11)",
    clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const { message } = result;
    if (message === "Sent") {
      if (user.id !== ADMIN_05 && user.id !== ADMIN_USF) {
        callCode.points = callCode.points - 1;
      }
    }
    return message;
  } catch (error) {
    return res.json({ message: "خطأ بالإتصال بالإنترنت" });
  }
}

function generateRandomString(length, characters) {
  const der = Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
  const pas = createHash("md5").update(der).digest("hex");
  return pas.slice(16);
}

function prepareRequestData(phone, generatedId) {
  return {
    countryCode: "eg",
    dialingCode: 20,
    installationDetails: {
      app: {
        buildVersion: 6,
        majorVersion: 11,
        minorVersion: 37,
        store: "GOOGLE_PLAY",
      },
      device: {
        deviceId: generatedId,
        language: "ar",
        manufacturer: "Xiaomi",
        mobileServices: ["GMS"],
        model: "M2101K7BG",
        osName: "Android",
        osVersion: "11",
        simSerials: ["", ""],
      },
      language: "ar",
      sims: [
        { mcc: "602", mnc: "3", operator: "etisalat" },
        { mcc: "602", mnc: "1", operator: "Orange EG" },
      ],
    },
    phoneNumber: phone,
    region: "region-2",
    sequenceNo: 1,
  };
}

module.exports = fakeCall;
