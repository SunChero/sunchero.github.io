(function ($) {
    "use strict";
    /*----------------------------
    Animation js active
    ------------------------------ */
    AOS.init();
    /*----------------------------
    Counter-up
    ------------------------------ */
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /*-----------------------------
    Portfolio Carousel
    ------------------------------*/

    $('.services-item-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        lazyLoad: 'ondemand',
        autoplay: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true
                }
    		},
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
    		},
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
    		}

			]
    });
    $('.testimonial-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        lazyLoad: 'ondemand',
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    /*----------------------------
    Search
    ------------------------------ */
    var changeClass = function (name) {
        $('#search, .search-icon-area a').removeAttr('class').addClass(name);
    }
    /*----------------------------
    jQuery Mean Menu
    ------------------------------ */
    $("#mobile-menu").meanmenu({
        meanMenuContainer: ".mobile-menu",
        meanScreenWidth: "767"
    });
    $(".info-bar").on("click", function () {
        $(".extra-info").addClass("info-open");
    });
    $(".close-icon").on("click", function () {
        $(".extra-info").removeClass("info-open");
    });
    /*----------------------------
    Sticky menu active
    ------------------------------ */
    function fixed_top_menu() {
        var windows = $(window);
        windows.on("scroll", function () {
            var header_height = $(".main-navigation").height();
            var scrollTop = windows.scrollTop();
            if (scrollTop > header_height) {
                $(".main-navigation").addClass("sticky");
            } else {
                $(".main-navigation").removeClass("sticky");
            }
        });
    }
    fixed_top_menu();

    /*-----------------
    Scroll-Up
    -----------------*/
    $.scrollUp({
        scrollText: '<img src="img/up.png" alt="">',
        easingType: 'linear',
        scrollSpeed: 1000,
        animation: 'fade'
    });
    /*-----------------
    POrtfolio Filter
    -----------------*/
    var $portfolio = $('.grid');
    if ($.fn.imagesLoaded && $portfolio.length > 0) {
        imagesLoaded($portfolio, function () {
            $portfolio.isotope({
                filter: '*'
            });
            $(window).trigger("resize");
        });
    }

    $('.projects-filter').on('click', 'a', function (e) {
        e.preventDefault();
        $(this).parent().addClass('active').siblings().removeClass('active');
        var filterValue = $(this).attr('data-filter');
        $portfolio.isotope({
            filter: filterValue
        });
    });
    /*----------------------------
    Smooth Scrool
    ------------------------------ */
    $('a').on('click', function (event) {
        var $anchor = $($(this).attr('href')).offset().top - 60;
        $('body, html').animate({
            scrollTop: $anchor
        }, 1500);
        event.preventDefault();
        return false;
    });
    /*----------------------------
           Menu active JS
         ----------------------------*/
    $('.portfolio-filter ul li a').on('click', function () {
        $('.portfolio-filter ul li a').removeClass("current");
        $(this).addClass("current");
    });

    $('.main-menu ul li a').on('click', function () {
        $('.main-menu ul li a').removeClass("current");
        $(this).addClass("current");
    });
    /*----------------------------
    Preloader
    ------------------------------ */
    $(window).on('load', function () {
        $("#status").on('fadeOut', "slow");
        $("#preloader").on('delay', 500).on('fadeOut', "slow").remove();
    });
    

})(jQuery);