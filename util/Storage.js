const fs = require("fs")
const multer = require("multer")
const path = require("path")
const uploadPath = path.join(path.normalize(__dirname+"/.."),"/uploads")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        let logName = req.header('logName')
        if(!logName) logName = file.originalname
        cb(null, logName)
    }
})

storage.path = uploadPath

storage.isDuplicate = function(filename) {
    return ( fs.readdirSync(uploadPath).indexOf(filename)+1)
}

storage.getLogNames = function() {
    return fs.readdirSync(uploadPath)
}

storage.deleteFile = function(filename) {
    return fs.unlinkSync(uploadPath+"/"+filename)
}

module.exports = storage