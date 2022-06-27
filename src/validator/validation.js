//.................................... Import Models for using in this module ....................//
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

      if (!fname)
        return res
          .status(400)
          .send({ status: false, msg: "First Name is required" });
      else if (/\d+/.test(fname) && fname !== "string")
        return res.status(400).send({
          status: false,
          msg: "Numbers are not allowed in first name",
        });
      else if (fname.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "What's your first name?" });

      if (!lname)
        return res
          .status(400)
          .send({ status: false, msg: "Last Name is required" });
      else if (/\d+/.test(lname) && lname !== "string")
        return res
          .status(400)
          .send({ status: false, msg: "Numbers are not allowed in last name" });
      else if (lname.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "What's your last name?" });

      let data = ["Mr", "Mrs", "Miss"];
      if (!title)
        return res
          .status(400)
          .send({ status: false, msg: "Title is required" });
      else if (title.trim().length == 0)
        return res.status(400).send({ status: false, msg: "Missing title" });
      else if (!data.includes(title))
        return res.status(400).send({
          status: false,
          msg: "Invalid title,selects from 'Mr','Mrs' and 'Miss'",
        });

      if (!password)
        return res
          .status(400)
          .send({ status: false, msg: "Password is required" });
      else if (password.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Please enter your password" });
      else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      )
        return res.status(400).send({
          status: false,
          msg: "Minimum length should be 8 characters contain one special charcter , one alphabet and one number",
        });

      if (!email)
        return res
          .status(400)
          .send({ status: false, msg: "Email is required" });
      else if (email.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Please enter your email id" });
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return res.status(400).send({ status: false, msg: "Invalid email" });

      const emailId = await await authorModel
        .find()
        .select({ email: 1, _id: 0 });
      const emailInData = emailId.map((ele) => ele.email);
      if (emailInData.includes(email))
        return res
          .status(400)
          .send({ status: false, msg: "Email id is already exist" });
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
      if (!title)
        return res
          .status(400)
          .send({ status: false, msg: "Title is required" });
      else if (title.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Title is empty. Please enter" });

      if (!body)
        return res.status(400).send({ status: false, msg: "Body is required" });
      else if (body.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Body is empty. Please enter" });

      if (!authorId)
        return res
          .status(400)
          .send({ status: false, msg: "Author id is required" });
      else if (authorId.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Author id is empty. Please enter" });

      if (!tags)
        return res
          .status(400)
          .send({ status: false, msg: "Tags are required" });
      else if (tags.length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Tags are empty. Please enter" });

      if (!category)
        return res
          .status(400)
          .send({ status: false, msg: "Category is required" });
      else if (category.trim().length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Category is empty. Please enter" });

      if (!subcategory)
        return res
          .status(400)
          .send({ status: false, msg: "subategory is required" });
      else if (subcategory.length == 0)
        return res
          .status(400)
          .send({ status: false, msg: "Subcategory are empty. Please enter" });
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

    // Return error if blog id is not valid
    let blogId = req.params.blogId;
    if (!ObjectId.isValid(blogId)) {
      return res.status(400).send({ status: false, msg: "Invalid Object id" });
    }

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

const validateLoginAuthor = async function (req, res, next) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Missing all fields." });
    } else {
      const { email, password } = req.body;
      let msg = "";

      if (!password) msg = "Password is required";
      else if (password.trim().length == 0) msg = "Please enter your password";

      if (!email) msg = "Email is required";
      else if (email.trim().length == 0) msg = "Enter your Email";

      if (msg) {
        return res.status(400).send({ status: false, msg: msg });
      }
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
module.exports.validateLoginAuthor = validateLoginAuthor;
