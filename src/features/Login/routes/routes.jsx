import {Route} from "react-router-dom"
import { LoginPage } from "../../Store/pages/LoginPage";

const loginRoutes = [
  <Route key="login" path="/login" element={<LoginPage />} />,
];

export default loginRoutes;