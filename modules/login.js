import axios from 'axios'
let form = document.forms.login
let inpts = document.querySelectorAll('input')
let loc = JSON.parse(localStorage.getItem('user'))

form.onsubmit = (e) => {
    e.preventDefault()

    axios.get('http://localhost:3000/users?email='+ inpts[0].value)
        .then(res => {
            if(res.status === 200 || res.status === 201 ) {
                let user = res.data[0]
                if(inpts[1].value === user.password) {
                    localStorage.setItem('user', JSON.stringify(user))
                    window.location.assign('/index.html')
                } else {
                    alert('wrong password')
                }
            }
        })
}