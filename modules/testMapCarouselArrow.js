// remove arrows for prev/next if none
export const testMapCarouselArrow = () => {
    // clickDisabled = false;
    const thumbImages = document.querySelectorAll('.thumb-map-img')
    document.querySelector('.prev-thumb-icon').classList.remove('delete-icon')
    document.querySelector('.next-thumb-icon').classList.remove('delete-icon')
    if (thumbImages[0].id === '1') {
        document.querySelector('.prev-thumb-icon').classList.add('delete-icon')
        
    } if (thumbImages[thumbImages.length -1 ].id === '21') {
        document.querySelector('.next-thumb-icon').classList.add('delete-icon')
    }
    // clickDisabled = true;
}

