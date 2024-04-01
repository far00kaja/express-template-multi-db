"use stricts";
const {
  findFirstByUsername,
  findByUsername,
} = require("../../modules/auths/repositories");
const Model = require("./models");
const jwt = require("jsonwebtoken");
const rsmq = require("../../config/rsmq");

const saveArticle = async (request) => {
  try {
    const { title, description } = request.body;
    const auth = request.get("Authorization").split(" ")[1];
    const decToken = await jwt.verify(auth, process.env.JWT_KEY, {
      algorithms: "HS256",
    });
    const authors = decToken.data.username;
    const isExist = await findByUsername(authors);
    if (!isExist) {
      throw new Error("authors not found");
    }
    const data = new Model({
      authors: isExist.id,
      description: description,
      title: title,
      slug: title.split(" ").join("-"),
    });
    try {
      const dataToSave = await data.save();
      await rsmq.sendMessage("getArticle", dataToSave);
      return dataToSave;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const getArticle = async (request) => {
  try {
    const auth = request.get("Authorization").split(" ")[1];
    const decToken = await jwt.verify(auth, process.env.JWT_KEY, {
      algorithms: "HS256",
    });

    const authors = decToken.data.username;
    const isExist = await findByUsername(authors);
    if (!isExist) {
      throw new Error("authors not found");
    }
    await rsmq
      .getQueueAttributes("getArticle")
     // if (!getAll) {
    //   await rsmq.createQueue("getArticle");
    // }
    const data = await Model.find(
      {
        authors: isExist.id,
      },
      {},
      {
        sort: { createdAt: -1 },
      }
    );

    let result = {
      authors: isExist,
      articles: data,
    };

    try {
      return result;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { saveArticle, getArticle };
