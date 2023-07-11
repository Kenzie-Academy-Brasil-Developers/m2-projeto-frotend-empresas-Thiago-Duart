const baseUrl = "http://localhost:3333";

//Rota responsável por listar todos os funcionários cadastrados
export async function getEmployeesReadAll() {
  const token = JSON.parse(localStorage.getItem("@token"));
  const getEmployees = await axios
    .get(`${baseUrl}/employees/readAll`, {
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

// Rota responsável por listar todos os funcionários que ainda não foram contratados para nenhum departamento
export async function getEmployeesOutOfWork() {
  const token = JSON.parse(localStorage.getItem("@token"));
  const getOutOfWork = await axios
    .get(`${baseUrl}/employees/outOfWork`, {
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
  const token = JSON.parse(localStorage.getItem("@token"));
  const getdepartments = await axios
    .get(`${baseUrl}/departments/readAll`, {
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
  const token = JSON.parse(localStorage.getItem("@token"));
  const getdepartmentsById = await axios
    .get(`${baseUrl}/departments/readByCompany/${companyId}`, {
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

// Rota responsável por atualizar as informações de um funcionário
export async function patchUpdateEmployee(employeeId, employeeContent) {
  const token = JSON.parse(localStorage.getItem("@token"));
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.authToken}`,
    },
  };
  const requestPatch = await axios
    .patch(
      `${baseUrl}/employees/updateEmployee/${employeeId}`,
      employeeContent,
      configHeader
    )
    .then((res) => {
      const data = res.data;
      return data;
    });
  return requestPatch;
}
// console.log(await patchUpdateEmployee('d98d8568-619e-46d4-8915-a45c3edbe55f',employee))

export async function patchHireEmployee(employeeId, departmentId) {
  const token = JSON.parse(localStorage.getItem("@token"));
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.authToken}`,
    },
  };
  const departament = JSON.stringify(departmentId);
  const requestPatch = await axios
    .patch(
      `${baseUrl}/employees/hireEmployee/${employeeId}`,
      departament,
      configHeader
    )
    .then((res) => {
      const response = res.data;
      return response;
    });

  return requestPatch;
}

// Rota responsável por demitir um funcionário de um departamento
export async function patchDismissEmployee(employeeId) {
  const token = JSON.parse(localStorage.getItem("@token"));
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.authToken}`,
    },
  };

  // const token = JSON.parse(localStorage.getItem('@token'))
  const requestPatch = await axios
    .patch(
      `${baseUrl}/employees/dismissEmployee/${employeeId}`,
      {},
      configHeader
    )
    .then((res) => {
      const response = res.data;
      return response;
    });

  return requestPatch;
}

// Rota responsável por atualizar a descrição de um departamento
export async function patchDepartmentsUpdate(departmentId, departamentUpdate) {
  const token = JSON.parse(localStorage.getItem("@token"));
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.authToken}`,
    },
  };

  const requestPatch = await axios
    .patch(
      `${baseUrl}/departments/update/${departmentId}`,
      departamentUpdate,
      configHeader
    )
    .then((res) => {
      const response = res.data;
      return response;
    });

  return requestPatch;
}

// Rota responsável por deletar um departamento
export async function deleteDeleteDepartments(departmentId) {
  const token = JSON.parse(localStorage.getItem("@token"));
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.authToken}`,
    },
  };
  const requestDelete = await axios
    .delete(`${baseUrl}/departments/delete/${departmentId}`, configHeader)
    .then((res) => {
      const response = res.data;
      return response;
    });

  return requestDelete;
}

//  Rota responsável por deletar um departamento
export async function deleteDeleteUser(userId) {
  const token = JSON.parse(localStorage.getItem("@token"));
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.authToken}`,
    },
  };
  const requestDelete = await axios
    .delete(`${baseUrl}/employees/deleteEmployee/${userId}`, configHeader)
    .then((res) => {
      const response = res.data;
      return response;
    });

  return requestDelete;
}

//Rota responsável por cadastrar um novo departamento
export async function createDepartment(obj) {
  const token = JSON.parse(localStorage.getItem("@token"));
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.authToken}`,
    },
  };
  const requestCreateDepartment = await axios
    .post(`${baseUrl}/departments/create`, obj, configHeader)
    .then((res) => {
      const response = res.data;
      return response;
    });

  return requestCreateDepartment;
}
