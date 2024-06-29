
export const scrollFunc = (location, time, offset = 0) => {


        $('html, body').animate({ scrollTop: $(location).offset().top - offset }, time);



}

