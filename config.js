const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  ADMIN_05: process.env.ADMIN_05,
  ADMIN_USF: process.env.ADMIN_USF,
  BOT_TOKEN: process.env.BOT_TOKEN,
  dbName: process.env.DB_NAME,
  collectionName: process.env.COLLECTION_NAME,
  FACEBOOK_DB: process.env.FACEBOOK_DB_V2,
  dbURLs: [
    // TODO: Refactor this approach
    // Each URL has 3 million of Users
    process.env.DATABASE_URL_1,
    process.env.DATABASE_URL_2,
    process.env.DATABASE_URL_3,
    process.env.DATABASE_URL_4,
    process.env.DATABASE_URL_5,
    process.env.DATABASE_URL_6,
    process.env.DATABASE_URL_7,
    process.env.DATABASE_URL_8,
    process.env.DATABASE_URL_9,
    process.env.DATABASE_URL_10,
    process.env.DATABASE_URL_11,
    process.env.DATABASE_URL_12,
    process.env.DATABASE_URL_13,
    process.env.DATABASE_URL_14,
    process.env.DATABASE_URL_15,
    process.env.DATABASE_URL_16,
    process.env.DATABASE_URL_17,
    process.env.DATABASE_URL_18,
  ],
};
