import axios from 'axios'

let storeData = JSON.parse(localStorage.getItem('basket'))
let leftBasket = document.querySelector('.leftBasket')
let basketProducts = JSON.parse(localStorage.getItem('basket')) || [];
let overallPrice = document.querySelector('.overallPrice')
const url = 'http://localhost:3000/goods'

axios.get(url)
    .then(res => {
        reload(storeData, res.data)
    })

function reload(storeArr, dataLoc) {
    for (let item of dataLoc) {
        for (let id of storeArr) {
            if (item.id === +id) {
                let items = document.createElement('div')
                let left_item = document.createElement('div')
                let right_item = document.createElement('div')
                let img = document.createElement('img')
                let title = document.createElement('span')
                let price = document.createElement('span')
                let dsPrice = document.createElement('span')
                let counter = document.createElement('div')
                let minus = document.createElement('span')
                let numberCount = document.createElement('span')
                let plus = document.createElement('span')
                let deleteBtn = document.createElement('button')

                let dsPrc = 0
                let totalCost = 0
                let totalds = 0
                let count = 1

                items.classList.add('items')
                left_item.classList.add('left_item')
                right_item.classList.add('right_item')
                img.classList.add('img')
                title.classList.add('titlePP')
                price.classList.add('price')
                counter.classList.add('counter')
                minus.classList.add('minus')
                numberCount.classList.add('numberCount')
                plus.classList.add('plus')
                deleteBtn.classList.add('deleteBtn')
                dsPrice.classList.add('dsPrice')

                img.src = item.media[0]
                title = item.title
                let orgPrice = item.price
                minus.innerHTML = '-'
                plus.innerHTML = '+'
                numberCount.innerHTML = '1'
                deleteBtn.innerHTML = 'Удалить'

                leftBasket.append(items)
                items.append(left_item, right_item)
                left_item.append(img)
                right_item.append(title, price, dsPrice, counter, deleteBtn)
                counter.append(minus, numberCount, plus)

                img.onclick = () => {
                    location.assign("/pages/productid.html?id=" + item.id);
                }

                if (item.salePercentage > 0) {
                    dsPrc = Math.floor((item.price / 100) * item.salePercentage)
                    price.style.textDecoration = 'line-through'
                } else {
                    dsPrc = item.price
                    dsPrice.style.display = 'none'
                }

                let formattedPrice = item.price.toLocaleString('ru-RU');
                let formattedPriceTwo = dsPrc.toLocaleString('ru-RU')

                dsPrice.innerHTML = formattedPriceTwo + ' сум'
                price.innerHTML = formattedPrice + 'сум'

                plus.style.cursor = 'pointer'
                minus.style.cursor = 'pointer'
                plus.onclick = () => {
                    count++
                    numberCount.innerHTML = count
                    let prc = orgPrice * count
                    let prcDs = dsPrc * count
                    totalCost = prc
                    totalds = prcDs

                    price.innerHTML = `${totalCost} сум`
                    dsPrice.innerHTML = `${prcDs} сум`
                }

                minus.onclick = () => {
                    if (numberCount.innerHTML !== "1") {
                        count--
                        numberCount.innerHTML = count
                        totalCost -= orgPrice
                        totalds -= dsPrc
                        price.innerHTML = `${totalCost} сум`
                        dsPrice.innerHTML = `${totalds} сум`
                    }
                }





                deleteBtn.onclick = () => {
                    if (!basketProducts.includes(item.id)) {
                        basketProducts.push(item.id)
                        localStorage.setItem("basket", JSON.stringify(basketProducts));
                    } else {
                        basketProducts = basketProducts.filter(el => el !== item.id)
                        localStorage.setItem("basket", JSON.stringify(basketProducts));
                        setTimeout(() => {
                            items.style.display = 'none'
                        }, 200)
                    }
                }


            }
        }
    }
}

if (basketProducts.length === 0) {
    location.assign('/pages/empty.html')
}

