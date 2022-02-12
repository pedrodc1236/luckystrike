const urlAll = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898';
const urlSimple = 'https://pokeapi.co/api/v2/pokemon/';
const input = document.querySelector('#time-name');
const timeName = document.querySelector('#name-team');
const cards = document.querySelectorAll('.card-pokemon');
const randomBtn = document.querySelector('#btn-random');

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
  const names = fun.map((names) => names.name);
  return names;
  /* console.log(fun.map((names) => names.name)); */
};

const toUpper = async () => {
  const names = await pokeNames();
  const capitalizedNames = names.map(([first, ...name]) => `${first.toUpperCase()}${name.join('')}`);
  return capitalizedNames;
};

//url: 'https://pokeapi.co/api/v2/pokemon/58/'

const randomFunction = async () => {
  cards.forEach(async (card) => {
    const id = Math.floor((Math.random() * 898) + 1);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    const firstDiv = card.firstElementChild;
    const pokeName = firstDiv.firstElementChild;
    pokeName.innerText = data.name;
    pokeName.style.display = 'block';
    const pokeImg = firstDiv.lastElementChild;
    pokeImg.setAttribute('src', data.sprites.front_default);
    pokeImg.style.width = '120px';
  })
} 

randomBtn.addEventListener('click', randomFunction);


const foda = async () => {
  const id = Math.floor((Math.random() * 898) + 1);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();
  console.log(data);
}
foda();

window.onload = () => {
  input.addEventListener('input', changeName);
  toUpper();
};



/* Modal */

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
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