import { PokeDetailResult, DetailAttribute } from "../types/pokelist";
import { backgroundType } from "../utils/constants";

type Props = {
  pokeDetailData: PokeDetailResult | undefined;
  evolutionList: DetailAttribute[];
};

const EvolutionTab = (props: Props) => {
  const { pokeDetailData, evolutionList } = props;
  return (
    <div>
      <div className="flex justify-center">
        {evolutionList.map((data, index) => (
          <div className="mx-2" key={index}>
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
    </div>
  );
};

export default EvolutionTab;
