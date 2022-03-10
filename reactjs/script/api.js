const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

function fetchPokemon({ offset = 0, limit = 0 }) {
  return new Promise((resolve, reject) => {
    http
      .get(`pokemon?offset=${offset}&limit=${limit}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
