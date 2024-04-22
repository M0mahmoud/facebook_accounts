import express, { json } from "express";
import { rateLimit } from "express-rate-limit";
import { PORT } from "./config.js";

import authController from "./controllers/authController.js";
import codeSearch from "./controllers/codeSearch.js";
import fakeCall from "./controllers/fakeCall.js";
import recentSearches from "./controllers/recentSearches.js";
import {
  searchWithPhone,
  withIdController,
} from "./controllers/searchController.js";
import varcelCall from "./controllers/vercelCall.js";

const app = express();
app.use(json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 5 requests per window
});

app.use(limiter);

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

// app.post("/vercel", varcelCall);

app.get("/login", authController);
app.get("/search", codeSearch);
app.post("/withphone", searchWithPhone);
app.post("/withid", withIdController);
app.post("/call", varcelCall);
app.post("/recentsearches", recentSearches);

app.use("/", (_req, res) => {
  res.json({ msg: "Server running..." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
