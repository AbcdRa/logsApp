const mongoose = require("mongoose")
let Log

function initLogModel() {
    const logSchema = new mongoose.Schema({
        table : Array,
        name  : {type: String, required:true}
    })
    
    Log = mongoose.model("Log", logSchema)
}


function getLogModel() {
    if(!Log) {
        console.log("ОШИБКА: Log модель не была инициализирована")
        initLogModel()
    }
    return Log
}

module.exports = {getLogModel, initLogModel}
