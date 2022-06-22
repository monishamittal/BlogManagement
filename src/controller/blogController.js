const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

const createBlog = async function (req, res) {
  try {
    const data = req.body;

    // Find and check author id exists or not
    const author = await authorModel.findById(data.authorId);
    if (!author) return res.status(401).send("Author id is not valid");

    // create a new blog
    const blog = await blogModel.create(data);

    return res.status(201).send({ status: true, data: blog });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    const { authorId, category, tags, subcategory } = req.query;

    // Get a blog those aren't deleted and are published
    const params = { isPublished: true, isDeleted: false };

    // Set params based on query params value
    if (authorId) params.authorId = authorId;
    if (category) params.category = category;
    if (tags) params.tags = { $all: tags.split(",") };
    if (subcategory) params.subcategory = { $all: subcategory.split(",") };

    const blogs = await blogModel.find(params);
    if (blogs.length === 0) {
      return res.status(404).send({ status: false, msg: "No blogs found" });
    }

    return res.send({ status: true, data: blogs });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const updateBlog = async function (req, res) {
  try {
    const { blogId } = req.params;
    const { title, body, tags, subcategory } = req.body;

    //Updates a blog by changing the its title, body, adding tags, adding a subcategory and also by changing isPublished true with date.

    const blog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        $push: { tags: tags, subcategory: subcategory },
        $set: {
          title,
          body,
          isPublished: true,
          publishedAt: Date.now(),
        },
      },
      { new: true }
    );
    return res.status(200).send({ status: true, msg: blog });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;

    // Find a blog by BlogId and set isDeleted true with date.

    const deleteBlogById = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: Date.now() } }
    );
    return res.status(200).send({ status: true, data: "The blog is deleted" });
  } catch (err) {
    return res.status(404).send({ status: false, msg: "There is no blog" });
  }
};

const deleteBlogByQuery = async function (req, res) {
  try {
    const { authorId, category, tags, subcategory, isPublished } = req.query;

     // Set params based on query params value
    const params = {};
    if (authorId) params.authorId = authorId;
    if (category) params.category = category;
    if (tags) params.tags = { $all: tags.split(",") };
    if (subcategory) params.subcategory = { $all: subcategory.split(",") };
    if (isPublished) params.isPublished = isPublished;
  
    // FInd blogs by query params and set isDeleted True with date.
    const blogs = await blogModel.updateMany(
      params,
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );

    // If there is no updatation found then this error occured.
    if (blogs.modifiedCount === 0) {
      return res.status(404).send({ status: false, msg: "No blogs found" });
    }
    
    return res
      .status(200)
      .send({ status: true, msg: "Blogs deleted successfully" });
  } catch (err) {
    return res.status(404).send({ status: false, msg: "Data not found" });
  }
};

module.exports.getBlogs = getBlogs;
module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByQuery = deleteBlogByQuery;
