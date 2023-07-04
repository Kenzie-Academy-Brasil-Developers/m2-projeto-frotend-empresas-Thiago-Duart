const baseUrl = "http://localhost:3333";

async function getCategoriesReadAll() {
  const getCategories = await axios
    .get(`${baseUrl}/categories/readAll`)
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getCategories;
}

async function companiesReadAll() {
  const getCompanies = await axios
    .get(`${baseUrl}/companies/readAll`)
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getCompanies;
}

async function getCompaniesReadByCategory(categoryName) {
  const getcompaniesName = await axios
    .get(`${baseUrl}/companies/readByCategory/${categoryName}`)
    .then((res) => {
      const data = res.data;
      return data;
    });

  return getcompaniesName;
}

async function postEmployeesCreate(accountCreateData) {
  const postEmployees = await axios
    .post(`${baseUrl}/employees/create`, accountCreateData)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => error.response.data.message);

  return postEmployees;
}

async function postLogin(accountLoginData) {
  const postLogin = await axios
    .post(`${baseUrl}/auth/login`, accountLoginData)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => error.response.data.message);

  return postLogin;
}
