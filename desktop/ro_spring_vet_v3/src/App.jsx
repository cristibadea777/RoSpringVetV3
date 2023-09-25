import { useState } from "react";
import "./App.css";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Titlu from "./components/Titlu/Titlu";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  
  //#232B2B #1e1e1e #11574a

  const [viewLoginRegister, setViewLoginRegister] = useState(true)
  const [viewDashboard,     setViewDashboard]     = useState(false)
  const [jwtToken,          setJwtToken]          = useState('')

  return (
    <div className="container-principal">
      <Titlu 
        viewLoginRegister       = {viewLoginRegister}
        viewDashboard           = {viewDashboard}
      />
      {viewLoginRegister && (
        <LoginRegister
          setViewLoginRegister  = {setViewLoginRegister}
          setViewDashboard      = {setViewDashboard}
          setJwtToken           = {setJwtToken}
        />
      )}
      {viewDashboard && (
        <Dashboard 
          jwtToken              = {jwtToken}
        />
      )}
    </div>
  )
}
export default App;
