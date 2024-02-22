const { MongoClient } = require("mongodb");
const { dbName, dbURLs } = require("../config");

async function connectToDatabases() {
  const databases = [];

  // Connect to each database in parallel
  await Promise.all(
    dbURLs.map(async (url, index) => {
      try {
        const client = new MongoClient(url, {
          maxPoolSize: 19,
          minPoolSize: 1,
        });
        await client.connect();
        const db = client.db(dbName);
        databases.push(db);
        console.log(`Successfully: ${index}`);
      } catch (error) {
        console.error(
          `Failed to connect to database at ${index}: ${error.message}`
        );
      }
    })
  );

  return databases;
}

module.exports = { connectToDatabases };
