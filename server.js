const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db");
const passport = require("./middleware/auth");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

// ✅ Handle preflight requests manually (this was missing!)
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
const authMiddleware = passport.authenticate("local", { session: false });

// routes
const userRoutes = require("./routes/UserRoutes");
const jobApplicantRoutes = require("./routes/jobApplicantRoutes");
const contactRoutes = require("./routes/contactRoutes");
const quoteRoutes = require("./routes/quoteRoutes");

// Use routes
app.use("/user", userRoutes);
app.use("/job", jobApplicantRoutes);
app.use("/contact", contactRoutes);
app.use("/quote", quoteRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
