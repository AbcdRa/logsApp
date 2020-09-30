let logName
let logTable


function updateTable() {
    postRequest("/logs/view/update",{logTable:JSON.stringify(logTable), logName:logName}, res => alert(res))
}


function saveTable() {
    saveAsTxt(logName)
}


postRequest("/logs/view/table",{},(res)=>{
    logTable= res.logTable
    logName = res.logName
    document.getElementById("local-view").innerHTML = logName
    renderTable(logTable)
    document.getElementById("div-table-control").className = "table-controls mt-2 ml-3"
})


