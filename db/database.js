const { MongoClient } = require("mongodb");
const { dbName, dbURLs } = require("../config");

async function connectToDatabases() {
  const databases = [];

  // Connect to each database in parallel
  await Promise.all(
    dbURLs.map(async (url) => {
      try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        databases.push(db);
      } catch (error) {
        console.error(`Failed to connect to database: ${error.message}`);
      }
    })
  );

  return databases;
}

module.exports = { connectToDatabases };
