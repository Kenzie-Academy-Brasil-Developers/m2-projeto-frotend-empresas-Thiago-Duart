// import { clearScreenDown } from "readline"

// import exp from "constants"
import { deleteDeleteDepartments, getDepartmentsReadAll, patchDepartmentsUpdate } from "../request routes Admin Token/request.js"
import { renderDepartments } from "./adminPage.js"

export function editDepartment (){
 const modalEdit = document.querySelector('#modalEdit')
 const description = document.querySelector('#description')
 const btnEdit = document.querySelectorAll('.btnEditDepartment')
 const btnSave = document.querySelector('#btnSave')

 btnEdit.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
        description.value = ""  
        const departmentId = btn.getAttribute('data-uid')
        const descriptionValue = btn.getAttribute('data-description')
        const name = btn.getAttribute('data-name')
        modalEdit.showModal()
        description.value = descriptionValue
        btnSave.addEventListener('click',async(e)=>{
            e.preventDefault()
            const departamentContent = {
                description: description.value,
                name: name
            }
            await patchDepartmentsUpdate(departmentId,departamentContent)
            modalEdit.close()
            await renderDepartments(await getDepartmentsReadAll())
            editDepartment ()
        })
    })
 })
 const btnClose = document.querySelector('#closeEdit')
 btnClose.addEventListener('click',()=>{
    modalEdit.close()
    description.innerHTML = ""            
 })
}
export async function modalDeleteDepartments(){
    const modal = document.querySelector('#modalDeleteDepartment')
    const modalDeleteText = document.querySelector('#deleteText')
    const btnDelete = document.querySelectorAll('.btnDeleteDepartment')
    const btnConfirm = document.querySelector('#confirmDeleteDepartment')
    btnDelete.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            modal.showModal()
            const departmentName = btn.getAttribute('data-name')
            const departmentId = btn.getAttribute('data-uid')
            console.log(departmentId)
            modalDeleteText.innerHTML = `Realmente deseja remover o departamento ${departmentName} e demitir seus funcionários?`

            btnConfirm.addEventListener('click',async()=>{
                await deleteDeleteDepartments(departmentId)
                modal.close()
                await renderDepartments(await getDepartmentsReadAll())
                modalDeleteDepartments()
            })
        })
    })
    const btnClose = document.querySelector('#deleteClose')
    btnClose.addEventListener('click',()=>{
       modal.close()        
    })
    
}