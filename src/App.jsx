import { Routes, Route, Navigate, useParams} from "react-router-dom"
import { getToken } from "./services/cookies"
import { HomePage} from "./pages/HomePage/HomePage"
import { ModulePage } from "./pages/ModulePage/ModulePage"
import { WizardPage } from "./pages/WizardPage/WizardPage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { FormPage } from "./pages/FormPage.jsx/FormPage"

function App() {
  const params = useParams()

  let token  = getToken()
 
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="" element={token ? <HomePage /> : <Navigate replace to={"/login"}/> } />
      <Route path="/wizard" element={token ? <WizardPage/> : <Navigate replace to={"/login"}/> } />
      <Route path="/:module/:option" element={token ? <ModulePage /> : <Navigate replace to={"/login"}/> } /> 
      <Route path="/:module/edit/:option/:id" element={token ? <FormPage /> : <Navigate replace to={"/login"}/> } /> 
      <Route path="/:module/add/:option/" element={token ? <FormPage /> : <Navigate replace to={"/login"}/> } /> 
      <Route path="/:module" element={token ?<ModulePage /> : <Navigate replace to={"/login"}/> } />
      <Route path="/*" element={token ?<h1>No se encontraron resultados</h1> : <Navigate replace to={"/login"}/> } />
    </Routes>
  )}
export default App
