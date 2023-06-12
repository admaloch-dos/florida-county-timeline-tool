import { counties } from "./counties.js"

export function grabCurrItemYear(currItem) {
    const currCounty = counties.filter(x => x.id === currItem)
    const countyPeriodArr = currCounty[0].periods
    const periodLength = countyPeriodArr.length
    const endDate = new Date(countyPeriodArr[periodLength - 1][1])
    const endYear = endDate.getFullYear()
    return endYear
}

export function doesCountyExist() {
    const highlighted = document.querySelector('.highlighted')
    if (!highlighted) {

            $("#old-county-info").fadeIn();

        const oldCountySpan = document.querySelector('#old-county')
        const countySelect = document.querySelector('#county-select')
        const endYear = grabCurrItemYear(countySelect.value)
        oldCountySpan.innerHTML = `
        ${countySelect.value} county ceased to exist in ${endYear}. See the timeline and map below to see more info about the counties history.


        `
    } else {
        $("#old-county-info").fadeOut();
    }
}