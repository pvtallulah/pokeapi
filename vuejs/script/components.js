Vue.component("pokemon-container", {
  template: `<b-container fluid>  
  <pokemon-loader v-if='loading'></pokemon-loader>
  <pokemon-list v-else :pokemons="pokemons" />
  </b-container>`,
  props: {
    pokemons: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});

Vue.component("pokemon-loader", {
  template: `
  <div class='vh-100 d-flex flex-row justify-content-center align-items-center'>
    <b-spinner></b-spinner>
  </div>`,
});

Vue.component("pokemon-list", {
  template: `
  <b-row>
    <b-row class='mb-2'>
      <b-col cols='4'>
        <b-form-group
          class='py-2'
          id="input-group-1"
          label="Search on the list:"
          label-for="search-input" :description="searchText">
          <b-form-input
            placeholder="search pokemon"
            id='search-input'
            ref='searchInput'
            @keyup.enter='searchPokemons'
            />
        </b-form-group>
        <b-button variant="primary" @click='searchPokemons'>Search</b-button>
        <b-button variant="danger" v-on:click='searchText = ""'>Reset</b-button>
      </b-col>
    </b-row>
    <b-col>
      <ul>
        <li v-for="pokemon in filtredList">
          <pokemon-card :pokemon="pokemon" @card-clicked='cardClicked' />
        </li>
      </ul>
    </b-col>
  </b-row>
`,
  props: {
    pokemons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    filtredList() {
      if (this.searchText.length === 0) {
        return this.pokemons;
      }
      return this.pokemons.filter((p) =>
        p.name.includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    cardClicked(pokemon) {
      alert(JSON.stringify(pokemon, null, 2));
    },
    searchPokemons() {
      this.searchText = this.$refs.searchInput.$el.value;
    },
  },
});

Vue.component("pokemon-card", {
  template: `
  <b-card
    :bg-variant="selected ? 'dark' : '' "
    :text-variant="isPokemonSelected"
    :title="pokemon.name | capitalize"
    :img-src="pokemon.sprites.front_default"
    :img-alt="'Image-' + pokemon.name"
    img-top
    tag="article"
    style="max-width: 25rem;"
    class="mb-2"
    >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>
    <b-row>
      <b-col>
        <b-button href="#" variant="primary" @click='handleCardClick'>Go somewhere</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" @click='selected = !selected'>Select</b-button>
      </b-col>
    </b-row>
  </b-card>
    `,
  props: ["pokemon"],
  methods: {
    handleCardClick() {
      this.$emit("card-clicked", this.pokemon);
    },
  },
  computed: {
    isPokemonSelected() {
      return this.selected ? "white" : "";
    },
  },
  data() {
    return {
      selected: false,
    };
  },
});
