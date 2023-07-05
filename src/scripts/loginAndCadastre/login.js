import { postLogin } from "../request routes without authorization/request.js"
{
const home = document.querySelector('#home')
home.addEventListener('click',()=>{
    location.replace('../../')
})
const cadastre = document.querySelectorAll('.cadastre')
cadastre.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault()
        location.replace('./cadastre.html')
    })
})
}
function login(){
    const inputs = document.querySelectorAll('input')
    const btnLogin = document.querySelector('#login')
    const contentLogin = {}
    btnLogin.addEventListener('click',async(e)=>{
        e.preventDefault()
        inputs.forEach(input=>{
                contentLogin[input.name] = input.value
        })
       await postLogin(contentLogin)
    })
}
login()