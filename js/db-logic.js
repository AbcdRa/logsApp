postRequest("/logs/logList",{}, (res) => renderLogList(res.logList),null,"GET")
//Динамически меняем имя лога
postRequest("/logs/view/tableName",{}, (res) => {
    if(res.logName) {
        document.getElementById("local-view").innerHTML = res.logName
    }
}, null, "GET")

let id = 0

//Функция для генерации интерактивной кнопки Просмотреть
function getViewButton(logName) {
    let e = document.createElement("button")
    e.className = "btn btn-outline-primary ml-2"
    e.innerText="Просмотр"
    e.id = "view-"+id
    e.addEventListener("click", ()=>{
        postRequest("/logs/view", {logName:logName}, res=> {
            if(res.message==="OK") window.location.href = "/logs/view"
        })
    })
    return e
}

//Функция для генерации интерактивной кнопки удалить
function getDeleteButton(logName) {
    let e = document.createElement("button")
    e.className = "btn btn-outline-danger ml-2"
    e.innerText="Удалить"
    e.id = "delete-"+id++
    e.addEventListener("click", () => { 
        postRequest("/logs", {logName:logName}, ()=>window.location.href="\logs", null,"DELETE")
    })
    return e
}


//Отображаем список логов
function renderLogList(logList) {
    const newDiv = document.createElement("div")
    newDiv.className = "m-3"
    newDiv.style = "font-size:20px;"
    logList.forEach(logName => {
        const p = document.createElement("p")
        p.innerText = logName
        p.append(getViewButton(logName))
        p.append(getDeleteButton(logName))
        newDiv.append(p)
    });
    document.body.append(newDiv)
}

