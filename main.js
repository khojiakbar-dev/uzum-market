import {header} from '/modules/header.js'


header()

import {footer} from '/modules/footer.js'


footer()


let prev = document.querySelector('.offer__slider-left')
let next = document.querySelector('.offer__slider-right')
let sliders = document.querySelectorAll('.offer__slide') 

let slideIndex = 0
showSlides(slideIndex)

function showSlides(n) {

    if(n >= sliders.length  ) {
        slideIndex = 0
    }
    if(n < 0) {
        slideIndex = sliders.length - 1
    }

    sliders.forEach(el =>  el.classList.add('hide'))
    sliders[slideIndex].classList.remove('hide')
    sliders[slideIndex].classList.add('show')
}

prev.onclick = () => {
    slideIndex--
    showSlides(slideIndex)
}
next.onclick = () => {
    slideIndex++
    showSlides(slideIndex)
}
