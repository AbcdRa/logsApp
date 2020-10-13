function postRequest(ref, json, callback, requestHeader=null) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", ref);
    if(requestHeader) {
        Object.keys(requestHeader).forEach(key => {
            xhr.setRequestHeader(key, requestHeader[key])
        })
    }
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