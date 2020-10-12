const express = require("express")
const multer = require("multer")
const storage = require("../util/Storage")

const router = express.Router()
const upload = multer({
    storage:storage
})


router.post("/",upload.none(),async (req, res) => {
    if(req.session.checked) {
        const json = {message:"OK"}
        console.log(storage.deleteFile(req.body.logName))
        return res.json(json)
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})


module.exports = router