const mongoose = require("mongoose");

const dbConnection = () => {
  const DB_URI = process.env.DB_URI;

 
  mongoose
    .connect(DB_URI)
    .then((conn) => {
      console.log(`✅ Database connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database connection error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = dbConnection;