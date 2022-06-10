const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener('DOMContentLoaded', () => {
  const random = getRandomInt(1, 151);
  fetchData(random);
});

const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    console.log(data);

    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      nombre: data.name,
      hp: data.stats[0].base_stat,
      exp: data.base_experience,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      especial: data.stats[3].base_stat,
    };

    pintarCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const pintarCard = (pokemon) => {
  console.log(pokemon);
  const tarjeta = document.querySelector('.container');
  const template = document.getElementById('pokecard').content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone.querySelector('.imagen').setAttribute('src', pokemon.img);
  clone.querySelector(
    '.card-body-text'
  ).innerHTML = `<h1>${pokemon.nombre} <span>${pokemon.hp}HP</span></h1>
  <p>${pokemon.exp} Exp</p>`;
  clone.querySelectorAll('.card-footer-social h3')[0].textContent =
    pokemon.ataque;
  clone.querySelectorAll('.card-footer-social h3')[1].textContent =
    pokemon.defensa;
  clone.querySelectorAll('.card-footer-social h3')[2].textContent =
    pokemon.especial;

  fragment.appendChild(clone);
  tarjeta.appendChild(fragment);
};
