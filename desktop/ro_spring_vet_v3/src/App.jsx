import { useEffect, useState } from "react";
import "./App.css";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { getStapanConectat } from "./components/LoginRegister/AccesareAPI";

function App() {
  
  //#232B2B #1e1e1e #11574a

  const [viewLoginRegister, setViewLoginRegister] = useState(true)
  const [viewDashboard,     setViewDashboard]     = useState(false)
  
  const [jwtToken,          setJwtToken]          = useState('')
  const [authority,         setAuthority]         = useState('')
  const [username,          setUsername]          = useState('')

  const [stapanConectat,    setStapanConectat]    = useState('')
  const [stapanImgDefault,  setStapanImgDefault]  = useState('')
  
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
          setStapanConectat     = {setStapanConectat}
          setStapanImgDefault   = {setStapanImgDefault}
        />
      )}
      {viewDashboard && (
        <Dashboard 
          jwtToken              = {jwtToken}
          username              = {username}
          authority             = {authority}
          stapanConectat        = {stapanConectat}
          stapanImgDefault      = {stapanImgDefault}
        />
      )}
    </div>
  )
}
export default App;
