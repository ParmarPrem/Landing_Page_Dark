$(document).ready(function(){
  var rev = $('.project-slider');
  rev.on('init', function(event, slick, currentSlide) {
    var
      cur = $(slick.$slides[slick.currentSlide]),
      next = cur.next(),
      prev = cur.prev();
    prev.addClass('slick-sprev');
    next.addClass('slick-snext');
    cur.removeClass('slick-snext').removeClass('slick-sprev');
    slick.$prev = prev;
    slick.$next = next;
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    //console.log('beforeChange');
    var
      cur = $(slick.$slides[nextSlide]);
    //console.log(slick.$prev, slick.$next);
    slick.$prev.removeClass('slick-sprev');
    slick.$next.removeClass('slick-snext');
    next = cur.next(),
      prev = cur.prev();
    prev.prev();
    prev.next();
    prev.addClass('slick-sprev');
    next.addClass('slick-snext');
    slick.$prev = prev;
    slick.$next = next;
    cur.removeClass('slick-next').removeClass('slick-sprev');
  });
  
  rev.slick({
    speed: 1000,
    arrows: true,
    dots: false,
    focusOnSelect: true,
    infinite: true,
    centerMode: true,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerPadding: '0',
    swipe: true,
    customPaging: function(slider, i) {
      return '';
    },
    /*infinite: false,*/
  });
  
// $('.project-slider').slick({
//   centerMode: true,
//   centerPadding: '60px',
//   infinite: true,
//   slidesToShow: 3,
//   focusOnSelect: true,
//   responsive: [
//     {
//       breakpoint: 767,
//       settings: {
//         arrows: false,
//         dots: true,
//         centerMode: true,
//         centerPadding: '40px',
//         slidesToShow: 3
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         centerMode: true,
//         centerPadding: '40px',
//         slidesToShow: 1
//       }
//     }
//   ]
// });

  $('.testimonial-slider-main').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  });
  $('.about-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover:true
  });

  $(".white-lable-section .item").hover(function(){
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
    } else {
      $(".white-lable-section .item").removeClass("open");
      $(this).addClass("open");
      }
    });


$('.faq-header .open-close').text('+'); // Set all icons to '+'
$('.faq-header').first().next('.faq-content').show(); // Show the first FAQ content
$('.faq-header').first().find('.open-close').text('-'); // Set the first FAQ icon to '-'
$('.faq-header').first().addClass('open'); // Add the 'active' class to the first FAQ header

$('.faq-header').click(function() {
    var $content = $(this).next('.faq-content');
    var $icon = $(this).find('.open-close');
    
    if ($content.is(':visible')) {
        $content.slideUp();
        $icon.text('+');
        $(this).removeClass('open'); // Remove 'active' class when the content is hidden
    } else {
        $('.faq-content').slideUp();
        $('.faq-header .open-close').text('+');
        $('.faq-header').removeClass('open'); // Remove 'active' class from all headers
        $content.slideDown();
        $icon.text('-');
        $(this).addClass('open'); // Add 'active' class to the clicked header
    }
});

$(".contact-button").click(function(event) {
  event.preventDefault();
  var contactSectionTop = $(".footer-form").offset().top;
  var windowHeight = $(window).height();
  var scrollPosition = contactSectionTop - (windowHeight / 2); // Adjusted scroll position
  $('html,body').animate({scrollTop: scrollPosition}, 800);
});

var $backToTop = $(".back-to-top");
$backToTop.hide();


$(window).on('scroll', function() {
  if ($(this).scrollTop() > 100) {
    $backToTop.fadeIn();
  } else {
    $backToTop.fadeOut();
  }
});

$backToTop.on('click', function(e) {
  $("html, body").animate({scrollTop: 0}, 500);
});

$(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};

    return $(this).each(function () {

      var settings = $.extend({}, $.fn.countTo.defaults, {
        from: $(this).data('from'),
        to: $(this).data('to'),
        speed: $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals: $(this).data('decimals')
      }, options);


      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;


      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};

      $self.data('countTo', data);


      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);


      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof (settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof (settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.text(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,
    to: 0,
    speed: 1000,
    refreshInterval: 100,
    decimals: 0,
    formatter: formatter,
    onUpdate: null,
    onComplete: null
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }

  $('.counter').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });

  $('.timer').each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
});

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});



});