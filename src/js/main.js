const slideoutMenu = (() => {
  const slideoutNav = document.querySelector('.long-arrow-left')
  const slideoutMenu = document.querySelector('.slideout')
  const hamburger = document.querySelector('.menu__hamburger')

  const slideoutIn = () => {
    slideoutMenu.classList.add('slideout-in')
  }

  hamburger.addEventListener('click', slideoutIn)

  const slideoutFade = () => {
    slideoutMenu.classList.remove('slideout-in')
    slideoutMenu.classList.add('slideout-fade')
  }

  slideoutNav.addEventListener('click', slideoutFade)
})()

const videoPlayer = (() => {
  const btnWatch = document.querySelector('.btn-watch')
  const video = document.createElement('div')
  const videoWrapper = document.createElement('div')
  const btnLeave = document.createElement('div')
  const iframe = document.createElement('iframe')

  btnLeave.innerHTML = '&#10005'
  iframe.src = 'https://player.vimeo.com/video/76612986?portrait=0'
  iframe.setAttribute('allowfullscreen', '')

  video.classList.add('video', 'hidden')
  videoWrapper.classList.add('wrapper__video')
  btnLeave.classList.add('btn', 'btn-leave')

  video.appendChild(videoWrapper)
  videoWrapper.appendChild(btnLeave)
  videoWrapper.appendChild(iframe)
  document.body.insertBefore(video, document.querySelector('.main-header'))

  const showPlayer = () => {
    video.classList.remove('hidden')
    video.classList.add('show')
  }

  btnWatch.addEventListener('click', showPlayer)

  const closePlayer = (e) => {
    if (e.target === btnLeave) {
      video.classList.remove('show')
      video.classList.add('hidden')
    }
  }

  video.addEventListener('click', closePlayer)
})()

const planToggle = (() => {
  const switchWrapper = document.querySelector('.switch')
  const switchNav = document.querySelector('.switch-nav')
  const planStarter = document.querySelector('.plan-starter')
  const planPro = document.querySelector('.plan-pro')

  switchWrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('switch__company')) {
      switchNav.classList.add('switch-toggle')
      planStarter.classList.remove('active-plan')
      planPro.classList.add('active-plan')
    } else {
      switchNav.classList.remove('switch-toggle')
      planStarter.classList.add('active-plan')
      planPro.classList.remove('active-plan')
    }
  })
})()

function fixedMenu (){
  const menu = document.querySelector('.menu')
  const top = this.scrollY
  if (top > 1) {
    menu.classList.add('fixed-menu')
  } else {
    menu.classList.remove('fixed-menu')
  }
}

window.addEventListener('scroll', fixedMenu)

const chromeHacks = (() => {
  const isChrome = !!window.chrome && !!window.chrome.webstore

  if (isChrome) {
    let btnApp = document.querySelectorAll('.btn-app')[1]

    btnApp.classList.add('btn-app--vertical-chrome')
  }
})()
