const authorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  const author = req.body;
  const authorCreated = await authorModel.create(author);
  res.status(201).send({ data: authorCreated });
};

module.exports.createAuthor = createAuthor;
