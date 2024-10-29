import { Header } from '../../organisms/header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from '../../../store/auth-slice';
import { Main } from "../../organisms/main";

const MainTemplate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main />
    </>
  )
}

export default MainTemplate;