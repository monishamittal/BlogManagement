const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const blogMiddleware = require("../middleware/blogMiddleware");
const authorMiddleware = require("../middleware/authorMiddleware");

router.post(
  "/authors",
  authorMiddleware.validateAuthorFields,
  authorController.createAuthor
);

router.post(
  "/blogs",
  blogMiddleware.validateBlogFields,
  blogController.createBlog
);

router.get("/blogs", blogController.getBlogs);

router.put(
  "/blogs/:blogId",
  blogMiddleware.validateUpdateBlogFields,
  blogController.updateBlog
);

router.delete(
  "/blogs/:blogId",
  blogMiddleware.validateDeleteBlogParam,
  blogController.deleteBlog
);

router.delete("/blogs", blogController.deleteBlogByQuery);

module.exports = router;
