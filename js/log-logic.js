let nameUploadedFile


function showFile(inFile) {
    const uploadedFile = inFile.files[0]
    nameUploadedFile = uploadedFile.name
    reader.readAsText(uploadedFile);

    reader.onload = function() {
        document.getElementById("div-table-control").className = "table-controls mt-2 ml-3"
        const log = reader.result
        document.forms[0].outerHTML = ""
        const logTable = txt2log(log)
        renderTable(logTable)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
}


function saveTable() {
    saveAsTxt(nameUploadedFile)
}
