import { useState } from "react";
import { Tab, Tabs, LinearProgress } from "@mui/material";

import {
  PokeDetailResult,
  Ability,
  PokeDetailAbility,
} from "../types/pokelist";
import { backgroundType } from "../utils/constants";

type Props = {
  pokeDetailData: PokeDetailResult;
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
  const { pokeDetailData } = props;

  const [value, setValue] = useState(0);

  console.log(pokeDetailData);

  return (
    <div
      style={{
        backgroundColor: backgroundType[pokeDetailData?.types[0]?.type?.name],
      }}
    >
      {pokeDetailData && pokeDetailData !== undefined ? (
        <div>
          <div className="flex w-full items-center justify-between p-3">
            <div>
              <p className="text-white font-bold text-[70px]">
                {pokeDetailData.name}
              </p>
              <div className="flex">
                {pokeDetailData.types.map((data) => (
                  <p
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      borderRadius: "9999px",
                      padding: "0.7rem",
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
          <div className="bg-white rounded-t-lg h-[50%]">
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Base Stats" {...a11yProps(1)} />
              <Tab label="Evolution" {...a11yProps(2)} />
              <Tab label="Moves" {...a11yProps(3)} />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
              <div className="flex">
                <div>
                  <p>Species</p>
                  <p>Height</p>
                  <p>Weight</p>
                  <p>Abilites</p>
                </div>
                <div className="ml-7">
                  <p>test</p>
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
              <div className="flex ">
                <div className="w-[30%]">
                  {pokeDetailData.stats.map((data, index) => (
                    <p key={index}>{data.stat.name}</p>
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
                          value={data.base_stat}
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
              test2
            </CustomTabPanel>

            <CustomTabPanel index={3} value={value}>
              test3
            </CustomTabPanel>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PokeDetail;
