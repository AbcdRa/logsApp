const fs = require("fs");
const storage = require("./Storage");
const txt2log = require("./txt2log");


//Открываем по передаваемому пути фаил и преобразуем его в таблицу
function file2log(filepath) {	
    let fileContent = fs.readFileSync(filepath, "utf8");
    return txt2log(fileContent)
}


//Получаем таблицу зная только имя файла
function getLogTable(logName) {
    return file2log(storage.path+"/"+logName)
}

module.exports = {file2log, getLogTable}