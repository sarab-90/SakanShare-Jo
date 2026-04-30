import './App.css'
import { useEffect } from "react";
import api from './services/api.js';

function App() {
  useEffect(() => {
      const testApi = async () => {
        try {
          const data = {
          email: "sarab@admin.com",
          password: "Sarab1990@@",
        };

        const res = await api.post("/login", data);

        console.log("SUCCESS ", res.data);

        localStorage.setItem("accessToken", res.data.accessToken);
      } catch (err) {
        console.log("API ERROR ", err.response?.data || err.message);
      }
      };
  
      testApi();
    }, []);
  
  return (
    <>
     <h1>Test API</h1>;
    </>
  )
}

export default App
