const express = require("express");
const redis = require("redis");
const app = express();

let publisher = redis.createClient({
  url: "redis://localhost:6379",
});

publisher.on("error", (err) => console.log("redis error", err));
publisher.on("connect", () => console.log("redis connected"));

const connect = async () => {
  await publisher.connect();
};

connect();

app.get("/", (req, res) => {
  res.send({
    message: "Publisher Active From Port 3001",
  });
});

app.get("/publish", async (req, res) => {
  const id = Math.floor(Math.random() * 10);
  const data = {
    id,
    message: `messsage-${id}`,
  };

  await publisher.publish("message", JSON.stringify(data));
  res.send({
    message: `Data Published`,
    data,
  });
});

app.listen(3001, () => {
  console.log("Publisher Server Started On 3001");
});
