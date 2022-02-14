const urlAll = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898';
const urlSimple = 'https://pokeapi.co/api/v2/pokemon/';
const input = document.querySelector('#time-name');
const timeName = document.querySelector('#name-team');
const cards = document.querySelectorAll('.card-pokemon');
const randomBtn = document.querySelector('#btn-random');
const inputImg = document.getElementById('input-img')
const questionModal = document.getElementById('question-modal')
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const headerImg = document.querySelector('.header-img');
const inputModal = document.querySelector('.input-modal');

headerImg.addEventListener('click', function reload() {
  document.location.reload(true);
})

const changeName = () => {
  timeName.innerText = input.value;
}

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

const addPokemon = (event) => {
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
  const sliced = text.substring(10,text.length - 13);
  // Tentativa de atribuir qual carta foi clicada
  const pokeField = document.querySelector('.selected');
  const first = pokeField.firstElementChild;
  const h4 = first.firstElementChild;
  h4.style.display = 'block';
  const img = first.lastElementChild;
  h4.innerText = sliced;
  img.setAttribute('src', imgLink)
  removeSelected();
  displayHidden();
}

btnNo.addEventListener('click', noAdd)
btnYes.addEventListener('click', add)

const loadList = async (names) => {
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

const removeSelected = () => {
  cards.forEach((card) => {
    if(card.classList.contains('selected'))
    card.classList.remove('selected')
  })
}

const displayHidden = () => {
  inputImg.classList.add('hidden');
  questionModal.classList.add('hidden');
  btnYes.classList.add('hidden');
  btnNo.classList.add('hidden');
}

/* Modal */

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
cards.forEach((card) => {
  card.onclick = function() {
    modal.style.display = "block";
    card.classList.add("selected");
  }
});

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  removeSelected();
  displayHidden();
  inputModal.value = '';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  input.addEventListener('input', changeName);
  if (event.target === modal) {
    modal.style.display = "none";
    removeSelected();
    displayHidden();
    inputModal.value = '';
  }
} 

const filterNames = async () => {
  const lower = inputModal.value.toLowerCase();
  const length = lower.length;
  const allNames = await pokeNames();
  const filtered = allNames.filter((nome) => nome.substr(0, length) === lower);
  return filtered;
};

const namesFiltered = async () => {
  const filtered = await filterNames();
  loadList(filtered);
}

inputModal.addEventListener('input', namesFiltered);

window.onload = async () => {
  const names = await pokeNames();
  loadList(names);
}