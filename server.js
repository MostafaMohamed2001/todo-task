const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

const dbConnection = require("./config/database");
const ApiError = require("./utils/apiError");
const applyMiddlewares = require("./middlewares/appMiddleware");
const globalError = require("./middlewares/error-response.middleware");
const mountRoutes = require("./routes");

dotenv.config();

const app = express();

dbConnection();

applyMiddlewares(app);

mountRoutes(app);


app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`✅ App running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err}`);
  server.close(() => {
    console.log("💥 Server shutting down...");
    process.exit(1);
  });
});