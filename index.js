console.log("Backend Started .......");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const mognodb =     require('mongodb');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


// dotenv.config();
dotenv.config();

//cors config
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//bodyparser config
app.use(bodyParser.json());

const port = process.env.PORT;



//connecting the mongoose
mongoose.connect(process.env.DB_CONNECTION, ()=>
{
    console.log("MongoDB Connected");
})

//app file
app.get("/", (req, res) => {res.send("Server Started...")});


//listening the port
app.listen(port, () => {
    console.log(`Server Started at port ${port}`);
});
