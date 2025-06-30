const transporter = require("../middleware/config");
const Meeting = require("../models/meeting");

exports.create = async (req, res) => {
  try {
    const { name, email, contact, subject, timing, purpose } = req.body;
    const data = new Meeting({
      name: name,
      email: email,
      contact: contact,
      subject: subject,
      timing: timing,
      purpose: purpose,
    });
    const response = await data.save();

    // Send Email to Admin
    await transporter.sendMail({
      from: `Archlink Technology <${email}>`,
      to: "adeelimran467@gmail.com", // Your email
      subject: "New Meeting Request",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #1a7dda;">New Meeting Request Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Timing:</strong> ${timing}</p>
          <p><strong>Purpose:</strong></p>
          <blockquote style="border-left: 4px solid #ddd; padding-left: 10px; color: #555;">
            ${purpose}
          </blockquote>
        </div>
      `,
    });

    // Send Confirmation to User
    await transporter.sendMail({
      from: `Archlink Technology <adeelimran467@gmail.com>`,
      to: email,
      subject: "We Received Your Meeting Request",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2c61ed;">Thank You, ${name}!</h2>
          <p>We’ve received your meeting request and will get back to you soon.</p>
          <p>Thanks for reaching out to <strong>Archlink Technology</strong>.</p>
        </div>
      `,
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Meeting.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
