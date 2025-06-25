const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  name: String,
  companyName: String,
  requiredServices: [String],
  estimatedBudget: String,
  deadline: String,
  additionalNotes: String,
});

const Quote = mongoose.model("quote", quoteSchema);
module.exports = Quote;
