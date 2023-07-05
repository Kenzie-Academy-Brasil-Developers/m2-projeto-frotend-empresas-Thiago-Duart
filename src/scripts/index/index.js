import { getCategoriesReadAll, getCompaniesReadAll, getCompaniesReadByCategory } from "../request routes without authorization/request.js";

// select.options[select.selectedIndex].getAttribute('data-uid');
async function renderCategories(){
    const categories = await getCategoriesReadAll() 
    const selectOptions = document.querySelector('select')
    categories.forEach(category => {
        const options = document.createElement('option')
        options.innerHTML = category.name
        options.setAttribute('data-uid',category.id)
        selectOptions.append(options)
    });
}

async function renderCompanies(companies){
    const ul = document.querySelector('ul')
    ul.innerHTML = ""
    companies.forEach(company=>{
        const containerCompany = document.createElement('li')
        const nameCompany = document.createElement('p')
        const buttonSetor = document.createElement('button')
        buttonSetor.classList.add('btn__chip')
        buttonSetor.innerHTML = 'Setor'
        nameCompany.innerText = company.name
        containerCompany.append(nameCompany,buttonSetor)
        ul.append(containerCompany)
    })
}

async function companiesFilter(){
const select = document.querySelector('select')
select.addEventListener('change',async (e)=>{
    const companyNameSector =  e.target.value
    if(companyNameSector !== "all"){
        renderCompanies(await getCompaniesReadByCategory(companyNameSector))
    }else{
        renderCompanies(await getCompaniesReadAll())   
    }
})
}

function redirectsLoginOrCadastre(){
    const bntLogin = document.querySelector('#btnLogin')
    const bntCadastre = document.querySelector('#btnCadastre')
    bntLogin.addEventListener('click',()=>{
        location.replace('./src/pages/login.html')
    })
    bntCadastre.addEventListener('click',()=>{
        location.replace('./src/pages/cadastre.html')
    })

}
redirectsLoginOrCadastre()
await renderCompanies(await getCompaniesReadAll())
await companiesFilter()
await renderCategories()