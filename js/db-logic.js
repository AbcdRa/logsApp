postRequest("/logs/db",{}, (res) => renderInfoTable(res))

let id = 0

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

function getDeleteButton(logName) {
    let e = document.createElement("button")
    e.className = "btn btn-outline-danger ml-2"
    e.innerText="Удалить"
    e.id = "delete-"+id++
    e.addEventListener("click", () => { 
        postRequest("/logs/delete", {logName:logName}, ()=>window.location.href="\logs")
    })
    return e
}


function renderInfoTable(response) {
    const newDiv = document.createElement("div")
    newDiv.className = "m-3"
    newDiv.style = "font-size:20px;"
    response.logList.forEach(logName => {
        const p = document.createElement("p")
        p.innerText = logName
        p.append(getViewButton(logName))
        p.append(getDeleteButton(logName))
        newDiv.append(p)
    });
    document.body.append(newDiv)
    console.log(response.logList)
}


function postRequest(ref, json, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", ref);
    //Ожидаем получить респонс в виде файла json
    xhr.responseType = 'json';
    //При каждом изменения статуса получение респонса проверяем
    //находится ли он на последней фазе 4
    //так как файл json то берем значения поля message
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if(xhr.response["message"] === "OK") { 
                callback(xhr.response)
            } else {
                alert(xhr.response["message"])
            }
        }
    }
    //Отправляем response
    const formData = new FormData()
    Object.keys(json).forEach(key => formData.append(key, json[key]))
    xhr.send(formData);
} 