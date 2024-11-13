let dataHoje = document.getElementById("dataHoje");
let frase = document.getElementById("frase");
let cardfrase = document.getElementById("card-frase");

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

if(day == "Quinta") {
  frase.classList = "bg-primary rounded-bottom"
  dataHoje.classList = "text-light"
  cardfrase.classList = "card text-center border-primary"
} else if (day == "Quarta") {
  // frase.className = "bg-danger rounded-bottom"
  dataHoje.classList = "text-light"
  // cardfrase.classList = "card text-center border-danger"
  frase.setAttribute("class", 'bg-pinkBg')
  cardfrase.setAttribute("class", 'bg-pink')
}

// API
async function getMessage() {
  const response = await fetch("https://api.adviceslip.com/advice");
  const result = await response.json();
  const message = result["slip"];
  // renderMessage(message);
  getTradutor(message.advice);
  // console.log(message);
}

setInterval(getMessage, 3600000);

async function getTradutor(message) {
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${message}&langpair=en|pt-br`
  );
  const data = await res.json();
  const result = await data["responseData"]["translatedText"];
  // console.log(result)
  renderMessage(result);
}

getTradutor();

let texto = document.getElementById("card-text");
let p = document.createElement("p");

async function renderMessage(message) {
  if (message == "indefinido") {
    p.innerText = "carregando...";
  } else {
    p.innerText = message;
  }
  texto.appendChild(p);
  console.log(message);
}

// let buttonMessage = document.getElementById("button");
// buttonMessage.addEventListener("click", (event) => {
//   event.preventDefault();
//   getMessage();
//   console.log("ola")
// });

document.addEventListener("DOMContentLoaded", () => {
  getMessage();
});
