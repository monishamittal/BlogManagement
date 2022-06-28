const express = require("express"); // express is helping nodejs to build web application.
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const route = require("./route/route"); // Import route module
const app = express();

app.use(bodyParser.json()); // data will be converted to JSON format , returns middleware that only parses json.
app.use(bodyParser.urlencoded({ extended: true })); // req.body object will contain values of any type instead of just strings.

const mongooseURL =
  "mongodb+srv://functionup-radon:radon123@cluster0.q0p7q73.mongodb.net/project1-DB?retryWrites=true&w=majority";

// mongoose connection
mongoose
  .connect(mongooseURL, {
    useNewUrlParser: true, // allow users to fall back to the old parser if they find a bug in the new parser
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route); //  Mounts the middleware function or functions at the specified path

//.env stores all of our confidential information (Protected File)
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
