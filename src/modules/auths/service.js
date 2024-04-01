"use stricts";
const jwt = require("jsonwebtoken");
const { findFirstByUsername, save } = require("./repositories");
const bcrypt = require("../../config/bcrypt");
const redisClient = require("../../config/redis");
const redis = require("redis");
const logger = require("../../config/logger");
const registerAuths = async (request) => {
  try {
    const { username, password, name } = request;
    const isExist = await findFirstByUsername(username);
    if (isExist) {
      throw new Error("username already exists");
    }

    const hash = bcrypt.hashPassword(password);
    const data = {
      username: username,
      password: hash,
      name: name,
    };

    const create = await save(data);
    return create;
  } catch (error) {
    throw error;
  }
};
const loginAuths = async (request) => {
  try {
    const { username, password } = request;
    const isExist = await findFirstByUsername(username);
    if (!isExist) {
      throw new Error("username or password invalid");
    }

    const newPassword = bcrypt.matchPassword(password, isExist.password);
    let token = jwt.sign(
      {
        data: {
          username: username,
          name: isExist.name,
        },
      },
      process.env.JWT_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    if (newPassword) {
      const data = JSON.stringify({
        username: username,
        name: isExist.name,
        token: token,
      });
      jwt.verify(
        token,
        process.env.JWT_KEY,
        {
          algorithms: "HS256",
        },
        function (err, decoded) {
          logger.info("err:", err);
          logger.info("token:", decoded);
        }
      );

      //set redis
      await redisClient.set(token, JSON.stringify(data), {
        EX: 60*60,
        NX: true,
      });
      return JSON.parse(data);
    }
    throw new Error("username or password invalid");
  } catch (error) {
    throw error;
  }
};

const verifyAuths = async (request) => {
  try {
    const token = request.split(" ")[1];
    logger.info(token);
    const decToken = jwt.verify(token, process.env.JWT_KEY, {
      algorithms: "HS256",
    });

    // const check = await redisClient.get(token);
    // if (check){
    //   await redisClient.del(token);
    // }
    // await redisClient.set(token, check, {
    //   EX: 60*60,
    //   NX: true,
    // });
    return decToken;
  } catch (error) {
    throw error;
  }
};
module.exports = { registerAuths, loginAuths, verifyAuths };
