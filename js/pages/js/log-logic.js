const reader = new FileReader()
const magicNumber = 6.0344827586206895
const logTable = []
const clientHeight = window.innerHeight - 60
let table
let nameUploadedFile


function getMaxLengthMessage(logTable) {
    let maxLength = 0
    for(const row of logTable) {
        if(row["Message"] && row["Message"].length > maxLength) {
            maxLength = row["Message"].length
        }
    }
    return maxLength
}


Tabulator.prototype.extendModule("filter", "filters", {
    "===":function(headerValue, rowValue, rowData, filterParams){
        return rowVal === headerValue ? true : false;
    }
});


function renderTable(log) {

    document.forms[0].outerHTML = ""
    const logTable = txt2log(log)
    columns[3].minWidth = magicNumber*getMaxLengthMessage(logTable)
    table = new Tabulator("#example-table", {
        resizableColumns: true,
        autoResize:false,
        height:clientHeight,
        selectable:true,
        reactiveData:true,
        layout:"fitDataTable",
        data:logTable, //assign data to table
        columns: columns,
        selectableRangeMode:"click",

    });
    filterEnable(table)
}


function filterEnable(table)  {
    var fieldEl = document.getElementById("filter-field");
    var typeEl = document.getElementById("filter-type");
    var valueEl = document.getElementById("filter-value");

    //Update filters on value change
    document.getElementById("filter-field").addEventListener("change", updateFilter);
    document.getElementById("filter-type").addEventListener("change", updateFilter);
    document.getElementById("filter-value").addEventListener("keyup", updateFilter);

    //Clear filters on "Clear Filters" button click
    document.getElementById("filter-clear").addEventListener("click", function(){
        fieldEl.value = "";
        typeEl.value = "=";
        valueEl.value = "";
        table.clearFilter();
    });


    function updateFilter(){
        var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
        var typeVal = typeEl.options[typeEl.selectedIndex].value;
      
        if(filterVal){
          table.setFilter(filterVal,typeVal, valueEl.value);
        }
     }
}


function showFile(inFile) {
    const uploadedFile = inFile.files[0]
    nameUploadedFile = uploadedFile.name
    reader.readAsText(uploadedFile);

    reader.onload = function() {
        document.getElementById("div-table-control").className = "table-controls mt-2 ml-3"
        const log = reader.result
        renderTable(log)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
}


function deleteSelectedRows() {
    table.getSelectedRows().forEach(row => row.delete())
}


function saveTable() {
    let tableText = ""
    table.getData().sort( (r1, r2) => r2[columns[0].title].localeCompare(r1[columns[0].title]))
    .forEach(
        (row, i) => {
            tableText += row2str(row) + '\n'
            console.log(i)
        }
    )
    download(tableText.substring(0,tableText.length-1), nameUploadedFile, ".txt")
}


function row2str(row) {
    let result = ""
    Object.values(row).forEach((cell, i) => {
        result += cell; 
        result += (i!==separators.length) ? separators[i] : ""})
    return result
}


function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
