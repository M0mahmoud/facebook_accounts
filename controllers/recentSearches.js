import UserDB from "../db/users.js";
import RecentSearch from "../models/RecentSearch.Model.js";
import User from "../models/User.Model.js";

const recentSearches = async (req, res) => {
  const { code } = req.body;
  try {
    await UserDB();
    const user = await User.findOne({ code });
    if (!user) {
      return res.json({ msg: "ادخل كود صحيح" }).status(404);
    }
    let recentSearch = await RecentSearch.findOne({ code });
    if (!recentSearch) {
      recentSearch = new RecentSearch({ code, id: user.id });
    }
    await recentSearch.save();

    res.status(200).json({ user: recentSearch });
  } catch (error) {
    return res
      .json({ msg: "خطأ بالإتصال بالإنترنت", error: error.message })
      .status(404);
  }
};

export default recentSearches;
