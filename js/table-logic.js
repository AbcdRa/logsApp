const reader = new FileReader()
const magicNumber = 6.0344827586206895
const clientHeight = window.innerHeight - 60
let table


function getMaxLengthMessage(logTable) {
    let maxLength = 0
    let nameLastCol = columns[columns.length-1].title
    for(const row of logTable) {
        if(row[nameLastCol] && row[nameLastCol].length > maxLength) {
            maxLength = row[nameLastCol].length
        }
    }
    return maxLength
}


Tabulator.prototype.extendModule("filter", "filters", {
    "===":function(headerValue, rowValue, rowData, filterParams){
        return rowVal === headerValue ? true : false;
    }
});


function renderTable(logTable) {
    columns[columns.length-1].minWidth = magicNumber*getMaxLengthMessage(logTable)
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


function deleteSelectedRows() {
    table.getSelectedRows().forEach(row => row.delete())
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


function getTableText(tableName) {
    let tableText = ""
    table.getData().sort( (r1, r2) => r2[columns[0].title] - (r1[columns[0].title]))
    .forEach(
        (row, i) => {
            tableText += row2str(row) + '\n'
        }
    )
    return tableText.substring(0,tableText.length-1)
}



function saveAsTxt(tableName) {
    let tableText =getTableText(tableName)
    download(tableText, tableName, ".txt")
}


function row2str(row) {
    let result = ""
    columns.forEach((col, i) => {
        if(i!==0) {
            result += row[col.title]; 
            result += (i-1!==separators.length) ? separators[i-1] : ""
        }
    })
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
