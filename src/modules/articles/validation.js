const { checkSchema } = require("express-validator");
const logger = require("../../config/logger");

const valPostArticle = async (req, res, next) => {
  try {
    await checkSchema({
      title: {
        isLength: {
          options: { min: 8, max: 50 },
          errorMessage: "title must be 8-50 character",
        },
        notEmpty: {
          isLength: { options: { min: 8 } },
          matches: { options: /\s/ },
          errorMessage: "title must be 8-50 character",
          // contains:/\s/,
          // errorMessage: "name can not be null",
        },
      },
      description: {
        isLength: {
          options: { min: 10 },
          errorMessage: "description should be min 10, max 100 characters",
        },
        notEmpty: {
          errorMessage: "description can not be null",
        },
      },
      // authors: {
      //   notEmpty: {
      //     errorMessage: "authors can not be null",
      //   },
      // },
    }).run(req);
    next();
  } catch (error) {
    logger.info("err", error);
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  valPostArticle,
};
