let dataHoje = document.getElementById("dataHoje");

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const weekends = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabádo",
];

const d = new Date();
let month = months[d.getMonth()];
let day = weekends[d.getDay()];

dataHoje.innerText = `${day}, ${d.getDate()} de ${month} de ${d.getFullYear()}`;

// API
async function getMessage() {
  const response = await fetch("https://api.adviceslip.com/advice");
  const result = await response.json();
  const message = result["slip"];
  renderMessage(message);
  // console.log(message);
}
setInterval(getMessage, 3600000);

let texto = document.getElementById("card-text");
let p = document.createElement("p");

async function renderMessage(message) {
  p.innerText = message.advice;
  texto.appendChild(p);
  // console.log(message);
}

/*

let buttonMessage = document.getElementById("button");
buttonMessage.addEventListener("click", (event) => {
  event.preventDefault();
  getMessage();
  console.log("ola")
});
*/
document.addEventListener("DOMContentLoaded", () => {
  getMessage();
});
