console.log("Backend Started .......");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDocs= YAML.load('./api.yaml');

// dotenv.config();
dotenv.config();

//cors config
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//bodyparser config
app.use(bodyParser.json());

const port = process.env.PORT;
require("./src/mongodb/index");
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use("/api/v1", require("./src/APIS/view/TEST"));


//app file
app.get("/", (req, res) => {
  res.send("Server Started...");
});

//listening the port
app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});
