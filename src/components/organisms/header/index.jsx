import { Logo } from '../../atoms/logo';
import { Button } from '../../atoms/button';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithMetamask, logOut, clearError } from '../../../store/auth-slice';
import { userErrorSelector, userLoadingSelector, userSelector } from '../../../store/selectors/auth-selector';
import { Alert } from "../../atoms/alert";
import './style.scss';

export const Header = () => {
  const user = useSelector(userSelector);
  const loading = useSelector(userLoadingSelector);
  const error = useSelector(userErrorSelector);
  const dispatch = useDispatch();

  const onAuthWithMetamask = () => {
    dispatch(loginWithMetamask());
  }

  const onLogOut = () => {
    dispatch(logOut());
  }

  const onClearError = () => {
    dispatch(clearError());
  }

  return (
    <header>
      <nav className='nav-menu'>
        <div className='nav-menu__container'>
          <div className="nav-menu__logo">
            <Logo />
          </div>
          { user
            ? <div className="nav-menu__user-login">
                <p>{user.address}</p>
                <Button variant="outlined" text='Logout' onClick={onLogOut} loading={loading}></Button>
              </div>
            : <Button variant="outlined" text='Login wit MetaMask' onClick={onAuthWithMetamask} loading={loading}></Button>
          }
        </div>
      </nav>
      { error && <Alert message={error} type='error' closable onClose={onClearError}/> }
    </header>
  )
}