import { getDepartmentsReadById } from "../request for routes Employees/request.js"
import { getEmployeesOutOfWork, patchDismissEmployee, patchHireEmployee } from "../request routes Admin Token/request.js"

export async function openModalHireEmployee(){
    const modal = document.querySelector('#personnelDepartment')
    const btnShow = document.querySelectorAll('.departmentHire')
    btnShow.forEach(btn=>{
        btn.addEventListener('click',async(e)=>{
                const departmentId = e.target.getAttribute('data-uid')
                    if(departmentId){
                        await modalContentRender(departmentId) 
                        const departmentBody = {
                            department_id: departmentId
                        }
                        await hireUser(departmentBody)
                        await contractedUsers(departmentId)
                        await dismissEmployee()
                        await renderOptionsUsers()
                        modal.showModal()
                    }else{
                        console.log('sem id')
                    }    
        })
    })
    const btnClose = document.querySelector('.closeModal')
    btnClose.addEventListener('click',()=>{
        modal.close()
    })
}
async function modalContentRender(id){
    const uid = id
    const departament = await  getDepartmentsReadById(uid)   
    const departamentName = document.querySelector('#departmentName')
    departamentName.innerHTML = departament.name

    const departamentDescription = document.querySelector('#departmentDescription')
    departamentDescription.innerHTML = departament.description

    const companyName = document.querySelector('#companyName')
    companyName.innerHTML = departament.company.name
}
async function contractedUsers(uid){
    const userContainer = document.querySelector('.user__container')
    userContainer.innerHTML = ""
    const departament = await  getDepartmentsReadById(uid) 
    const name = departament.company.name
    const users = departament.employees
    let companyName
    const userMap = await Promise.all(users.map(async (user)=>{      
        const container = document.createElement('div');
        container.classList.add('user__contracted');
        
        const innerDiv1 = document.createElement('div');
        innerDiv1.innerHTML = `
        <h2>${user.name}</h2>
        <p>${name}</p>
        `
        const btn = document.createElement('button')
        btn.classList.add('btn__modal-red')
        btn.classList.add('btnDismiss')
        btn.value = user.id
        btn.setAttribute('data-uid',user.department_id)
        btn.innerText = 'Desligar'
        btn.name = user.name
        container.append(innerDiv1, btn);
        userContainer.appendChild(container);
    }))
    await dismissEmployee()
    return userMap 
}
async function renderOptionsUsers (){
    const userHire = document.querySelector('#usersHire')
    userHire.innerHTML = ''
    const userOutWork =  await getEmployeesOutOfWork()
    userOutWork.forEach((user)=>{
        userHire.insertAdjacentHTML('beforeend',`
        <option value=""  disabled selected>selecione o usuário</option>
        `)
        const userOptions = document.createElement('option')
        userOptions.value = user.id
        userOptions.innerText = user.name
        userHire.append(userOptions)
    })
}   
async function hireUser(departmentId){
    const btnHire = document.querySelector('#btnHire')
    const userHire = document.querySelector('#usersHire')
    btnHire.addEventListener('click',async ()=>{
        await patchHireEmployee(userHire.value,departmentId)
        await renderOptionsUsers ()
        await contractedUsers(departmentId.department_id)
    })
}
async function dismissEmployee(){
const btnDismiss = document.querySelectorAll('.btnDismiss')
const modalConfirm = document.querySelector('#removeUser')
const modalText = document.querySelector('#removeUserText')
const btnRemove = document.querySelector('#btnRemoveUser')

btnDismiss.forEach(btn=>{

    btn.addEventListener('click', async (e)=>{
        modalConfirm.showModal()
        modalText.innerText = `Realmente deseja remover o usuário ${e.target.name}`
        const deparmentId = e.target.getAttribute('data-uid')
        btnRemove.value = e.target.value
        btnRemove.addEventListener('click',async(e)=>{
            modalConfirm.close()
            await patchDismissEmployee(e.target.value)
            await renderOptionsUsers()
            await contractedUsers(deparmentId)
            modalConfirm.close()
        })
    })
    const modalClose = document.querySelector('#closeModalConfirm')
    modalClose.addEventListener('click',()=>{
        modalConfirm.close()
    })
})


}
await renderOptionsUsers()
await  dismissEmployee()
