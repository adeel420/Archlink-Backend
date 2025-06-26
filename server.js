const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db");
const passport = require("./middleware/auth");
const cors = require("cors");

// ✅ CORS config — allow dev and production frontend
const corsOptions = {
  origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// ✅ Must be BEFORE any other route or middleware
app.use(cors(corsOptions));

// ✅ Handle preflight requests manually (this was missing!)
app.options("*", cors(corsOptions));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Passport
app.use(passport.initialize());
const authMiddleware = passport.authenticate("local", { session: false });

// ✅ Import routes
const userRoutes = require("./routes/UserRoutes");
const jobApplicantRoutes = require("./routes/jobApplicantRoutes");
const contactRoutes = require("./routes/contactRoutes");
const quoteRoutes = require("./routes/quoteRoutes");

// ✅ Use routes
app.use("/user", userRoutes);
app.use("/job", jobApplicantRoutes);
app.use("/contact", contactRoutes);
app.use("/quote", quoteRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
