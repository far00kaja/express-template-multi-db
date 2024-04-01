"use stricts";

const { auths } = require("../../config/sequelize");

const findFirstByUsername = async (username) => {
  const result = await auths.findOne({
    where: { username: username },
    // attributes: ["username", "id"],
  });
  return result;
};

const findByUsername = async (username) => {
  const result = await auths.findOne({
    where: { username: username },
    attributes: ["username", "id"],
  });
  return result;
};

const save = async (request) => {
  try {
    const result = auths.create(request);
    return result;
  } catch (error) {
    throw new error();
  }
};

async function disconnect() {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

module.exports = {
  findFirstByUsername,
  save,
  findByUsername
};
