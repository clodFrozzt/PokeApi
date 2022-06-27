const container = document.getElementById("products-cards-container");

const getUrlPokemones = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  return data;
};

const showPokemons = (async () => {
  const pokemon = await getUrlPokemones();
})();

const fichaPokemones = async (urlPokemon) => {
  const detallePokemon = await fetch(urlPokemon);
  const data = await detallePokemon.json();
  return data;
};

getUrlPokemones()
  .then(async (data) => {
    const resultadosPokemones = [];
    for (let result of data.results) {
      const respuestaFicha = await fichaPokemones(result.url);
      resultadosPokemones.push(respuestaFicha);
    }
    container.innerHTML = returnCards(resultadosPokemones);
  })
  .catch((error) => console.log("El error es; ", error));

function returnCards(valuesCards) {
  return (
    '<div class="products-cards">' +
    valuesCards
      .map(
        (valuesCard) => `
  <div>
    <div class="product-header">
      <img src="${valuesCard.sprites.front_default}"/>
    </div>
    <div class="product-content">
      <h4>${valuesCard.name}</h4>
    </div> 
  </div>`
      )
      .join("") +
    "</div>"
  );
}