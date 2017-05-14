$(document).ready(function() {

    function slideUp() {
        $('body').append($('<button id="goUp" class="button hide">↑</button>'));
        $('#goUp').on('click', function() {
            $("html, body").animate({scrollTop: 0}, 1000);
            return false;
        });
        $(window).on('scroll', function() {
            if ($(window).height() > $(document).scrollTop()) {
                $('#goUp').addClass('hide');
            } else {
                $('#goUp').removeClass('hide');
            }

        })
    }

    $("#scrollCreator").click(function() {
        $('html, body').animate({
            scrollTop: $("#creator").offset().top
        }, 1000);
    });

    $(".scrollPrices").click(function() {
        $('html, body').animate({
            scrollTop: $("#prices").offset().top
        }, 1000);
    });

    $(".scrollDelivery").click(function() {
        $('html, body').animate({
            scrollTop: $("#delivery").offset().top
        }, 1000);
    });

    $(".scrollContact").click(function() {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 1000);
    });

    slideUp();

    $('.hamburger').click(function() {
        $(this).toggleClass('expanded').siblings('ul').slideToggle();
    });


});