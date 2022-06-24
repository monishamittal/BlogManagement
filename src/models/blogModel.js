
//.................................... Import Models for using in this module ....................//
const mongoose = require("mongoose");

//..................................used for reference authorModel ...................//
const ObjectId = mongoose.Schema.Types.ObjectId;

//................................. Create Schema .........................//
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: {
      type: ObjectId,
      ref: "Author",
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    subcategory: [
      {
        type: String,
      },
    ],
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//........................................Export Schema..................................//
module.exports = mongoose.model("Blog", blogSchema);
