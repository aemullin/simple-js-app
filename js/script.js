let pokemonRepository = (function () {
  let pokemonList=[];
  let apiURL='https://pokeapi.co/api/v2/pokemon/?limit=151'

  function getAll(){
    return pokemonList;
  }
  function add(pokemon){
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else{
      console.log( "error")
    }
  }

  function loadList() {
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function addListItem(pokemon){
    let pokemonList=document.querySelector('.pokemon-list');
    let listItem=document.createElement('li');
    listItem.classList.add('list-group-item');
    let button=document.createElement('button');
    button.classList.add('pokemon-item')
    button.innerText=pokemon.name;
    button.addEventListener('click', function(){
      showDetails(pokemon)
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
  //decimeters most practically describes the height provided by the API so i convert the number to ft.
  let height = (pokemon.height*0.328084)
  height = height.toFixed(2)
  pokemonHeight.innerText = 'Height: ' + height + ' ft';
  pokemonHeight.classList.add('pokemon-height');
  //Hectogram most practically describes the weight provided by the API so i convert the number to ft.
  let weight = (pokemon.weight*0.220462)
  weight = weight.toFixed(2)
  pokemonWeight.innerText = 'Weight: ' + weight + ' lbs';
  pokemonWeight.classList.add('pokemon-weight');
    pokemonType.classList.add('pokemon-type');
  if (pokemon.types[1]){
    pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name + ", " + pokemon.types[1].type.name
  } else{
    pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name
  }
};

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
    showInfo(pokemon);
  });
}



/*let modalContainer = document.querySelector('#modal-container');
function showModal(pokemon){
  modalContainer.innerHTML = ""
  let modal = document.createElement('div');
  modal.classList.add('modal');
  modalContainer.classList.add('is-visible');
  let closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'close'
  closeButton.addEventListener('click', hideModal);
  let pokemonTitle = document.createElement('h1');
  pokemonTitle.classList.add('pokemon-name')
  pokemonTitle.innerText = pokemon.name;
  let infoContainer = document.createElement('div')
  infoContainer.classList.add('info-container')
  let imageContainer = document.createElement('div')
  imageContainer.classList.add('image-container')
  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemonimage');
  pokemonImage.src = pokemon.imageUrl;
  let pokemonStat = document.createElement('div');
  pokemonStat.classList.add('pokemon-stat');
  let pokemonHeight = document.createElement('p');
  //decimeters most practically describes the height provided by the API so i convert the number to ft.
  let height = (pokemon.height*0.328084)
  height = height.toFixed(2)
  pokemonHeight.innerText = 'Height: ' + height + ' ft';
  pokemonHeight.classList.add('pokemon-height');
  let pokemonWeight = document.createElement('p');
  //Hectogram most practically describes the weight provided by the API so i convert the number to ft.
  let weight = (pokemon.weight*0.220462)
  weight = weight.toFixed(2)
  pokemonWeight.innerText = 'Weight: ' + weight + ' lbs';
  pokemonWeight.classList.add('pokemon-weight');
  let pokemonType = document.createElement('p');
  pokemonType.classList.add('pokemon-type');
  if (pokemon.types[1]){
    pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name + ", " + pokemon.types[1].type.name
  } else{
    pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name
  }


  modalContainer.appendChild(modal)
  modal.appendChild(closeButton)
  modal.appendChild(pokemonTitle)
  modal.appendChild(infoContainer)
  infoContainer.appendChild(imageContainer)
  imageContainer.appendChild(pokemonImage)
  infoContainer.appendChild(pokemonStat)
  pokemonStat.appendChild(pokemonHeight)
  pokemonStat.appendChild(pokemonWeight)
  pokemonStat.appendChild(pokemonType)
}
function hideModal(pokemon){
  modalContainer.classList.remove('is-visible');
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
}); */
return{
    add: add,
    loadList: loadList,
    getAll: getAll,
    loadDetails: loadDetails,
    addListItem: addListItem,
  }
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
})
