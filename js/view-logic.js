let logName
let logTable


postRequest("/logs/view/table",{},(res)=>{
    logTable= res.logTable
    logName = res.logName
    document.getElementById("local-view").innerHTML = logName
    renderTable(logTable)
    document.getElementById("div-table-control").className = "table-controls mt-2 ml-3"
}, null, "GET")


function updateTable() {
    var file = new Blob([getTableText()]);
    file = new File([file], logName)
    postRequest("/logs/view/update",{logTable:file, logName:logName}, res => alert(res))
}


function saveTable() {
    saveAsTxt(logName)
}



