const globalAPI = require("./globals/index");
const AuthAPI = require("../modules/auths/router");
const ArticlesAPI = require("../modules/articles/router");

const router = require("express").Router();

router.use("/api", AuthAPI);
router.use("/api", ArticlesAPI);


module.exports = {
  globalAPI,
  router,
};
