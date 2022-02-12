const urlAll = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898';
const urlSimple = 'https://pokeapi.co/api/v2/pokemon/';
const input = document.querySelector('#time-name');
const timeName = document.querySelector('#name-team');
const cards = document.querySelectorAll('.card-pokemon');
const randomBtn = document.querySelector('#btn-random');

const inputImg = document.getElementById('input-img')
const questionModal = document.getElementById('question-modal')
const btnYes = document.getElementById('btn-yes')
const btnNo = document.getElementById('btn-no')


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

const addPokemon = async (event) => {
  if (event.target.nodeName === 'LI') {
    inputImg.classList.remove('hidden');
    questionModal.classList.remove('hidden');
    btnYes.classList.remove('hidden');
    btnNo.classList.remove('hidden');
  
    const img = event.target.firstElementChild;
    const imgLink = img.getAttribute('src');
    inputImg.setAttribute('src', imgLink);
    questionModal.innerText = `Adicionar ${event.target.innerText} ao seu time?`
  } else {
    inputImg.classList.remove('hidden');
    questionModal.classList.remove('hidden');
    btnYes.classList.remove('hidden');
    btnNo.classList.remove('hidden');
    const img = event.target;
    const imgLink = img.getAttribute('src');
    inputImg.setAttribute('src', imgLink);
    questionModal.innerText = `Adicionar ${event.target.parentElement.innerText} ao seu time?`
  }
};

const noAdd = () => {
  inputImg.classList.add('hidden');
  questionModal.classList.add('hidden');
  btnYes.classList.add('hidden');
  btnNo.classList.add('hidden');
};

const add = () => {
  modal.style.display = "none";
  const inputImg = document.getElementById('input-img')
  const imgLink = inputImg.getAttribute('src');
  const text = questionModal.innerText;
  sliced = text.substring(10,text.length - 13);
}

btnNo.addEventListener('click', noAdd)
btnYes.addEventListener('click', add)

const loadList = async () => {
  const names = await pokeNames();
  names.forEach(async (name) => {
    const search = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await search.json();
    const li = document.createElement('li')
    li.addEventListener('click', addPokemon);
    const img = document.createElement('img')
    const pokePic = data.sprites.front_default;
    img.setAttribute('src', pokePic);
    img.className = 'poke-image';
    li.className = 'list-item';
    li.innerText = name;
    document.querySelector('.poke-list').appendChild(li);
    li.append(img);
  });
}

loadList();

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


/* async function getStats (name) {
  const divInfo = document.querySelector('.info');
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const data = await response.json();
  const status = data.stats;
  status.forEach((stats) => {
    const name = stats.stat.name;
    const rating = stats.base_stat;
    const string = `${name}: ${rating}`;
    divInfo.append(string);
  })
}
getStats('charizard');
 */

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
  input.addEventListener('input', changeName);
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 