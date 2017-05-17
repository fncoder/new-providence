const preloader = (() => {
  let duration

  const time = () => {
    const elHidden = document.querySelector('.preloader')
    const elOpacity = document.querySelector('.loader')

    setTimeout(() => {
      elHidden.style.visibility = 'hidden'
      elHidden.style.opacity = '0'
      setTimeout(() => {
        elHidden.style.display = 'none'
      }, duration)
    }, duration)

    setTimeout(() => {
      elOpacity.style.opacity = '0'
    }, duration - 300)
  }

  return {
    init (durationLoader) {
      duration = durationLoader
      if (window.addEventListener) {
        window.addEventListener('load', time, false)
      }
    }

  }
})()

preloader.init(1000)
