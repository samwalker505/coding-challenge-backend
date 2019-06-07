import express = require("express");
import axios from "axios";
import * as redis from "redis";
import { CurrencyInfo } from "./types/CurrencyInfo";

import { promisify } from "util";

const client = redis.createClient({
  host: "redis"
});

client.on("error", function(err) {
  console.log("Redis Error:", err); // errors here
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const keyPairs = [
  "btc-usd",
  "eth-usd",
  "ltc-usd",
  "xmr-usd",
  "xrp-usd",
  "doge-usd",
  "dash-usd",
  "maid-usd",
  "lsk-usd",
  "storj-usd"
];

const instance = axios.create({
  baseURL: "https://www.cryptonator.com/api"
});

async function getCurrencyInfo(currencyPair: string): Promise<CurrencyInfo> {
  const { data } = await instance.get<CurrencyInfo>(`/ticker/${currencyPair}`);
  return data;
}

const app = express();

const api = express.Router();

api.get("/tickers", async function(req, res, next) {
  let results: CurrencyInfo[];
  results = JSON.parse(await getAsync("tickers"));
  if (!results) {
    try {
      console.log("from external api");
      const promises = keyPairs.map(k => getCurrencyInfo(k));
      results = await Promise.all(promises);
      const expireTime = Math.min(
        30,
        new Date().getTime() / 1000 - results[0].timestamp
      );
      console.log(`set expire time ${expireTime}`);
      await setAsync(
        "tickers",
        JSON.stringify(results),
        "EX",
        Math.floor(expireTime)
      );
    } catch (err) {
      next(err);
    }
  } else {
    console.log("from cache");
  }
  return res.json({
    results
  });
});

app.get("/", function(req, res) {
  res.send("Hello World! 3");
});

app.use("/api", api);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, function() {
  console.log("Finddoc Backend listening on port 3000!");
});
