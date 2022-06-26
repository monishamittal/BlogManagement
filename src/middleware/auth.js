//.................................... Import Model and jwt for using in this module ....................//
const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const ObjectId = require("mongodb").ObjectId;

//..................................... Authentication ......................................//
const Authentication = async function (req, res, next) {
  let token = req.headers["x-api-key"] || req.headers["x-Api-key"];
  if (!token)
    return res
      .status(400)
      .send({ status: false, msg: "Token must be present" });
  try {
    const decodedtoken = jwt.verify(token, "FunctionUp - Project-1");
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

//..................................... Authorisation .......................................//
const Authorisation = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["x-Api-key"];
    const decodedtoken = jwt.verify(token, "FunctionUp - Project-1");

    // Return error if blog id is not valid
    let blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
      return res.status(400).send({ status: false, msg: "Invalid Object id" });
    }
    let author = await blogModel
      .findById(blogId)
      .select({ authorId: 1, _id: 0 });

    const authorId = author.authorId.toString();
    let userLoggedIn = decodedtoken.authorId;

    if (authorId != userLoggedIn) {
      return res.status(401).send({
        status: false,
        msg: "User logged in is not allowed to modified another users data",
      });
    }
    if (!author) {
      return res
        .status(401)
        .send({ status: false, msg: "No such user exists" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

//....................................Authorisation for delete blog by query params .....................................//
const AuthorisationForQuery = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["x-Api-key"];
    const decodedtoken = jwt.verify(token, "FunctionUp - Project-1");

    // Return error if author id is not valid
    let authorId = req.query.authorId;
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).send({ status: false, msg: "Invalid Object id" });
    }
    let userLoggedIn = decodedtoken.authorId;

    if (authorId != userLoggedIn) {
      return res.status(401).send({
        status: false,
        msg: "User logged in is not allowed to modified another users data",
      });
    }
    let author = await blogModel.find({ authorId: authorId });
    if (!author) {
      return res
        .status(401)
        .send({ status: false, msg: "No such user exists" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

//........................................Making APIs public ..................................//
module.exports.Authentication = Authentication;
module.exports.Authorisation = Authorisation;
module.exports.AuthorisationForQuery = AuthorisationForQuery;
