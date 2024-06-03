import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const ADMIN_05 = process.env.ADMIN_05;
export const ADMIN_USF = process.env.ADMIN_USF;
export const BOT_TOKEN = process.env.BOT_TOKEN;
export const dbName = process.env.DB_NAME;
export const collectionName = process.env.COLLECTION_NAME;
export const FACEBOOK_DB = process.env.FACEBOOK_DB_V2;
export const dbURLs = [
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
];
