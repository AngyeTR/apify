import { BrowserRouter as Router} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'gridstack/dist/gridstack.min.css';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import "tailwindcss/index.css"

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
 

