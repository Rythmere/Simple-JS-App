let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

/* adds pokemon from api to the ul and creates buttons with each ones name in the ul */

  function addListItem(pokemon) {
    let pokedex = document.querySelector('.pokemon-list');
    let pokedexEntry = document.createElement('li');
    pokedexEntry.classList.add('group-list-item', 'col-5', 'col-md-4', 'col-lg-4', 'col-xl-4', 'p-2');
    let pokedexButton = document.createElement("button");
    pokedexButton.innerText = pokemon.name;
    pokedexButton.classList.add("pokemonButton", 'btn-block', "btn-danger");
    pokedexButton.setAttribute('data-toggle', 'modal');
    pokedexButton.setAttribute('data-target', '#detailsModal');
    buttonEvent(pokedexButton, pokemon);
    pokedexEntry.appendChild(pokedexButton);
    pokedex.appendChild(pokedexEntry);
  }

/* opens modal when button is clicked by running showDetails function*/

  function buttonEvent(pokedexButton, pokemon) {
    pokedexButton.addEventListener('click', function () {
      showDetails(pokemon);

    });
  }

  /* runs loadDetails function to pull the pokemons details from the api, then runs showModal function*/

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  /* retrieves pokemon list from the api */

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

  /* retrieves pokemon details from api*/

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.imageUrlShinyFront = details.sprites.front_shiny;
      item.imageUrlShinyBack = details.sprites.back_shiny;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
      item.weight = details.weight
    }).then(function () {
    }).catch(function (e) {
      console.error(e);
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

/* Adds content to bootstrap modal*/


  function showModal(pokemon) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');

  let types = [];
  pokemon.types.forEach((item, i) => {
      types.push(' ' + pokemon.types[i].type.name);
    });

    let abilities = [];
    pokemon.abilities.forEach((item, i) => {
        abilities.push(' ' + pokemon.abilities[i].ability.name);
    });


  modalTitle.empty();
  modalBody.empty();

  let nameElement = $('<h1>' + pokemon.name + '</h1>');
  let imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr('src', pokemon.imageUrlFront);
  let imageElementBack = $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr('src', pokemon.imageUrlBack);
  let imageElementShinyBack = $('<img class="modal-img" style="width:50%">');
  imageElementShinyBack.attr('src', pokemon.imageUrlShinyBack);
  let imageElementShinyFront = $('<img class="modal-img" style="width:50%">');
  imageElementShinyFront.attr('src', pokemon.imageUrlShinyFront);
  let typeElement = $('<p class="col-6">' + "type: " + types + '</p>');
  let abilityElement = $('<p class="col-6">' + "Abilities: " + abilities + '</p>')
  let heightElement = $('<p class="col-6">' + "Height: " + pokemon.height + '</p>');
  let weightElement = $('<p class="col-6">' + "Weight: " + pokemon.weight + '</p>');

  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(imageElementShinyFront);
  modalBody.append(imageElementShinyBack);
  modalBody.append(heightElement);
  modalBody.append(typeElement);
  modalBody.append(weightElement);
  modalBody.append(abilityElement);

}

/* search bar */

let search = document.querySelector('.form-control');
search.addEventListener('input', function() {
  input = search.value.toLowerCase();
  let poke = document.querySelectorAll('li');

  poke.forEach(function(pokemon) {
    if (pokemon.innerText.toLowerCase().indexOf(input) < 0) {
      pokemon.style.display = "none";
    } else {
      pokemon.style.display = "";
    }
  });

});



  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    buttonEvent: buttonEvent
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
