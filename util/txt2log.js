const columns = [ 
    {title:"Timestamp", field:"Timestamp", editor:"input"},
    {title:"Message Type", field:"Message Type", editor:"input"},
    {title:"Source of message", field:"Source of message", editor:"input"},
    {title:"Message", field:"Message", editor:"input"},
]
const separators = [", ",  "     ", "  "]


function txt2log(txt) {
    const logTable = []
    const rows = txt.split("\n")
    rows.forEach(row => {logTable.push(separate(row, separators) )})
    return logTable
} 


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


try {
    module.exports = txt2log
} catch(e) {
    console.log("It's web")
}