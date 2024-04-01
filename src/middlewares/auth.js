const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const redis = require("../config/redis");
const logger = require("../config/logger");

module.exports = async (req, res, next) => {

  let token = req.get("Authorization");

  if (!token) {
    return response(res, 401, "Not Authenticated", null);
  }

  if (token.includes("Bearer")) {
    let bearerToken = token.split(" ");
    // logger.info(bearerToken);
    if (bearerToken.length < 2)
      return response(res, 401, "Not Authenticated", null);
    if (bearerToken[0] !== "Bearer")
      return response(res, 401, "Not Authenticated", null);

    bearerToken[1] = bearerToken[1].replace(" ", "");
    token = bearerToken[1];
  }
  //  else {
  //   return response(res, 401, "Not Authenticated", null);
  // }

  const isExist = await redis.exists(token);
  // logger.info('exist : ', isExist);
  if (isExist !== 1) return response(res, 401, "Not Authenticated", null);

  let checkRedis = await redis.get(token);
  // // logger.info('token baru:', token);

  redis.on("error", (err) => logger.info("Redis Client Error", err));

  let decToken;
  try {
    decToken = jwt.verify(token, process.env.JWT_KEY, {
      algorithms: "HS256",
    });
    // logger.info("decToken : ", decToken);
  } catch (error) {
    logger.info("error : ", error);
    // return response(res, 401, "Not Authenticated", null);
    if (error.message === "jwt expired")
      return response(res, 401, "Token Expired", null);
    return response(res, 500, error.message, null);
  }

  if (!decToken) {
    return response(res, 401, "Not Authenticated", null);
  }
  req.user = decToken;

  next();
};
