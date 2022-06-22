const express = require("express"); // express is helping nodejs to build web application.
const bodyParser = require("body-parser"); // fetch data from body part.
const { default: mongoose } = require("mongoose"); // help to connect nodejs to mongoDb.
const route = require("./route/route");
const app = express();

app.use(bodyParser.json()); // data will be converted to JSON format.
app.use(bodyParser.urlencoded({ extended: true })); // req.body object will contain values of any type instead of just strings.

const mongooseURL =
  "mongodb+srv://functionup-radon:radon123@cluster0.q0p7q73.mongodb.net/project1-DB?retryWrites=true&w=majority";

// mongoose connection
mongoose
  .connect(mongooseURL, {
    useNewUrlParser: true, // allow to fall back to the old parser if it throws an error
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
