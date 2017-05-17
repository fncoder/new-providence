'use strict';

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