// import { clearScreenDown } from "readline"

// import exp from "constants"
import {
  deleteDeleteDepartments,
  getDepartmentsReadAll,
  patchDepartmentsUpdate,
} from "../request routes Admin Token/request.js";
import { renderDepartments } from "./adminPage.js";
import { deleteUser, editUser } from "./editAndDeleteUser.js";
import { openModalHireEmployee } from "./personnelDepartment.js";
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
export function editDepartment() {
  const modalEdit = document.querySelector("#modalEdit");
  const description = document.querySelector("#description");
  const btnEdit = document.querySelectorAll(".btnEditDepartment");
  const btnSave = document.querySelector("#btnSave");

  btnEdit.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      description.value = "";
      const departmentId = btn.getAttribute("data-uid");
      const descriptionValue = btn.getAttribute("data-description");
      const name = btn.getAttribute("data-name");
      modalEdit.showModal();
      description.value = descriptionValue;
      btnSave.addEventListener("click", async (e) => {
        e.preventDefault();
        const departamentContent = {
          description: description.value,
          name: name,
        };
        await patchDepartmentsUpdate(departmentId, departamentContent);
        toast("Departamento editado com sucesso", "green");
        modalEdit.close();
        location.reload()
        editDepartment();
        modalDeleteDepartments();
        openModalHireEmployee();
        deleteUser();
        editUser();
      });
    });
  });
  const btnClose = document.querySelector("#closeEdit");
  btnClose.addEventListener("click", () => {
    modalEdit.close();
    description.innerHTML = "";
  });
}
export async function modalDeleteDepartments() {
  const modal = document.querySelector("#modalDeleteDepartment");
  const modalDeleteText = document.querySelector("#deleteText");
  const btnDelete = document.querySelectorAll(".btnDeleteDepartment");
  const btnConfirm = document.querySelector("#confirmDeleteDepartment");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.showModal();
      const departmentName = btn.getAttribute("data-name");
      const departmentId = btn.getAttribute("data-uid");
      console.log(departmentId);
      modalDeleteText.innerHTML = `Realmente deseja remover o departamento ${departmentName} e demitir seus funcionários?`;

      btnConfirm.addEventListener("click", async () => {
        await deleteDeleteDepartments(departmentId);
        toast("Departamento deletado com sucesso", "red");
        modal.close();
        await renderDepartments(await getDepartmentsReadAll());
        modalDeleteDepartments();
        editDepartment();
        openModalHireEmployee();
        deleteUser();
        editUser();
      });
    });
  });
  const btnClose = document.querySelector("#deleteClose");
  btnClose.addEventListener("click", () => {
    modal.close();
  });
}
