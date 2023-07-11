import {
  deleteDeleteUser,
  getEmployeesReadAll,
  patchUpdateEmployee,
} from "../request routes Admin Token/request.js";
import { userRegistered } from "./adminPage.js";

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
export function editUser() {
  const modal = document.querySelector("#editUser");
  const btnCloseEdit = document.querySelector("#btnCloseEdit");
  const inputsUser = document.querySelectorAll(".inputUserEdit");
  const btnSave = document.querySelector("#btnSaveEditUser");
  const userContent = {};
  const btnEditUser = document.querySelectorAll(".btnEditUser");
  btnEditUser.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idUser = btn.getAttribute("data-uid");
      modal.showModal();
      btnSave.addEventListener("click", async (e) => {
        e.preventDefault();
        inputsUser.forEach((input) => {
          userContent[input.name] = input.value;
        });
        await patchUpdateEmployee(idUser, userContent);
        modal.close();
        await userRegistered(await getEmployeesReadAll());
        deleteUser();
        toast("Usuario editado com sucesso", "green");
      });
    });
  });
  btnCloseEdit.addEventListener("click", () => {
    modal.close();
    inputsUser.forEach((input) => {
      input.value = "";
    });
  });
}
export function deleteUser() {
  const modal = document.querySelector("#removeUser");
  const modalText = document.querySelector("#removeUserText");
  const btnCloseRemove = document.querySelector("#closeModalConfirm");
  const btnConfirm = document.querySelector("#btnRemoveUser");
  const btnDelete = document.querySelectorAll(".btnDeleteUser");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idUser = btn.getAttribute("data-uid");
      const name = btn.getAttribute("data-name");
      console.log(name);
      modalText.innerHTML = `Realmente deseja remover o usuário ${name}`;
      modal.showModal();
      btnConfirm.addEventListener("click", async (e) => {
        await deleteDeleteUser(idUser);
        modal.close();
        await userRegistered(await getEmployeesReadAll());
        editUser();
        toast("Usuario deletado com sucesso", "red");
      });
    });
  });
  btnCloseRemove.addEventListener("click", () => {
    modal.close();
  });
}
