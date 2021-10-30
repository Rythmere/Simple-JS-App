let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

/* adds first 151 pokemon from api to the ul and creates buttons with each ones name in the ul */

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

/* opens modal when button is clicked by running showDetails function*/

  function buttonEvent(pokedexButton, pokemon) {
    pokedexButton.addEventListener('click', function (event) {
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

/* Creates modal and sets it visible with is-visible class, sets event listeners to remove modal with esc, clicking outside of the model, and the close button*/

  function showModal(pokemon) {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.innerHTML = "";

  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key ==='Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;

  let pokemonImg = document.createElement('img');
  pokemonImg.src = pokemon.imageUrl;

  let pokemonHeight = document.createElement('p');
  pokemonHeight.innerText = "Height: " + pokemon.height;

  /*let pokemonType = document.createElement('p');
  pokemonType.innerText = 'Types: ' + pokemon.types; */

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(pokemonImg);
  modal.appendChild(pokemonHeight);
  /*modal.appendChild(pokemonType);*/
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

/* removes is-visible class from modal container */

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
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
