import { AppRoutes } from "../../../routes/app-routes";
import './style.scss';

export const Main = () => {
  return (
    <main>
      <div className='container'>
        <AppRoutes />
      </div>
    </main>
  )
}