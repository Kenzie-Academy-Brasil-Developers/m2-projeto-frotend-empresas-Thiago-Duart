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
import { postLogin } from "../request routes without authorization/request.js";
function authentication() {
  const token = JSON.parse(localStorage.getItem("@token"));
  if (token) {
    location.replace("./userPage.html");
  }
}
authentication();
{
  const home = document.querySelector("#home");
  home.addEventListener("click", () => {
    location.replace("../../");
  });
  const cadastre = document.querySelectorAll(".cadastre");
  cadastre.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      location.replace("./cadastre.html");
    });
  });
}
function login() {
  const inputs = document.querySelectorAll("input");
  const btnLogin = document.querySelector("#login");
  const contentLogin = {};
  btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      contentLogin[input.name] = input.value;
    });
    const loginUser = await postLogin(contentLogin);
    toast("Email ou senha inválidos", "red");
    if (loginUser.isAdm) {
      location.replace("./adminPage.html");
    } else {
      location.replace("./userPage.html");
    }
  });
}
login();
