const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adeelimran467@gmail.com",
    pass: "jcyzeahqdxjajllz",
  },
});

module.exports = transporter;
