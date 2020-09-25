function auth() {
    //Инициализируем реквест
    const xhr = new XMLHttpRequest();
    //Инициализируем контейнер для отправляемых полей
    const formData = new FormData();
    //Парсим и укомплектовываем в контейнер
    const login = document.forms.auth.login.value;
    const password = document.forms.auth.password.value;
    formData.append("login", login);
    formData.append("password", password);
    //Делаем пост запрос на страницу /auth
    xhr.open("POST", '/auth');
    //Ожидаем получить респонс в виде файла json
    xhr.responseType = 'json';

    //При каждом изменения статуса получение респонса проверяем
    //находится ли он на последней фазе 4
    //так как файл json то берем значения поля message
    xhr.onreadystatechange = function() {
     if (xhr.readyState === 4) {
        if(xhr.response["message"] === "OK") { 
            location.href = 'logs';
        } else {
        alert(xhr.response["message"])
        }
     }
    }
    //Отправляем response
    xhr.send(formData);
}

function deauth() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/auth/deauth');
    //Ожидаем получить респонс в виде файла json
    xhr.responseType = 'json';

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && (xhr.response["message"] === "OK")) {
            location.href = location.origin;
        }
    }
    xhr.send()
}


