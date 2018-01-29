/**
 *
 * author: Tigran Harutyunyan.
 * 2016.
 **/

$(window).on('resize', function() {
    setTimeout(function() {
        var _height = $('.swiper-container').height();
        $('.scrolling-content').css({ top: _height });
    }, 10);
    var yourNurses = {};
    var _widthBreakpoint = $(window).width();
    yourNurses.topOffset = _widthBreakpoint > 690 ? -98 : -64;

});


$(document).ready(function() {
    var _height = $('.swiper-container').height();
    $('.scrolling-content').css({ top: _height });
    var mapContainer = $('.how-it-works-container');
    var termsPage = $('body').hasClass('terms-page');
    console.log(termsPage);
    var yourNurses = {};
    var allowScrolling = true;
    var _docWidth = $(window).width();
    yourNurses.topOffset = $(window).width() > 690 ? -98 : -64;
    $('.diagram-place').css({ "visibility": "visible" })
    if (termsPage == false) {
        /*  $.scrollIt({
              upKey: 38, // key code to navigate to the next section
              downKey: 40, // key code to navigate to the previous section
              easing: 'swing', // the easing function for animation
              scrollTime: 800, // how long (in ms) the animation takes
              activeClass: 'active-link', // class given to the active nav element
              onPageChange: null, // function(pageIndex) that is called when page is changed
              topOffset: yourNurses.topOffset // offets (in px) for fixed top navigation
          });*/

    }
    if (termsPage == false) {
        calculateSides();
    }
    $('.menu-item').each(function() {
        var _elemID = $(this).attr("data-scroll-nav");
        console.log($(this).attr("data-scroll-nav"));
          $(this).on('click', function(){
            $(_elemID).animatescroll({scrollSpeed:1500,easing:'easeOutBounce',padding:75});
          })
    });
    $(".contact-form").validate({
        rules: {
            contact_name: "required",
            contact_email: "required",
            contact_message: "required"
        }
    });

    $('[data-remodal-id=modal]').remodal({ hashTracking: false });

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        //effect: 'fade',
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        paginationBulletRender: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
        'onInit': function() {
            var _height = $('.swiper-container').height();
            $('.scrolling-content').css({ top: _height });
        }
    });


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
    $(window).scroll(function() {
        _docWidth = $(window).width();
        //=================== slider parallax scrolling. ========================     
        var scrollPosition = $(window).scrollTop();
        $('.swiper-container').css('top', (0 - (scrollPosition * 0.20)) + 'px');
        //=======================================================================
        if (allowScrolling == true && termsPage == false) {
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

    //============= background movement section ==========================
    function getPercentage(orientation) {
        var _docWidth = $(window).width();
        if (_docWidth > 2300 && _docWidth <= 2400) {
            var _percentage = 5;
        } else if (_docWidth > 2200 && _docWidth <= 2300) {
            var _percentage = 5;
        } else if (_docWidth > 2100 && _docWidth <= 2200) {
            var _percentage = 5;
        } else if (_docWidth > 2000 && _docWidth <= 2100) {
            var _percentage = 5;
        } else if (_docWidth > 1900 && _docWidth <= 2000) {
            var _percentage = 5;
        } else if (_docWidth > 1800 && _docWidth <= 1900) {
            var _percentage = 5;
        } else if (_docWidth > 1700 && _docWidth <= 1800) {
            var _percentage = 2.4;
        } else if (_docWidth > 1600 && _docWidth <= 1700) {
            var _percentage = 2.1;
        } else if (_docWidth > 1500 && _docWidth <= 1600) {
            var _percentage = 1.9;
        } else if (_docWidth > 1400 && _docWidth <= 1500) {
            var _percentage = 1.7;
        } else if (_docWidth > 1300 && _docWidth <= 1400) {
            var _percentage = 1.5;
        }
        var _diff = orientation == 'right' ? 50 + _percentage : 50 - _percentage;
        mapContainer.css({ "background-position": _diff + '%' + " 50%" })
    }
    mapContainer.bind("mouseleave", function(e) {
        mapContainer.css({ "background-position": "" })
    });

    function calculateSides() {
        var oldx = 0;
        var oldy = 0;
        var direction = "";
        var directionLeft = directionRight = "";
        var allowed = true;
        $('.how-it-works-container').bind("mousemove", function(e) {
            var activeElement = e.target || e.srcElement;
            if (allowed == true) {
                allowed = false;
                setTimeout(function() {
                    if ((e.pageX > oldx && e.pageY > oldy) || (e.pageX > oldx && e.pageY < oldy) || (e.pageX > oldx && e.pageY == oldy)) {
                        if (directionRight == "") {
                            directionLeft = "";
                            getPercentage('right');

                        }
                        directionRight = "right";
                    } else if ((e.pageX < oldx && e.pageY < oldy) || (e.pageX < oldx && e.pageY > oldy) || (e.pageX < oldx && e.pageY == oldy)) {
                        if (directionLeft == "") {
                            directionRight = "";
                            getPercentage('left');

                        }
                        directionLeft = "left";
                    }
                    $(activeElement).trigger(direction);
                    $(activeElement).trigger({ type: "mousedirection", direction: direction });
                    oldx = e.pageX;
                    oldy = e.pageY;
                    allowed = true;
                }, 200);
            }
        });

    }
    // ===================================================================
});
