const express = require("express")
const multer = require("multer")
const router = express.Router()
const upload = multer({
    dest: "./files"
})




module.exports = router