import { useEffect, useState } from "react";
import "./App.css";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  
  //#232B2B #1e1e1e #11574a

  const [viewLoginRegister, setViewLoginRegister] = useState(true)
  const [viewDashboard,     setViewDashboard]     = useState(false)
  
  const [jwtToken,          setJwtToken]          = useState('')
  const [authority,         setAuthority]         = useState('')
  const [username,          setUsername]          = useState('')

  const [userConectat,      setUserConectat]      = useState('')
  const [pozaProfil,        setPozaProfil]        = useState('')
  
  const [numeUser,          setNumeUser]          = useState('')
  const [telefonUser,       setTelefonUser]       = useState('')
  const [animaleUser,       setAnimaleUser]       = useState('')
  const [viziteUser,        setViziteUser]        = useState('')
  const [programariUser,    setProgramariUser]    = useState('')
  const [tratamenteUser,    setTratamenteUser]    = useState('')

  return (
    <div className="container-principal">
      <Navbar 
        viewLoginRegister       = {viewLoginRegister}
        authority               = {authority}
      />
      {viewLoginRegister && (
        <LoginRegister
          setViewLoginRegister  = {setViewLoginRegister}
          setViewDashboard      = {setViewDashboard}
          setJwtToken           = {setJwtToken}
          setUsername           = {setUsername}
          setAuthority          = {setAuthority}
          setUserConectat       = {setUserConectat}
          setPozaProfil         = {setPozaProfil}
        />
      )}
      {viewDashboard && (
        <Dashboard 
          jwtToken              = {jwtToken}
          username              = {username}
          authority             = {authority}
          userConectat          = {userConectat}
          pozaProfil            = {pozaProfil}
        />
      )}
    </div>
  )
}
export default App;
