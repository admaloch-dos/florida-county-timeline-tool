
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




const resize300 = () => { if ($(window).width() > 250) $('img').mapster('resize', 250, null) }
const resize400 = () => { if ($(window).width() > 400) $('img').mapster('resize', 350, null) }
const resize576 = () => { if ($(window).width() > 576) $('img').mapster('resize', 450, null) }
const resize768 = () => { if ($(window).width() > 768) $('img').mapster('resize', 600, null) }
const resize1200 = () => { if ($(window).width() > 1200) $('img').mapster('resize', 850, null) }

$(window).on("resize", resize300);
$(window).on("resize", resize400);
$(window).on("resize", resize576);
$(window).on("resize", resize768);
$(window).on("resize", resize1200);

resize300()
resize400()
resize576()
resize768()
resize1200()



