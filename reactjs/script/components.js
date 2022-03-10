function PokemonLoader() {
  return (
    <div className="d-flex vh-100 flex-row justify-content-center align-items-center">
      <ReactBootstrap.Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </ReactBootstrap.Spinner>
    </div>
  );
}
function PokemonCard({ pokemon, clicked }) {
  const [selected, setSelected] = React.useState(false);
  const handleSelected = () => setSelected(!selected);
  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  return (
    <ReactBootstrap.Card
      style={{ width: "25rem" }}
      bg={selected ? "dark" : ""}
      text={selected ? "white" : ""}
      className="mb-2"
    >
      <ReactBootstrap.Card.Img
        variant="top"
        src={pokemon.sprites.front_default}
      />
      <ReactBootstrap.Card.Body>
        <ReactBootstrap.Card.Title>
          {capitalize(pokemon.name)}
        </ReactBootstrap.Card.Title>
        <ReactBootstrap.Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </ReactBootstrap.Card.Text>
        <ReactBootstrap.Row>
          <ReactBootstrap.Col>
            <ReactBootstrap.Button
              variant="primary"
              onClick={() => clicked(pokemon)}
            >
              Go somewhere
            </ReactBootstrap.Button>
          </ReactBootstrap.Col>
          <ReactBootstrap.Col>
            <ReactBootstrap.Button variant="primary" onClick={handleSelected}>
              Select
            </ReactBootstrap.Button>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
      </ReactBootstrap.Card.Body>
    </ReactBootstrap.Card>
  );
}
function PokemonSearch({ setSearchText }) {
  const searchHandler = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <ReactBootstrap.Row className="py-2">
      <ReactBootstrap.Col sm="4">
        <ReactBootstrap.Form>
          <ReactBootstrap.Form.Group
            className="pb-2"
            controlId="formBasicEmail"
          >
            <ReactBootstrap.Form.Label>
              Search pokemon
            </ReactBootstrap.Form.Label>
            <ReactBootstrap.Form.Control type="text" placeholder="type here" />
          </ReactBootstrap.Form.Group>
          <ReactBootstrap.Button onClick={searchHandler} variant="primary">
            Search
          </ReactBootstrap.Button>
          <ReactBootstrap.Button variant="danger">Reset</ReactBootstrap.Button>
        </ReactBootstrap.Form>
      </ReactBootstrap.Col>
    </ReactBootstrap.Row>
  );
}
function PokemonList({ pokemons, loading = false }) {
  const clickCb = (pokemon) => alert(JSON.stringify(pokemon, null, 2));
  const [searchText, setSearchText] = React.useState("");
  const [pokemnoList, setPokemonList] = React.useState(pokemons);

  React.useEffect(() => {
    filterPokemons();
  }, [searchText]);

  const filterPokemons = () => {
    if (!searchText) setPokemonList(pokemons);
    setPokemonList(
      pokemons.filter((pokemon) => pokemon.name.includes(searchText))
    );
  };

  return loading ? (
    <PokemonLoader />
  ) : (
    <div>
      {/* <PokemonSearch setSearchText={setSearchText} /> */}
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard pokemon={pokemon} clicked={clickCb} />
          </li>
        ))}
      </ul>
    </div>
  );
}
