const fs = require("fs");
const storage = require("./Storage");
const txt2log = require("./txt2log");

function file2log(filepath) {	
    let fileContent = fs.readFileSync(filepath, "utf8");
    return txt2log(fileContent)
}


function getLogTable(logName) {
    return file2log(storage.path+"/"+logName)
}

module.exports = {file2log, getLogTable}