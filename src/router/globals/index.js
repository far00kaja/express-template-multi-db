const router = require("express").Router();
const rsmq = require("../../config/rsmq");
const logger = require("../../config/logger");
const postCompany = require("../../modules/companies/validation");
const { validationResult } = require("express-validator");
router.get("/ping", async (request, response) => {
  try {
    const startTime = new Date().getTime();

    response.send({
      status: true,
      message: "PONG",
      latency: new Date().getTime() - startTime,
    });
  } catch (error) {
    response.status(400).send({
      status: false,
      message: error.errors,
    });
  }
});

router.get("/job", async (req, res) => {
  logger.info("sending message");

  await rsmq.sendMessage("test1", `Hello World at ${new Date().toISOString()}`);
  await rsmq.receivedMessage("test1");

  logger.info("pushed new message into queue");
  res.send("success");
});

module.exports = router;
