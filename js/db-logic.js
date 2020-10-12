postRequest("/logs/db",{}, (res) => renderInfoTable(res))
postRequest("/logs/view/tableName",{}, (res) => {
    if(res.logName) {
        document.getElementById("local-view").innerHTML = res.logName
    }
})

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

