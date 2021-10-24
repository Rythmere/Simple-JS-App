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

  return {
    add: add,
    getAll: getAll
  };
})();
pokemonList = pokemonRepository.getAll();
pokemonList.forEach((item, i) => {
  if (pokemonList[i].height >= 1.5) {
  document.write((pokemonList[i].name) + " (height:" + (pokemonList[i].height) +") - Wow, that's big!"+"</br></br>");
} else {
    document.write((pokemonList[i].name) + " (height:" + (pokemonList[i].height) +")"+"</br></br>");
}
});
