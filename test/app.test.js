const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000"
});
test("running test", () => {
  expect(true).toBe(true);
});

test("health check", done => {
  instance.get("/").then(resp => {
    expect(resp.data).toBe("Hello World! 3");
    done();
  });
});

test("ticker infos", done => {
  instance.get("/api/tickers").then(resp => {
    expect(resp.data).toHaveProperty("results");
    expect(resp.data.results).not.toBeNull();
    done();
  });
});
