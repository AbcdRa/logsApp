const express = require("express")
const multer = require("multer")
const router = express.Router()
const Log = require("../util/logSchema").getLogModel()
const path = require("path")
const upload = multer({
    dest: "/files",
    limits: { fieldSize: 100 * 1024 * 1024 }
})
let logTable 


router.get("/", async (req, res) => {
    if (req.session.checked) {
        if(!req.session.logName) {
            return res.redirect("/logs")
        }
        const logName = req.session.logName
        logTable = await Log.find({name:logName}).exec()
        return res.sendFile(path.join(__dirname, "../pages/view.html"))
    }
    return res.redirect("/")
})


router.post("/table", upload.none(), (req, res) => {
    if (req.session.checked && req.session.logName) {
        return res.json({logTable:logTable[0].table, message:"OK", logName:req.session.logName})
    }
    return res.redirect("/logs")
})


router.post("/", upload.none(), (req, res) => {
    if(req.session.checked) {
        req.session.logName = req.body.logName
        return res.json({message:"OK"})
    }
})


router.post("/update", upload.none(), async(req, res) => {
    if(req.session.checked) {
        const logName = req.body.logName
        const newLogTable =JSON.parse(req.body.logTable)
        const json = {message:""}
        await Log.updateOne({name:logName}, {table:newLogTable}).
        then(json.message = "Лог успешно обновлен").
        catch(err=> {
            console.log(err)
            json.message = "Произошла ошибка обновления лога" + err
        })
        return res.json(json)
    }
})

module.exports = router