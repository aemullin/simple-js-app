let pokemonRepository = (function () {
  let pokemonList=[
    {name:'Bulbasaur', height: 1, type:'grass'},
    {name:'Charmander', height: 2, type:'fire'},
    {name:'Squirtle', height: 1, type:'water'}
  ];
  function getAll(){
    return pokemonList;
  }
  function add(item){
    return pokemonRepository.add(item);
  }
  function showDetails(pokemon){
    console.log(pokemon.name)
  }
  function addListItem(pokemon){
    let pokemonList=document.querySelector('.pokemon-list');
    let listItem=document.createElement('li');
    let button=document.createElement('button');
    button.innerText=pokemon.name+" ("+pokemon.height+" ft)";
    button.classList.add('pokemon');
    button.addEventListener('click', function(){
      showDetails(pokemon)
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

return{
    add: add,
    getAll: getAll,
    addListItem: addListItem
  }
})();

//let pokemonList=[
  //{name:'Bulbasaur', height: 1, type:'grass'},
  //{name:'Charmander', height: 2, type:'fire'},
  //{name:'Squirtle', height: 1, type:'water'}
//];

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
});
  //let pokemonList=document.querySelector('.pokemon-list');
  //let listItem=document.createElement('li');
  //let button=document.createElement('button');
  //button.innerText=pokemon.name+" ("+pokemon.height+" ft)";
  //button.classList.add('pokemon')
  //listItem.appendChild(button);
  //pokemonList.appendChild(listItem);
  //document.write("<p>" + pokemon.name + " (" + pokemon.height +" ft");
  //if(pokemon.height>1){
    //document.write(" - So big!")
  //}
  //document.write(" ) - " + pokemon.type + "</p>");




//list of pokemon

//for ( let i=0; i<pokemonList.length; i++){
  //document.write("<p>")
  //document.write(pokemonList[i].name + " " + "(" + "height:" + " " + pokemonList[i].height +")")
  //loop displaying pokemon name and height
  //if (pokemonList[i].height>1){
    //document.write(" - So big!")
  //}
  //add comment to pokemon larger than 2
  //document.write("</p>")
//}
