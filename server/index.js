const path = require("path");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { sha256 } = require("js-sha256");
const Shopify = require("./shopify");

const PORT = process.env.PORT || 3000;

const app = express(); // create express app

app.options("*", cors());

const { SHOP, API_SECRET_KEY, API_KEY, SCOPES, HOST_APP } = process.env;

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
// Authentication and Authorization Middleware
const auth = function (req, res, next) {
  console.log("req.session auth", req.session.token);
  if (req.session.token === undefined) {
    res.send(401, {
      code: 401,
      message: "no authorization",
    });
  }

  return next();
};

app.get("/install", async (req, res) => {
  const urlCallback = Shopify.makeRedirectURL(
    SHOP,
    API_KEY,
    SCOPES,
    `https://${HOST_APP}/auth/callback`
  );
  res.redirect(urlCallback);
});

app.get("/products", cors(), async (req, res) => {
  const {
    headers: { authorization },
  } = req;
  const token = (authorization != undefined) ? authorization.replace("Bearer ", "") : '';
  try {
    const response = await Shopify.products(
      SHOP,
      token,
    ).then((response) => response.data);
    res.json({
      code: 200,
      message: null,
      products: response.products,
    });
  } catch (error) {
    console.log("sdasdsa",error.response)
    if(error.response.status == 401) {
      res.status(401).json({
        code: 401,
        message: error.response.statusText,
      });
    }
    
    res.status(400).json({
      code: 400,
      message: error.response,
    });
  }
});

app.get("/auth", cors(), async (req, res) => {
  try {
    const { query } = req;
    const hmac = query.hmac;
    delete query.hmac;
    const params = new URLSearchParams(query);
    Shopify.verifyHmac(hmac, API_SECRET_KEY, params.toString());
    const response = await Shopify.requestAccessToken(
      query,
      API_KEY,
      API_SECRET_KEY
    );
    res.json({
      code: 200,
      message: "authorization",
      token: response.data.access_token,
    });
  } catch (error) {
    console.log("Login::error", error);
    res.status(401).send({
      code: 401,
      message: "no authorization",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
