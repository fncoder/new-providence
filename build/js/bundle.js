'use strict';

var campSlider = function () {
  var lengthSlides = document.querySelectorAll('.slide').length;
  var wrapper = document.querySelector('.camp-wrapper');
  var slidesContent = document.querySelector('.slides');

  var widthSlider = 0;
  var current = 0;
  var arr = [];
  var config = {
    speed: 1000,
    easing: 'ease',
    delay: 0,
    animationLoop: true,
    intervalSlide: 5000
  };

  var controls = function controls() {
    for (var i = 0; i < 2; i++) {
      var controlArrow = document.createElement('SPAN');
      wrapper.appendChild(controlArrow);
      controlArrow.classList.add('arrow');

      var arrow = document.querySelectorAll('.arrow');
      if (i === 0) {
        arrow[i].classList.add('arrow-left');
      } else {
        arrow[i].classList.add('arrow-right');
      }
    }

    var wrapperNav = document.createElement('DIV');
    wrapper.appendChild(wrapperNav);
    wrapperNav.classList.add('wrapper-nav');

    for (var _i = 0; _i < lengthSlides; _i++) {
      var controlNav = document.createElement('SPAN');
      var images = document.createElement('IMG');
      controlNav.classList.add('nav');
      wrapperNav.appendChild(controlNav);
      controlNav.setAttribute('data-type', _i);
      images.src = 'images/customer_' + _i + '.jpg';
      images.classList.add('customer__img');
      controlNav.appendChild(images);
    }

    for (var _i2 = 0; _i2 < lengthSlides; _i2++) {
      arr.push(widthSlider);
      widthSlider += 100;
    }
  };

  var updateNav = function updateNav() {
    var navEl = document.querySelectorAll('.nav');
    var arrNav = [];

    for (var i = 0, navLen = navEl.length; i < navLen; i++) {
      arrNav.push(navEl[i]);
    }

    arrNav.forEach(function (value, index) {
      if (index === current) {
        arrNav[index].classList.add('active');
      } else {
        arrNav[index].classList.remove('active');
      }
    });

    return arrNav;
  };

  var slides = function slides(event) {
    var dataType = parseInt(event.target.getAttribute('data-type'));

    if (event.target.getAttribute('class') === 'arrow arrow-right') {
      if (current < lengthSlides - 1) {
        current += 1;
        slidesContent.style.left = '-' + arr[current] + '%';
      }
    }

    if (event.target.getAttribute('class') === 'arrow arrow-left') {
      current += -1;
      slidesContent.style.left = '-' + arr[current] + '%';

      if (current < 0) {
        current = 0;
      }
    }

    var arrNav = updateNav();
    if (event.target.getAttribute('class') === 'nav') {
      arrNav.forEach(function (value, index) {
        if (index === dataType) {
          arrNav[index].classList.add('active');
          slidesContent.style.left = '-' + arr[index] + '%';
          current = index;
        } else {
          arrNav[index].classList.remove('active');
        }
      });
    }
  };

  config._numberDes = function (number) {
    return number / 1000;
  };

  config._speed = function () {
    var duration = this._numberDes(this.speed);
    slidesContent.style.transitionDuration = duration + 's';
  };

  config._timing = function () {
    slidesContent.style.transitionTimingFunction = this.easing;
  };

  config._delay = function () {
    var delay = this._numberDes(this.delay);
    slidesContent.style.transitionDelay = delay + 's';
  };

  config._animationLoop = function () {
    var arrNav = updateNav();
    if (this.animationLoop) {
      setInterval(function () {
        if (current < lengthSlides - 1) {
          current += 1;
          slidesContent.style.left = '-' + arr[current] + '%';
          arrNav.forEach(function (value, index) {
            if (index === current) {
              arrNav[index].classList.add('active');
            } else {
              arrNav[index].classList.remove('active');
            }
          });
        } else {
          current = 0;
          arrNav[current].classList.add('active');
          arrNav[lengthSlides - 1].classList.remove('active');
          slidesContent.style.left = '-' + arr[current] + '%';
        }
      }, this.intervalSlide);
    }
  };

  var getNamesMethods = function getNamesMethods() {
    return Object.getOwnPropertyNames(config).filter(function (key) {
      return typeof config[key] === 'function';
    });
  };

  var init = function init(options) {
    controls();

    var methodsName = getNamesMethods();

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        config[key] = options[key];
      }
    }

    for (var i = 0; i < methodsName.length; i++) {
      Object.defineProperty(config, methodsName[i], {
        configurable: false,
        enumerable: false,
        writable: true
      });
    }

    window.addEventListener('load', function () {
      config._speed();
      config._timing();
      config._delay();
      config._animationLoop();
    });

    slidesContent.style.width = widthSlider + '%';
    wrapper.addEventListener('click', slides, false);
  };

  return {
    init: init
  };
}();

campSlider.init({
  animationLoop: false
});

var slideoutMenu = function () {
  var slideoutNav = document.querySelector('.long-arrow-left');
  var slideoutMenu = document.querySelector('.slideout');
  var hamburger = document.querySelector('.menu__hamburger');

  var slideoutIn = function slideoutIn() {
    slideoutMenu.classList.add('slideout-in');
  };

  hamburger.addEventListener('click', slideoutIn);

  var slideoutFade = function slideoutFade() {
    slideoutMenu.classList.remove('slideout-in');
    slideoutMenu.classList.add('slideout-fade');
  };

  slideoutNav.addEventListener('click', slideoutFade);
}();

var videoPlayer = function () {
  var btnWatch = document.querySelector('.btn-watch');
  var video = document.createElement('div');
  var videoWrapper = document.createElement('div');
  var btnLeave = document.createElement('div');
  var iframe = document.createElement('iframe');

  btnLeave.innerHTML = '&#10005';
  iframe.src = 'https://player.vimeo.com/video/76612986?portrait=0';
  iframe.setAttribute('allowfullscreen', '');

  video.classList.add('video', 'hidden');
  videoWrapper.classList.add('wrapper__video');
  btnLeave.classList.add('btn', 'btn-leave');

  video.appendChild(videoWrapper);
  videoWrapper.appendChild(btnLeave);
  videoWrapper.appendChild(iframe);
  document.body.insertBefore(video, document.querySelector('.main-header'));

  var showPlayer = function showPlayer() {
    video.classList.remove('hidden');
    video.classList.add('show');
  };

  btnWatch.addEventListener('click', showPlayer);

  var closePlayer = function closePlayer(e) {
    if (e.target === btnLeave) {
      video.classList.remove('show');
      video.classList.add('hidden');
    }
  };

  video.addEventListener('click', closePlayer);
}();

var planToggle = function () {
  var switchWrapper = document.querySelector('.switch');
  var switchNav = document.querySelector('.switch-nav');
  var planStarter = document.querySelector('.plan-starter');
  var planPro = document.querySelector('.plan-pro');

  switchWrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('switch__company')) {
      switchNav.classList.add('switch-toggle');
      planStarter.classList.remove('active-plan');
      planPro.classList.add('active-plan');
    } else {
      switchNav.classList.remove('switch-toggle');
      planStarter.classList.add('active-plan');
      planPro.classList.remove('active-plan');
    }
  });
}();

function fixedMenu() {
  var menu = document.querySelector('.menu');
  var top = this.scrollY;
  if (top > 1) {
    menu.classList.add('fixed-menu');
  } else {
    menu.classList.remove('fixed-menu');
  }
}

window.addEventListener('scroll', fixedMenu);

var chromeHacks = function () {
  var isChrome = !!window.chrome && !!window.chrome.webstore;

  if (isChrome) {
    var btnApp = document.querySelectorAll('.btn-app')[1];

    btnApp.classList.add('btn-app--vertical-chrome');
  }
}();

var preloader = function () {
  var duration = void 0;

  var time = function time() {
    var elHidden = document.querySelector('.preloader');
    var elOpacity = document.querySelector('.loader');

    setTimeout(function () {
      elHidden.style.visibility = 'hidden';
      elHidden.style.opacity = '0';
      setTimeout(function () {
        elHidden.style.display = 'none';
      }, duration);
    }, duration);

    setTimeout(function () {
      elOpacity.style.opacity = '0';
    }, duration - 300);
  };

  return {
    init: function init(durationLoader) {
      duration = durationLoader;
      if (window.addEventListener) {
        window.addEventListener('load', time, false);
      }
    }
  };
}();

preloader.init(1000);