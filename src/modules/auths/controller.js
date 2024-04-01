"use stricts";

const { validationResult } = require("express-validator");
const { registerAuths, loginAuths, verifyAuths } = require("./service");
const response = require("../../utils/response");
const logger = require("../../config/logger");

const register = async (request, response) => {
  try {
    await validationResult(request).throw();
    await registerAuths(request.body);
    response.send({
      status: true,
      message: "success registered",
    });
  } catch (error) {
    logger.info("error con:", error);
    response.status(400).send({
      status: false,
      message: error.errors ? error.errors[0].msg : error.message,
    });
  }
};

const login = async (request, response) => {
  try {
    await validationResult(request).throw();
    const result = await loginAuths(request.body);
    response.send({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    logger.info("error con:", error);
    response.status(400).send({
      status: false,
      message: error.errors ? error.errors[0].msg : error.message,
    });
  }
};

const verify = async (request, res) => {
  try {
    const result = await verifyAuths(request.get("Authorization"));
    logger.info(result);
    response(
      res,
      200,
      {
        status: true,
        message: result,
      },
      null
    );
    // response.send({
    //   status: true,
    //   message: result,
    // });
  } catch (error) {
    logger.info("error con:", error);
    response.status(400).send({
      status: false,
      message: error.errors ? error.errors[0].msg : error.message,
    });
  }
};

module.exports = {
  register,
  login,
  verify,
};
