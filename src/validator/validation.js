//.................................... Import Models for using in this module ....................//
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

// .......................................Validations for creating authers.......................................//
const validateAuthorFields = async function (req, res, next) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Missing all fields." });
    } else {
      const { fname, lname, title, email, password } = req.body;
      let msg = "";

      if (!fname) msg = "First Name is required";
      else if (fname.trim().length == 0) msg = "What's your first name?";
      else if (/\d+/.test(fname)) msg = "Numbers are not allowed in first name";

      if (!lname) msg = "Last Name is required";
      else if (lname.trim().length == 0) msg = "What's your last name?";
      else if (/\d+/.test(lname)) msg = "Numbers are not allowed in last name";

      let data = ["Mr", "Mrs", "Miss"];
      if (!title) msg = "Title is required";
      else if (!data.includes(title))
        msg = "Invalid title , selects from 'Mr','Mrs' and 'Miss'";

      if (!password) msg = "Password is required";
      else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      )
        msg =
          "Minimum length should be 8 characters contain one special charcter , one alphabet and one number";

      if (!email) msg = "Email is required";
      else if (email.trim().length == 0) msg = "Enter your Email";
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        msg = "Invalid email";

      const emailId = await await authorModel
        .find()
        .select({ email: 1, _id: 0 });
      const emailInData = emailId.map((ele) => ele.email);
      if (emailInData.includes(email)) msg = "Please Enter Valid Email Id";

      if (msg) {
        return res.status(400).send({ status: false, msg: msg });
      }
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

//.......................................Validations for creating blogs.......................................//
const validateBlogFields = async function (req, res, next) {
  try {
    let data = req.body;

    // If no data found in body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "Missing Parameters" });
    } else {
      const { title, body, authorId, tags, category, subcategory } = req.body;
      let msg = "";
      if (!title) msg = "Title is required";
      else if (title.trim().length == 0) msg = "Title is empty. Please enter";

      if (!body) msg = "Body is required";
      else if (body.trim().length == 0) msg = "Body is empty. Please enter";

      if (!authorId) msg = "Author Id is required";
      if (!tags) msg = "Tags are required";
      else if (tags.length == 0) msg = "Tags are empty. Please enter";

      if (!category) msg = "Category is required";
      else if (category.trim().length == 0)
        msg = "Category is empty. Please enter";

      if (!subcategory) msg = "subategory is required";
      else if (subcategory.length == 0)
        msg = "Subcategory are empty. Please enter";

      if (msg) return res.status(400).send({ status: false, msg: msg });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

//.........................................Validations for updating blogs.......................................//
const validateUpdateBlogFields = async function (req, res, next) {
  let data = req.body;

  // If no data found in body
  if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "Missing Parameters" });
  }
  try {
    const { title, body, tags, subcategory } = req.body;
    let msg = "";
    if (!title) msg = "Title is required";
    else if (title.trim().length == 0) msg = "Title is empty. Please enter";

    if (!body) msg = "Body is required";
    else if (body.trim().length == 0) msg = "Body is empty. Please enter";

    if (!tags) msg = "Tags are required";
    else if (tags.length == 0) msg = "Tags are empty. Please enter";
    
    if (!subcategory) msg = "subategory is required";
    else if (subcategory.length == 0)
      msg = "Subcategory are empty. Please enter";

    if (msg) return res.status(400).send({ status: false, msg: msg });

    let blogId = req.params.blogId;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog Id is incorrect" });
    } else if (blog.isDeleted) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog is already deleted" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

// ....................................Validation for delete blogs by path params.......................................//
const validateDeleteBlogParam = async function (req, res, next) {
  try {
    const { blogId } = req.params;

    //If blog id is incorrect
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog Id is incorrect" });
    } else if (blog.isDeleted) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog is already deleted" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

//.......................................Validation for delete blogs by query params.......................................//
const validateQueryParams = async function (req, res, next) {
  try {
    let data = req.query;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Missing query Parameters" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
  next();
};

module.exports.validateAuthorFields = validateAuthorFields;
module.exports.validateBlogFields = validateBlogFields;
module.exports.validateUpdateBlogFields = validateUpdateBlogFields;
module.exports.validateDeleteBlogParam = validateDeleteBlogParam;
module.exports.validateQueryParams = validateQueryParams;
