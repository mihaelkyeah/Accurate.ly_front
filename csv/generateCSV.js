const fs = require("fs")

// Opening hours
var openingTime = 9
var firstShiftEnd = 13
var secondShiftStart = 16
var closingTime = 20
var openingHours =
    (firstShiftEnd !== null) ?
        (firstShiftEnd - openingTime) + (closingTime - secondShiftStart)
        : (closingTime - openingTime)

// Customers' age range
var minimumAge = 12
var ageRange = 68
var maxCustomers = 10

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
    if(!secondShiftStart)
        hourNumber = openingTime+Math.floor(Math.random()*openingHours)
    else {
        let secondShift = (Math.floor(Math.random()*2)) < 1 ? false : true
        let shiftHours = !secondShift ? (firstShiftEnd-openingTime) : (closingTime-secondShiftStart)
        hourNumber = Math.floor(Math.random()*shiftHours)
        hourNumber = !secondShift ? (hourNumber+openingTime) : (hourNumber+secondShiftStart)
    }
    let hourString = stringifyNumberWithLeadingZeroes(hourNumber, 2)
    
    // Minutes
    let minuteString = stringifyNumberWithLeadingZeroes((Math.floor(Math.random()*60)), 2)

    return hourString+":"+minuteString
}

/**
 * This function generates mock data in the lapse of a year or more.
 * If no finishing year is specified, the data is generated for one year only
 * using the value passed to the yearFrom parameter.
 * If no parameters are passed, it uses the current year by default.
 * @param {number} yearFrom // Starting year.
 * @param {number} yearTo // Finishing year.
 * @returns object
 */
function generateData(yearFrom = null, yearTo = null) {

    let yearFromLoop = (yearFrom !== null) ? yearFrom : new Date().getFullYear()
    let yearToLoop = (yearTo !== null) ? yearTo : yearFromLoop

    let dataJSON = {
        "data": []
    }
    let id = 0

    for(let i = yearFromLoop; i <= yearToLoop; i++ ) {
        let monthDays = getMonthDays(i)

        for(let j = 1; j <= 12; j++) {
            for(let k = 1; k <= monthDays[(j-1)]; k++) {

                for(let n = 1; n < maxCustomers; n++) {

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

    }

    dataJSON["data"].sort(sortDataCompare)

    return dataJSON
}

function sortDataCompare(a, b) {
    if(a["DateTime"] < b["DateTime"])
        return -1
    if(a["DateTime"] > b["DateTime"])
        return 1
    return 0
}

function generateCSV(dataJSON, dataField = "data") {
    let fileString = "DateTime,Gender,Age"
    dataJSON[dataField].forEach((obj) => {
        fileString += "\n"+obj["DateTime"]+","+obj["Gender"]+","+obj["Age"]
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
let data = generateData()
generateCSV(data)