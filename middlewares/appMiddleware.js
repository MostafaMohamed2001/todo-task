const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const applyMiddlewares = (app) => {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`Server running in ${process.env.NODE_ENV} mode`);
  }

  app.use(express.json());
  app.use(bodyParser.json({ limit: "20kb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, "../uploads")));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests. Please try again after 15 minutes.",
  });
  app.use("/api", limiter);
};
module.exports = applyMiddlewares;
