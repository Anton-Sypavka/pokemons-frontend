import { Header } from '../../organisms/header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from '../../../store/auth-slice';

const MainTemplate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return (
    <>
      <Header />
    </>
  )
}

export default MainTemplate;