import { updateCountyTimeline } from "./addCountyPeriodItems.js"

import { openSeaViewerFunc } from "./openSeaMapViewer.js"


// map carousel thumbnails - change active status on click for each
export const changeActiveImg = () => {
    const sliderImages = document.querySelectorAll('.thumb-map-img')
    sliderImages.forEach(img => {
        img.addEventListener('click', () => {
            sliderImages.forEach(images => {
                images.classList.remove('active-img')
                images.nextElementSibling.classList.remove('d-none')
            })
            img.classList.add('active-img')
            img.nextElementSibling.classList.add('d-none')
            openSeaViewerFunc(img.id)
            let currId = img.id
            updateCountyTimeline(currId)

        })
    })
}