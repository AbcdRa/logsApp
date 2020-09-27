const express = require("express")
const multer = require("multer")
const router = express.Router()
const Log = require("../app")
const upload = multer({
    dest: "./files"
})

router.get("/", (req, res) => {
    res.end("HUI")
})

module.exports = router