const { sha256 } = require('js-sha256');
const axios = require("axios");
module.exports = {
  makeRedirectURL(shop, key, scopes, urlCallback) {
    return `https://${shop}/admin/oauth/authorize?client_id=${key}&scope=${scopes}&redirect_uri=${urlCallback}`;
  },
  verifyHmac(hmac, secretKey, message) {
    const computedHmac = sha256.hmac(secretKey, message);
    if (hmac !== computedHmac)
      throw new Error("HMAC verification failed!");
  },
  async requestAccessToken(query, client_id, client_secret) {
    return await axios.post(`https://${query.shop}/admin/oauth/access_token`, {
      client_id,
      client_secret,
      code: query.code,
    });
  },
  async products(shop, token, query) {
    const url = `https://${shop}/admin/api/2021-07/products.json`;
    return await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': token
      }
    })
  }
}