const Logger = require("../config/logger");
const writeLogger = (req, res, next) => {
  let databody = JSON.stringify(req.body);
  databody = JSON.parse(databody);
  if (databody.password) {
    databody.password = "x x x x x";
    databody.confirmPassword = "x x x x x";
  }
  const dataLog = JSON.stringify({
    requestDate: new Date().getTime(),
    host: req.headers.host,
    authorization: req.headers.authorization,
    acceptLanguage: req.headers["accept-language"],
    method: req.method,
    body: databody,
  });
  Logger.info(dataLog);
  next();
};

module.exports = writeLogger;
