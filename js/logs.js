const express = require("express")
const path = require("path")
const multer = require("multer")
const router = express.Router()
const txt2log = require("./txt2log")
const Log = require("../app")
const getLogModel = require("./logSchema")
const upload = multer({
    dest: "./files"
})

router.get("/",(req, res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "/pages/logs.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.get("/upload", (req,res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "/pages/upload.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})


router.post("/upload", upload.none(), (req, res) => {
    if(req.session.checked) {
        const logTable = txt2log(req.body.logFile)
        const logName = req.body.logName
        const newLog = new Log({table:logTable, name:logName})
        newLog.save(err => {
            if(err) {
                console.log("Невозможно сохранить")
                console.log(err)
            }
            console.log("Hoorey")
        })
        return res.json({"message":"OK"})
    }
    return res.json({"message":"Not OK"})
})

router.get("/guest",(req,res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "/pages/logs-guest.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.post("/db",(req,res) => {
    if(req.session.checked) {
        console.log(Log)
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
