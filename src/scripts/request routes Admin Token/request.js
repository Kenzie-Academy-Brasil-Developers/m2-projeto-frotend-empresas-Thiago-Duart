// const { get } = require("request");

// lembrar de troca os tokens 
const userAdmin = {
	authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg1ODUxOTYsImV4cCI6MTcyMDEyMTE5Niwic3ViIjoiMTY4NDFhMWYtMzQzNi00NDY1LWFmODMtZGFhNTc4YWVkZDk4In0.aqYBw4IFYRqoW29He5ZCm21KSAUtTci9MWuNbsaFqpU",
	isAdm: true
}

const baseUrl = "http://localhost:3333";

//Rota responsável por listar todos os funcionários cadastrados
async function getEmployeesReadAll() {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getEmployees = await axios.get(`${baseUrl}/employees/readAll`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${userAdmin.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getEmployees;
}

console.log('funcionarios',await getEmployeesReadAll())
// Rota responsável por listar todos os funcionários que ainda não foram contratados para nenhum departamento
async function getEmployeesOutOfWork() {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getOutOfWork = await axios.get(`${baseUrl}/employees/outOfWork`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${userAdmin.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getOutOfWork;
}

// Rota responsável por listar todos os departamentos cadastrados
async function getDepartmentsReadAll() {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartments = await axios.get(`${baseUrl}/departments/readAll`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${userAdmin.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getdepartments;
}

// Rota responsável por listar todos os departamentos de uma empresa, o ID da empresa deve ser informado na URL da requisição
async function getDepartmentsReadByCompany(companyId) {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartmentsById = await axios.get(`${baseUrl}/departments/readByCompany/${companyId}`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${userAdmin.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getdepartmentsById;
}
console.log('departamentos que contratam',await getDepartmentsReadAll('eef95061-062a-4fa1-a28f-fd6f781ce520'))

// Rota responsável por atualizar as informações de um funcionário
async function getUpdateEmployee(employeeId,employeeContent) {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartmentsById = await axios.patch(`${baseUrl}/employees/updateEmployee${employeeId}`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${userAdmin.authToken}`,
              },
              body: JSON.stringify(employeeContent)
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getdepartmentsById;
}
const employee = {
    name: "troquei",
    email: "onome@mail.com"
}


async function getHireEmployee(employeeId,departmentId) {
    const teste = {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAdmin.authToken}`,
    },
} 
    const departament = JSON.stringify(departmentId)
    const token = JSON.parse(localStorage.getItem('@token'))
  const getHireEmployee = await axios.patch(`${baseUrl}/employees/hireEmployee/${employeeId}`,departament,teste)
.then((res) => {
    const response = res.data
    return response
    });

  return getHireEmployee;
}

const departament = {
    department_id: "7e299dc9-991f-40aa-b60a-0e8fd9a90af5"
}
console.log(await getHireEmployee("e572a997-87d3-42b5-9f42-4381b622c8ef",departament))