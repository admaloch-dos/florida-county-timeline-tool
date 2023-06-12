import { mapCoords } from "./mapData.js";


// initialize open sea dragon  map 
var viewer = OpenSeadragon({
    id: "openseadragon1",
    showNavigator: true,
    // sequenceMode: true,
    // showReferenceStrip: true,

    prefixUrl: "/openseadragon/images/",
    tileSources: [{
        type: "legacy-image-pyramid",
        levels: [
            {
                url: "https://www.floridamemory.com/FMP/maps/small/fmc0001.jpg",
                width: 1000,
                height: 733
            },
            {
                url: "https://www.floridamemory.com/FMP/maps/medium/fmc0001.jpg",
                width: 2500,
                height: 1832
            },
            {
                url: "https://www.floridamemory.com/FMP/maps/large/fmc0001.jpg",
                width: 4962,
                height: 3636
            }
        ]
    }]
});


const mainOpenSeaDragon = document.querySelector('.openseadragon-container')

// open sea dragon function to change map zoom cords based on 'narrow by year' input
export const openSeaViewerFunc = (yearIndex) => {

    mainOpenSeaDragon.style.display = 'none'
    var tiledImage = viewer.world.getItemAt(0);
    let x = mapCoords[yearIndex].x
    let y = mapCoords[yearIndex].y
    let w = mapCoords[yearIndex].w
    let h = mapCoords[yearIndex].h
    var imageRect = new OpenSeadragon.Rect(x, y, w, h);
    var viewportRect = tiledImage.imageToViewportRectangle(imageRect);
    viewer.viewport.fitBounds(viewportRect, true);
    $(".openseadragon-container").fadeIn(1700);
}

