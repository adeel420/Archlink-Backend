const mongoose = require("mongoose");

const jobApplicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  rolesApplied: String,
  coverLetter: String,
  resume: String,
});

const JobApplicant = mongoose.model("jobApplicant", jobApplicantSchema);
module.exports = JobApplicant;
