const redis = require("redis");
const subscribe = redis.createClient({ url: "redis://127.0.0.1:6380" });

(async () => {
  try {
    await subscribe.connect();
    console.log("connected");
  } catch (err) {
    console.error(err);
  }
})();

const express = require("express");
const app = express();

subscribe.pSubscribe("__key*__:*");
subscribe.on("pmessage", (message, channel) => {  //TODO: bug in here
  return console.log("message::::", message);
});

app.listen(3001, () => {
  console.log("Order service running at 3001");
});
