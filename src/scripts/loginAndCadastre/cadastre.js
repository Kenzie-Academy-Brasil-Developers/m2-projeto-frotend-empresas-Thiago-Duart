
import { postEmployeesCreate } from "../request routes without authorization/request.js"

    const home = document.querySelector('#home')
    home.addEventListener('click',()=>{
        location.replace('../../')
    })
    const returnHome = document.querySelector('#returnHome')
    returnHome.addEventListener('click',(e)=>{
        e.preventDefault()
        location.replace('../../')
    })
    const login = document.querySelector('#login')
    login.addEventListener('click',()=>{
        location.replace('./login.html')
    })
    

    function createAccount(){
    const inputs = document.querySelectorAll('input')
    const btnConfirmCadastre = document.querySelector('#btnConfirmCadastre')
    const accountContent = {}
    let count = 0
    btnConfirmCadastre.addEventListener('click',async (e)=>{
        e.preventDefault()
        inputs.forEach(input =>{
            if(input.value.trim() === ''){
                count++
            }else{
                accountContent[input.name]= input.value
            }
        })
        if(count !== 0){
            console.log('preencha todos os inputs')
            count = 0
        }else{
           await postEmployeesCreate(accountContent)
        }
    })
}
createAccount()