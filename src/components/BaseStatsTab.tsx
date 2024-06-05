import { PokeDetailResult } from "../types/pokelist";

import { LinearProgress } from "@mui/material";
type Props = {
  pokeDetailData: PokeDetailResult | undefined;
};

const BaseStatTab = (props: Props) => {
  const { pokeDetailData } = props;
  return (
    <div>
      {pokeDetailData && pokeDetailData !== undefined ? (
        <div className="flex">
          <div className="w-[30%] capitalize">
            {pokeDetailData.stats.map((data, index) => (
              <p key={index} className="">
                {data.stat.name}
              </p>
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
      ) : null}
    </div>
  );
};

export default BaseStatTab;
