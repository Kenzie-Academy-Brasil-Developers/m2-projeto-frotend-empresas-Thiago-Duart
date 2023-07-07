import { getDepartmentsReadById, getEmployeesProfile } from "../request for routes Employees/request.js"

function authentication(){
    const token = JSON.parse(localStorage.getItem('@token'))
    if(!token){
        location.replace('../../')
    }
}
authentication()

async function companyDepartmentAndEmployees(){
    const profileEmployee = await getEmployeesProfile()
    profileName(profileEmployee)
    if(profileEmployee.company_id){
        const departament = await getDepartmentsReadById(profileEmployee.department_id)
        const arrayEmployees = departament.employees
        nameCompanyAndDepartment(departament)
        employees(arrayEmployees)
    }else{
        notHired()
    }
}
function profileName({name,email}){
    const userName = document.querySelector('#userName')
    const userEmail = document.querySelector('#userEmail')
    userName.innerText = name
    userEmail.innerText = email
}
function nameCompanyAndDepartment(content){
    const company = document.querySelector('#nameCompany')
    company.innerText = `${content.company.name} - ${content.name}`
}
function employees(content){
    const contractEmployees = content
    const employeeContainer = document.querySelector('.main__container')
    contractEmployees.forEach(employee => {
        const containerInfo = document.createElement('div')
        containerInfo.classList.add('main__content')
        const nameUser = document.createElement('p')
        nameUser.innerText = employee.name
        containerInfo.append(nameUser)
        employeeContainer.append(containerInfo)
    });
    
}
function notHired(){
    const contractEmployees = document.querySelector('#contract')
    const notHired = document.querySelector('#notHired')
        contractEmployees.classList.add('displayUser')
        notHired.classList.remove('displayUser')
}
await companyDepartmentAndEmployees()
