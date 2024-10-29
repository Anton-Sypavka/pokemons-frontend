import HttpClient from "./HttpClient";

const pokemons = {
  getPokemons: ({ page, perPage }) => {
    return HttpClient.get(`/pokemons?page=${page}&perPage=${perPage}`);
  },
}

export default pokemons;