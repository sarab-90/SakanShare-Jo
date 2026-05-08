import './App.css'
import { useEffect } from "react";
import api from './services/api.js';
import Footer from "../src/components/ui/Footer.jsx";
import AppRoutes from './routes/AppRoutes.jsx';
function App() {
  return (
    <>
     <AppRoutes/>
     <Footer/>
    </>
  )
}

export default App;
