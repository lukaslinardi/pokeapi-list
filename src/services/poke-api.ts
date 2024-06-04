import axios from "axios";
import { PokeListResult, Result } from "../types/pokelist";

export const getPokemons = async (
    pageParams: number
): Promise<PokeListResult> => {
  try {
    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_REACT_API_URL}/pokemon?limit=${pageParams}`,
    };
    const resAll = await axios(config);
    const pokeList: Result[] = [];

    for (const poke of resAll.data.results) {
      const url = poke.url;
      const match = url.match(/\/(\d+)\//);
      const pokemonId = match ? match[1] : null;

      if (pokemonId) {
        const config2 = {
          method: "GET",
          url: `${import.meta.env.VITE_REACT_API_URL}/pokemon/${pokemonId}`,
        };
        const bufferRes = await axios(config2);
        const bufferData = bufferRes.data;

        const pokeWithBuffer: Result = {
          ...poke,
          buffer: bufferData,
        };

        pokeList.push(pokeWithBuffer);
      }
    }

    return {
      ...resAll.data,
      results: pokeList,
    };
  } catch (err) {
    throw err;
  }
};

// export const getPokemons = async (
//   limit: number,
//   offset: number,
// ): Promise<PokeListResult> => {
//   try {
//     const config = {
//       method: "GET",
//       url: `${import.meta.env.VITE_REACT_API_URL}/pokemon?limit=${limit}&offset=${offset}`,
//     };
//
//     const res = await axios(config);
//     return res.data;
//   } catch (err: any) {
//     return err.response.data;
//   }
// };

export const getPokemonDetail = async (name: string): Promise<any> => {
  try {
    const config = {
      method: "GET",
      url: `${import.meta.env.VITE_REACT_API_URL}/pokemon/${name}`,
    };

    const res = await axios(config);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};