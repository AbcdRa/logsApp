const express = require("express")
const multer = require("multer")
const router = express.Router()
const Log = require("../app")
const upload = multer({
    dest: "./files"
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
        console.log(json)
        return res.json(json)
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})


module.exports = router