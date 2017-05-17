'use strict'

const campSlider = (() => {
  const lengthSlides = document.querySelectorAll('.slide').length
  const wrapper = document.querySelector('.camp-wrapper')
  const slidesContent = document.querySelector('.slides')

  let widthSlider = 0
  let current = 0
  let arr = []
  let config = {
    speed: 1000,
    easing: 'ease',
    delay: 0,
    animationLoop: true,
    intervalSlide: 5000
  }

  const controls = () => {
    for (let i = 0; i < 2; i++) {
      const controlArrow = document.createElement('SPAN')
      wrapper.appendChild(controlArrow)
      controlArrow.classList.add('arrow')

      const arrow = document.querySelectorAll('.arrow')
      if (i === 0) {
        arrow[i].classList.add('arrow-left')
      } else {
        arrow[i].classList.add('arrow-right')
      }
    }

    const wrapperNav = document.createElement('DIV')
    wrapper.appendChild(wrapperNav)
    wrapperNav.classList.add('wrapper-nav')

    for (let i = 0; i < lengthSlides; i++) {
      const controlNav = document.createElement('SPAN')
      const images = document.createElement('IMG')
      controlNav.classList.add('nav')
      wrapperNav.appendChild(controlNav)
      controlNav.setAttribute('data-type', i)
      images.src = 'images/customer_' + i + '.jpg'
      images.classList.add('customer__img')
      controlNav.appendChild(images)
    }

    for (let i = 0; i < lengthSlides; i++) {
      arr.push(widthSlider)
      widthSlider += 100
    }
  }

  const updateNav = () => {
    const navEl = document.querySelectorAll('.nav')
    let arrNav = []

    for (let i = 0, navLen = navEl.length; i < navLen; i++) {
      arrNav.push(navEl[i])
    }

    arrNav.forEach((value, index) => {
      if (index === current) {
        arrNav[index].classList.add('active')
      } else {
        arrNav[index].classList.remove('active')
      }
    })

    return arrNav
  }

  const slides = (event) => {
    const dataType = parseInt(event.target.getAttribute('data-type'))

    if (event.target.getAttribute('class') === 'arrow arrow-right') {
      if (current < lengthSlides - 1) {
        current += 1
        slidesContent.style.left = `-${arr[current]}%`
      }
    }

    if (event.target.getAttribute('class') === 'arrow arrow-left') {
      current += -1
      slidesContent.style.left = `-${arr[current]}%`

      if (current < 0) {
        current = 0
      }
    }

    const arrNav = updateNav()
    if (event.target.getAttribute('class') === 'nav') {
      arrNav.forEach((value, index) => {
        if (index === dataType) {
          arrNav[index].classList.add('active')
          slidesContent.style.left = `-${arr[index]}%`
          current = index
        } else {
          arrNav[index].classList.remove('active')
        }
      })
    }
  }

  config._numberDes = (number) => {
    return number / 1000
  }

  config._speed = function () {
    const duration = this._numberDes(this.speed)
    slidesContent.style.transitionDuration = `${duration}s`
  }

  config._timing = function () {
    slidesContent.style.transitionTimingFunction = this.easing
  }

  config._delay = function () {
    const delay = this._numberDes(this.delay)
    slidesContent.style.transitionDelay = `${delay}s`
  }

  config._animationLoop = function () {
    const arrNav = updateNav()
    if (this.animationLoop) {
      setInterval(() => {
        if (current < lengthSlides - 1) {
          current += 1
          slidesContent.style.left = `-${arr[current]}%`
          arrNav.forEach((value, index) => {
            if (index === current) {
              arrNav[index].classList.add('active')
            } else {
              arrNav[index].classList.remove('active')
            }
          })
        } else {
          current = 0
          arrNav[current].classList.add('active')
          arrNav[lengthSlides - 1].classList.remove('active')
          slidesContent.style.left = `-${arr[current]}%`
        }
      }, this.intervalSlide)
    }
  }

  const getNamesMethods = () => {
    return Object.getOwnPropertyNames(config).filter((key) => {
      return typeof config[key] === 'function'
    })
  }

  const init = (options) => {
    controls()

    const methodsName = getNamesMethods()

    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        config[key] = options[key]
      }
    }

    for (let i = 0; i < methodsName.length; i++) {
      Object.defineProperty(config, methodsName[i], {
        configurable: false,
        enumerable: false,
        writable: true
      })
    }

    window.addEventListener('load', () => {
      config._speed()
      config._timing()
      config._delay()
      config._animationLoop()
    })

    slidesContent.style.width = `${widthSlider}%`
    wrapper.addEventListener('click', slides, false)
  }

  return {
    init: init
  }
})()

campSlider.init({
  animationLoop: false
})
