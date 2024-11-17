const databaseName = "LibraZone";

const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    dbName: databaseName,
    uri: `mongodb://localhost:27017/${databaseName}`,
  },
};

module.exports = config;
