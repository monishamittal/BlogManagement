const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const authorController= require("../controllers/authorController")

router.post("/createAuthor", authorController.createAuthor  )


module.exports = router;