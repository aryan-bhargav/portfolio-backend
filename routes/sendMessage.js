const express = require("express");
const router = express.Router();
const {sendMessage} = require("../controllers/sendMessageController")

router.post("/",sendMessage);

module.exports = router;