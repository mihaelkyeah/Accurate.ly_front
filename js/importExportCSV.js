"use strict"

var reader = new FileReader()

// Parse CSV from file input field
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

// Generate CSV file
function generateCSV(dataJSON, dataField = "data") {
    // Generate file string
    let fileString = "DateTime,Gender,Age"
    dataJSON[dataField].forEach((obj) => {
        fileString += "\n"+obj["DateTime"]+","+obj["Gender"]+","+obj["Age"]
    })
    // Export CSV
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileString));
    element.setAttribute('download', "output.csv");
    element.style.display = 'none';
    // Open file explorer shell Save As dialogue
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}