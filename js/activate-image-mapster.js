
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

const calcMapsterSize = () => {
    let mapsterSize
    if (window.innerWidth > 992) {
        mapsterSize = window.innerWidth / 2;
    } else {
         mapsterSize = window.innerWidth / 1.3;
    }
    mapsterSize = Math.max(200, Math.min(650, mapsterSize));
    return mapsterSize;
}

$('img').mapster('resize', calcMapsterSize(), null)


let timeout = null
let prevSize = calcMapsterSize()
window.addEventListener('resize', function (event) {
    let updatedMapsterSize = calcMapsterSize()
    clearTimeout(timeout)
    if (updatedMapsterSize !== prevSize) {
        timeout = setTimeout(() => {
            prevSize = updatedMapsterSize
            $('img').mapster('resize', updatedMapsterSize, null)
        }, 500);
    }
});






// setTimeout(()=>{
//     if(window.innerWidth < 500) {
//         console.log('less than 400')
//         $('img').mapster('resize', 275, null)
//     }
// },500)



