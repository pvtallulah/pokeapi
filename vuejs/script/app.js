const app = new Vue({
  el: "#app",
  data() {
    return {
      pokemonListResult: {},
      pokemons: [],
      loading: false,
    };
  },
  mounted() {
    this.getPokemonList();
  },
  methods: {
    async getPokemonList() {
      this.loading = true;
      const res = await fetchPokemon({ offset: 0, limit: 20 });
      this.pokemonListResult = res;
      this.getPokemonsDetails();
    },
    async getPokemonsDetails() {
      const pokePrm = _.map(this.pokemonListResult.results, (pokemon) => {
        return Promise.resolve(http.get(`pokemon/${pokemon.name}`));
      });
      const pokeDetailRes = await Promise.all(pokePrm);
      this.pokemons = _.map(pokeDetailRes, "data");
      this.loading = false;
    },
  },
});
