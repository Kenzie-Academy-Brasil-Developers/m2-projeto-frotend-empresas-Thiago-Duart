import { postEmployeesCreate } from "../request routes without authorization/request.js";
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

const home = document.querySelector("#home");
home.addEventListener("click", () => {
  location.replace("../../");
});
const returnHome = document.querySelector("#returnHome");
returnHome.addEventListener("click", (e) => {
  e.preventDefault();
  location.replace("../../");
});
const login = document.querySelector("#login");
login.addEventListener("click", () => {
  location.replace("./login.html");
});

function createAccount() {
  const inputs = document.querySelectorAll("input");
  const btnConfirmCadastre = document.querySelector("#btnConfirmCadastre");
  const accountContent = {};
  let count = 0;
  btnConfirmCadastre.addEventListener("click", async (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      } else {
        accountContent[input.name] = input.value;
      }
    });
    if (count !== 0) {
      toast("Preencha todos os campos", "red");
      count = 0;
    } else {
      toast("Cadastrado com sucesso", "green");
      setTimeout(async () => {
        await postEmployeesCreate(accountContent);
        location.replace("./login.html");
      }, 2000);
    }
  });
}
createAccount();
