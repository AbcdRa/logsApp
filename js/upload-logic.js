postRequest("/logs/view/tableName",{}, (res) => {
    if(res.logName) {
        document.getElementById("local-view").innerHTML = res.logName
    }
})

function upload(form) {
    const reader = new FileReader()
    let uploadedFile = form.files[0]
    console.log(uploadedFile)
    let filename = document.getElementById("logName").value
    if(!filename) filename = uploadedFile.name
    console.log(uploadedFile.name)
    reader.readAsText(uploadedFile);

    reader.onload = function() {
        postRequest("/logs/upload", {logFile:uploadedFile}, res => {
            alert("Лог успешно загружен: " + filename)
            document.getElementById("file").value = "" 
            document.getElementById("logName").value = ""
        },
        {
            "logName": filename
        })
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
}