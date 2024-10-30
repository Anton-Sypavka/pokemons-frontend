import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  battleCurrentActionSelector, battleHPSelector,
  battleSelector, battleWinnerSelector
} from "../../../store/selectors/battle-selector";
import { PokemonCard } from "../../molecules/pokemon-card";
import { Button } from "../../atoms/button";
import {
  clearBattleState,
  COMPUTER_ACTION,
  getBattle,
  makeAction, quitBattle,
  setCurrentAction,
  setHP,
  USER_ACTION
} from "../../../store/battle-slice";
import './style.scss';

export const BattleView = () => {
  const battle = useSelector(battleSelector);
  const currentAction = useSelector(battleCurrentActionSelector);
  const hp = useSelector(battleHPSelector);
  const winner = useSelector(battleWinnerSelector);

  const { id } = useParams();
  const dispatch = useDispatch();

  const attack = () => {
    dispatch(makeAction({
      battleId: battle._id,
      pokemonId: battle[currentAction]._id
    }));
  }

  const onAttackClick = () => {
    dispatch(setCurrentAction(USER_ACTION));

    attack();
  }

  useEffect(() => {
    if (battle) {
      dispatch(setHP({
        usersPokemon: battle.usersPokemon.hp,
        computersPokemon: battle.computersPokemon.hp,
      }));
    }

    if (!battle?.isFinished && battle?.computersPokemon.speed > battle?.usersPokemon.speed) {
      dispatch(setCurrentAction(COMPUTER_ACTION));
    }

    if (!battle) {
      dispatch(getBattle(id));
    }
  }, [dispatch, battle, id]);

  useEffect(() => {
    if (battle && currentAction === COMPUTER_ACTION) {
      setTimeout(() => {
        attack();
      }, 2000)
    }
  }, [currentAction]);

  useEffect(() => {
    return () => {
      dispatch(clearBattleState());
      dispatch(quitBattle(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      { winner && <div className='winner-info'>Winner: {winner.winnerName}</div>}
      { battle
        && <div className='battle-container'>
            <div className='battle-container__card'>
              <PokemonCard
                pokemon={{...battle.usersPokemon, hp: hp?.usersPokemon}}
                isActive={currentAction === USER_ACTION}
              />
            </div>

            <Button text='Attack' color="danger" variant="solid" size='large' disabled={currentAction === COMPUTER_ACTION || winner || battle.isFinished} onClick={onAttackClick} />

            <div className='battle-container__card'>
              <PokemonCard
                pokemon={{...battle.computersPokemon, hp: hp?.computersPokemon}}
                isActive={currentAction === COMPUTER_ACTION}
                loading={currentAction === COMPUTER_ACTION && !winner}
              />
            </div>
          </div>
      }
    </div>
  )
}