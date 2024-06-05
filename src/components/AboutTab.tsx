import {
  PokeDetailResult,
  PokeDetailAbility,
  PokeSpecies,
} from "../types/pokelist";

type Props = {
  pokeDetailData: PokeDetailResult | undefined;
  pokeSpeciesData: PokeSpecies | undefined;
};

const AboutTab = (props: Props) => {
  const { pokeDetailData, pokeSpeciesData } = props;
  return (
    <div>
      {pokeDetailData && pokeDetailData !== undefined ? (
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
      ) : null}
    </div>
  );
};

export default AboutTab;
