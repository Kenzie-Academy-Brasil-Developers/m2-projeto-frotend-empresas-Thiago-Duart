import {
  getCompaniesReadById,
  getDepartmentsCompaniesReadById,
  getEmployeesCompaniesReadById,
  getNameCompaniesReadById,
} from "../request for routes Employees/request.js";
import {
  getDepartmentsReadAll,
  getDepartmentsReadByCompany,
  getEmployeesReadAll,
} from "../request routes Admin Token/request.js";
import {
  getCompaniesReadAll,
  getCompaniesReadByCategory,
} from "../request routes without authorization/request.js";
import { deleteUser, editUser } from "./editAndDeleteUser.js";
import {
  modalDeleteDepartments,
  editDepartment,
} from "./editAndRemoveDepartment.js";
import { openModalHireEmployee } from "./personnelDepartment.js";

function authentication() {
  const token = JSON.parse(localStorage.getItem("@token"));
  if (!token) {
    location.replace("../../");
  }
}
authentication();
function logout() {
  const btnLogout = document.querySelector("#logout");
  const textLogout = document.querySelector(".logout__container");
  btnLogout.addEventListener("click", () => {
    if (textLogout.classList.contains("displayUser")) {
      textLogout.classList.remove("displayUser");
      setTimeout(() => {
        textLogout.classList.add("displayUser");
      }, 4000);
    } else {
      textLogout.classList.add("displayUser");
    }
  });
  textLogout.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}
logout();
async function renderOptionsCompany() {
  const companies = await getCompaniesReadAll();
  const selectCompany = document.querySelector("#selectCompany");
  companies.forEach((company) => {
    const options = document.createElement("option");
    options.innerHTML = company.name;
    options.setAttribute("data-uid", company.id);
    selectCompany.append(options);
  });
}
async function selectSector() {
  const selectCompany = document.querySelector("#selectCompany");
  selectCompany.addEventListener("change", async (e) => {
    const companyId =
      selectCompany.options[selectCompany.selectedIndex].getAttribute(
        "data-uid"
      );

    if (companyId === "all") {
      await userRegistered(await getEmployeesReadAll());
      await renderDepartments(await getDepartmentsReadAll());
    } else {
      await renderDepartments(
        await getDepartmentsCompaniesReadById(companyId),
        e.target.value
      );
      const employees = await getEmployeesCompaniesReadById(companyId);

      await userRegistered(employees, e.target.value);
    }
  });
}
export async function renderDepartments(content, nome) {
  const departments = content;
  const departamentContainer = document.querySelector("#department");
  departamentContainer.innerHTML = ""
  if (departments.length === 0) {
    departamentContainer.insertAdjacentHTML(
      "beforeend",
      `
        <h2>Empresa ${nome} não possui departamento</h2>
        `
    );
  } else {
    const screenDepartment = await Promise.all(
      departments.map(async (department) => {
        const container = document.createElement("div");
        container.classList.add("departments__content");

        const innerDiv1 = document.createElement("div");
        innerDiv1.innerHTML = `
            <h2>${department.name}</h2>
            <p>${department.description}</p>
            <p>${await getNameCompaniesReadById(department.company_id)}</p>
            `;
        const innerDiv2 = document.createElement("div");
        innerDiv2.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye blue departmentHire" viewBox="0 0 16 16" data-uid="${
              department.id
            }" value="${await getNameCompaniesReadById(department.company_id)}">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil yellow btnEditDepartment" data-name="${
              department.name
            }" data-description="${department.description}" data-uid="${
          department.id
        }" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash red btnDeleteDepartment" viewBox="0 0 16 16" data-uid="${
              department.id
            }" data-name="${department.name}">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
            `;

        container.appendChild(innerDiv1);
        container.appendChild(innerDiv2);
        departamentContainer.appendChild(container);
      })
    );
    return screenDepartment;
  }
}

async function createDepartment() {
  const btnCreate = document.querySelector("#btnCreateDepartment");
  btnCreate.addEventListener("click", () => {});
}

export async function userRegistered(content, nome) {
  const userContainer = document.querySelector("#userRegistered");
  userContainer.innerHTML = "";
  const users = content;
  if (users.length === 0) {
    userContainer.insertAdjacentHTML(
      "beforeend",
      `
        <h2>Empresa ${nome} não possui funcionarios</h2>
        `
    );
  } else {
    let companyName;
    const usersEdit = await Promise.all(
      users.map(async (user) => {
        if (user.company_id) {
          const company = await getNameCompaniesReadById(user.company_id);
          companyName = await getNameCompaniesReadById(user.company_id);
        } else {
          companyName = "não possui empresa";
        }
        const container = document.createElement("div");
        container.classList.add("departments__content");

        const innerDiv1 = document.createElement("div");
        innerDiv1.innerHTML = `
        <h2>${user.name}</h2>
        <p>${companyName}</p>
        `;
        const innerDiv2 = document.createElement("div");
        innerDiv2.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" data-uid="${user.id}" width="16" height="16" fill="currentColor" class="bi bi-pencil yellow btnEditUser" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" data-name="${user.name}" data-uid="${user.id}"  width="16" height="16" fill="currentColor" class="bi bi-trash red btnDeleteUser"  viewBox="0 0 16 16" >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg>
        `;

        container.appendChild(innerDiv1);
        container.appendChild(innerDiv2);
        userContainer.appendChild(container);
      })
    );
    return usersEdit;
  }
}
await userRegistered(await getEmployeesReadAll());
await createDepartment();
await renderOptionsCompany();
await renderDepartments(await getDepartmentsReadAll());
await selectSector();
await openModalHireEmployee();
editDepartment();
modalDeleteDepartments();
editUser();
deleteUser();
