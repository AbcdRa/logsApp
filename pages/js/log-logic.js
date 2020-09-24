
const reader = new FileReader()
const separators = [", ",  "     ", "  "]
const columns = [ 
    {title:"Timestamp", field:"Timestamp", editor:dateEditor},
    {title:"Message Type", field:"Message Type", editor:"input"},
    {title:"Source of message", field:"Source of message", editor:"input"},
    {title:"Message", field:"Message", editor:"input", minWidth:1400},
]
const magicNumber = 6.0344827586206895
const logTable = []
const clientHeight = window.innerHeight - 60
let table
let deleteMode = false
let nameUploadedFile


function getMaxLengthMessage() {
    return logTable.sort((r1, r2) => r2["Message"].length - r1["Message"].length)[0].Message.length
}


Tabulator.prototype.extendModule("filter", "filters", {
    "===":function(headerValue, rowValue, rowData, filterParams){
        return rowVal === headerValue ? true : false;
    }
});


function separate(str, template) {
    const row = {}
    template.forEach((element, i) => {
        j = str.indexOf(element)
        row[columns[i].title] = str.substring(0, j).trim()
        str = str.substring(j+element.length).trim()
        if(i===(template.length-1)) {
            row[columns[i+1].title] = str
        }
    });
    return row
}


function renderTable(log) {
    const rows = log.split('\n')
    document.forms[0].outerHTML = ""
    
    rows.forEach(row => {logTable.push(separate(row, separators) )})
    columns[3].minWidth = magicNumber*getMaxLengthMessage()
    table = new Tabulator("#example-table", {
        resizableColumns: true,
        autoResize:false,
        height:clientHeight,
        selectable:true,
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


var dateEditor = function(cell, onRendered, success, cancel){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = moment(cell.getValue(), "DD/MM/YYYY").format("YYYY-MM-DD"),
    input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    function onChange(){
        if(input.value != cellValue){
            success(moment(input.value, "YYYY-MM-DD").format("DD/MM/YYYY"));
        }else{
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function(e){
        if(e.keyCode == 13){
            onChange();
        }

        if(e.keyCode == 27){
            cancel();
        }
    });

    return input;
};

function saveTable() {
    let tableText = ""
    table.getRows().forEach(
        (row, i) => {
            tableText += row2str(row)
            tableText += (table.getRows().length - 1 === i) ? '':'\n'
        }
    )
    download(tableText, nameUploadedFile, ".txt")
}


function row2str(row) {
    let result = ""
    row.getCells().forEach(
        (cell, i) => {
            result += cell.getValue()
            if(i !== separators.length) {
                result += separators[i]
            }
        }
    )
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