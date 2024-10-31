import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from '../../atoms/logo';
import { Button } from '../../atoms/button';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithMetamask, logOut, clearError } from '../../../store/auth-slice';
import { userErrorSelector, userLoadingSelector, userSelector } from '../../../store/selectors/auth-selector';
import { Alert } from '../../atoms/alert';
import { battleLoadingSelector, selectedPokemonSelector } from '../../../store/selectors/battle-selector';
import { startBattle } from "../../../store/battle-slice";
import './style.scss';

const LOCAL_ERROR = 'Please install metamask wallet'

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [localError, setLocalError] = useState(null);
  const user = useSelector(userSelector);
  const loading = useSelector(userLoadingSelector);
  const battleLoading = useSelector(battleLoadingSelector);
  const error = useSelector(userErrorSelector);
  const selectedPokemon = useSelector(selectedPokemonSelector);
  const isStartBtnVisible = selectedPokemon && !location.pathname.startsWith('/battle') && user;

  const onAuthWithMetamask = () => {
    if (!window.ethereum?.isMetaMask) {
      setLocalError(LOCAL_ERROR);
      return;
    }
    dispatch(loginWithMetamask());
  }

  const onLogOut = () => {
    dispatch(logOut());
  }

  const onClearError = () => {
    setLocalError(null);
    dispatch(clearError());
  }

  const onStartGame = async () => {
    const { payload } = await dispatch(startBattle({ pokemonId: selectedPokemon?._id}));

    navigate(`/battle/${payload?._id}`);
  }

  return (
    <header>
      <nav className='nav-menu'>
        <div className='nav-menu__container'>
          <div onClick={() => navigate('/')} className="nav-menu__logo">
            <Logo />
          </div>
          { isStartBtnVisible && <Button color="danger" variant="solid" text='Start Game' onClick={onStartGame} loading={battleLoading} /> }
          { user
            ? <div className="nav-menu__user-login">
                <p>{user.address}</p>
                <Button variant="outlined" text='Logout' onClick={onLogOut} loading={loading}></Button>
              </div>
            : <Button variant="outlined" text='Login wit MetaMask' onClick={onAuthWithMetamask} loading={loading}></Button>
          }
        </div>
      </nav>
      { (error || localError) && <Alert message={error || localError} type='error' closable onClose={onClearError}/> }
    </header>
  )
}