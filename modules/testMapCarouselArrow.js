// remove arrows for prev/next if none
export function testMapCarouselArrow() {
    // clickDisabled = false;
    const thumbImages = document.querySelectorAll('.thumb-map-img')
    document.querySelector('#prev-thumb-arrow').classList.remove('disabled')
    document.querySelector('#next-thumb-arrow').classList.remove('disabled')
    if (thumbImages[0].id === '1') {
        document.querySelector('#prev-thumb-arrow').classList.add('disabled')

    } if (thumbImages[thumbImages.length - 1].id === '21') {
        document.querySelector('#next-thumb-arrow').classList.add('disabled')
    }
    // clickDisabled = true;
}

