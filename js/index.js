'use strict'

let maleColor = "#046453"
let femaleColor = "#fb9bac"
let teenagersColor = "#40d2be"
let youngAdultsColor = "#e8bc33"
let seniorsColor = "#4c6764"

let businesses = [
    {
        id: 1,
        name: "Business 1",
        femaleData: [30,40,35,50,49,60,70,91,125,23,39,70,71,61,123,25,60,50,25,60,40,35,50,49,60,70,91,143,23,39,26],
        maleData: [60,50,25,60,39,70,71,61,123,25,60,50,25,60,39,70,71,61,150,25,39,70,83,22,123,25,60,50,25,60,36],
        ageData: [35,22,15,41,70,54,46,74,48,45,62,57,24,55,67,37,26,39,46,29,70,39,48,68,45,57,36,22,69,60,14]
    },
    {
        id: 2,
        name: "Business 2",
        femaleData: [63,59,39,172,140,179,63,42,27,43,55,95,196,123,17,174,98,16,111,89,67,1,111,11,124,177,9,126,127,55,137],
        maleData: [187,14,134,189,111,174,169,29,13,118,35,29,120,138,51,154,103,19,49,110,0,86,38,87,112,156,199,74,72,102,183],
        ageData: [47,32,62,28,47,34,65,36,47,66,36,29,15,49,59,25,57,24,60,56,33,28,34,75,32,74,19,48,78,36,77]
    },
    {
        id: 3,
        name: "Business 3",
        femaleData: [82,79,7,66,165,186,72,34,196,148,50,42,147,42,32,94,89,6,116,184,35,194,51,136,133,2,142,37,164,68,116],
        maleData: [160,161,44,17,195,183,20,72,157,31,55,35,107,197,90,157,196,195,163,55,118,158,9,22,100,112,33,173,102,162,141],
        ageData: [75,74,52,52,74,12,56,76,17,57,39,22,12,23,48,35,79,74,43,39,64,76,19,48,77,61,60,23,28,17,42]
    }
]

document.querySelector("#business").value = 1;
renderCharts(businesses[0])

let businessSelectOptions = document.querySelectorAll('.businessSelectOption')
Array.prototype.forEach.call(businessSelectOptions, (option) => {
    option.addEventListener('click', () => {
        let found = false
        let i = 0
        while(!found && i < businesses.length) {
            if(businesses[i].id !== parseInt(option.value))
                i++
            else {
                found = true
                document.querySelector("#gender-chart-time").innerHTML = ""
                document.querySelector("#gender-chart-total").innerHTML = ""
                document.querySelector("#age-chart-time").innerHTML = ""
                document.querySelector("#age-chart-total").innerHTML = ""
                renderCharts(businesses[i])
            }
        }
    })
})

function renderCharts(business) {
    let genderTimeOptions = {
        chart: {
            type: 'line'
        },
        colors: [maleColor, femaleColor],
        series: [
            {
                name: 'Male',
                data: business.maleData
            },
            {
                name: 'Female',
                data: business.femaleData
            }
        ],
        xaxis: {
            category: ["Jan 01","Jan 02","Jan 03","Jan 04","Jan 05","Jan 06","Jan 07","Jan 08","Jan 09","Jan 10","Jan 11","Jan 12","Jan 13","Jan 14","Jan 15","Jan 16","Jan 17","Jan 18","Jan 19","Jan 20","Jan 21","Jan 22","Jan 23","Jan 24","Jan 25","Jan 26","Jan 27","Jan 28","Jan 29","Jan 30","Jan 31"]
        }
    }
    
    let genderTimeChart = new ApexCharts(document.querySelector("#gender-chart-time"), genderTimeOptions)
    genderTimeChart.render()

    let maleTotal = business.maleData.reduce((accumulator, currentValue) => accumulator+currentValue, 0)
    let femaleTotal = business.femaleData.reduce((accumulator, currentValue) => accumulator+currentValue, 0)

    let genderTotalOptions = {
        chart: {
            type: 'donut'
        },
        colors: [maleColor, femaleColor],
        dataLabels: {
            style: {
                fontSize: '15pt'
            }
        },
        plotOptions: {
            pie: {
                customScale: 0.625,
                donut: {
                    size: '1%'
                }
            }
        },
        series: [maleTotal, femaleTotal],
        labels: ['Male', 'Female']
    }
    
    let genderTotalChart = new ApexCharts(document.querySelector("#gender-chart-total"), genderTotalOptions)
    genderTotalChart.render()

    let ageTimeOptions = {
        chart: {
            type: 'line'
        },
        series: [
            {
                name: 'Age',
                data: business.ageData
            }
        ],
        colors: [maleColor],
        xaxis: {
            category: ["Jan 01","Jan 02","Jan 03","Jan 04","Jan 05","Jan 06","Jan 07","Jan 08","Jan 09","Jan 10","Jan 11","Jan 12","Jan 13","Jan 14","Jan 15","Jan 16","Jan 17","Jan 18","Jan 19","Jan 20","Jan 21","Jan 22","Jan 23","Jan 24","Jan 25","Jan 26","Jan 27","Jan 28","Jan 29","Jan 30","Jan 31"]
        }
    }
    
    let ageTimeChart = new ApexCharts(document.querySelector("#age-chart-time"), ageTimeOptions)
    ageTimeChart.render()

    let ageCategories = {
        teenagers: 0,
        youngAdults: 0,
        adults: 0,
        seniors: 0
    }

    business.ageData.forEach((ageEntry) => {
        if(ageEntry < 21)
            ageCategories.teenagers += 1
        else if(ageEntry < 31)
            ageCategories.youngAdults += 1
        else if(ageEntry < 70)
            ageCategories.adults += 1
        else
            ageCategories.seniors += 1
    })

    let ageTotalOptions = {
        chart: {
            type: 'donut'
        },
        dataLabels: {
            style: {
                fontSize: '15pt'
            }
        },
        plotOptions: {
            pie: {
                customScale: 0.625,
                donut: {
                    size: '1%'
                }
            }
        },
        series: [ageCategories.teenagers, ageCategories.youngAdults, ageCategories.adults, ageCategories.seniors],
        labels: ["Teenagers", "Young adults", "Adults", "Seniors"],
        colors: [teenagersColor, youngAdultsColor, maleColor, seniorsColor]
    }
    let ageTotalChart = new ApexCharts(document.querySelector("#age-chart-total"), ageTotalOptions)
    ageTotalChart.render()

}

// function getMonthArray(monthDays, minValue, maxValue) {
//     let returnArray = [];
//     for(i = 0; i < monthDays; i++) {
//         returnArray.push(Math.floor(Math.random() * (maxValue - minValue) + minValue))
//     }
//     return returnArray
// }