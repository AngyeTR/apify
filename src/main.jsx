import { BrowserRouter as Router} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

// En tu componente o lugar donde lo necesites
useEffect(() => {
  const grid = GridStack.init();
  // Aquí puedes usar grid como necesites
}, []);

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)


