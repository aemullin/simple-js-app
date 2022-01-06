let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('error');
    }
  }

  function loadList() {
    return fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add('col-xs-6');
    listItem.classList.add('col-sm-4');
    listItem.classList.add('col-md-3');
    let button = document.createElement('button');
    button.classList.add('pokemon-item');
    button.innerText = pokemon.name;
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    button.setAttribute('type', 'button');
    button.classList.add('pokemon', 'btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#targetModal');

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  let modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', 'targetModal');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  let modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.setAttribute('role', 'document');
  let modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  let modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');
  let modalTitle = document.createElement('h1');
  modalTitle.classList.add('modal-title');
  let closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('close');
  closeButton.setAttribute('data-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.innerText = 'X';
  let modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemonimage');
  let pokemonStat = document.createElement('div');
  pokemonStat.classList.add('pokemon-stat');
  let pokemonHeight = document.createElement('p');
  let pokemonWeight = document.createElement('p');
  let pokemonType = document.createElement('p');
  document.body.appendChild(modal);
  modal.appendChild(modalDialog);
  modalDialog.appendChild(modalContent);
  modalContent.appendChild(modalHeader);
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modalContent.appendChild(modalBody);
  modalBody.appendChild(pokemonImage);
  modalBody.appendChild(pokemonHeight);
  modalBody.appendChild(pokemonWeight);
  modalBody.appendChild(pokemonType);

  function showInfo(pokemon) {
    modalTitle.innerText = pokemon.name;
    pokemonImage.src = pokemon.imageUrl;
    let height = pokemon.height * 0.328084;
    height = height.toFixed(2);
    pokemonHeight.innerText = 'Height: ' + height + ' ft';
    pokemonHeight.classList.add('pokemon-height');
    let weight = pokemon.weight * 0.220462;
    weight = weight.toFixed(2);
    pokemonWeight.innerText = 'Weight: ' + weight + ' lbs';
    pokemonWeight.classList.add('pokemon-weight');
    pokemonType.classList.add('pokemon-type');
    if (pokemon.types[1]) {
      pokemonType.innerText =
        'Type: ' +
        pokemon.types[0].type.name +
        ', ' +
        pokemon.types[1].type.name;
    } else {
      pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name;
    }
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showInfo(pokemon);
    });
  }
  return {
    add: add,
    loadList: loadList,
    getAll: getAll,
    loadDetails: loadDetails,
    addListItem: addListItem,
  };
})();
pokemonRepository.loadList().then(function () {
  let pokemonSearch = document.querySelector('.poke-search');
  pokemonSearch.addEventListener('submit', function(event) {
    event.preventDefault();
    let search = document.querySelector('#pokesearch').value;
    document.querySelector('.pokemon-list').innerHTML = '';
      if (search === '') {
        pokemonRepository.getAll().forEach(function(pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      } else {
        pokemonRepository.getAll().forEach(function(pokemon) {
          if (pokemon.name.indexOf(search) > -1) {
            pokemonRepository.addListItem(pokemon);
          }
        });
      }
  })

  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
