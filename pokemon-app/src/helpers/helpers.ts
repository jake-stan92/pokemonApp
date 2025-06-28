export async function getPokedex() {
  const data = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
  const pokedex = await data.json();
  console.log(pokedex);
}
