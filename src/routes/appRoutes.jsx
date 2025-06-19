import { Routes, Route } from 'react-router-dom';
import loginRoutes from "../features/Login/routes/routes"
import dashboardRoutes from "../features/Dashboard/routes/routes"
import storeRoutes from '../features/Store/routes/routes';
import designerRoutes from '../features/Designer/routes/routes';

const AppRoutes = () => (
  <Routes>
    {/* {loginRoutes} */}
    {dashboardRoutes}
    {storeRoutes}
    {designerRoutes}
    {/* Ruta de error o fallback */}
    <Route path="*" element={<div>Página no encontrada</div>} />
  </Routes>
);

export default AppRoutes; 