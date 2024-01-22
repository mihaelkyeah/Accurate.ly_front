const fs = require("fs")

var yearFrom = 2024
var yearTo = null
var openingTime = 9
var openingHours = 8
var splitShift = false
var minimumAge = 12
var ageRange = 68

/**
 * ------------------------------------
 * | Functions
 * ------------------------------------
 */

function getMonthDays(year) {
    let februaryDays = (year % 4 !== 0) ? 28 : 29
    return [31, februaryDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

function generateVisitTime() {
    // Hours
    let hourNumber = null
    if(!splitShift)
        hourNumber = openingTime+Math.floor(Math.random()*openingHours)
    else {
        let secondShift = (Math.floor(Math.random()*2)) < 1 ? false : true
        hourNumber = openingTime+Math.floor(Math.random()*(openingHours / 2))
        if(secondShift)
            hourNumber += 4
    }
    let hourString = stringifyNumberWithLeadingZeroes(hourNumber, 2)
    
    // Minutes
    let minuteString = stringifyNumberWithLeadingZeroes((Math.floor(Math.random()*60)), 2)

    return hourString+":"+minuteString
}

function generateData(yearFrom, yearTo = null) {

    let yearToLoop = !yearTo ? yearFrom : yearTo
    let dataJSON = {
        "data": []
    }
    let id = 0

    for(let i = yearFrom; i <= yearToLoop; i++ ) {
        let monthDays = getMonthDays(i)

        for(let j = 1; j <= 12; j++) {
            for(let k = 1; k <= monthDays[(j-1)]; k++) {

                if(Math.floor(Math.random()*2) > 0) {
                    let gender = (Math.floor(Math.random()*2) > 0) ? "male" : "female"
                    let month = stringifyNumberWithLeadingZeroes(j, 2)
                    let day = stringifyNumberWithLeadingZeroes(k, 2)
                    let obj = {
                        "id": id+1,
                        "DateTime": i+"-"+month+"-"+day+"-"+generateVisitTime(),
                        "Gender": gender,
                        "Age": minimumAge + Math.floor(Math.random()*ageRange)
                    }
                    dataJSON["data"].push(obj)
                }

            }
        }

    }

    sortData(dataJSON)

    return dataJSON
}

function sortData(dataJSON, dataField = "data") {
    for(let i = 0; i < dataJSON[dataField].length; i++) {
        let aux = dataJSON[dataField][i]
        for(let j = i+1; j < dataJSON[dataField].length; j++) {
            if(dataJSON[dataField][j] < aux) {
                dataJSON[dataField][i] = dataJSON[dataField][j]
                dataJSON[dataField][j] = aux
                aux = dataJSON[dataField][j]
            }
        }
    }
}

function generateCSV(dataJSON, dataField = "data") {
    let fileString = "DateTime,Gender,Age\n"
    dataJSON[dataField].forEach((obj) => {
        fileString += obj["DateTime"]+","+obj["Gender"]+","+obj["Age"]+"\n"
    })
    fs.writeFile("output.csv", fileString, (err) => {
        if(err) throw err
    })
}


function stringifyNumberWithLeadingZeroes(number, leadingZeroAmount) {
    let numberString = Math.abs(number)+""
    let leadingZeroes = ""

    if(numberString.length < leadingZeroAmount) {
        /**
         * WHY WON'T YOU WORK WHAT HAVE I DONE TO YOU????????
         * ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
         * 
         * numberString.padStart(leadingZeroAmount, "0")
         * 
         * ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
         * I tried to use the padStart method as suggested in W3Schools
         * but it just won't behave properly. 🙃
         */
        let i = leadingZeroAmount - numberString.length
        for(i; i < leadingZeroAmount; i++)
            leadingZeroes += "0"
    }

    numberString = leadingZeroes+numberString

    if(number < 0)
        numberString = "-"+numberString
    
    return numberString
}

/**
 * ------------------------------------
 * | Program
 * ------------------------------------
 */
let data = generateData(yearFrom, yearTo)
generateCSV(data)