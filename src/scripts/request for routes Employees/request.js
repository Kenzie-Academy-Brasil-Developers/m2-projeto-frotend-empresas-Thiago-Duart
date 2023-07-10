const baseUrl = "http://localhost:3333";
// const token = {
// 	authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg1ODUxOTYsImV4cCI6MTcyMDEyMTE5Niwic3ViIjoiMTY4NDFhMWYtMzQzNi00NDY1LWFmODMtZGFhNTc4YWVkZDk4In0.aqYBw4IFYRqoW29He5ZCm21KSAUtTci9MWuNbsaFqpU",
// 	isAdm: true
// }
// Rota responsável para listar as informações do usuário logado
export async function getEmployeesProfile() {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartments = await axios.get(`${baseUrl}/employees/profile`,{
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


export async function getCompaniesReadById(companyId) {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartments = await axios.get(`${baseUrl}/companies/readById/${companyId}`,{
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token.authToken}`,
              },
    })
    .then((res) => {
    console.log('e aqui')
      const data = res.data;
      return data;
    });

  return getdepartments;
}
export async function getEmployeesCompaniesReadById(companyId) {
  const token = JSON.parse(localStorage.getItem('@token'))
const getdepartments = await axios.get(`${baseUrl}/companies/readById/${companyId}`,{
          headers: {
               "Content-Type": "application/json",
              Authorization: `Bearer ${token.authToken}`,
            },
  })
  .then((res) => {
    const data = res.data.employees;
    return data;
  });

return getdepartments;
}
export async function getDepartmentsCompaniesReadById(companyId) {
  const token = JSON.parse(localStorage.getItem('@token'))
const getdepartments = await axios.get(`${baseUrl}/companies/readById/${companyId}`,{
          headers: {
               "Content-Type": "application/json",
              Authorization: `Bearer ${token.authToken}`,
            },
  })
  .then((res) => {
    console.log('e aqui')
    const data = res.data.departments    ;
    return data;
  });

return getdepartments;
}
export async function getNameCompaniesReadById(companyId) {
  const token = JSON.parse(localStorage.getItem('@token'))
const getdepartments = await axios.get(`${baseUrl}/companies/readById/${companyId}`,{
          headers: {
               "Content-Type": "application/json",
              Authorization: `Bearer ${token.authToken}`,
            },
  })
  .then((res) => {
    const data = res.data.name;
    return data;
  })
 

return getdepartments;
}

// console.log(await getCompaniesReadById("eef95061-062a-4fa1-a28f-fd6f781ce520"))


export async function  getDepartmentsReadById(departmentId) {
    const token = JSON.parse(localStorage.getItem('@token'))
  const getdepartments = await axios.get(`${baseUrl}/departments/readById/${departmentId}`,{
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
// console.log(await  getDepartmentsReadById('7e299dc9-991f-40aa-b60a-0e8fd9a90af5'))
