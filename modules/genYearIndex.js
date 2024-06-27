
import { openSeaViewerFunc } from "./openSeaMapViewer.js";
import { addThumbImages } from "./addThumbImages.js";
import { testMapCarouselArrow } from "./testMapCarouselArrow.js";
import { data } from "./data.js";
import { mapDatesArr } from "./mapData.js";
import { changeActiveImg } from "./changeActiveImg.js";


export const genYearIndex = () => {
    const currentYear = new Date().getFullYear()
    let yearInputNumber = parseInt(data.year)
    if (yearInputNumber > 0 && yearInputNumber <= currentYear) {
        data.year = yearInputNumber
    } else {
        data.year = 0
    }

    if (yearInputNumber >= 1820 && yearInputNumber <= currentYear) {
        for (let i = 0; i < mapDatesArr.length; i++) {
            if (yearInputNumber >= parseInt(mapDatesArr[i].slice(0, 4)))
                data.yearIndex = i;
        }
    } else {
        data.yearIndex = 0
    }
    openSeaViewerFunc(data.yearIndex)
    addThumbImages(data.yearIndex - 1)
    if (yearInputNumber >= 1820 && yearInputNumber <= currentYear) {
        document.querySelectorAll('.thumb-map-img')[0].classList.add('active-img')
        document.querySelector('.active-img').nextElementSibling.classList.add('d-none')
    }
    changeActiveImg()
    testMapCarouselArrow()
}