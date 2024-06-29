import { counties } from "../modules/counties.js"
import { data } from "../modules/data.js"
import { addCountyPeriodItems, updateCountyTimeline } from "../modules/addCountyPeriodItems.js"
import { openSeaViewerFunc } from "../modules/openSeaMapViewer.js"
import { updateHighlightedCounty } from "./activate-image-mapster.js"
import { testMapCarouselArrow } from "../modules/testMapCarouselArrow.js"
import { addThumbImages } from "../modules/addThumbImages.js"
import { changeActiveImg } from "../modules/changeActiveImg.js"
import { resetCurrCounty, updateCurrTimeline } from "../modules/resetCurrCounty.js"
import { scrollFunc } from "../modules/scroll-func.js"
import { genYearIndex } from "../modules/genYearIndex.js"
import { checkIfTouchScreen } from "../modules/utilities.js"

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

// Toggles icon on navbar in mobile
$(document).ready(function () {
    $('#swapBtn').click(function () {
        $('#swapBtn > i').toggleClass('fa-bars fa-times');
    });
});


// create array of county ids in alphabetical order
let countyNameArray = []
for (let i = 0; i < counties.length; i++) {
    countyNameArray.push(counties[i].id)
    countyNameArray.sort()
}

// loop over alphabetical array to create items in the search by county select
for (let i = 0; i < countyNameArray.length; i++) {
    const countySelectOption = document.createElement('option')
    countySelectOption.innerText = countyNameArray[i]
    countySelectOption.value = countyNameArray[i]
    countySelect.append(countySelectOption)
}

// func for updating county from select/prev/nextarrows and map click
const updateCurrCounty = (county) => {
    $("#old-county-info").fadeOut();
    updateHighlightedCounty(county)
    updateCurrTimeline()
    scrollFunc('.timeline-content', 400, 100)

    // county === 'Alachua' ? $("#prev-map-arrow").addClass("disabled") : $("#prev-map-arrow").removeClass("disabled")
}

setTimeout(() => {
    if (checkIfTouchScreen()) {
        document.querySelector('[data-id="county-select"]').addEventListener('click', () => {
            scrollFunc('#county-select', 400, 100)
        })
    }
}, 300);


//county select event listener - search by county select - event listener on change
countySelect.addEventListener('change', () => {
    document.querySelector('.bootstrap-select').querySelector('.dropdown-toggle').click()
    updateCurrCounty(countySelect.value)
})

// image mapster map county areas
document.querySelectorAll('area').forEach(county => {
    county.addEventListener('click', () => {
        const currCounty = county.alt.replace('County', '').trim()
        $("#county-select").selectpicker('val', currCounty)
        updateCurrCounty(currCounty)
    })
})

// prev/next arrows listener
document.querySelectorAll('.map-arrows').forEach(arrow => {
    arrow.addEventListener('click', () => {
        console.log(countySelect.length)
        if (arrow.id === 'prev-map-arrow') {
            countySelect.selectedIndex !== 0
                ? countySelect.selectedIndex--
                : countySelect.selectedIndex = countySelect.length - 1
        } else {
            countySelect.selectedIndex !== countySelect.length - 1
                ? countySelect.selectedIndex++
                : countySelect.selectedIndex = 0
        }
        !countySelect.value && countySelect.selectedIndex++
        $('.selectpicker').selectpicker('refresh')
        updateCurrCounty(countySelect.value)

    })
})

// narrow by year form input
//different set timeouts to prevent premature form input
let timer;
yearInput.addEventListener('keyup', function (e) {
    clearTimeout(timer)
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
        return
    } else {
        formControl.classList.add('form-control-success')
        formControl.classList.remove('form-control-warning')
    }
    timer = setTimeout(() => {
        genYearIndex()
        addCountyPeriodItems()
        scrollFunc('.timeline-content', 400, 100)
    }, 1000)
});

// reset button under narrow by year form - reset timeline and map to default
document.querySelector('#reset-results-btn').addEventListener('click', () => {
    resetCurrCounty()
})

// map carousel thumbnail arrows- add next/prev set of maps on next/prev arrow click
document.querySelectorAll('.active-arrows').forEach(arrow => {

    let clickDisabled = false;
    arrow.addEventListener('click', () => {
        // sets short delay on arrows to prevent excessive clicking thru

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

        setTimeout(function () { clickDisabled = false; }, 500);
    })
})

// side scroll arrows to ease transitions to diff sections
document.querySelector('#nav-to-search').addEventListener('click', () => {
    scrollFunc('.breadcrumb_jumbo ', 300)
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
    document.querySelector('.map-1').click()
}, 100);

setTimeout(() => {
    document.querySelector('#reset-results-btn').click()
}, 2000);