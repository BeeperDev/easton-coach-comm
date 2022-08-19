const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

module.exports = router;
