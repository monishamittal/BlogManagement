const blogModel = require("../models/blogModel");

const validateBlogFields = async function (req, res, next) { 
  let data = req.body;

  // If no data found in body
  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Missing Parameters" });
  } else {
    const { title, body, authorId, tags, category, subcategory } = req.body;
    let msg = "";
    if (!title) msg = "Title is required";
    if (!body) msg = "Body is required";
    if (!authorId) msg = "Author Id is required";
    if (!tags) msg = "Tags are required";
    if (!category) msg = "Category is required";
    if (!subcategory) msg = "subategory is required";

    if (msg) return res.status(400).send({ status: false, msg: msg });
  }
  next();
};

const validateUpdateBlogFields = async function (req, res, next) {
  let data = req.body;

  // If no data found in body
  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Missing Parameters" });
  }
  try {
    let blogId = req.params.blogId;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog Id is incorrect" });
    } else if (blog.isDeleted) {
      return res.status(404).send({ status: false, msg: "Blog is deleted" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

const validateDeleteBlogParam = async function (req, res, next) {
  try {
    const { blogId } = req.params;

    //If blog id is incorrect
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog Id is incorrect" });
    }
     else if (blog.isDeleted) {
      return res.status(404).send({ status: false, msg: "Blog is deleted" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: "false", msg: "Something Went Wrong" });
  }
  next();
};

module.exports.validateBlogFields = validateBlogFields;
module.exports.validateUpdateBlogFields = validateUpdateBlogFields;
module.exports.validateDeleteBlogParam = validateDeleteBlogParam;
