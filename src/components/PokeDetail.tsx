import { useState, useEffect } from "react";
import { Tab, Tabs, CircularProgress } from "@mui/material";

import {
  PokeDetailResult,
  PokeSpecies,
  EvolutionChainJSON,
  Chain,
  DetailAttribute,
} from "../types/pokelist";
import { backgroundType } from "../utils/constants";
import AboutTab from "./AboutTab";
import BaseStatTab from "./BaseStatsTab";
import EvolutionTab from "./EvolutionTab";
import MovesTab from "./MovesTab";

type Props = {
  pokeDetailData: PokeDetailResult | undefined;
  pokeSpeciesData: PokeSpecies | undefined;
  pokeEvolutionData: EvolutionChainJSON | undefined;
  isLoading: boolean;
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
  const { pokeDetailData, pokeSpeciesData, pokeEvolutionData, isLoading } =
    props;

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
              {isLoading ? (
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              ) : (
                <AboutTab
                  pokeDetailData={pokeDetailData}
                  pokeSpeciesData={pokeSpeciesData}
                />
              )}
            </CustomTabPanel>
            <CustomTabPanel index={1} value={value}>
              <BaseStatTab pokeDetailData={pokeDetailData} />
            </CustomTabPanel>
            <CustomTabPanel index={2} value={value}>
              <EvolutionTab
                pokeDetailData={pokeDetailData}
                evolutionList={evolutionList}
              />
            </CustomTabPanel>
            <CustomTabPanel index={3} value={value}>
              <MovesTab pokeDetailData={pokeDetailData} />
            </CustomTabPanel>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PokeDetail;
