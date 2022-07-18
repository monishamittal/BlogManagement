//.................................... Import Model and jwt for using in this module ....................//
const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");
const cookies=require("js-cookie")

// const path=require("path");
// const static_path = path.join(__dirname,"../../public" );
// app.use(express.static(static_path))
//.....................................Create authors ................................//
const createAuthor = async function (req, res) {
  try {
    const author = req.body;
    const authorCreated = await authorModel.create(author);
    res.status(201).send({ status: true, data: authorCreated });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//...............................Login author ..............................//

const loginAuthor = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

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
  
    res.cookie("jwt",token)
    return res.redirect("/blog.html")
    // res.status(200).send({ status: true, data: { token: token } });

  } catch (err) {
    return res.status(500).render({ status: false, msg: err.message });
  }
};

const logoutAuthor = async function (req, res) {
  try {
      res.clearCookie("jwt")
      console.log('logout Sucessfully');
      res.redirect("login.html")
  } catch (error) {
      res.status(500).send(error)
  }
  }


//.......................................Making APIs public ..................................//
module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;
module.exports.logoutAuthor=logoutAuthor;
