//Инициализируем реквест
const xhr = new XMLHttpRequest();
//Делаем пост запрос на страницу /db
xhr.open("POST", '/db');
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
xhr.send(formData);


function renderInfoTable(response) {
    
}