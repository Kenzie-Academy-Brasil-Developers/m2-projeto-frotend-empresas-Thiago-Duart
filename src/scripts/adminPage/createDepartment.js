// import { Socket } from "dgram";
import {
  createDepartment,
  getDepartmentsReadAll,
} from "../request routes Admin Token/request.js";
import { getCompaniesReadAll } from "../request routes without authorization/request.js";
import { renderDepartments } from "./adminPage.js";
function toast(message, color) {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: `${color}`,
    },
  }).showToast();
}
function authentication() {
  const token = JSON.parse(localStorage.getItem("@token"));
  if (!token) {
    location.replace("../../");
  }
}
authentication();
async function companyOptions() {
  const companies = await getCompaniesReadAll();
  const selectCompany = document.querySelector("#companyCreateDepartment");
  companies.forEach((company) => {
    const options = document.createElement("option");
    options.innerHTML = company.name;
    options.setAttribute("data-uid", company.id);
    selectCompany.append(options);
  });
}
await companyOptions();

function createDepartmentModal() {
  const modal = document.querySelector("#createDepartment");
  const btnShow = document.querySelector("#btnCreateDepartment");
  btnShow.addEventListener("click", () => {
    modal.showModal();
  });

  const name = document.querySelector("#nameDepartment");
  const description = document.querySelector("#descriptionDepartment");
  const selectCompany = document.querySelector("#companyCreateDepartment");
  let departmentContent = {};
  const btnCreate = document.querySelector("#btnCreate");
  btnCreate.addEventListener("click", async (e) => {
    e.preventDefault();

    const companyId =
      selectCompany.options[selectCompany.selectedIndex].getAttribute(
        "data-uid"
      );
    if (name.value !== "" && description.value !== "" && companyId) {
      departmentContent = {
        name: name.value,
        description: description.value,
        company_id: companyId,
      };
      createDepartment(departmentContent);
      toast("Departamento criado com sucesso", "green");
      modal.close();
      await renderDepartments(await getDepartmentsReadAll());
    } else {
      toast("Preencha todos os campos", "red");
    }
    await renderDepartments(await getDepartmentsReadAll());
  });
  const closeModals = document.querySelectorAll(".closeModal");
  closeModals.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.close();
      name.value = "";
      description.value = "";
    });
  });
}
createDepartmentModal();
