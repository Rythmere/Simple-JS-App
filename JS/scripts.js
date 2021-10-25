let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: ['Electric']},
    {name: 'Charizard', height: 1.7, type: ['Fire', 'Flying']},
    {name: 'Mew', height: 0.4, type: ['Psychic']}
  ];
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokedex = document.querySelector('.pokemon-list');
    let pokedexEntry = document.createElement('li');
    let pokedexButton = document.createElement('button');
    pokedexButton.innerText = pokemon;
    pokedexButton.classList.add("pokemonButton");
    pokedexEntry.appendChild(pokedexButton);
    pokedex.appendChild(pokedexEntry);
    buttonEvent(pokedexButton, pokemon);
  }

  function buttonEvent(pokedexButton, pokemon) {
    pokedexButton.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();
pokemonList = pokemonRepository.getAll();
pokemonList.forEach((item, i) => {
  pokemonRepository.addListItem(pokemonList[i].name);
});
