/**
 *
 * author: Tigran Harutyunyan.
 * 2016.
 **/

$(window).on('resize', function() {
    setTimeout(function() {
        var _height = $('#main-slider').height();
        $('.scrolling-content').css({ top: _height });
    }, 10);
    var yourNurses = {};
    var _widthBreakpoint = $(window).width();
    yourNurses.topOffset = _widthBreakpoint > 690 ? -98 : -64;
    var _videoPopup = $('.video-modal');
    _videoPopup.css({ 'margin-top': -_videoPopup.height() / 2 });
});

var swiperPopupStaffer, swiperPopupNurses;

$(document).ready(function() {
    var _height = $('#main-slider').height();
    var sliderInitCount = 0,
        slider2InitCount = 0;

    var activePopupSliderID;
    $('.scrolling-content').css({ top: _height });

    calculateVideoPopupPosition();

    var termsPage = $('body').hasClass('terms-page');
    var yourNurses = {};
    var allowScrolling = true;
    var _docWidth = $(window).width();
    yourNurses.topOffset = $(window).width() > 690 ? -98 : -64;
    $('.diagram-place').css({ "visibility": "visible" });
    $('.scrolling-content').show();
    var activeSwitcher = $('.active-switch');
    var activeSwitcherText = $('.active-switcher-text-1');
    var parentSwitcher = $('.switchbtn');
    $('.switcher').click(function() {
        activeSwitcher.toggleClass("switch-right").toggleClass("switch-left");
        parentSwitcher.toggleClass("switch-left");
        $('#nurses-slider,#staffers-slider').toggleClass('hidden-slider');
    });
    if (termsPage == false) {
        $.scrollIt({
                upKey: 38, // key code to navigate to the next section
                downKey: 40, // key code to navigate to the previous section
                easing: 'swing', // the easing function for animation
                scrollTime: 800, // how long (in ms) the animation takes
                activeClass: 'active-link', // class given to the active nav element
                onPageChange: null, // function(pageIndex) that is called when page is changed
                topOffset: yourNurses.topOffset // offets (in px) for fixed top navigation
            })
            //================ map parallax ====================
        $('.js-plaxify').plaxify();
        $.plax.enable({ "activityTarget": $('.how-it-works-container') });
        $.plax.disable({ "restorePositions ": true });
        setTimeout(function() {
            $('.js-plaxify').css({ 'margin-top': '-20px' });
        }, 100);
        //==================================================
    } else {
        $('#scroller').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    }

    $(".contact-form").validate({
        rules: {
            contact_name: "required",
            contact_email: "required",
            contact_message: "required"
        },
        submitHandler: function() {
            toastr.success('The form has been  successfully submited.')
        }
    });

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "30000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    $('[data-remodal-id=modal]').remodal({ hashTracking: false });

    // ========== SWIPER sliders ===========================================
    var swiper = new Swiper('#main-slider', { // Top slider
        pagination: '#swiper-pagination-main-slider',
        paginationClickable: true,
        //effect: 'fade',
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        paginationBulletRender: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
        'onInit': function() {
            var _height = $('#main-slider').height();
            $('.scrolling-content').css({ top: _height });
        }
    });


    var swiperStaffer = new Swiper('#midsliderStaffer', {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4,
        nextButton: '.btn-next-1',
        prevButton: '.btn-prev-1',
        breakpoints: {
            // when window width is <= ...
            535: {
                slidesPerView: 1,
                spaceBetweenSlides: 30,
                slidesPerGroup: 1
                    //centeredSlides: true
            },
            750: {
                slidesPerView: 2,
                spaceBetweenSlides: 30,
                slidesPerGroup: 2
            },
            870: {
                slidesPerView: 3,
                spaceBetweenSlides: 30,
                slidesPerGroup: 3
            },
            1010: {
                slidesPerView: 2,
                spaceBetweenSlides: 30,
                slidesPerGroup: 2
            },
            1280: {
                slidesPerView: 3,
                spaceBetweenSlides: 30,
                slidesPerGroup: 3
            }
        }
    });


    var swiperNurse = new Swiper('#midsliderNurse', {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4,
        nextButton: '.btn-next-2',
        prevButton: '.btn-prev-2',
        pagination: '#swiper-pagination-nurses',
        paginationBulletRender: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
        paginationClickable: true,
        // Responsive breakpoints
        breakpoints: {
            // when window width is <= ...
            535: {
                slidesPerView: 1,
                spaceBetweenSlides: 30,
                slidesPerGroup: 1
                    //centeredSlides: true
            },
            750: {
                slidesPerView: 2,
                spaceBetweenSlides: 30,
                slidesPerGroup: 2
            },
            870: {
                slidesPerView: 3,
                spaceBetweenSlides: 30,
                slidesPerGroup: 3
            },
            1010: {
                slidesPerView: 2,
                spaceBetweenSlides: 30,
                slidesPerGroup: 2
            },
            1280: {
                slidesPerView: 3,
                spaceBetweenSlides: 30,
                slidesPerGroup: 3
            }
        }
    });

    $('#mapHIW').imgpreload(function() {
        console.log('loaded');
        $('#parallax_field').removeClass('active-bg-color');
    });

    // ==================================================

    $('.slide-staffer').click(function() {
        activePopupSliderID = "#popupStafferSlider";
        var dataID = $(this).attr("data-id") ? $(this).attr("data-id") : 0;
        setTimeout(function() {
            swiperPopupStaffer = new Swiper('#popupStafferSlider', {
                slidesPerView: 1,
                slidesPerGroup: 1,
                nextButton: '.popup-staffer-btn-next',
                prevButton: '.popup-staffer-btn-prev',
                onInit: function(swiper) {
                    setSlideText();
                },
                onTransitionStart: function(swiper) {
                    $(activePopupSliderID).parent().parent().parent().find('.dynamic-caption').addClass('activeSlide');
                    setTimeout(function() {
                        setSlideText();
                    }, 250);
                },
                onTransitionEnd:function(swiper) {
                    setSlideText();
                    $(activePopupSliderID).parent().parent().parent().find('.dynamic-caption').removeClass('activeSlide');
                }

            });
            swiperPopupStaffer.slideTo(dataID, 10, true);
            setSlideText();
        }, 100);

    })

    $('.slide-nurses').click(function() {
        activePopupSliderID = "#popupNursesSlider";
        var dataID = $(this).attr("data-id") ? $(this).attr("data-id") : 0;
        setTimeout(function() {
            swiperPopupNurses = new Swiper('#popupNursesSlider', {
                slidesPerView: 1,
                slidesPerGroup: 1,
                nextButton: '.popup-nurse-btn-next',
                prevButton: '.popup-nurse-btn-prev',
                onInit: function(swiper) {
                    setSlideText();
                },
                onTransitionStart: function(swiper) {
                    $(activePopupSliderID).parent().parent().parent().find('.dynamic-caption').addClass('activeSlide');
                    setTimeout(function() {
                        setSlideText();
                    }, 250);
                },
                onTransitionEnd: function(swiper) {
                    setSlideText();
                    $(activePopupSliderID).parent().parent().parent().find('.dynamic-caption').removeClass('activeSlide');
                }
            });
            swiperPopupNurses.slideTo(dataID, 10, true);
            setSlideText();
        }, 100);

    })

    function setSlideText() {
        var active_text = $(activePopupSliderID).find('.swiper-slide-active').text();
        $(activePopupSliderID).parent().parent().parent().find('.dynamic-caption').text(active_text);
    }
    // ==================================================
    $('.hide-popup').click(function() {
        $('.responsive-menu').slideToggle('collapse');
    })

    $('.close-btn').click(function() {
        $('.responsive-menu').removeClass('expand')
        $('.menu-btn').removeClass('btn-none')
    })
    $('.responsive-menu a').on('click', function() {
        $('.responsive-menu').slideToggle('collapse');
    })
    $('.menu-btn').click(function() {
        //$(window).scrollTop(0);
        $('.responsive-menu').slideToggle('expand')
    });

    // ======= Hover effects in "How it works" section ===================
    $('.sections').hover(handlerIn, handlerOut);
    $('.how-to-works-list li').hover(handlerIn, handlerOut);
    $("#closeVideoPopup").on("click", function() {
        $('#introVideo').get(0).pause();
    });
    $(".btnWatchVideo").on("click", function() {
        calculateVideoPopupPosition();
    });
    $(window).scroll(function() {
        _docWidth = $(window).width();
        //=================== slider parallax scrolling. ========================     
        var scrollPosition = $(window).scrollTop();
        $('.swiper-container').css('top', (0 - (scrollPosition * 0.20)) + 'px');
        //=======================================================================
        if (termsPage == false) {
            if (allowScrolling == true) {
                $('.responsive-menu').fadeOut();
                allowScrolling = false;
                setTimeout(function() {
                    var headerHeight = _docWidth > 660 ? 141 : 91;
                    if ($(this).scrollTop() > headerHeight) {
                        $('.nav-bar-mobile').addClass('nav-white-bg');
                        $('.nav1').addClass('nav-hidden');
                    } else {
                        $('.nav-bar-mobile').removeClass('nav-white-bg');
                        $('.nav1').removeClass('nav-hidden');
                    }
                    allowScrolling = true
                }, 400);
            }
        } else {
            if ($(this).scrollTop() > 0) {
                $('#scroller').fadeIn();
            } else {
                $('#scroller').fadeOut();
            }
        }

    });

    function handlerIn() {
        var dataID = $(this).attr("data-id");
        if (dataID < 8) {
            $(".section" + dataID).addClass("hover-section");
        } else {
            $(".li-" + dataID).addClass('active-li');
        }
    }

    function handlerOut() {
        var dataID = $(this).attr("data-id");
        if (dataID < 8) {
            $(".section" + dataID).removeClass("hover-section");
        } else {
            $(".li-" + dataID).removeClass('active-li');
        }
    }

    function calculateVideoPopupPosition() {
        var _windowWidth = $(window).width();
        var _windowHeight = $(window).height();

        if (_windowWidth >= 1050) {
            $('.video-modal').css({ 'margin-top': '-288px' });
        } else {
            var _videoPopupHeight = _windowWidth * 0.9 * 0.5625;
            /*if(_videoPopupHeight<=_windowHeight) {}*/
            $('.video-modal').css({ 'margin-top': -(Math.floor(_videoPopupHeight / 2)) + 'px' });
        }
    }
});

// Smooth scroll for Chrome browser.
var OS = {
    isWindows: function() {
        return navigator.appVersion.indexOf("Win") != -1
    },
    isMac: function() {
        return navigator.appVersion.indexOf("Mac") != -1
    },
    isUnix: function() {
        return navigator.appVersion.indexOf("X11") != -1
    },
    isLinux: function() {
        return navigator.appVersion.indexOf("Linux") != -1
    },
    name: function() {
        var name = '';
        if (OS.isWindows()) name = "windows";
        else if (OS.isMac()) name = "macosx";
        else if (OS.isUnix()) name = "unix";
        else if (OS.isLinux()) name = "linux";
        return name;
    }
};


if (OS.name() == 'windows') {
    // this function called at the end of the js file!
    chromeSmoothScroll.init();
}
