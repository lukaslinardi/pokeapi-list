import { PokeDetailResult } from "../types/pokelist";

type Props = {
  pokeDetailData: PokeDetailResult | undefined;
};

const MovesTab = (props: Props) => {
  const { pokeDetailData } = props;
  return (
    <div>
      <p>Moves learned when level 1</p>
      {pokeDetailData && pokeDetailData !== undefined ? (
        <div className="grid grid-cols-2 gap-3 p-3 flex">
          {pokeDetailData.moves
            .filter(
              (item) => item.version_group_details[0].level_learned_at === 1,
            )
            .slice(0, 4)
            .map((data, index) => (
              <div
                key={index}
                className="flex justify-center rounded-md bg-red-500"
              >
                <p className="text-center p-3 font-bold capitalize" key={index}>
                  {data.move.name}
                </p>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default MovesTab;
