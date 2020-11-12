/* 
  @author Arlesson
  Sex, 06 Novembro 2020
*/

const jumpButton = document.getElementById("jumpButton");
const answerButton = document.getElementById("answerButton");
const tabuadaButton = document.getElementById("tabuadaButton");

const title = document.getElementById("title");
const resultScreen = document.getElementById("result");
const numberBox = document.getElementById("numberBox");

var value_01 = 0;
var value_02 = 0;
var interval;
var tabuadaStat = false;
var randomValue = 0;

//Adicionando Eventos
answerButton.addEventListener("click",answerQuestion);

tabuadaButton.addEventListener("click",() => {
  doTabuada(tabuadaStat);
});
numberBox.addEventListener("focus",() => {
  numberBox.placeholder = "";
  numberBox.style.borderColor = "#ddd";
});
jumpButton.addEventListener("click",() => {
  makeQuestion();
  removeTabuada();
});


//Funções
function randomNumber(min,max) {
  let random = Math.floor(Math.random() * (max - min) + min);
  return random;
}

function randomOperator() {
  randomValue = randomNumber(0,2);
  
  switch(randomValue) {
    case 0:
      return `${value_01} + ${value_02} =`; //+
      break;
    case 1:
      return `${value_01} x ${value_02} =`; //×
      break;
    default: return `[Error]`;
  }
}

function getAnswer() {
  if(Number(numberBox.value.length > 0)) {
    return Number(numberBox.value);
  } else {
    numberBox.style.borderColor = "#f00";
    numberBox.placeholder = "Não deixe a caixa vazia";
  }
}

function getRightAnswer() {
  switch(randomValue) {
    case 0:
      return (value_01 + value_02); //+
      break;
    case 1:
      return (value_01 * value_02); //x
      break;
    default: return `[Error]`;
  }
}

function makeQuestion() {
  clearTimeout(interval);
  removeTabuada();
  title.innerHTML = "Duvido você acertar!";
  numberBox.value = "";
  value_01 = randomNumber(1,10);
  value_02 = randomNumber(1,10);
  resultScreen.innerHTML = randomOperator();
}

function answerQuestion() {
  let rightAnswer = getRightAnswer();
  let yourAnswer = getAnswer();
  
  if(yourAnswer) {
    if(yourAnswer === rightAnswer) {
      setMessage(true);
    } else if(yourAnswer !== rightAnswer) {
      setMessage(false);
    }
  } else {
    title.innerHTML = "Não digitou nada! (?-?";
  }
}

function setMessage(value) {
  if(value) {
    title.innerHTML = "Você acertou! :)";
    interval = setTimeout(makeQuestion,1000);
  } else {
    title.innerHTML = "Você errou! :(";
  }
}

function doTabuada(stat) {
  if(!stat) {
    let tabuadaBox = document.getElementById("tabuadaBox");
    let list = document.getElementById("tabuadaList");
    tabuadaStat = true;
    tabuadaBox.style.display = "block";
    switch(randomValue) {
      case 0:
        for(let number = 1; number <= 10; number++) {
          let item = document.createElement("li");
          list.appendChild(item);
          item.innerHTML = `${value_01} + ${number} = ${value_01 + number}`;
        }
        break;
      case 1:
        for(let number = 1; number <= 10; number++) {
          let item = document.createElement("li");
          list.appendChild(item);
          item.innerHTML = `${value_01} x ${number} = ${value_01 * number}`;
        }
        break;
      default: alert("[Error]");
    }
  }
}

function removeTabuada() {
  let tabuadaBox = document.getElementById("tabuadaBox");
  let list = document.getElementById("tabuadaList");
  
  tabuadaStat = false;
  tabuadaBox.style.display = "none";
  list.innerHTML = "";
}