const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  subject: String,
  timing: String,
  purpose: String,
});

const Meeting = mongoose.model("meeting", meetingSchema);
module.exports = Meeting;
