let allPokemon = axios
  .get("https://pokeapi.co/api/v2/pokemon")
  .then((data) => data.data.count);

let pokemonBtn = document.getElementById("pokemon");
let pokemonList = document.getElementById("pokemon-list");

pokemonBtn.addEventListener("click", async () => {
  try {
    pokemonList.innerHTML = "";
    const count = await allPokemon;

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * count);
      let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`;

      const pokeResponse = await axios.get(pokemonUrl);
      const pokemonName = pokeResponse.data.name;
      const pokemonImage = pokeResponse.data.sprites.front_default;

      const speciesResponse = await axios.get(pokeResponse.data.species.url);
      let flavorText = "";
      for (let entry of speciesResponse.data.flavor_text_entries) {
        if (entry.language.name === "en") {
          flavorText = entry.flavor_text.replace(/[\n\f]/g, " ");
          break;
        }
      }

      const pokemonData = {
        name: pokemonName,
        text: flavorText,
        img: pokemonImage,
      };
      pokemonList.innerHTML += `
            <li><h3>${pokemonData.name}</h3>
            <img src="${pokemonData.img}" alt="${pokemonData.name}">
            <p>${pokemonData.text}</p></li>`;
    }
  } catch (err) {
    console.error("Error fetching Pokémon details:", err);
  }
});
