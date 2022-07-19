const express = require("express"); // express is helping nodejs to build web application.and is a framework handels all apis and handles all http requests
const bodyParser = require("body-parser"); //aise form m kr deta hai ki backend mai work kr"chote chote tukde mai data ko baat deta hai" jo data aa ra hai aur ja ra hai uspe work krta hai. Express body-parser is an npm library used to process data sent through an HTTP request body.setting the value in req body
const { mongoose } = require("mongoose"); // help to connect nodejs to mongoDb and also helo to making schema.
const route = require("./route/route"); // Import route module


const app = express();
const path=require("path");
const cookieParser = require('cookie-parser')
app.use(bodyParser.json()); // data will be converted to JSON format , returns middleware that only parses json.
app.use(bodyParser.urlencoded({ extended:false})); // req.body object will contain values of any type instead of just strings.
app.use(cookieParser())


const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path))



//to set view engine
app.set("view engine","hbs")


//template engine route
app.get("/",(req,res)=>{
  res.render('index',{title:"Home Page"})
})

app.get("/register",(req,res)=>{
  res.render('register',{title:"Registration"})
})

app.get("/login",(req,res)=>{
  res.render('login',{title:"Login"})
})


app.get("/blog",(req,res)=>{
  res.render('blog',{title:"Dashboard"})
})

app.get("/allblogs",(req,res)=>{
  res.render('allblogs',{title:"Blogs"})
})

app.get("/update",(req,res)=>{
  res.render('update',{title:"Update Blog"})
})

app.get("/delete",(req,res)=>{
  res.render('delete',{title:"Delete Blog"})
})

app.get("/profile",(req,res)=>{
  res.render('viewProfile',{title:"Delete Blog"})
})



const mongooseURL =
  "mongodb+srv://functionup-radon:radon123@cluster0.q0p7q73.mongodb.net/project1-DB?retryWrites=true&w=majority";

// mongoose connection
mongoose //isse promise create hua hai
  .connect(mongooseURL, {
    useNewUrlParser: true, // allow users to fall back to the old parser if they find a bug in the new parser
  })
  .then(() => console.log("MongoDb is connected")) // promise fulfilled
  .catch((err) => console.log(err)); //promise rejected


app.use("/", route); //  Mounts the middleware function or functions at the specified path


//.env stores all of our confidential information (Protected File)
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});



