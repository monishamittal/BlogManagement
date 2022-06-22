const { urlencoded } = require("express");
const authorModel = require("../models/authorModel");

const validateAuthorFields = async function (req, res, next) {
  let data = req.body;
  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Missing all fields." });
  } else {
    const { fname, lname, title, email, password } = req.body;
    let msg = "";
    if (!fname) msg = "First Name is required";
    if (!lname) msg = "Last Name is required";
    if (!title) msg = "Title is required";
    if (!password) msg = "Password is required";

    if (!email) msg = "Email is required";
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      msg = "Invalid email";

    if (msg) {
      return res.status(404).send({ status: false, msg: msg });
    }
  }
  next();
};

module.exports.validateAuthorFields = validateAuthorFields