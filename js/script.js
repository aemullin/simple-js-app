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
  function showDetails(pokemon){
    console.log(pokemon.name)
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
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function addListItem(pokemon){
    let pokemonList=document.querySelector('.pokemon-list');
    let listItem=document.createElement('li');
    let button=document.createElement('button');
    button.innerText=pokemon.name;
    button.classList.add('pokemon');
    button.addEventListener('click', function(){
      showDetails(pokemon)
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
    showModal(pokemon);
  });
}
let modalContainer = document.querySelector('#modal-container');
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
  let imageContainer = document.createElement('div')
  imageContainer.classList.add('image-container')
  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemonimage');
  pokemonImage.src = pokemon.imageUrl;
  let pokemonStat = document.createElement('ul');
  pokemonStat.classList.add('pokemon-stat');
  let pokemonHeight = document.createElement('li');
  pokemonHeight.innerText = 'Height: ' + pokemon.height;
  let pokemonType = document.createElement('li');
  if (pokemon.types[1]){
    pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name + ", " + pokemon.types[1].type.name
  } else{
    pokemonType.innerText = 'Type: ' + pokemon.types[0].type.name
  }


  modalContainer.appendChild(modal)
  modal.appendChild(closeButton)
  modal.appendChild(pokemonTitle)
  modal.appendChild(imageContainer)
  imageContainer.appendChild(pokemonImage)
  modal.appendChild(pokemonStat)
  pokemonStat.appendChild(pokemonHeight)
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
});
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
