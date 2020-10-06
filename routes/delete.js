const express = require("express")
const multer = require("multer")
const Log = require("../util/logSchema").getLogModel()

const router = express.Router()
const upload = multer({
    dest: "files"
})


router.post("/",upload.none(),async (req, res) => {
    if(req.session.checked) {
        const logName = req.body.logName
        const json = {message:""}
        await Log.deleteOne({name:logName}).then(
            ()=> json.message = "OK"
        ).catch(
            (err,b,c) =>  json.message = err + " " +b + " " +c
        )
        return res.json(json)
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})


module.exports = router