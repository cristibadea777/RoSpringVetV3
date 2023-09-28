import { useEffect, useState } from "react";
import "./App.css";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  
  //#232B2B #1e1e1e #11574a

  const api = "http://localhost:8000"

  const [viewLoginRegister, setViewLoginRegister] = useState(true)
  const [viewDashboard,     setViewDashboard]     = useState(false)
  
  const [jwtToken,          setJwtToken]          = useState('')
  const [authority,         setAuthority]         = useState('')
  const [username,          setUsername]          = useState('')
  const [userConectat,      setUserConectat]      = useState('')
  const [pozaProfil,        setPozaProfil]        = useState('')
  //pt stapan
  const [animaleUser,       setAnimaleUser]       = useState('')
  const [viziteUser,        setViziteUser]        = useState('')
  const [programariUser,    setProgramariUser]    = useState('')
  const [tratamenteUser,    setTratamenteUser]    = useState('')
  //pt angajat
  const [animale,           setAnimale]           = useState('')
  const [stapani,           setStapani]           = useState('')
  const [angajati,          setAngajati]          = useState('')
  const [vizite,            setVizite]            = useState('')
  const [tratamente,        setTratamente]        = useState('')
  const [programari,        setProgramari]        = useState('')

  
  useEffect(
    () => {
      console.log(angajati + "\n" + animale + "\n" + stapani + "\n" + vizite + "\n" + tratamente + "\n" + programari)
    }, [angajati, animale, stapani, vizite, tratamente, programari]
  ) 


  return (
    <div className="container-principal">
      <Navbar 
        api                     = {api}
        viewLoginRegister       = {viewLoginRegister}
        setViewLoginRegister    = {setViewLoginRegister}
        viewDashboard           = {viewDashboard}
        setViewDashboard        = {setViewDashboard}
        authority               = {authority}
        setAuthority            = {setAuthority}
        jwtToken                = {jwtToken}
        setJwtToken             = {setJwtToken}
      />
      {viewLoginRegister && (
        <LoginRegister
          api                   = {api}
          setViewLoginRegister  = {setViewLoginRegister}
          setViewDashboard      = {setViewDashboard}
          setJwtToken           = {setJwtToken}
          setUsername           = {setUsername}
          setAuthority          = {setAuthority}
          setUserConectat       = {setUserConectat}
          setPozaProfil         = {setPozaProfil}
          setAnimale            = {setAnimale}
          setStapani            = {setStapani}
          setAngajati           = {setAngajati}
          setProgramari         = {setProgramari}
          setTratamente         = {setTratamente}
          setVizite             = {setVizite}
        />
      )}
      {viewDashboard && (
        <Dashboard 
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
