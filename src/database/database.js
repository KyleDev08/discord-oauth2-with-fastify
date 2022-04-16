const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb conencted"))
  .catch((err) => console.log(err));