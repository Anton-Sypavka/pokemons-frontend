import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { battleSelector } from "../../../store/selectors/battle-selector";
import { PokemonCard } from "../../molecules/pokemon-card";
import { Button } from "../../atoms/button";
import { getBattle } from "../../../store/battle-slice";
import { useParams } from "react-router-dom";
import './style.scss';

export const BattleView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const battle = useSelector(battleSelector);

  useEffect(() => {
    if (battle) return;

    dispatch(getBattle(id));
  }, [dispatch, battle]);

  return (
    <div>
      { battle
        && <div className='battle-container'>
            <PokemonCard pokemon={battle.usersPokemon} />
            <Button text='Attack' color="danger" variant="solid" size='large' />
            <PokemonCard pokemon={battle.computersPokemon} />
          </div>
      }
    </div>
  )
}