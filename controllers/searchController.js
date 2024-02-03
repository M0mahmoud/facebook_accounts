const { collectionName } = require("../config");
const { connectToDatabases } = require("../db/database");

const withIdController = async (req, res) => {
  try {
    const id = req.query.id;

    const databases = await connectToDatabases();

    let accountFound = false;
    let accounts = [];

    for (const db of databases) {
      const collection = db.collection(collectionName);
      const account = await collection.find({ id }).toArray();
      if (account.length > 0) {
        accountFound = true;
        accounts.push(...account);
      }
    }

    if (accountFound) {
      res.json({ data: accounts });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchWithPhone = async (req, res) => {
  try {
    const phoneNumber = req.query.phone;
    const phone_number = `+2${phoneNumber}`;

    const databases = await connectToDatabases();

    let accountFound = false;
    let accounts = [];

    for (const db of databases) {
      const collection = db.collection(collectionName);
      const account = await collection.find({ phone_number }).toArray();
      if (account.length > 0) {
        accountFound = true;
        accounts.push(...account);
      }
    }

    if (accountFound) {
      res.json({ data: accounts });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { withIdController, searchWithPhone };
