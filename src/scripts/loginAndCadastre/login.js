// import { log } from "console"
import { postLogin } from "../request routes without authorization/request.js"
function authentication(){
    const token = JSON.parse(localStorage.getItem('@token'))
    if(token){
        location.replace('./userPage.html')
    }
}
authentication()
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
       const loginUser = await postLogin(contentLogin)
       if(loginUser.isAdm){
        console.log('mover depois')
       }else{
        location.replace('./userPage.html')
       }
    })
}
login()