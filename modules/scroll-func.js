
export const scrollFunc = (location, time) => {

    setTimeout(() => {
        $('html, body').animate({ scrollTop: $(location).offset().top }, time);
    }, 400);


}
