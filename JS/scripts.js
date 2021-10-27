let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
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
    pokedexButton.innerText = pokemon.name;
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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      })
    }).then(function () {
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).then(function () {
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  function showLoadingMessage() {
    let loading =document.querySelector('.pokemon-list');
    let loadingMessage = document.createElement('h2');
    loadingMessage.innerText = 'Loading';
    loading.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loading =document.querySelector('.pokemon-list');
    let remove = document.querySelector('h2');
    loading.removeChild(remove);
  }


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
