const { checkSchema } = require("express-validator");

const postCompany = async (req, res, next) => {
  try {
    await checkSchema({
      name: {
        isLength: {
          options: { min: 3, max: 100 },
          errorMessage: "name should be min 3, max 100 characters",
        },
        notEmpty: {
          errorMessage: "name can not be null",
        },
      },
    }).run(req);
    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

module.exports = postCompany;
