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


// contagem regressiva 
const dia = document.getElementById('dia');
const hora = document.getElementById('hora');
const minuto = document.getElementById('minuto');
const segundo = document.getElementById('segundo');

function countDown() {
  /* convertendo a variavel lancamento e uma data */
  const dataLanc = new Date("05/01/2025");
  /* pegando a data de hoje */
  const hoje = new Date();
  
  /* transforma o resultado da data prevista menos a data de hoje em segundos */
  const segTotal = (dataLanc - hoje) / 1000;


  /* funções que transformam os segundos em (dias, horas, minutos e segundos) */
  const finalDias = Math.floor(segTotal / 60 / 60 / 24);
  const finalHoras = Math.floor(segTotal / 60 / 60) % 24;
  const finalMinutos = Math.floor(segTotal / 60) % 60;
  const finalSegundos = Math.floor(segTotal) % 60;

  /* para aparecer a contagem no html */
  dia.innerHTML = finalDias
  hora.innerHTML = formatoTempo(finalHoras)
  minuto.innerHTML = formatoTempo(finalMinutos)
  segundo.innerHTML = formatoTempo(finalSegundos)
}

/* função para adicionar o "0" quando o numero for menor que 10 */
function formatoTempo(tempo) {
  return tempo < 10 ? `0${tempo}` : tempo;
}

/* chamando a função */


/* fazendo a contagem sair no html */
setInterval(countDown, 1000);


// audio/ musica no site 
document.addEventListener("DOMContentLoaded", () => {
  getMessage();

  const audio = document.getElementById("musica");
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");

  audio.play();

  playButton.addEventListener("click", () => {
      audio.play();
      // playButton.style.display = "none"; // Esconde o botão após clicar
  });

  pauseButton.addEventListener("click", () => {
      audio.pause();
      // playButton.style.display = "none"; // Esconde o botão após clicar
  });
});
