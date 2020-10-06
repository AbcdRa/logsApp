const express = require("express")
const session = require("express-session")
const config = require("config")
const mongoose = require("mongoose")
const myModel = require('./util/logSchema')
const Pather= require("./util/Pather")
//Подключаем необходимые библиотеки


//
const PORT = process.env.PORT || 80


const app = express()
const pather = new Pather(app)
myModel.initLogModel()
pather.setDefaultAccess()


mongoose.connect(config.get("mongoURL"), { useNewUrlParser: true, useUnifiedTopology: true  })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Сonnection error:"));
db.once("open", function() {
    console.log("Successfully connect to DB");
});


app.use(session({ 
    secret: config.get("secretExpressSession"), 
    cookie: { maxAge: config.get("sessionTime")*60000},
    resave: true,
    saveUninitialized: true
}))


app.use("/auth", require("./routes/auth"))
app.use("/logs", require("./routes/logs"))


app.listen(PORT,() => {
    console.log(`Server start on port ${PORT}`);
})

