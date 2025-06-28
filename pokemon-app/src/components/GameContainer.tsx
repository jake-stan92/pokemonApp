import React from "react";
import { useEffect, useState } from "react";
import type { SinglePokemon } from "./GameContainerTypes";

function GameContainer() {
  const [allPokemon, setAllPokemon] = React.useState<SinglePokemon | null>(
    null,
  );

  // API
  useEffect(() => {
    // data fetching here
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllPokemon(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div>
        {allPokemon ? <p>{allPokemon.name}</p> : <p>Pokemon doesn't exisst</p>}
      </div>
    </>
  );
}

export default GameContainer;
