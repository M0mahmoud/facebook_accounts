const express = require("express");
const { rateLimit } = require("express-rate-limit");
const { PORT } = require("./config");

const {
  searchWithPhone,
  withIdController,
} = require("./controllers/searchController");
const codeSearch = require("./controllers/codeSearch");
const authController = require("./controllers/authController");
const fakeCall = require("./controllers/fakeCall");

const app = express();
app.use(express.json());

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

app.get("/login", authController);
app.get("/search", codeSearch);
app.get("/withphone", searchWithPhone);
app.get("/withId", withIdController);
app.post("/call", fakeCall);

app.use("/", (_req, res) => {
  res.json({ msg: "Server running..." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
