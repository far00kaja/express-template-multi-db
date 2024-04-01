require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./src/config/logger");
const redis = require("./src/config/redis");
require("./src/config/mongoose");

redis.connect();
redis.on("error", (error) => {
  console.error(`Redis client error:`, error);
});

const PORT = process.env.PORT || 3000;
require("./src/config/sequelize");

require("./src/config/rsmq"); //connect rsmq

const router = require("./src/router/index");
const writeLogger = require("./src/middlewares/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(writeLogger);
app.use(router.globalAPI);
app.use(router.router);
app.use("/**", (req, res) => {
  res.status(404).send({
    status: false,
    message: "not found",
  });
});

module.exports = app;
// app.listen(PORT, () => logger.info(`you are listened localhost:${PORT}`));
