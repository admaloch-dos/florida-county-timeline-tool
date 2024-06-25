import { addCountyPeriodItems } from "./addCountyPeriodItems.js"
import { openSeaViewerFunc } from "./openSeaMapViewer.js"
import { data } from "./data.js"
import { addThumbImages } from "./addThumbImages.js"
import { changeActiveImg } from "./changeActiveImg.js"



export const reset = () => {

    const yearInput = document.querySelector('#year-search')
    yearInput.value = ''
    data.year = yearInput.value
    addCountyPeriodItems()
    openSeaViewerFunc(0)
    data.yearIndex = 0
    addThumbImages(data.yearIndex)
    changeActiveImg()
    // avoidPopupBubble()
     
}
