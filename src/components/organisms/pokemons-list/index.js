import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPokemonsState, getPokemons } from "../../../store/pokemons-slice";
import { pokemonsLoadingSelector, pokemonsSelector, totalSelector } from "../../../store/selectors/pokemons-selector";
import { PokemonCard } from "../../molecules/pokemon-card";
import { Button } from "../../atoms/button";
import { setSelectedPokemon } from "../../../store/battle-slice";
import { selectedPokemonSelector } from "../../../store/selectors/battle-selector";
import './style.scss';

const PER_PAGE = 12;

export const PokemonsList = () => {
  const [page, setPage] = useState(1);

  const pokemons = useSelector(pokemonsSelector);
  const selectedPokemon = useSelector(selectedPokemonSelector);
  const total = useSelector(totalSelector);
  const loading = useSelector(pokemonsLoadingSelector);

  const dispatch = useDispatch();

  const selectPokemon = (pokemon) => {
    if (pokemon._id === selectedPokemon?._id) {
      dispatch(setSelectedPokemon(null));
      return;
    }

    dispatch(setSelectedPokemon(pokemon));
  }

  const loadMorePokemons = () => {
    setPage((prevState) => prevState += 1);
  }

  useEffect(() => {
    dispatch(getPokemons({ page, perPage: PER_PAGE }))
  }, [dispatch, page]);

  useEffect(() => {
    return () => {
      dispatch(clearPokemonsState());
    }
  }, [dispatch]);

  return (
      <div className='card-list'>
        <div className='card-list__container'>
          { pokemons.map(pokemon => <PokemonCard
            key={pokemon._id}
            pokemon={pokemon}
            onClick={() => selectPokemon(pokemon)}
            isActive={pokemon._id === selectedPokemon?._id}
          />) }
        </div>
        <div className='card-list__load-more-btn'>
          <Button text='Load more' onClick={loadMorePokemons} loading={loading} disabled={page * PER_PAGE > total} />
        </div>
      </div>
  )
}