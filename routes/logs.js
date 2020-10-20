const express = require("express")
const multer = require("multer")
const router = express.Router()
const storage = require("../util/Storage")

const upload = multer({
    storage:require("../util/Storage"),
    fileFilter:function(req, file, cb) {
        const isDuplicate = storage.isDuplicate(req.get('logName'))
        if(isDuplicate) {
            console.log("Нашелся дублер")
            cb(new Error("Имя лога занято"), false)
        } else {
            cb(null, true)
            console.log("Лог сохранен")
        }
    } 
})

router.get("/",(req, res) => {
    if(req.session.checked) {
        return res.render("logs.hbs")
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.get("/upload", (req,res) => {
    if(req.session.checked) {
        return res.render("upload.hbs")
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.use("/view", require("./view"))


router.delete("/",upload.none(),async (req, res) => {
    if(req.session.checked) {
        const json = {message:"OK"}
        console.log(storage.deleteFile(req.body.logName))
        return res.json(json)
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})



//Сохранение лога
router.put("/",  async (req, res) => {
    if(!req.session.checked) {    
        return res.json({"message":"Not Login"})
    }
    let logUpload = upload.single("logFile") 
    let message = ""

    await logUpload(req, res, function (err) {
        if (err) {
            message = err.message
            return res.json({message})
        }       
        message = "OK"
        return res.json({message})
    })
    

})


router.get("/logList",(req,res) => {
    if(req.session.checked) {
        return res.json({message:"OK", logList:storage.getLogNames()})
    } else {
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
        res.redirect("/")
    }
})


module.exports = router
