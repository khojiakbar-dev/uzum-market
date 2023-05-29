import axios from "axios";
import { header } from '/modules/header.js'
header()
import { footer } from '/modules/footer.js'
footer()
let productsCont = document.querySelector('.productsCate')
let savedProducts = JSON.parse(localStorage.getItem('product')) || [];
let basketProducts = JSON.parse(localStorage.getItem('basket')) || [];
let catalogH3 = document.querySelectorAll('.lengthPR')
let filterBtn = document.querySelector('.filterBtn')
let type = localStorage.getItem("type")
let preTitle = document.querySelector('.preTitle')

preTitle.innerHTML = type.toUpperCase()
console.log(type);

axios.get('http://localhost:3000/goods')
    .then(res => {
        createCategory(res.data.filter(el => el.type === type))

        filterBtn.onclick = () => {
            filterProduct(res.data.filter(el => el.type === type))
        }
    })




export function createCategory(arr) {
    productsCont.innerHTML = ''
    for (let item of arr) {
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

        if (item.salePercentage > 0) {
            dsPrc = Math.floor((item.price / 100) * item.salePercentage)
        } else {
            dsPrc = item.price
            spanDiscount.style.display = 'none'
        }

        spanOrigin.innerHTML = dsPrc + ' сум'
        spanDiscount.innerHTML = item.price + 'сум'
        addProduct.src = '/public/buyCard.svg'
        savedImg.src = '/public/saved.svg'

        productImg.onclick = () => {
            location.assign("/pages/productid.html?id=" + item.id);
        }

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
                localStorage.setItem("product", JSON.stringify(savedProducts));
                savedImg.src = '/public/saved.svg'
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

        let formattedPrice = item.price.toLocaleString('ru-RU');
        let formattedPriceTwo = dsPrc.toLocaleString('ru-RU')
        spanOrigin.innerHTML = formattedPriceTwo + ' сум'
        spanDiscount.innerHTML = formattedPrice + 'сум'

        productsCont.append(productBox)
        productBox.append(topSide, bottomSide)
        topSide.append(productImg, savedImg, discountImg)
        bottomSide.append(title, spanDiscount, spanOrigin, addProduct)

        const type = item.type;
        const similarProducts = arr.filter(product => product.type === type);
        const similarProductsLength = similarProducts.length;

        catalogH3.forEach(it => {
            it.innerHTML = `${similarProductsLength} товаров`
        })
    }


}





let prev = document.querySelector('.offer__slider-left')
let next = document.querySelector('.offer__slider-right')
let sliders = document.querySelectorAll('.offer__slide')

let slideIndex = 0
showSlides(slideIndex)

function showSlides(n) {

    if (n >= sliders.length) {
        slideIndex = 0
    }
    if (n < 0) {
        slideIndex = sliders.length - 1
    }

    sliders.forEach(el => el.classList.add('hide'))
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


let productCate = document.querySelectorAll('.catalogCategory')
productCate[0].onclick = () => {
    localStorage.setItem("type", "furniture")
}

productCate[1].onclick = () => {
    localStorage.setItem("type", "PC")
}
productCate[2].onclick = () => {
    localStorage.setItem("type", "audio")
}
productCate[3].onclick = () => {
    localStorage.setItem("type", "TV")
}
productCate[4].onclick = () => {
    localStorage.setItem("type", "kitchen")
}



function filterProduct(arr) {
    let minPrice = parseFloat(document.querySelector('#minPrice').value)
    let maxPrice = parseFloat(document.querySelector('#maxPrice').value)

    let filterProducts = arr.filter(product => {
        return product.price >= minPrice && product.price <= maxPrice
    })


    productsCont.innerHTML = "";

    filterProducts.forEach(function (item) {
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

        if (item.salePercentage > 0) {
            dsPrc = Math.floor((item.price / 100) * item.salePercentage)
        } else {
            dsPrc = item.price
            spanDiscount.style.display = 'none'
        }

        spanOrigin.innerHTML = dsPrc + ' сум'
        spanDiscount.innerHTML = item.price + 'сум'
        addProduct.src = '/public/buyCard.svg'
        savedImg.src = '/public/saved.svg'

        productImg.onclick = () => {
            location.assign("/pages/productid.html?id=" + item.id);
        }

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
                localStorage.setItem("product", JSON.stringify(savedProducts));
                savedImg.src = '/public/saved.svg'
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

        let formattedPrice = item.price.toLocaleString('ru-RU');
        let formattedPriceTwo = dsPrc.toLocaleString('ru-RU')
        spanOrigin.innerHTML = formattedPriceTwo + ' сум'
        spanDiscount.innerHTML = formattedPrice + 'сум'

        productsCont.append(productBox)
        productBox.append(topSide, bottomSide)
        topSide.append(productImg, savedImg, discountImg)
        bottomSide.append(title, spanDiscount, spanOrigin, addProduct)

    });

}