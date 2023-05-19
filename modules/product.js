import { header } from '/modules/header'
import axios from 'axios'
let productCont = document.querySelector('.productInfo')
let savedProducts = JSON.parse(localStorage.getItem('product')) || [];
let basketProducts = JSON.parse(localStorage.getItem('basket')) || [];
header()
import { footer } from '/modules/footer.js'


footer()

const ApiUrl = 'http://localhost:3000/goods'
const url = location
const id = url.href.split('=').at(-1)

axios.get(ApiUrl)
    .then(res => {
        product_reload(res.data, productCont)
    })


function product_reload(arr, place) {
    // place.innerHTML = ""
    for (let item of arr) {
        if (item.id === +id) {
            let topOfProduct = document.createElement('div')
            let bottomOfProduct = document.createElement('div')
            let left_scroll = document.createElement('div')
            let sliderProduct = document.createElement('div')
            let productImgs = document.createElement('div')
            let info = document.createElement('div')
            let titleRp = document.createElement('h2')
            let prices = document.createElement('div')
            let newPrice = document.createElement('span')
            let originPC = document.createElement('span')
            let counter = document.createElement('div')
            let minus = document.createElement('span')
            let numberCount = document.createElement('span')
            let plus = document.createElement('span')
            let hr = document.createElement('hr')
            let advice = document.createElement('p.')
            let btns = document.createElement('div')
            let addBasket = document.createElement('button')
            let addSaved = document.createElement('button')
            let descProduct = document.createElement('div')
            let opisanie = document.createElement('h2')
            let moreInfo = document.createElement('p')
            let carousel = document.createElement('div')
            let orgPrice = item.price
            let leftSlider = document.createElement('img')
            let rightSlider = document.createElement('img')

            let totalCost = 0
            let totalds = 0
            let count = 1
            let dsPrc = 0

            leftSlider.classList.add('leftSlider')
            rightSlider.classList.add('rightSlider')
            topOfProduct.classList.add('topOfProduct')
            bottomOfProduct.classList.add('bottomOfProduct')
            left_scroll.classList.add('left_scroll')
            sliderProduct.classList.add('sliderProduct')
            info.classList.add('info')
            titleRp.classList.add('titleRp')
            prices.classList.add('prices')
            newPrice.classList.add('newPrice')
            originPC.classList.add('discountPrice')
            counter.classList.add('counter')
            minus.classList.add('minus')
            numberCount.classList.add('numberCount')
            plus.classList.add('plus')
            hr.classList.add('hr')
            advice.classList.add('advice')
            btns.classList.add('btns')
            addBasket.classList.add('addBasket')
            addSaved.classList.add('addSaved')
            descProduct.classList.add('descProduct')
            opisanie.classList.add('opisanie')
            moreInfo.classList.add('moreInfo')
            carousel.classList.add('carousel')
            productImgs.classList.add('productImgs')
            titleRp.innerHTML = item.title
            minus.innerHTML = '-'
            numberCount.innerHTML = "1"
            plus.innerHTML = '+'
            advice.innerHTML =
                'Станьте востребованным разработчиком. Вы изучите основы программирования и основныеконцепции компьютерных наук, цифровые технологии, операционные системы, программное обеспечение, базы данных, системы аналитики, языки программирования и многое другое. Познакомитесь с тестированием и системныманализом. На программе сможете сделать осознанный выбор специализации и технологий, прокачаться ввыбранном направлении.'
            addBasket.innerHTML = 'Добавить в корзину'
            addSaved.innerHTML = 'Добавить в избранное'
            opisanie.innerHTML = 'Описание товара'
            moreInfo.innerHTML = item.description
            leftSlider.src = '/public/arrow-left.svg'
            rightSlider.src = '/public/arrow-right.svg'

            place.append(topOfProduct, bottomOfProduct)
            topOfProduct.append(left_scroll, sliderProduct, info)
            sliderProduct.append(leftSlider, productImgs, rightSlider)

            for (let imgs of item.media) {
                let swiperImg = document.createElement('img')
                swiperImg.classList.add('swiperImg')
                swiperImg.src = imgs
                let carouselImg = document.createElement('img')
                carouselImg.classList.add('carouselImg')
                carouselImg.src = imgs

                left_scroll.append(swiperImg)
                productImgs.append(carouselImg)
            }

            info.append(titleRp, prices, counter, hr, advice, btns)
            prices.append(newPrice, originPC)
            counter.append(minus, numberCount, plus)
            btns.append(addBasket, addSaved)
            bottomOfProduct.append(descProduct, carousel)
            descProduct.append(opisanie, moreInfo)

            if (item.salePercentage > 0) {
                dsPrc = Math.floor((item.price / 100) * item.salePercentage)
            } else {
                dsPrc = item.price
                originPC.style.display = 'none'
            }

            let formattedPrice = orgPrice.toLocaleString('ru-RU');
            let formattedPriceTwo = dsPrc.toLocaleString('ru-RU')
            newPrice.innerHTML = formattedPriceTwo + ' сум'
            originPC.innerHTML = formattedPrice + 'сум'

            plus.style.cursor = 'pointer'
            minus.style.cursor = 'pointer'

            plus.onclick = () => {
                count++
                numberCount.innerHTML = count
                let price = orgPrice * count
                let prcDs = dsPrc * count
                totalCost = price
                totalds = prcDs

                originPC.innerHTML = `${totalCost} сум`
                newPrice.innerHTML = `${prcDs} сум`
            }

            minus.onclick = () => {
                if (numberCount.innerHTML !== "1") {
                    count--
                    numberCount.innerHTML = count
                    totalCost -= orgPrice
                    totalds -= dsPrc
                    originPC.innerHTML = `${totalCost} сум`
                    newPrice.innerHTML = `${totalds} сум`
                }
            }

            if (!savedProducts.includes(item.id)) {
                addSaved.innerHTML = 'Добавить в избранное'
            } else {
                addSaved.innerHTML = 'Добавлен'
                addSaved.style.background = 'violet'
                addSaved.style.border = 'none'
            }
            addSaved.onclick = () => {
                if (!savedProducts.includes(item.id)) {
                    savedProducts.push(item.id)
                    addSaved.innerHTML = 'Добавлен'
                    addSaved.style.background = 'violet'
                    addSaved.style.border = 'none'
                    localStorage.setItem("product", JSON.stringify(savedProducts));
                } else {
                    savedProducts = savedProducts.filter(el => el !== item.id)
                    localStorage.setItem("product", JSON.stringify(savedProducts));
                    addSaved.innerHTML = 'Добавить в избранное'
                    addSaved.style.background = 'transparent'
                    addSaved.style.border = '1px solid #7000FF'
                }
            }

            if (!basketProducts.includes(item.id)) {
                addBasket.innerHTML = 'Добавить в корзину'
                addBasket.style.background = 'transparent'
                addBasket.style.border = '1px solid #7000FF'
                addBasket.style.color = '#7000FF'
            } else {
                addBasket.innerHTML = 'Добавлено в корзину'
                addBasket.style.background = '#7000FF'
                addBasket.style.color = 'white'
                addBasket.style.border = 'none'
            }

            addBasket.onclick = () => {
                if (!basketProducts.includes(item.id)) {
                    basketProducts.push(item.id)
                    addBasket.innerHTML = 'Добавлено в корзину'
                    addBasket.style.background = '#7000FF'
                    addBasket.style.color = 'white'
                    addBasket.style.border = 'none'
                    localStorage.setItem("basket", JSON.stringify(basketProducts));
                } else {
                    basketProducts = basketProducts.filter(el => el !== item.id)
                    localStorage.setItem("basket", JSON.stringify(basketProducts));
                    addBasket.innerHTML = 'Добавить в корзину'
                    addBasket.style.background = 'transparent'
                    addBasket.style.border = '1px solid #7000FF'
                    addBasket.style.color = '#7000FF'
                }
            }
        }
    }
}



// let prev = document.querySelector('.leftSlider')
// let next = document.querySelector('.rightSlider')
// let sliders = document.querySelectorAll('.carouselImg')

// let slideIndex = 0
// showSlides(slideIndex)

// function showSlides(n) {

//     if (n >= sliders.length) {
//         slideIndex = 0
//     }
//     if (n < 0) {
//         slideIndex = sliders.length - 1
//     }

//     sliders.forEach(el => el.classList.add('hide'))
//     sliders[slideIndex].classList.remove('hide')
//     sliders[slideIndex].classList.add('show')
// }

// prev.onclick = () => {
//     slideIndex--
//     showSlides(slideIndex)
// }
// next.onclick = () => {
//     slideIndex++
//     showSlides(slideIndex)
// }
