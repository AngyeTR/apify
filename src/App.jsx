import { Routes, Route, Navigate, useParams} from "react-router-dom"
import { getToken } from "./shared/services/cookies"
import { useEffect } from "react"
import { LoginPage } from "./features/Dashboard/pages/LoginPage/LoginPage"
import loginRoutes from "./features/Login/routes/routes"
import dashboardRoutes from "./features/Dashboard/routes/routes"
import storeRoutes from "./features/Store/routes/routes"
import designerRoutes from "./features/Designer/routes/routes"
import { NotFoundPage } from "./shared/pages/NotFoundPage"
import { ViewPageStatic } from "./features/Designer/Pages/ViewPageStatic"
import chatRoutes from "./features/Chat/routes/routes"


function App() {
  const params = useParams()

  useEffect(()=>{},[ , params])

  let token  = getToken()
 
  return (
    <Routes className="Rutas">
    <Route  path="/login" element={<LoginPage />} />
    <Route  path="/prueba-de-carga" element={<ViewPageStatic />} />
    <Route  path="" element={token ? <Navigate replace to={"/dashboard"}/> :<Navigate replace to={"/login"}/>} />
    <Route path="*" element={token ? <NotFoundPage logged={true}/> : <Navigate replace to={"/login"}/>} />
    {token && dashboardRoutes}
    {token && storeRoutes}
    {token && designerRoutes}
    {token && chatRoutes}
  </Routes>
  )}
export default App
