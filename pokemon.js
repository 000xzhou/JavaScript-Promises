let allPokemon = axios.get("https://pokeapi.co/api/v2/pokemon").then((data) => {
  return data.data.count;
});

let randomPokemon = [];

let pokemonBtn = document.getElementById("pokemon");
let pokemonList = document.getElementById("pokemon-list");

pokemonBtn.addEventListener("click", () => {
  pokemonList.innerHTML = "";
  allPokemon.then((count) => {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * count);
      let pokemon = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`;
      axios
        .get(pokemon)
        .then((poke) => {
          const pokemonName = poke.data.name;
          const pokemonImage = poke.data.sprites.front_default;
          return axios.get(poke.data.species.url).then((s) => {
            let flavorText = "";
            for (let i = 0; i < s.data.flavor_text_entries.length; i++) {
              if (s.data.flavor_text_entries[i].language.name == "en") {
                flavorText = s.data.flavor_text_entries[i].flavor_text.replace(
                  /[\n\f]/g,
                  " "
                );
                break;
              }
            }
            return { name: pokemonName, text: flavorText, img: pokemonImage };
          });
        })
        .then((pokemonData) => {
          pokemonList.innerHTML += `
          <li><h3>${pokemonData.name}</h3>
          <img src="${pokemonData.img}" alt="${pokemonData.name}">
          <p>${pokemonData.text}</p></li>`;
        })
        .catch((err) => console.error("Error fetching Pokémon details:", err));
    }
  });
});
