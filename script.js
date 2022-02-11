const urlAll = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1118';
const urlSimple = 'https://pokeapi.co/api/v2/pokemon/';
const input = document.querySelector('#time-name');
const timeName = document.querySelector('#name-team');

const changeName = () => {
  timeName.innerText = input.value;
}

const api = async (nomePokemon) => {
  const response = await fetch(`${url}${nomePokemon}/`);
  const data = await response.json();
  /* return data; */
  console.log(data);
};

const allPokemons = async () => {
  const response = await fetch(urlAll);
  const data = await response.json();
  return data.results;
  /* console.log(data.results); */
};

const pokeNames = async () => {
  const fun = await allPokemons();
  return fun.map((names) => names.name);
  /* console.log(fun.map((names) => names.name)); */
};

const toUpper = async () => {
  const names = await pokeNames();
  console.log(names.forEach((name) => name[0].toUpperCase()))
}

toUpper();


const randomFunction = async () => {
  let counter = 0;
  while (counter < 6) {
    const id = Math.floor((Math.random() * 1098) + 1);
    const response = await fetch(`${url}${id}/`);
    const data = response.json();
    counter += 1;
  }
}

const menu = async () => {
  const popUp = document.createElement('div');
  const inputName = document.createElement('input');
  inputName.setAttribute('placeholder', 'Nome do pokemon:');
  popUp.appendChild(inputName);
  const listaInfo = document.createElement('ul');
  popUp.appendChild(listaInfo);
}

window.onload = () => {
  input.addEventListener('input', changeName);
};



/* Modal */

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let cards = document.querySelectorAll(".card-pokemon");
cards.forEach((card) => {
  card.onclick = function() {
    modal.style.display = "block";
  }
});

// Get the <span> element that closes the modal
let span = document.querySelector(".close");

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}