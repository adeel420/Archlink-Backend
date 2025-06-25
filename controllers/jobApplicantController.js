const transporter = require("../middleware/config");
const JobApplicant = require("../models/jobApplicant");

exports.create = async (req, res) => {
  try {
    const { name, email, rolesApplied, coverLetter, resume } = req.body;

    let filePath = resume;
    if (req.file) {
      filePath = req.file.path;
    }
    const data = new JobApplicant({
      name: name,
      email: email,
      rolesApplied: rolesApplied,
      coverLetter: coverLetter,
      resume: filePath,
    });
    const response = await data.save();

    transporter.sendMail({
      from: "Archlink Technology <adeelimran467@gmail.com>",
      to: email,
      subject: "Apply For Job",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c61ed;">Thank You for Applying!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for applying for the <strong>${rolesApplied}</strong> role at <strong>Archlink Technology</strong>.</p>
      <p>We have received your application and will review your profile shortly. If your skills match our requirements, we will get back to you for the next steps.</p>
      <p>Best regards,<br><strong>Archlink Technology</strong></p>
    </div>
  `,
    });

    transporter.sendMail({
      from: "Archlink Technology <adeelimran467@gmail.com>",
      to: "adeelimran467@gmail.com",
      subject: "New Job Application Received",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #1a7dda;">New Job Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Role Applied:</strong> ${rolesApplied}</p>
      <p><strong>Cover Letter:</strong></p>
      <blockquote style="border-left: 4px solid #ddd; padding-left: 10px; color: #555;">${
        coverLetter || "N/A"
      }</blockquote>
      <p><strong>Resume:</strong> <a href="${filePath}" download target="_blank" >Download Resume</a>
</p>
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
    const response = await JobApplicant.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
