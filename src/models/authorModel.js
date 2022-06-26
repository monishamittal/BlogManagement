

//.................................... Import Models for using in this module ....................//
const mongoose = require("mongoose");


//....................................Validations for Email and Password ....................//

//................................. Create Schema .........................//
const authorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//........................................Export Schema..................................//
module.exports = mongoose.model("Author", authorSchema); //provides an interface to the database like CRUD operation
