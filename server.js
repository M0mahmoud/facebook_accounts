const { config } = require("dotenv");
const express = require("express");
const { MongoClient } = require("mongodb");

config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

async function connectDB() {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    console.log("MongoDB Connected");
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw error;
  }
}

app.get("/withphone", async (req, res) => {
  try {
    const phoneNumber = req.query.phone;
    let phone_number = `+2${phoneNumber}`;

    console.log("phone_number:", phone_number);

    const db = await connectDB();
    const accountsCollection = db.collection(process.env.COLLECTION_NAME);

    const account = await accountsCollection.find({ phone_number }).toArray();

    if (account.length > 0) {
      res.json({ data: account });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/withId", async (req, res) => {
  try {
    const id = req.query.id;

    console.log("userID:", id);

    const db = await connectDB();
    const accountsCollection = db.collection(process.env.COLLECTION_NAME);

    const account = await accountsCollection.find({ id }).toArray();

    if (account.length > 0) {
      res.json({ data: account });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/", (_req, res) => {
  res.json({ msg: "Server running...", dev: "https://t.me/dev_mahmoud_05" });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
