
import { doesCountyExist } from "../modules/testItems.js";
let image = $('#wpa_clickmap');

// build area data from areas
let areas = $.map($('area[alt]'), function (el) {
    return {
        key: $(el).attr('county'),
        toolTip: $(el).attr('alt')
    };
});

function copySelectionsToHiddenField() {
    $('#selectedKeys').val(image.mapster('get'));
}

image.mapster({
    fillOpacity: 0.3,
    fillColor: "d62828",
    scaleMap: true,
    stroke: true,
    strokeColor: "000000",
    strokeWidth: 3,
    mapKey: 'county',
    showToolTip: true,
    singleSelect: true,

    areas: areas,
    clickNavigate: true,
    onStateChange: function (e) {
        if (e.state === 'select') {
            copySelectionsToHiddenField();
        }
    }
});

// $('img').mapster('resize', 275, null)

$('area.highlighted').mapster('set', true);

// updates highlighted area on map based on change of county value
export const updateHighlightedCounty = (county) => {

    $('.highlighted').mapster('set');
    $("#wpa_map area").removeClass("highlighted");
    document.querySelectorAll('area').forEach(x => {
        if (x.alt.trim() === county.trim()) {
            x.classList.add('highlighted')
            $('area.highlighted').mapster('set', true);
        }
    })
    doesCountyExist()
}


// change imagemapster based on screen size
const testScreenSize = () => {
    let updatedMapsterSize = 150
    if (window.innerWidth > 0 && window.innerWidth < 400) {
        updatedMapsterSize = 150
    } if (window.innerWidth > 399 && window.innerWidth < 576) {
        updatedMapsterSize = 250
    } if (window.innerWidth > 575 && window.innerWidth < 768) {
        updatedMapsterSize = 450
    } if (window.innerWidth > 767 && window.innerWidth < 1000) {
        updatedMapsterSize = 600
    }if (window.innerWidth > 999 && window.innerWidth < 1200) {
        updatedMapsterSize = 600
    } if (window.innerWidth > 1199) {
        updatedMapsterSize = 500
    }

    return updatedMapsterSize
}
// on page load
let mapsterSize = testScreenSize()
console.log(mapsterSize, 'is mapster size on page load')
console.log(window.innerWidth)
$('img').mapster('resize', mapsterSize, null)
window.onresize = function () {
    setTimeout(function () {
        let prevSize = mapsterSize
        mapsterSize = testScreenSize()
        // window.location.reload(); //this function will play after 5000 milliseconds
        if (mapsterSize !== prevSize) {
            console.log('trigger resize')
            $('img').mapster('resize', mapsterSize, null)
            prevSize = mapsterSize
        }
        console.log(mapsterSize, 'is mapster size after resize')
    }, 1000);
}

setTimeout(()=>{
    if(window.innerWidth < 500) {
        console.log('less than 400')
        $('img').mapster('resize', 275, null)
    }
},500)



