//Класс для открытия GET доступа к файлам 
const path = require("path")


//Ключ - физическое расположение
//Значение - сетевое расположение
const DEFAULT_PATH = [
{"../js/auth-logic.js":"/js/auth-logic.js"},
{"txt2log.js":"/js/txt2log.js"},
{"../js/upload-logic.js":"/js/upload-logic.js"},
{"../css/styles.css":"/css/styles.css"},
{"../files/favicon.ico" : "/favicon.ico"},
{"../js/log-logic.js" : "/js/log-logic.js"},
{"../dist/css/bootstrap/tabulator_bootstrap4.min.css":"/dist/css/materialize/tabulator_materialize.min.css"},
{"../dist/css/bootstrap/tabulator_bootstrap4.min.css.map":"/dist/css/materialize/tabulator_bootstrap4.min.css.map"},
{"../js/db-logic.js": "/js/db-logic.js"},
{"../js/view-logic.js": "/js/view-logic.js"},
{"../js/table-logic.js":"/js/table-logic.js"}
]

class Pather {
    constructor(app) {
        this.app = app
    }


    openAccess(filename, netpath) {
        this.app.get(netpath, (req, res) => {
            res.sendFile(path.join(__dirname, filename))
        })
    }

    
    setDefaultAccess() {
        //Получаем первый ключ объекта массива и от этого ключа получаем значение
        DEFAULT_PATH.forEach((obj) => this.openAccess(Object.keys(obj)[0], obj[Object.keys(obj)[0]]))
    }
}



module.exports = Pather