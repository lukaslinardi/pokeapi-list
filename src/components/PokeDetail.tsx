import { useState, useEffect } from "react";
import { Tab, Tabs, LinearProgress } from "@mui/material";

import {
  PokeDetailResult,
  PokeDetailAbility,
  PokeSpecies,
  EvolutionChainJSON,
  Chain,
  DetailAttribute,
} from "../types/pokelist";
import { backgroundType } from "../utils/constants";

type Props = {
  pokeDetailData: PokeDetailResult | undefined;
  pokeSpeciesData: PokeSpecies | undefined;
  pokeEvolutionData: EvolutionChainJSON | undefined;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="p-3">{children}</div>}
    </div>
  );
}

const PokeDetail = (props: Props) => {
  const { pokeDetailData, pokeSpeciesData, pokeEvolutionData } = props;

  const [value, setValue] = useState(0);
  const [evolutionList, setEvolutionList] = useState<DetailAttribute[]>([]);

  useEffect(() => {
    if (!pokeEvolutionData) return;
    const extractSpeciesNames = (chain: Chain) => {
      const speciesArray: DetailAttribute[] = [];

      const traverse = (node: Chain) => {
        if (node?.species && node?.species?.name) {
          const url = node.species.url;
          const match = url.match(/\/(\d+)\//);
          const id = match ? match[1] : null;
          speciesArray.push({
            name: node.species.name,
            url: id ? id + ".png" : "",
          });
        }
        if (node?.evolves_to && node?.evolves_to.length > 0) {
          node?.evolves_to.forEach((evolution) => traverse(evolution));
        }
      };

      traverse(chain);
      return speciesArray;
    };

    const speciesArray = extractSpeciesNames(pokeEvolutionData.chain);
    setEvolutionList(speciesArray);
  }, [pokeEvolutionData]);

  return (
    <div
      style={{
        backgroundColor:
          backgroundType[
            pokeDetailData && pokeDetailData !== undefined
              ? pokeDetailData.types[0]?.type?.name
              : "normal"
          ],
      }}
    >
      {pokeDetailData && pokeDetailData !== undefined ? (
        <div>
          <div className="flex w-full items-center justify-between p-7">
            <div>
              <p className="text-white font-bold text-[70px] capitalize">
                {pokeDetailData.name}
              </p>
              <div className="flex">
                {pokeDetailData.types.map((data, index: number) => (
                  <p
                    key={index}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderRadius: "9999px",
                      padding: "0.7rem",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                      marginTop: "0.5rem",
                      marginRight: "0.7rem",
                      marginBottom: "0.5rem",
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {data.type.name}
                  </p>
                ))}
              </div>
            </div>
            {pokeDetailData.id.toString().length === 1 && (
              <p className="text-white font-bold text-[70px]">{`#00${pokeDetailData.id.toString()}`}</p>
            )}
            {pokeDetailData.id.toString().length === 2 && (
              <p className="text-white font-bold text-[70px]">{`#0${pokeDetailData.id.toString()}`}</p>
            )}
            {pokeDetailData.id.toString().length >= 3 && (
              <p className="text-white font-bold text-[70px]">{`#${pokeDetailData.id.toString()}`}</p>
            )}
          </div>

          <div className="flex justify-center w-full">
            <div>
              <img
                className="w-[70%]"
                src={
                  pokeDetailData.sprites.other["official-artwork"]
                    ?.front_default
                }
              />
            </div>
          </div>
          <div className="bg-white rounded-t-lg h-[300px] p-3">
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Base Stats" {...a11yProps(1)} />
              <Tab label="Evolution" {...a11yProps(2)} />
              <Tab label="Moves" {...a11yProps(3)} />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
              <div className="flex capitalize">
                <div>
                  <p>Species</p>
                  <p>Height</p>
                  <p>Weight</p>
                  <p>Abilites</p>
                </div>
                <div className="ml-10 font-bold">
                  <p>
                    {pokeSpeciesData && pokeSpeciesData !== undefined
                      ? pokeSpeciesData.genera[7]?.genus
                      : "Unknown Pokemon"}
                  </p>
                  <p>{pokeDetailData.height}</p>
                  <p>{pokeDetailData.weight}</p>
                  <p>
                    {pokeDetailData.abilities.map(
                      (data: PokeDetailAbility, index: number) => {
                        return (
                          <span key={index}>
                            {index !== pokeDetailData.abilities.length - 1
                              ? data.ability.name + ", "
                              : data.ability.name}
                          </span>
                        );
                      },
                    )}
                  </p>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel index={1} value={value}>
              <div className="flex">
                <div className="w-[30%] capitalize">
                  {pokeDetailData.stats.map((data, index) => (
                    <p key={index} className="">{data.stat.name}</p>
                  ))}
                </div>

                <div className="w-full my-2">
                  {pokeDetailData.stats.map((data, index) => (
                    <div className="flex items-center" key={index}>
                      <p className="mr-2">{data.base_stat}</p>
                      <div
                        className={`w-[50%] ${data.base_stat > 50 ? "text-green-500" : "text-red-500"}`}
                      >
                        <LinearProgress
                          value={data.base_stat > 100 ? 100 : data.base_stat}
                          color="inherit"
                          variant="determinate"
                          sx={{ width: "50%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CustomTabPanel>

            <CustomTabPanel index={2} value={value}>
              <div className="flex justify-center">
                {evolutionList.map((data) => (
                  <div className="mx-2">
                    <div className="flex justify-center ">
                      <img
                        style={{
                          width: "100%",
                          borderRadius: "9999px",
                          backgroundColor:
                            backgroundType[
                              pokeDetailData && pokeDetailData !== undefined
                                ? pokeDetailData.types[0]?.type?.name
                                : "normal"
                            ],
                          padding: 10,
                        }}
                        src={`${import.meta.env.VITE_REACT_API_URL_PICS}${data.url}`}
                      />
                    </div>
                    <p className="text-center">{data.name}</p>
                  </div>
                ))}
              </div>
            </CustomTabPanel>

            <CustomTabPanel index={3} value={value}>
              <div className="grid grid-cols-2 gap-3 p-3 flex">
                {pokeDetailData.moves
                  .filter(
                    (item) =>
                      item.version_group_details[0].level_learned_at === 1,
                  )
                  .slice(0, 4)
                  .map((data, index) => (
                    <div key={index} className="flex justify-center rounded-md bg-red-500">
                      <p className="text-center p-3 font-bold capitalize" key={index}>
                        {data.move.name}
                      </p>
                    </div>
                  ))}
              </div>
            </CustomTabPanel>

            {/*
<div key={index} className="flex justify-center p-3">
                      <p className="p-3 text-center" key={index}>
                        {data.move.name}
                      </p>
                    </div>

                          */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PokeDetail;
