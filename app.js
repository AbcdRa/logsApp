const express = require("express")
const session = require("express-session")
const config = require("config")
const hbs = require("hbs")
const Pather= require("./util/Pather")


//Берем порт из объекта process если он существует
const PORT = process.env.PORT || 80


//Инициализируем приложение 
const app = express()

//Создаем класс Pather которые откроет нам get доступ к стандартным путям см. класс Pather.js
const pather = new Pather(app)
pather.setDefaultAccess()

//Устанавливаем движок для рендера страниц
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + '/views/partials')


//Используем middleware для express которые позволяет организовывать сессии
//Некоторые даныые он берет из config файла см. /config/default.json
app.use(session({ 
    secret: config.get("secretExpressSession"), 
    cookie: { maxAge: config.get("sessionTime")*60000},
    resave: true,
    saveUninitialized: true
}))


//Подключаем роуты, в этих файлах get запросы обрабатываются по особому
app.use("/auth", require("./routes/auth"))
app.use("/logs", require("./routes/logs"))
//А это простой рендер 
app.get("/", (req,res) => res.render("index.hbs"))
app.get("/guest", (req,res) => res.render("guest.hbs"))


//Запускаем приложение и пишем в консоль 
app.listen(PORT,() => {
    console.log(`Server start on port ${PORT}`);
})

