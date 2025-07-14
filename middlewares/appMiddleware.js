const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const applyMiddlewares = (app) => {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`Server running in ${process.env.NODE_ENV} mode`);
  }
  // Parse JSON and URL-encoded bodies
  app.use(express.json());
  app.use(bodyParser.json({ limit: "20kb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  // Serve static files (e.g., uploaded images)
  app.use(express.static(path.join(__dirname, "../uploads")));

  // Apply rate limiting to all /api routes
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests. Please try again after 15 minutes.",
  });
  app.use("/api", limiter);
};
module.exports = applyMiddlewares;
