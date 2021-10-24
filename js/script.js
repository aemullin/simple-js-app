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
  });
}
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
