export // const { get } = require("request");

// lembrar de troca os tokens 
const tokenAdm = {
	authToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg2NzY0NzksImV4cCI6MTcyMDIxMjQ3OSwic3ViIjoiMTY4NDFhMWYtMzQzNi00NDY1LWFmODMtZGFhNTc4YWVkZDk4In0.DxkKb4pmvh0B89HAKkKdFOI4G1imdRv9pR842ga9deM",
	isAdm: true
}

const baseUrl = "http://localhost:3333";

//Rota responsável por listar todos os funcionários cadastrados
export async function getEmployeesReadAll() {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getEmployees = await axios.get(`${baseUrl}/employees/readAll`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getEmployees;
}

// console.log('funcionarios',await getEmployeesReadAll())
// Rota responsável por listar todos os funcionários que ainda não foram contratados para nenhum departamento
export async function getEmployeesOutOfWork() {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getOutOfWork = await axios.get(`${baseUrl}/employees/outOfWork`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getOutOfWork;
}

// Rota responsável por listar todos os departamentos cadastrados
export async function getDepartmentsReadAll() {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartments = await axios.get(`${baseUrl}/departments/readAll`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getdepartments;
}

// Rota responsável por listar todos os departamentos de uma empresa, o ID da empresa deve ser informado na URL da requisição
export async function getDepartmentsReadByCompany(companyId) {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartmentsById = await axios.get(`${baseUrl}/departments/readByCompany/${companyId}`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token.authToken}`,
              },
    })
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getdepartmentsById;
}
// console.log('departamentos que contratam',await getDepartmentsReadAll('eef95061-062a-4fa1-a28f-fd6f781ce520'))
// const teste = {
//   headers: {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token.authToken}`,
// },}

// Rota responsável por atualizar as informações de um funcionário
export async function patchUpdateEmployee(employeeId,employeeContent) {
  const teste = {
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.authToken}`,
  },}
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartmentsById = await axios.patch(`${baseUrl}/employees/updateEmployee/${employeeId}`,employeeContent,teste)
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
// console.log(await patchUpdateEmployee('d98d8568-619e-46d4-8915-a45c3edbe55f',employee))

export async function patchHireEmployee(employeeId,departmentId) {
    const teste = {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdm.authToken}`,
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
await patchHireEmployee("183661d3-02c9-4fb0-86ef-97cf58f2e392",departament)

// Rota responsável por demitir um funcionário de um departamento
export async function patchDismissEmployee(employeeId) {
 const tokenTeste = { headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token.authToken}`,
},}
  // const token = JSON.parse(localStorage.getItem('@token'))
  const getHireEmployee = await axios.patch(`${baseUrl}/employees/dismissEmployee/${employeeId}`,{},tokenTeste)
.then((res) => {
  const response = res.data
  return response
  });

return getHireEmployee;
}
// console.log(await patchDismissEmployee("3679c646-3689-4e67-ba9e-4e635b6b9908"))

// Rota responsável por atualizar a descrição de um departamento
export async function patchDepartmentsUpdate(departmentId,departamentUpdate) {
  const tokenTeste = { headers: {
   "Content-Type": "application/json",
   Authorization: `Bearer ${token.authToken}`,
 },}
   // const token = JSON.parse(localStorage.getItem('@token'))
   const getHireEmployee = await axios.patch(`${baseUrl}/departments/update/${departmentId}`,departamentUpdate,tokenTeste)
 .then((res) => {
   const response = res.data
   return response
   });
 
 return getHireEmployee;
 }
// Rota responsável por deletar um departamento
 export async function deleteDepartments(departmentId) {
  const tokenTeste = { headers: {
   "Content-Type": "application/json",
   Authorization: `Bearer ${token.authToken}`,
 },}
   // const token = JSON.parse(localStorage.getItem('@token'))
   const getHireEmployee = await axios.patch(`${baseUrl}/departments/delete/${departmentId}`,{},tokenTeste)
 .then((res) => {
   const response = res.data
   return response
   });
 
 return getHireEmployee;
 }
