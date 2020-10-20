
function authorization() {
    //Парсим и укомплектовываем в контейнер
    const login = document.forms.auth.login.value;
    const password = document.forms.auth.password.value;
    postRequest("/auth",{login, password}, res => location.href = 'logs')
}

function deauth() {
    postRequest("/auth",{deauth:true}, res => location.href = location.origin)
}



