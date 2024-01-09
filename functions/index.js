const functions = require("firebase-functions");
const express = require("express");
const { rateLimit } = require("express-rate-limit");

const app = express();

const attractions = require("./src/attractions/attractions");
const market = require("./src/market/market");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/attractions", limiter, attractions);
app.use("/market", limiter, market);

exports.api = functions.https.onRequest(app);
