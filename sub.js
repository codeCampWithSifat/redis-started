const redis = require("redis");

(async () => {
  let subscriber = redis.createClient({
    url: "redis://localhost:6379",
  });

  subscriber.on("error", (err) => console.log("redis error", err));
  subscriber.on("connect", () => console.log("redis connected"));

  await subscriber.connect();
  await subscriber.subscribe("message", (data) => {
    console.log(data);
  });
})();
