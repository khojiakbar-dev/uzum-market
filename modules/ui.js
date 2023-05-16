import axios from 'axios'
let furniture = document.querySelector('.furniture')
let pc = document.querySelector('.pc')
let audio = document.querySelector('.audio')
let tv = document.querySelector('.tv')
let kitchen = document.querySelector('.kitchen')
let savedProducts = JSON.parse(localStorage.getItem('product')) || [];
let basketProducts = JSON.parse(localStorage.getItem('basket')) || [];
let catalogH3 = document.querySelectorAll('.lengthPR')
let furnitureCategory = document.querySelector('.furnitureCategory')
const url = 'http://localhost:3000/goods'
axios.get(url)
    .then(res => {
        reload(res.data)
    }
    )

furnitureCategory.onclick = () => {
    axios.get(url)
        .then(res => reload(res.data.filter(i => {
            if (i.type === 'furniture') {
                return i
            }
        })))
}
export function reload(arr) {
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
        
        if (item.type === 'furniture') {
            furniture.append(productBox)
            productBox.append(topSide, bottomSide)
            topSide.append(productImg, savedImg, discountImg)
            bottomSide.append(title, spanDiscount, spanOrigin, addProduct)
        }

        if (item.type === 'PC') {
            pc.append(productBox)
            productBox.append(topSide, bottomSide)
            topSide.append(productImg, savedImg, discountImg)
            bottomSide.append(title, spanDiscount, spanOrigin, addProduct)
        }

        if (item.type === 'audio') {
            audio.append(productBox)
            productBox.append(topSide, bottomSide)
            topSide.append(productImg, savedImg, discountImg)
            bottomSide.append(title, spanDiscount, spanOrigin, addProduct)
        }

        if (item.type === 'TV') {
            tv.append(productBox)
            productBox.append(topSide, bottomSide)
            topSide.append(productImg, savedImg, discountImg)
            bottomSide.append(title, spanDiscount, spanOrigin, addProduct)
        }

        if (item.type === 'kitchen') {
            kitchen.append(productBox)
            productBox.append(topSide, bottomSide)
            topSide.append(productImg, savedImg, discountImg)
            bottomSide.append(title, spanDiscount, spanOrigin, addProduct)
        }

        const type = item.type;
        const similarProducts = arr.filter(product => product.type === type);
        const similarProductsLength = similarProducts.length;

        catalogH3.forEach(it => {
            it.innerHTML = `${similarProductsLength} товаров`
        })
    }
}


