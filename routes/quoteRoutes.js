const express = require("express");
const { create, all } = require("../controllers/quoteController");
const router = express.Router();

router.post("/", create);
router.get("/", all);

module.exports = router;
