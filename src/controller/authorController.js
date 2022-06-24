
//.................................... Import Model and jwt for using in this module ....................//
const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

//.....................................Create authors ................................//
const createAuthor = async function (req, res) {
  try {
    const author = req.body;
    const authorCreated = await authorModel.create(author);
    res.status(201).send({ status : true , data: authorCreated });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//...............................Login author ..............................//

const loginAuthor = async function (req, res) {
  try {
    const email = req.body.email;
    if(!email) return res.status(400).send({status : false , msg : "Email is required"})
    const password = req.body.password;
    if(!password) return res.status(400).send({status : false , msg : "Password is required"})
    
    const author = await authorModel.findOne({
      email: email,
      password: password,
    });
    if (!author) {
      return res.status(400).send({
        status: false,
        msg: "Provided Email address or Password are incorrect",
      });
    }
    const token = jwt.sign(
      {
        authorId: author._id.toString(),
      },
      "FunctionUp - Project-1"
    );
    res.status(200).send({ status: true, token: token });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//.......................................Making APIs public ..................................//
module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;
