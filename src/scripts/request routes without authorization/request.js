
const baseUrl = "http://localhost:3333";

export async function getCategoriesReadAll() {
  const getCategories = await axios
    .get(`${baseUrl}/categories/readAll`)
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getCategories;
}

export async function getCompaniesReadAll() {
  const getCompanies = await axios
    .get(`${baseUrl}/companies/readAll`)
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getCompanies;
}

export async function getCompaniesReadByCategory(categoryName) {
  const getcompaniesName = await axios
    .get(`${baseUrl}/companies/readByCategory/${categoryName}`)
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getcompaniesName;
}

// colocar toasts depois
export async function postEmployeesCreate(accountCreateData) {
  const postEmployees = await axios.post(`${baseUrl}/employees/create`, accountCreateData)
    .then((response) => {
      const data = response.data;
      //  location.replace('../../')
       return data;
    })
    .catch((error) => console.log(error.response.data.message));

  return postEmployees;
}

export async function postLogin(accountLoginData) {
  const postLogin = await axios
    .post(`${baseUrl}/auth/login`, accountLoginData)
    .then((response) => {
      const data = response.data;
      const dataLocal = JSON.stringify(data)
      localStorage.setItem('@token',dataLocal)
      //  location.replace('../../')
      return data;
    })
    .catch((error) => console.log(error.response.data.message));

  return postLogin;
}
