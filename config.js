const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  dbName: process.env.DB_NAME,
  collectionName: process.env.COLLECTION_NAME,
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
  ],
};
