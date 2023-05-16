import axios from "axios"
let loc = JSON.parse(localStorage.getItem('user'))
let basketProducts = JSON.parse(localStorage.getItem('basket')) || [];
let catalogModal = document.querySelector('.catalogDiv')
export function header(place) {
   let body = document.body
   let header = document.createElement('div')

   let uzum_icon = document.createElement('img')
   let catalog = document.createElement('button')
   let form = document.createElement('form')
   let divSearch = document.createElement('div')
   let input = document.createElement('input')
   let listProduct = document.createElement('div')
   let imgSearch = document.createElement('img')
   let accountImg = document.createElement('img')
   let accountName = document.createElement('a')
   let saved = document.createElement('a')
   let korzina = document.createElement('a')
   let divCounter = document.createElement('div')
   let counter = document.createElement('span')

   header.classList.add('header')
   uzum_icon.classList.add('uzum_icon')
   catalog.classList.add('catalog')
   form.classList.add('searchForm')
   divSearch.classList.add('divSearch')
   input.classList.add('input')
   imgSearch.classList.add('imgSearch')
   accountImg.classList.add('accountImg')
   accountName.classList.add('accountName')
   saved.classList.add('saved')
   korzina.classList.add('korzina')
   divCounter.classList.add('divCounter')
   counter.classList.add('counter')
   listProduct.classList.add('listProduct')
   accountName.innerHTML = loc.name
   uzum_icon.src = '/public/uzum-logo.svg'
   input.placeholder = 'Искать товары'
   imgSearch.src = '/public/search.svg'
   accountImg.src = '/public/customer.svg'
   accountName.href = '/pages/registration.html'
   saved.innerHTML = 'Избранное'
   saved.href = '/pages/saved.html'
   korzina.innerHTML = 'Корзина'
   korzina.href = '/pages/basket.html'
   counter.innerHTML = basketProducts.length
      catalog.innerHTML = 'Каталог'

   uzum_icon.onclick = () => {
      location.assign('/index.html')
   }

   catalog.onclick = () => {
      catalogModal.style.display = 'flex'

      setTimeout(() => {
         catalogModal.style.transform = 'transform: translate(-50%, -50%) scale(1)'
      }, 200)

   }

   axios.get("http://localhost:3000/goods")
      .then(res => onInput(res.data))

   function searchReload(arr, val) {
      listProduct.innerHTML = ''
      for (let item of arr) {
         let re = new RegExp(val, "g")
         let title = item.title.toLowerCase().replace(re, `<b style="color:#9643FF">${val}</b>`)
         listProduct.innerHTML += `
               <a href="/pages/productid.html?id=${item.id}">
               <div class="searchLine">
                  <span>${title}</span>
               </div>
               </a>
            `
      }
   }

   function onInput(arr) {
      input.oninput = () => {
         let val = input.value.toLowerCase().trim()

         let filtered = arr.filter(item => item.title.toLowerCase().includes(val))

         if (val.length > 0) {
            listProduct.style.display = 'block'
            searchReload(filtered, val)
         } else {
            listProduct.style.display = 'none'
         }
      }
   }


   body.prepend(header)
   header.append(uzum_icon, catalog, form, accountImg, accountName, saved, korzina, divCounter)
   form.append(divSearch)
   divSearch.append(input, listProduct, imgSearch)
   divCounter.append(counter)
}


