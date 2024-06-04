import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { getPokemons, getPokemonDetail } from "../services/poke-api";
import { PokeListResult, Result, Types, PokemonType } from "../types/pokelist";
import { backgroundType } from "../utils/constants";
import PokeDetail from "./PokeDetail";

const FETCH_LIMIT = 10;

const PokeList = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(FETCH_LIMIT);
  const [openModal, setOpenModal] = useState(false);
  const [pokeId, setPokeId] = useState("");

  // const { data: pokeListData, isLoading } = useQuery({
  //   queryKey: ["poke-list", offset, limit],
  //   queryFn: () => getPokemons(limit, offset),
  // });

  const {
    data: pokeListData,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["poke-list", limit],
    queryFn: ({ pageParam = 0 }) => getPokemons(pageParam),
    getNextPageParam: (lastPage, allPage) => {
      return allPage.length + 10;
    },
  });

  const { data: pokeDetailData } = useQuery({
    queryKey: ["poke-detail", pokeId],
    queryFn: () => getPokemonDetail(pokeId),
    enabled: pokeId !== "",
  });

  console.log(pokeDetailData);
  console.log(pokeListData);

  return (
    <div className="p-5">
      <p className="font-bold text-[70px] text-center">Pokemon Dex</p>
      <div
      //className="flex justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full"
      >
        {pokeListData?.pages?.map((item: PokeListResult, index: number) => (
          <div
            className="flex justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full"
            key={index}
          >
            {item.results.map((data, idx) => (
              <div
                className="p-2 bg-white flex flex-wrap justify-center w-full"
                key={idx}
              >
                <div
                  style={{
                    borderRadius: "0.5rem", // equivalent to rounded-lg
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // equivalent to shadow-md
                    padding: "0.75rem", // equivalent to p-3
                    display: "flex",
                    backgroundColor:
                      backgroundType[data?.buffer?.types[0]?.type?.name],
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOpenModal(true);
                    setPokeId(data.buffer.id);
                  }}
                >
                  <div className="p-2">
                    <p className="font-bold capitalize text-white">
                      {data.name}
                    </p>
                    {data.buffer?.types?.map((item: Types) => (
                      <div key={item.type.name}>
                        <p
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.25)",
                            borderRadius: "0.375rem",
                            padding: "0.5rem",
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.type.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <img
                      src={
                        data.buffer.sprites.other["official-artwork"]
                          ?.front_default
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="text-blue-500 p-3.5 border-2 border-blue-500 rounded-md text-center mt-4 hover:bg-slate-100 w-full"
        disabled={isLoading}
        onClick={() => {
          //setLimit((prevValue) => prevValue + 10);
          fetchNextPage();
        }}
      >
        {isLoading ? <CircularProgress /> : <p>Muat Lebih Banyak</p>}
      </button>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
      >
        <PokeDetail pokeDetailData={pokeDetailData} />
      </Dialog>
    </div>
  );
};

export default PokeList;