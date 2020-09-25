const express = require("express")
const session = require("express-session")
const Pather= require("./js/Pather")

const PORT = process.env.PORT || 80

const app = express()
const pather = new Pather(app)

pather.setDefaultAccess()

app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { maxAge: 60000},
    resave: true,
    saveUninitialized: true
}))

app.use("/auth", require("./js/auth"))
app.use("/logs", require("./js/logs"))
app.use("/guest", require("./js/guest"))



// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/pages/index.html"))

// })

// app.get("/js/util.js", (req, res) => {
//     res.sendFile(path.join(__dirname,"/pages/js/util.js"))
// })

// app.get("/css/styles.css", (req, res) => {
//     res.sendFile(path.join(__dirname,"/pages/css/styles.css"))
// })

// app.get("/favicon.ico", (req, res) => {
//     res.sendFile(path.join(__dirname,"/flavicon.ico"))
// })

app.listen(PORT,() => {
    console.log(`Server start on port ${PORT}`);
})


