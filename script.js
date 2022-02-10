const api = async (nomePokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`);
  const data = response.json();
  return data;
};

console.log(api('charizard'));