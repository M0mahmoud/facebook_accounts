const UserDB = require("../db/users");
const RecentSearch = require("../models/RecentSearch.Model");

const recentSearches = async (req, res) => {
  const { code } = req.body;
  try {
    await UserDB();
    const user = await RecentSearch.findOne({ code });
    if (!user) {
      return res
        .json({ msg: "هذا الحساب غير متوفر في البيانات المسجلة لدينا" })
        .status(404);
    }

    res.status(200).json({ user });
  } catch (error) {
    return res
      .json({ msg: "خطأ بالإتصال بالإنترنت", error: error.message })
      .status(404);
  }
};

module.exports = recentSearches;
