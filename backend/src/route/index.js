const express = require("express");
const app = express();
const cors = require('cors');
app
  .use(cors()) 
  .use("/Users", require("./user/index"))


module.exports = app;
