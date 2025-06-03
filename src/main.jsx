import { BrowserRouter as Router} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import { useEffect } from "react";

// useEffect(() => {
//   const grid = GridStack.init();
// }, []);

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)


