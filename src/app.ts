import express = require("express");
import axios from "axios";
import { CurrencyInfo } from "./types/CurrencyInfo";

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

api.get("/tickers", async function(req, res) {
  const promises = keyPairs.map(k => getCurrencyInfo(k));

  return res.json({
    results: await Promise.all(promises)
  });
});

app.get("/", function(req, res) {
  res.send("Hello World! 3");
});

app.use("/api", api);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
