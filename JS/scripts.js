let pokemonList = [
  {name: 'Pikachu', height: 0.4, type: ['Electric']},
  {name: 'Charizard', height: 1.7, type: ['Fire', 'Flying']},
  {name: 'Mew', height: 0.4, type: ['Psychic']}
];
for (var i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1.5) {
  document.write((pokemonList[i].name) + " (height:" + (pokemonList[i].height) +") - Wow, that's big!"+"</br></br>");
} else {
    document.write((pokemonList[i].name) + " (height:" + (pokemonList[i].height) +")"+"</br></br>");
}

}
