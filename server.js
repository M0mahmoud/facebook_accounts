const express = require("express");
const { PORT } = require("./config");
const TelegramBot = require("node-telegram-bot-api");
const UserDB = require("./db/users");
const User = require("./models/User.Model");

const {
  searchWithPhone,
  withIdController,
} = require("./controllers/searchController");
const codeSearch = require("./controllers/codeSearch");
const authController = require("./controllers/authController");

const app = express();
app.use(express.json());

// Set up CORS headers
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/login", authController);
app.get("/search", codeSearch);
app.get("/withphone", searchWithPhone);
app.get("/withId", withIdController);

app.use("/", (_req, res) => {
  res.json({ msg: "Server running...", dev: "https://t.me/dev_mahmoud_05" });
});

// Telegram Bot
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/generatecode/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const randomCode = Math.random().toString(36).substring(2, 12);

  try {
    await UserDB();
    let user = await User.findOne({ id: chatId });
    if (!user) {
      user = new User({ username, id: msg.from.id, code: randomCode });
      await user.save();
      bot.sendMessage(
        chatId,
        `Hello, ${username}
Your registration code is: *\`${randomCode}\`*\n 
Login Within In Our App`,
        {
          parse_mode: "MarkdownV2",
        }
      );
    } else {
      const oldCode = user.code;
      bot.sendMessage(
        chatId,
        `Hello, ${username}
Your registration code is: *\`${oldCode}\`*\n 
Login Within In Our App`,
        {
          parse_mode: "MarkdownV2",
        }
      );
    }
  } catch (error) {
    console.log("Error generating code:", error);
    bot.sendMessage(chatId, "An error occurred while generating the code.");
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const message = `Welcome ${username}, 
To generate your login code, please click \/generatecode
contact us [Here](https://t.me/dev_mahmoud_05)`;
  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
