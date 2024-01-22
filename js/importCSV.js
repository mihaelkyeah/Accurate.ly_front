"use strict"

var reader = new FileReader()

function parseCSV(fileInput) {
    let dataArray = []
    reader.onload = ((event) => {
        let str = event.target.result
        let result = str.split(/\r?\n/)
        let fields = result[0].split(",")

        for(let i = 1; i < result.length; i++) {
            let data = result[i].split(",")
            let obj = {}
            for(let j = 0; j < fields.length; j++) {
                obj[fields[j]] = data[j]
            }
            dataArray.push(obj)
        }

        console.log(dataArray) // ONLY IN DEVELOPMENT
        // return dataArray // ONLY IN PRODUCTION
    })
    reader.readAsText(fileInput.files[0])
}