const path = require("path")

const PATH = [
{"/pages/index.html":"/"},
{"/pages/js/util.js":"/js/util.js"},
{"/pages/css/styles.css":"/css/styles.css"},
{"/favicon.ico" : "/favicon.ico"},
{"/pages/js/log-logic.js" : "/js/log-logic.js"},
{"/pages/log-control.html" : "/log-control"},
{"/dist/css/bootstrap/tabulator_bootstrap4.min.css":"/dist/css/materialize/tabulator_materialize.min.css"},
{"/dist/css/bootstrap/tabulator_bootstrap4.min.css.map":"/dist/css/materialize/tabulator_bootstrap4.min.css.map"}
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
        PATH.forEach((obj) => this.openAccess(Object.keys(obj)[0], obj[Object.keys(obj)[0]]))
    }
}



module.exports = Pather