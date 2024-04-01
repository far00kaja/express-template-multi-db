"use stricts";

const { validationResult } = require("express-validator");
const { saveArticle, getArticle } = require("./service");
const response = require("../../utils/response");

const save = async (request, res) => {
  try {
    await validationResult(request).throw();
    await saveArticle(request);
    response(res, 200, "success published articles", null);
  } catch (error) {
    response(
      res,
      400,
      error.errors ? error.errors[0].msg : error.message,
      null
    );
  }
};
const getData = async (request, res) => {
  try {
    // await validationResult(request).throw();
    const data = await getArticle(request);
    response(res, 200, "success show articles", null, data);
  } catch (error) {
    response(
      res,
      400,
      error.errors ? error.errors[0].msg : error.message,
      null
    );
  }
};

module.exports = {
  save,
  getData,
};
