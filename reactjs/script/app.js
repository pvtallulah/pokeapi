function App() {
  const [pokemonListResult, setPokemonListResult] = React.useState([]);
  const [pokemons, setPokemons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getPokemons();
  }, []);

  React.useEffect(() => {
    getPokemonsDetails();
  }, [pokemonListResult]);

  const getPokemons = React.useCallback(async () => {
    const res = await fetchPokemon({ offset: 0, limit: 20 });
    setPokemonListResult(res);
  });

  const getPokemonsDetails = async () => {
    const pokePrm = _.map(pokemonListResult.results, (pokemon) => {
      return Promise.resolve(http.get(`pokemon/${pokemon.name}`));
    });
    const pokeDetailRes = await Promise.all(pokePrm);
    setPokemons(_.map(pokeDetailRes, "data"));
    setLoading(false);
  };
  return (
    <div>
      <ReactBootstrap.Navbar bg="dark" variant="dark" className="mb-4 px-4">
        <ReactBootstrap.Navbar.Brand href="#home">
          React Bootstrap
        </ReactBootstrap.Navbar.Brand>
      </ReactBootstrap.Navbar>
      <ReactBootstrap.Container fluid>
        <ReactBootstrap.Row>
          <PokemonList pokemons={pokemons} loading={loading} />
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
