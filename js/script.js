(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav open
  $('.js-mobile-menu-open').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('mobile-icon__menu--open');
    $('.mobile-menu').toggleClass('mobile-menu--open');
  });

  // mobile nav close
  $('.js-mobile-menu-close').on('click', function(e) {
    e.preventDefault();
    $('.js-mobile-menu-open').removeClass('mobile-icon__menu--open');
    $('.mobile-menu').toggleClass('mobile-menu--open');
  });

  // current section nav highlight
  var currentSection = $('body').data('current-section');
  $('.microsite-nav__item--' + currentSection).addClass('microsite-nav__item--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Collapsed anchor link
///////////////////////////////////////

  // hides collapsed section
  $('.js-expand-section-collapsed').hide();
  var collapsedLink = $('.js-expand-section').attr('href');

  // expands collapsed section and scrolls to anchor
  $('.js-expand-section').on('click', function(e) {
    e.preventDefault();
    $('.js-expand-section-collapsed').slideDown(function() {
      location.hash = collapsedLink;
    });
  });


/////////////////////////////////////////////////////
//     360 videos thumbnails
/////////////////////////////////////////////////////

  // stopped on touch devices, normal link goes to youtube app (if installed)
  if ( !("ontouchstart" in document.documentElement) ) {

    // Loops through all videos on page
    $('.js-three-sixty-content').each(function(index, el) {
      var videoBlock        = $(this),
          video             = $(this).find('.js-three-sixty-iframe'),
          videoWrap         = $(this).find('.js-three-sixty-iframe-wrap'),
          videoSrc          = video.attr('src'),
          thumbnail         = $(this).find('.js-three-sixty-thumbnail'),
          playButton        = $(this).find('.js-three-sixty-video'),
          playingClass      = 'is-playing';

    // hide video, but keep aspect ratio
    videoWrap.css('visibility', 'hidden');

    // play button event
      playButton.on('click', function(e) {
        e.preventDefault();

        // add auto play query to iframe
        video.attr('src', videoSrc + '&autoplay=1');

        // fade out iframe, show video, remove thumnail elements
        thumbnail.fadeOut( 175, function() {
          videoWrap.css('visibility', 'visible');
          videoBlock.addClass(playingClass);
          thumbnail.remove();
        })
      });
    });
  };

///////////////////////////////////////
//       360 content switcher
///////////////////////////////////////

// youtube 360 video only works on a certain set of browsers
// pretty much ie11+, but not win7 ie11 and Safari
// Modernizer.intl (Internationalization API) seemed to have roughly the same
// browser support as youtube 360 video
// broken content is removed from devices that we can detect 360 video doesn't work on

  var threeSixtyContent   = $('.js-three-sixty-content'),
      threeSixtyVideo     = threeSixtyContent.find('.js-three-sixty-video'),
      threeSixtyImage     = threeSixtyContent.find('.js-three-sixty-image');

  // checks if content is on page
  if ( threeSixtyContent.length > 0 ){
    // if desktop & cant run 360 removes 360 link
    if ( !("ontouchstart" in document.documentElement) && !(Modernizr.intl) ) {
      threeSixtyVideo.remove();
    };
  };


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end