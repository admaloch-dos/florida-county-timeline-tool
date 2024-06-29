import { addCountyPeriodItems } from "./addCountyPeriodItems.js"
import { openSeaViewerFunc } from "./openSeaMapViewer.js"
import { data } from "./data.js"
import { addThumbImages } from "./addThumbImages.js"
import { changeActiveImg } from "./changeActiveImg.js"



export const updateCurrTimeline = () => {
    addCountyPeriodItems()
}

export const resetCurrCounty = () => {

    const yearInput = document.querySelector('#year-search')
    yearInput.value = ''
    data.year = yearInput.value
    updateCurrTimeline()
    openSeaViewerFunc(0)
    data.yearIndex = 0
    addThumbImages(data.yearIndex)
    changeActiveImg()
    // avoidPopupBubble()
}
