//Инициализируем реквест
const xhr = new XMLHttpRequest();
//Делаем пост запрос на страницу /db
xhr.open("POST", '/logs/db');
//Ожидаем получить респонс в виде файла json
xhr.responseType = 'json';

//При каждом изменения статуса получение респонса проверяем
//находится ли он на последней фазе 4
//так как файл json то берем значения поля message
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
    if(xhr.response["message"] === "OK") { 
        renderInfoTable(xhr.response)
    } else {
    alert(xhr.response["message"])
    }
    }
}
//Отправляем response
xhr.send();
let id = 0

function getViewButton() {
    let e = document.createElement("button")
    e.className = "btn btn-outline-primary ml-2"
    e.innerText="Просмотр"
    e.id = "view-"+id
    return e.outerHTML
}

function getDeleteButton() {
    let e = document.createElement("button")
    e.className = "btn btn-outline-danger ml-2"
    e.innerText="Удалить"
    e.id = "delete-"+id++
    return e.outerHTML
}


function renderInfoTable(response) {
    const newDiv = document.createElement("div")
    newDiv.className = "m-3"
    newDiv.style = "font-size:20px;"
    response.logList.forEach(logName => {
        newDiv.innerHTML += `<p>${logName}${getViewButton()}${getDeleteButton()}</p>`
    });
    document.body.append(newDiv)
    console.log(response.logList)
}