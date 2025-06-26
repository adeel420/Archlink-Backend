const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("disconnected", () => {
  console.log("Disconnected to MongoDB");
});
db.on("error", (err) => {
  console.log("Error to connected the MongoDB");
});
module.exports = db;
