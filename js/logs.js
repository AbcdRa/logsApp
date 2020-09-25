const express = require("express")
const path = require("path")
const router = express.Router()

router.get("/",(req, res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "/pages/logs.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.get("/upload",(req,res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "/pages/upload.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

router.get("/guest",(req,res) => {
    if(req.session.checked) {
        return res.sendFile(path.join(__dirname, "/pages/logs-guest.html"))
    }
    //При попытке зайти неавторизованным отправляем на основную страницу авторизации
    res.redirect("/")
})

module.exports = router