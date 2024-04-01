const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = (value) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(value, salt);

  return hash;
};

const matchPassword = (value, valueHash) => {
  return bcrypt.compareSync(value, valueHash);
};

module.exports = { hashPassword, matchPassword };
