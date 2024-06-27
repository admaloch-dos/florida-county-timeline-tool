
//button to scroll back to top
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#Scroll_btn').addClass('show_btn');
        } else {
            $('#Scroll_btn').removeClass('show_btn');
        }
    });

    $('#Scroll_btn').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 400);
        return false;
    });

});

//ICON TOGGLE FOR DROPDOWN MENU/SIDE NAV FOR COLLECTIONS, EXHIBITS, ETC
$(document).ready(function () {
    $("#openNavBtn").click(function () {
        $("#openNavBtn > i").toggleClass("fa-times fa-bars");
    });

    //Keeps dropdown menu open when clicking another button/link inside menu
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    })
});




//01-04-2021
$("#openNavBtn").click(function () {
    $("#openNavBtn > i").toggleClass("fa-times fa-bars");
});

$(window).on('load resize', function () {
    if ($(this).width() <= 992) {
        $("#menudropdown").removeClass("show");
        $("#openNavBtn > i").removeClass("fa-times");
        $("#openNavBtn > i").addClass("fa-bars");
        $("#openNavBtn").addClass('collapsed');
        $("#side-nav").removeClass("d-none");
        $("#side-nav").removeClass("d-lg-block");
    } else {
        $("#openNavBtn").removeClass('collapsed');
        $("#openNavBtn > i").removeClass("fa-bars");
        $("#openNavBtn > i").addClass("fa-times");
        $("#menudropdown").addClass('show');
        $("#side-nav").removeClass("d-none");
        $("#side-nav").removeClass("d-lg-block");
    }
});
