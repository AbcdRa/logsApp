function upload(form) {
    const reader = new FileReader()
    const uploadedFile = form.files[0]
    
    reader.readAsText(uploadedFile);

    reader.onload = function() {
        const log = reader.result
        sendFileOnServer(log)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
}


function sendFileOnServer(file) {
    //Инициализируем реквест
    const xhr = new XMLHttpRequest();
    //Инициализируем контейнер для отправляемых полей
    const formData = new FormData();
    formData.append("logFile", file);
    //Делаем пост запрос на страницу /auth
    xhr.open("POST", '/logs/upload');
    //Ожидаем получить респонс в виде файла json
    xhr.responseType = 'json';

    //При каждом изменения статуса получение респонса проверяем
    //находится ли он на последней фазе 4
    //так как файл json то берем значения поля message
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.response["message"] === "OK") { 
            console.log("Sucess")
        } else {
        alert(xhr.response["message"])
        }
    }
    //Отправляем response
    xhr.send(formData);
}