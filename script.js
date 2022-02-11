const url = 'https://pokeapi.co/api/v2/pokemon/';
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

const randomFunction = async () => {
  let counter = 0;
  while (counter < 6) {
    const id = Math.floor((Math.random() * 413) + 1);
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
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("card1");

// Get the <span> element that closes the modal
var span = document.querySelector(".close");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

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