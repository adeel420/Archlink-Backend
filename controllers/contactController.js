const transporter = require("../middleware/config");
const Contact = require("../models/contact");

exports.create = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    const savedData = new Contact({
      name: name,
      email: email,
      message: message,
      phone: phone,
    });
    const response = await savedData.save();

    await transporter.sendMail({
      from: `Archlink Technology <${email}>`,
      to: "adeelimran467@gmail.com",
      subject: "New Contact Message",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #1a7dda;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone-No:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #ddd; padding-left: 10px; color: #555;">
            ${message}
          </blockquote>
        </div>
      `,
    });

    await transporter.sendMail({
      from: "Archlink Technology <adeelimran467@gmail.com>",
      to: email,
      subject: "We Received Your Message",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2c61ed;">Thank You, ${name}!</h2>
          <p>We’ve received your message and will get back to you as soon as possible.</p>
          <p>Thanks for contacting <strong>Archlink Technology</strong>.</p>
        </div>
      `,
    });

    res.status(201).json(response);
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Contact.find();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
