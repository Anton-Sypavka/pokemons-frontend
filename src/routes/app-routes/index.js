import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from "../../components/pages/home";
import { Battle } from "../../components/pages/battle";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/battle/:id' element={<Battle />}/>
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  )
}