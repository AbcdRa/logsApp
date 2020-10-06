const express = require("express")
const multer = require("multer")
const router = express.Router()
const upload = multer({
    dest: "../files"
})

const loginedUsers = [
    {
        login: "root",
        password: "toor"
    },
    {
        login: "michail",
        password: "test"
    }
]

router.post("/", upload.none(),(req, res) => {
    const formData = req.body
    const login = formData['login']
    const password = formData['password']
    
    const user = loginedUsers.find((user) => {
        return user.login === login
    })
    if(!user) {
        req.session.checked = false
        return res.status(200).json({message: "User login is not found"})
    }
    if(user.password !== password) {
        req.session.checked = false
        return res.status(200).json({message: "User password is not correct"})
    }
    req.session.checked = true
    return res.status(200).json({message: "OK"})
   
    
})

router.post("/deauth", upload.none(),(req, res) => {
    req.session.checked = false
    return res.status(200).json({message: "OK"})
})

module.exports = router