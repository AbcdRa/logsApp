//По умолчанию первый столбец всегда id, а последний Message, для них прописана отдельная логика
const columns = [ 
    {title:"id", field:"id", editor:"input"},
    {title:"Timestamp", field:"Timestamp", editor:"input"},
    {title:"Message Type", field:"Message Type", editor:"input"},
    {title:"Source of message", field:"Source of message", editor:"input"},
    {title:"Message", field:"Message", editor:"input"},
]
const separators = [", ",  "     ", "  "]
//const template = [[0, 19], [21, 43], [43, 50], [50]]


function txt2log(txt) {
    const logTable = []
    const rows = txt.split("\n")
    rows.forEach((row, i) => {
        let sRow = separate(row, separators)
        sRow.id = i
        logTable.push(sRow)
        
    })
    return logTable
} 



function separate(str, template) {
    
    if(isNaN(str[0])) {
        row = {}
        for(let i = 1; i < columns.length; i++) {
            if(i!== columns.length-1) {
                row[columns[i].title] = ""
            }
            else{
                row[columns[i].title] = str
            }
        }
        return row
    }
    return defaultSeparate(str, template)
}


// function defaultSeparate(str, template) {
//     const row = {}
//     for(let i = 1; i < columns.length; i++) {
//         //Если не последний элемент то режем строку по границам
//         if(i!==columns.length-1) {
//             row[columns[i].title] = str.substring(template[i-1][0],template[i-1][1]).trim()
//         }
//         //Если это последний то вырезаем строку до конца
//         else {
//             row[columns[i].title] = str.substring(template[i-2][1]).trim()
//         }
    
//     }
//     return row
// }


function defaultSeparate(str, template) {
    const row = {}
    template.forEach((element, i) => {
        j = str.indexOf(element)
        row[columns[i+1].title] = str.substring(0, j).trim()
        str = str.substring(j+element.length).trim()
        if(i===(template.length-1)) {
            row[columns[i+2].title] = str
        }
    });
    return row
}





try {
    module.exports = txt2log
} catch(e) {
    console.log("It's web")
}