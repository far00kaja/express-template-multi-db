const auth = require("../../middlewares/auth");
const { register, login, verify } = require("./controller");
const { valRegister, valLogin } = require("./validation");

const router = require("express").Router();

router.post("/register", valRegister, register);
router.post("/login", valLogin, login);
router.get("/verify", auth, verify);

module.exports = router;
