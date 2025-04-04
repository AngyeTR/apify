import { Routes, Route, Navigate} from "react-router-dom"
import { getToken } from "./services/cookies"
import { HomePage} from "./pages/HomePage/HomePage"
import { ModulePage } from "./pages/ModulePage/ModulePage"
import { WizardPage } from "./pages/WizardPage/WizardPage"
import { LoginPage } from "./pages/LoginPage/LoginPage"

function App() {
  let token  = getToken()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="" element={token ? <HomePage /> : <Navigate replace to={"/login"}/> } />
      <Route path="/wizard" element={token ? <WizardPage/> : <Navigate replace to={"/login"}/> } />
      <Route path="/:module/:option" element={token ? <ModulePage /> : <Navigate replace to={"/login"}/> } />
      <Route path="/:module" element={token ?<ModulePage /> : <Navigate replace to={"/login"}/> } />
    </Routes>
  )
}
export default App
