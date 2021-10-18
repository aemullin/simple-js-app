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
  return{
    add: add,
    getAll: getAll
  }

})();

//let pokemonList=[
  //{name:'Bulbasaur', height: 1, type:'grass'},
  //{name:'Charmander', height: 2, type:'fire'},
  //{name:'Squirtle', height: 1, type:'water'}
//];

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<p>" + pokemon.name + " (" + pokemon.height +" ft");
  if(pokemon.height>1){
    document.write(" - So big!")
  }
  document.write(" ) - " + pokemon.type + "</p>");
});



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
