

//.................................... Import Models for using in this module ....................//
const mongoose = require("mongoose");


//....................................Validations for Email and Password ....................//
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

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
      validate: [validateEmail, "Please fill a valid email address"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      validate: [validatePassword, "Please fill a valid password"],
      required: true,
    },
  },
  { timestamps: true }
);

//........................................Export Schema..................................//
module.exports = mongoose.model("Author", authorSchema); //provides an interface to the database like CRUD operation
