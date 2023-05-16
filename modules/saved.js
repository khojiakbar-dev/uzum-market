import axios from "axios"

let locData = JSON.parse(localStorage.getItem('product'))
let productsCont = document.querySelector('.savedCont')
let savedProducts = JSON.parse(localStorage.getItem('product')) || [];
let basketProducts = JSON.parse(localStorage.getItem('basket')) || [];

const url = 'http://localhost:3000/goods'


axios.get(url)
    .then(res => {
        reload(locData, res.data, productsCont)
    })


export function reload(arrLoc, dataLoc, place) {
    for (let item of dataLoc) {
        for (let id of arrLoc) {
            if (item.id === +id) {
                let productBox = document.createElement('div')
                let topSide = document.createElement('div')
                let bottomSide = document.createElement('div')
                let productImg = document.createElement('img')
                let title = document.createElement('a')
                let spanDiscount = document.createElement('span')
                let spanOrigin = document.createElement('span')
                let addProduct = document.createElement('img')
                let savedImg = document.createElement('img')
                let discountImg = document.createElement('img')
                let dsPrc = 0
                productBox.classList.add('productBox')
                topSide.classList.add('topSide')
                bottomSide.classList.add('bottomSide')
                productImg.classList.add('productImg')
                title.classList.add('title')
                spanDiscount.classList.add('spanDiscount')
                spanOrigin.classList.add('spanOrigin')
                addProduct.classList.add('addProduct')
                savedImg.classList.add('savedImg')
                discountImg.classList.add('discountImg')
                if (item.salePercentage > 0) {
                    discountImg.src = '/public/discountImg.svg'
                } else {
                    discountImg.style.display = 'none'
                }

                productImg.src = item.media[0]
                title.innerHTML = item.title
                addProduct.src = '/public/buyCard.svg'
                savedImg.src = '/public/saved.svg'

                productImg.onclick = () => {
                    location.assign("/pages/productid.html?id=" + item.id);
                }

                if (item.salePercentage > 0) {
                    dsPrc = Math.floor((item.price / 100) * item.salePercentage)
                } else {
                    dsPrc = item.price
                    spanDiscount.style.display = 'none'
                }
                
                let formattedPrice = item.price.toLocaleString('ru-RU');
                let formattedPriceTwo = dsPrc.toLocaleString('ru-RU')
                spanOrigin.innerHTML = formattedPriceTwo + ' сум'
                spanDiscount.innerHTML = formattedPrice + 'сум'

                if (!savedProducts.includes(item.id)) {
                    savedImg.src = '/public/saved.svg'
                } else {
                    savedImg.src = '/public/savedActive.svg'
                }
                savedImg.onclick = () => {
                    if (!savedProducts.includes(item.id)) {
                        savedProducts.push(item.id)
                        savedImg.src = '/public/savedActive.svg'
                        localStorage.setItem("product", JSON.stringify(savedProducts));
                    } else {
                        savedProducts = savedProducts.filter(el => el !== item.id)
                        savedImg.src = '/public/saved.svg'
                        localStorage.setItem("product", JSON.stringify(savedProducts));
                        setTimeout(() => {
                            productBox.style.display = 'none'
                        }, 200)
                    }
                }

                addProduct.onclick = () => {
                    if (!basketProducts.includes(item.id)) {
                        basketProducts.push(item.id)
                        localStorage.setItem("basket", JSON.stringify(basketProducts));
                    } else {
                        basketProducts = basketProducts.filter(el => el !== item.id)
                        localStorage.setItem("basket", JSON.stringify(basketProducts));
                    }
                }

                place.append(productBox)
                productBox.append(topSide, bottomSide)
                topSide.append(productImg, savedImg, discountImg)
                bottomSide.append(title, spanDiscount, spanOrigin, addProduct)
            }
        }
    }
}

if (savedProducts.length === 0) {
    location.assign('/pages/empty.html')
}