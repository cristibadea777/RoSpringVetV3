import { useState } from "react";
import "./App.css";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  
  //#232B2B #1e1e1e #11574a

  const [viewLoginRegister, setViewLoginRegister] = useState(true)
  const [viewDashboard,     setViewDashboard]     = useState(false)
  
  const [jwtToken,          setJwtToken]          = useState('')
  const [username,          setUsername]          = useState('')
  const [authority,         setAuthority]         = useState('')


  return (
    <div className="container-principal">
      <Navbar 
        viewLoginRegister       = {viewLoginRegister}
      />
      {viewLoginRegister && (
        <LoginRegister
          setViewLoginRegister  = {setViewLoginRegister}
          setViewDashboard      = {setViewDashboard}
          setJwtToken           = {setJwtToken}
          setUsername           = {setUsername}
          setAuthority          = {setAuthority}
        />
      )}
      {viewDashboard && (
        <Dashboard 
          jwtToken              = {jwtToken}
          username              = {username}
          authority             = {authority}
        />
      )}
    </div>
  )
}
export default App;
