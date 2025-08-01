import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

// Setup functions
async function setupTestDB() {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to the in-memory database
  await mongoose.connect(mongoUri);

  console.log("Connected to in-memory MongoDB for testing");
}

async function teardownTestDB() {
  // Close database connection
  await mongoose.disconnect();

  // Stop the in-memory MongoDB instance
  if (mongoServer) {
    await mongoServer.stop();
  }

  console.log("Disconnected from test database");
}

async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}

// Setup before all tests
before(async function () {
  this.timeout(60000); // Increase timeout for database setup
  await setupTestDB();
});

// Cleanup after all tests
after(async function () {
  this.timeout(60000); // Increase timeout for cleanup
  await teardownTestDB();
});

// Clear all collections before each test
beforeEach(async function () {
  await clearDatabase();
});
