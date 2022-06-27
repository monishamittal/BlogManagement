//....................................Importing the modules .................................//
const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");
const validator = require("../validator/validation");

//.....................Handling HTTP request for creating authors(Post API).................//
router.post(
  "/authors",
  validator.validateAuthorFields,
  authorController.createAuthor
);

//.....................Handling HTTP request for creating blogs(Post API)...................//
router.post(
  "/blogs",
  validator.validateBlogFields,
  auth.Authentication,
  blogController.createBlog
);

//.....................Handling HTTP request for getting blogs(Get API)...................//
router.get("/blogs", auth.Authentication, blogController.getBlogs);

//.....................Handling HTTP request for updating blogs(Put API)...................//
router.put(
  "/blogs/:blogId",
  validator.validateUpdateBlogFields,
  auth.Authentication,
  auth.Authorisation,
  blogController.updateBlog
);

//.....................Handling HTTP request for deleting blogs by path params(Delete API)...................//
router.delete(
  "/blogs/:blogId",
  auth.Authentication,
  auth.Authorisation,
  validator.validateDeleteBlogParam,
  blogController.deleteBlog
);

//.....................Handling HTTP request for deleting blogs by query params(Delete API)...................//
router.delete(
  "/blogs",
  validator.validateQueryParams,
  auth.Authentication,
  blogController.deleteBlogByQuery,
  auth.AuthorisationForQuery
);

//.....................Handling HTTP request for login author (Post API)...................//
router.post("/login",   validator.validateLoginAuthor, authorController.loginAuthor);

//.....................Making router public...................//
module.exports = router;
