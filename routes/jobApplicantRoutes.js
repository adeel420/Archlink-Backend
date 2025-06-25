const express = require("express");
const { create, all } = require("../controllers/jobApplicantController");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw",
    allowed_formats: ["pdf", "docx", "doc", "jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), create);
router.get("/", all);

module.exports = router;
