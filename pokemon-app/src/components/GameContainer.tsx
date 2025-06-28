import React from "react";
import type { SinglePokemon } from "./GameContainerTypes";
import og151 from "../assets/og151";

function GameContainer() {
  const allPokemon: SinglePokemon[] = og151;

  // API
  // useEffect(() => {
  //   // data fetching here
  //   fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setAllPokemon(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  return (
    <>
      {allPokemon.map((pokemon, key) => {
        return (
          <>
            <p pokedex-num={key + 1}>{pokemon.name}</p>
            <img src={pokemon.spriteFront}></img>
          </>
        );
      })}
      {/* <div>{allPokemon && <p>{allPokemon[0].name}</p>}</div> */}
    </>
  );
}

export default GameContainer;
