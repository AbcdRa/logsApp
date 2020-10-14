const fs = require("fs")
const multer = require("multer")
const path = require("path")

const UPLOAD_PATH = path.join(path.normalize(__dirname+"/.."),"/uploads")

//Объект физического хранилища, содержащий логику для определения места хранения файлов
//и определения для них имен, кроме этого содержит функции для работы с сохранеными логами
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        let logName = req.header('logName')
        if(!logName) logName = file.originalname
        cb(null, logName)
    }
})

storage.path = UPLOAD_PATH

storage.isDuplicate = function(filename) {
    return ( fs.readdirSync(UPLOAD_PATH).indexOf(filename)+1)
}

storage.getLogNames = function() {
    return fs.readdirSync(UPLOAD_PATH)
}

storage.deleteFile = function(filename) {
    return fs.unlinkSync(UPLOAD_PATH+"/"+filename)
}

module.exports = storage