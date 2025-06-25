const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db");
const passport = require("./middleware/auth");
const cors = require("cors");

// Files
const userRoutes = require("./routes/UserRoutes");
const jobApplicantRoutes = require("./routes/jobApplicantRoutes");
const contactRoutes = require("./routes/contactRoutes");
const qouteRoutes = require("./routes/quoteRoutes");

// Packages
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;
app.use(passport.initialize());
const authMiddleware = passport.authenticate("local", { session: false });

// Routes
app.use("/user", userRoutes);
app.use("/job", jobApplicantRoutes);
app.use("/contact", contactRoutes);
app.use("/quote", qouteRoutes);

app.listen(PORT, () => {
  console.log(`Listening the port ${PORT}`);
});
