'use strict';

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