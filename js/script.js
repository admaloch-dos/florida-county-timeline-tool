import { counties } from "../modules/counties.js"
import { data } from "../modules/data.js"
import { addCountyPeriodItems, updateCountyTimeline } from "../modules/addCountyPeriodItems.js"
import { openSeaViewerFunc } from "../modules/openSeaMapViewer.js"
import { updateHighlightedCounty } from "./activate-image-mapster.js"
import { testMapCarouselArrow } from "../modules/testMapCarouselArrow.js"
import { addThumbImages } from "../modules/addThumbImages.js"
import { changeActiveImg } from "../modules/changeActiveImg.js"
import { reset } from "../modules/reset.js"
import { scrollFunc } from "../modules/scroll-func.js"
import { genYearIndex } from "../modules/genYearIndex.js"

const yearInput = document.querySelector('#year-search')
const countySelect = document.querySelector('#county-select')

// bootstrap function for popover
$(function () {
    $('[data-toggle="popover"]').popover()
})

// hide popover on scroll
window.addEventListener('scroll', function () {
    $("[data-toggle='popover']").popover('hide');
});



// hide popover when screen clicked
window.onload = function () {
    document.addEventListener("click", function (event) {
        // if the clicked element isn't child of the navbar, you must close it if is open
        if (!event.target.closest("[data-toggle='popover']")) {
            $("[data-toggle='popover']").popover('hide');
        }
    });
}

// loop to create items in the search by county select
for (let i = 0; i < counties.length; i++) {
    const countySelectOption = document.createElement('option')
    countySelectOption.innerText = counties[i].id
    countySelectOption.value = counties[i].id
    countySelect.append(countySelectOption)
}

//county select event listener - search by county select - event listener on change
countySelect.addEventListener('change', () => {
    data.county = countySelect.value
    updateHighlightedCounty(data.county)
    reset()
    scrollFunc('#year-container', 700)
})

// county map click event listener - image mapster 'html mapped' florida mpa - change county when clicked on the map itself
document.querySelectorAll('area').forEach(county => {
    county.addEventListener('click', () => {

        data.county = county.alt.replace('County', '').trim()
        $("#old-county-info").fadeOut();
        $("#county-select").selectpicker('val', data.county)
        reset()
        data.county = countySelect.value
        updateHighlightedCounty(data.county)
        scrollFunc('#year-container', 700)
    })
})

// county next/prev arrow listener - image mapster 'html mapped' florida map - arrows event listener - change county to next/prev select item
document.querySelectorAll('.map-arrows').forEach(arrow => {
    arrow.addEventListener('click', () => {

        arrow.id === 'prev-map-arrow'
            ? countySelect.selectedIndex--
            : countySelect.selectedIndex++
        !countySelect.value && countySelect.selectedIndex++
        data.county = countySelect.value
        $('.selectpicker').selectpicker('refresh')
        updateHighlightedCounty(data.county)
        reset()
        scrollFunc('#year-container', 700)
    })
})

// narrow by year form input
//different set timeouts to prevent premature form input
let timer;
yearInput.addEventListener('keyup', function (e) {
    e.preventDefault()
    let currYear = new Date().getFullYear();
    data.year = yearInput.value
    const parseYear = parseInt(yearInput.value)
    // test if year input is valid
    const formControl = document.getElementById('year-search')
    let isnum = /^\d+$/.test(data.year);
    if (parseYear > currYear || isnum === false && data.year.length > 0) {
        formControl.classList.remove('form-control-success')
        formControl.classList.add('form-control-warning')
    } else {
        formControl.classList.add('form-control-success')
        formControl.classList.remove('form-control-warning')
    }
    let timeOutNum = 0
    if (data.year.length >= 1 && data.year.length <= 3) timeOutNum = 2500
    else if (data.year.length === 4) timeOutNum = 1300
    else if (data.year.length === 0) timeOutNum = 700
    else return

    setTimeout(() => {
        genYearIndex()
        addCountyPeriodItems()
    }, timeOutNum)
});

// reset button under narrow by year form - reset timeline and map to default
document.querySelector('#reset-results-btn').addEventListener('click', () => {
    reset()
})

// map carousel thumbnail arrows- add next/prev set of maps on next/prev arrow click
document.querySelectorAll('.thumb-arrows').forEach(arrow => {

    let clickDisabled = false;
    arrow.addEventListener('click', () => {
        // sets short delay on arrows to prevent excessive clicking thru
        if (clickDisabled)
            return;
        data.yearIndex = parseInt(document.querySelectorAll('.thumb-map-img')[0].id) - 1
        const thumbImages = document.querySelectorAll('.thumb-map-img')
        var container = document.getElementById("thumb-img-container");
        var numberOfChildren = container.children.length
        if (arrow.id === 'next-thumb-arrow' && thumbImages[thumbImages.length - 1].id !== '21') {
            let currImgNum = data.imgNum
            if (data.imgNum = numberOfChildren) {
                data.yearIndex += data.imgNum
            } else {
                data.yearIndex += (data.imgNum - numberOfChildren)
            }
            data.imgNum = currImgNum
        } if (arrow.id === 'prev-thumb-arrow' && thumbImages[0].id !== '1') {
            data.yearIndex -= data.imgNum
        }
        addThumbImages(data.yearIndex)
        document.querySelectorAll('.thumb-map-img')[0].classList.add('active-img')
        changeActiveImg()
        testMapCarouselArrow()
        const currActiveImg = document.querySelector('.active-img')
        currActiveImg.nextElementSibling.classList.add('d-none')
        openSeaViewerFunc(currActiveImg.id)
        let currId = document.querySelectorAll('.thumb-map-img')[0].id
        updateCountyTimeline(currId)
        clickDisabled = true;
        setTimeout(function () { clickDisabled = false; }, 500);
    })
})

// side scroll arrows to ease transitions to diff sections
document.querySelectorAll('.nav-arrows').forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.id === 'nav-to-county') {
            scrollFunc('.county-title-container', 500)
        } if (arrow.id === 'nav-to-map') {
            scrollFunc('#county-timeline-header', 500)
        } if (arrow.id === 'nav-to-search') {
            scrollFunc('#year-container', 500)
        }
    })
})



// change map thumbnail on smaller screen
var resizeTimer;
$(window).on('load resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        const activeImg = document.querySelector('.active-img')
        if (activeImg) {
            data.yearIndex = activeImg.id - 1
        }
        if ($(window).width() > 1200) {
            data.imgNum = 5
        } else if ($(window).width() > 768) {
            data.imgNum = 4
        } else {
            data.imgNum = 3
        }
        addThumbImages(data.yearIndex)
        changeActiveImg()
        testMapCarouselArrow()
        const thumbImage = document.querySelector('.thumb-map-img')
        if (thumbImage.id !== '1') {
            thumbImage.classList.add('active-img')
        }
    }, 300);
});

setTimeout(() => {
    openSeaViewerFunc(data.yearIndex)
    addCountyPeriodItems()
    addThumbImages(data.yearIndex)
    changeActiveImg()
    testMapCarouselArrow()
}, 100);

