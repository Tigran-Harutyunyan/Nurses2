/**
 *
 * author: Tigran Harutyunyan.
 * 2018.
 **/

$(window).on('resize', function() {
    var yourNurses = {};
    var _videoPopup = $('.video-modal');
    _videoPopup.css({ 'margin-top': -_videoPopup.height() / 2 });
});

var swiperPopupStaffer, swiperPopupNurses;

$(document).ready(function() {
    var _height = $('#main-slider').height();
    var sliderInitCount = 0,
        slider2InitCount = 0;

    calculateVideoPopupPosition();
    var _docWidth = $(window).width();

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
    // ============= MOBILE DROPDOWN =================
    $('#toggleMobileMEnu').click(function() {
        $(this).toggleClass('is-active');
        $('#overlay').toggleClass('open');
        $('.switcher1').toggleClass('hide-me');
    });

    $('.overlay-menu a').click(function() {
        $('#toggleMobileMEnu').toggleClass('is-active');
        $('#overlay').toggleClass('open');
        $('.switcher1').toggleClass('hide-me');
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

    // ==================================================

    $('.play-btn').click(function() { // play video
        $('.video-cover').hide();
        $('#introVideo').get(0).play();
    })

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
        $('.responsive-menu').slideToggle('expand')
    });
    $('[data-remodal-id=modal]').remodal({ hashTracking: false });


    $("#closeVideoPopup").on("click", function() {
        $('#introVideo').get(0).pause();
    });
    $(".btnWatchVideo").on("click", function() {
        calculateVideoPopupPosition();
    });

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