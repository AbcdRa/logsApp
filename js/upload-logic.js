function upload(form) {
    const reader = new FileReader()
    let uploadedFile = form.files[0]
    console.log(uploadedFile)
    let filename = document.getElementById("logName").value
    if(!filename) filename = uploadedFile.name
    console.log(uploadedFile.name)
    reader.readAsText(uploadedFile);

    reader.onload = function() {
        sendFileOnServer(uploadedFile, filename)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
}


function sendFileOnServer(file, name) {
    //Инициализируем реквест
    const xhr = new XMLHttpRequest();
    //Инициализируем контейнер для отправляемых полей
    const formData = new FormData();
    formData.append("logFile", file);
    //Делаем пост запрос на страницу /auth
    xhr.open("POST", '/logs/upload');
    xhr.setRequestHeader("logName", name)

    //Ожидаем получить респонс в виде файла json
    xhr.responseType = 'json';

    //При каждом изменения статуса получение респонса проверяем
    //находится ли он на последней фазе 4
    //так как файл json то берем значения поля message
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { 
            const message = xhr.response.message 
            if(message === "OK") {
                alert("Лог успешно загружен: " + name)
            }
            else {
                alert(message)
            }
            document.getElementById("file").value = "" 
            document.getElementById("logName").value = ""
        }
    }
    //Отправляем response
    xhr.send(formData);
}