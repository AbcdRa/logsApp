const express = require("express")
const session = require("express-session")
const config = require("config")
const mongoose = require("mongoose")
const Pather= require("./js/Pather")

const PORT = process.env.PORT || 80

const app = express()
const pather = new Pather(app)


const logSchema = new mongoose.Schema({
    table : Array,
    name  : {type: String, required:true}
})

const Log = mongoose.model("Log", logSchema)

mongoose.connect(config.get("mongoURL"), { useNewUrlParser: true, useUnifiedTopology: true  })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Successfully connect to DB");
});
module.exports = Log



pather.setDefaultAccess()

app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { maxAge: 20*60000},
    resave: true,
    saveUninitialized: true
}))

app.use("/auth", require("./js/auth"))
app.use("/logs", require("./js/logs"))
app.use("/guest", require("./js/guest"))
app.use("/delete", require("./js/delete"))



app.listen(PORT,() => {
    console.log(`Server start on port ${PORT}`);
})

