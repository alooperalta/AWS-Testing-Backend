const mongoose = require("mongoose");
//connecting the mongoose
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("MongoDB Connected");
});
