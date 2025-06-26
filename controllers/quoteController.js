const transporter = require("../middleware/config");
const Quote = require("../models/quote");

exports.create = async (req, res) => {
  try {
    const {
      name,
      companyName,
      requiredServices,
      estimatedBudget,
      deadline,
      additionalNotes,
    } = req.body;

    const data = new Quote({
      name,
      companyName,
      requiredServices,
      estimatedBudget,
      deadline,
      additionalNotes,
    });

    const response = await data.save();

    await transporter.sendMail({
      from: `Archlink Technology <adeelimran467@gmail.com>`,
      to: "adeelimran467@gmail.com",
      subject: "New Quote Request",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #1a7dda;">New Quote Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Required Services:</strong> ${requiredServices?.join(
            ", "
          )}</p>
          <p><strong>Estimated Budget:</strong> ${estimatedBudget}</p>
          <p><strong>Deadline:</strong> ${deadline}</p>
          <p><strong>Additional Notes:</strong></p>
          <blockquote style="border-left: 4px solid #ddd; padding-left: 10px; color: #555;">
            ${additionalNotes}
          </blockquote>
        </div>
      `,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error("Error in quote submission:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Quote.find();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error in quote submission:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
