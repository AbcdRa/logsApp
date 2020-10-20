const express = require("express")
const multer = require("multer")
const router = express.Router()
const Log = require("../util/Log")
const storage = require("../util/Storage")
const upload = multer({
    storage:storage,
})
let logTable 


// /logs/view/
router.get("/", async (req, res) => {
    if (req.session.checked) {
        if(!req.session.logName) {
            return res.redirect("/logs")
        }
        const logName = req.session.logName
        logTable = Log.getLogTable(logName)
        return res.render("view.hbs")
    }
    return res.redirect("/")
})


router.post("/", upload.none(), (req, res) => {
    if(req.session.checked) {
        req.session.logName = req.body.logName
        return res.json({message:"OK"})
    }
})


router.get("/table", upload.none(), (req, res) => {
    if (req.session.checked && req.session.logName) {
        return res.json({logTable:logTable, message:"OK", logName:req.session.logName})
    }
    return res.redirect("/logs")
})


router.get("/tableName", upload.none(), (req, res) => {
    if (req.session.checked && req.session.logName) {
        return res.json({message:"OK", logName:req.session.logName})
    }
    return res.json({message:"OK"})
})






router.post("/update", upload.single("logTable"), async(req, res) => {
    if(req.session.checked) {
        const newLogTable = req.file
        const json = {message:""}
        if(storage.isDuplicate(req.file.originalname)) {
            json.message = "Лог успешно обновлен"
        }
        else {
            json.message = "Лога нет горит невиданный рассвет"
        }
        return res.json(json)
    }
})

module.exports = router