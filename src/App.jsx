import { Routes, Route, Navigate} from "react-router-dom"
import { getToken } from "./services/cookies"
import { HomePage} from "./pages/HomePage/HomePage"
import { ModulePage } from "./pages/ModulePage/ModulePage"
import { WizardPage } from "./pages/WizardPage/WizardPage"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { useLocalStorage } from "./hooks/useLocalStorage"

function App() {
  let token  = getToken()
  const modules = useLocalStorage("modules")?.[0]
  let adaptedModules = {}
  // modules.map(module=>{adaptedModules[module.module.name] = []})
  modules.map(module=>{adaptedModules[module.module.name] = {options:[], id:module.module.id, name:module.module.name}})
  modules.map(module => adaptedModules[module.module.name].options.push(module.name))
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="" element={token ? <HomePage /> : <Navigate replace to={"/login"}/> } />
      <Route path="/wizard" element={token ? <WizardPage/> : <Navigate replace to={"/login"}/> } />
      <Route path="/:module/:option" element={token ? <ModulePage /> : <Navigate replace to={"/login"}/> } /> 
      <Route path="/:module" element={token ?<ModulePage /> : <Navigate replace to={"/login"}/> } />
    </Routes>
  )}
export default App
