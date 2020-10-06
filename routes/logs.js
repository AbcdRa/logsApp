const express = require("express")
const path = require("path")
const multer = require("multer")
const router = express.Router()
const txt2log = require("../util/txt2log")
const Log = require("../util/logSchema").getLogModel()

const upload = multer({
    dest: "/files"
})

router.get("/",(req, res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "../pages/logs.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.get("/upload", (req,res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "../pages/upload.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.use("/delete", require("./delete"))
router.use("/view", require("./view"))


//Сохранение лога
router.post("/upload", upload.none(), async (req, res) => {
    if(!req.session.checked) {    
        return res.json({"message":"Not Login"})
    }

    const logTable = txt2log(req.body.logFile)
    const logName = req.body.logName
    const newLog = new Log({table:logTable, name:logName})
    const duplicate = await Log.exists({ name: logName });
    if(duplicate) {
        return res.json({message:"Имя лога занято"})
    }
    const saveLog = await newLog.save()
    if(saveLog!==newLog) {
        console.log("Невозможно сохранить")
        console.log(saveLog)
        return res.json({message:"Произошла ошибка(на сервере): "+saveLog})
    }
    console.log("Лог успешно сохранен: "+logName)
    return res.json({message:"OK"})
    
    
})


router.post("/db",(req,res) => {
    if(req.session.checked) {
        Log.find(function (err, logs) {
            if (err) return console.error(err);
            const logList = []
            logs.forEach(log => logList.push(log.name))
            return res.json({"message":"OK", "logList":logList})
        })
    } else {
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
        res.redirect("/")
    }
})


module.exports = router
