import { useEffect, useState } from "react";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { getAllObiecte, getPoza, getPozePagina } from "./components/AccesareAPI";
import Animale from "./components/Tabele/Animale/Animale";
import Angajati from "./components/Tabele/Angajati/Angajati";
import Stapani from "./components/Tabele/Stapani/Stapani";
import Vizite from "./components/Tabele/Vizite/Vizite";
import Tratamente from "./components/Tabele/Tratamente/Tratamente";
import Programari from "./components/Tabele/Programari/Programari";
import ModalDetaliiEntitate from "./components/Tabele/DetaliiEntitate/ModalDetaliiEntitate";

function App() {
  
  //#232B2B #1e1e1e #11574a

  const api = "http://localhost:8000"

  const [jwtToken,            setJwtToken]            = useState('')
  const [authority,           setAuthority]           = useState('')
  const [username,            setUsername]            = useState('')
  const [userConectat,        setUserConectat]        = useState('')
  const [pozaProfil,          setPozaProfil]          = useState('')

  const [stapani,             setStapani]             = useState([])
  const [angajati,            setAngajati]            = useState([])
  const [animale,             setAnimale]             = useState([])
  const [vizite,              setVizite]              = useState([])
  const [tratamente,          setTratamente]          = useState([])
  const [programari,          setProgramari]          = useState([])
  
  const [viewLoginRegister,   setViewLoginRegister]   = useState(true)
  const [viewDashboard,       setViewDashboard]       = useState(false)
  const [viewAngajati,        setViewAngajati]        = useState(false)
  const [viewStapani,         setViewStapani]         = useState(false)
  const [viewAnimale,         setViewAnimale]         = useState(false)
  const [viewVizite,          setViewVizite]          = useState(false)
  const [viewTratamente,      setViewTratamente]      = useState(false)
  const [viewProgramari,      setViewProgramari]      = useState(false)

  const [entitateCurenta,     setEntitateCurenta]     = useState(false)
  const [pozaEntitateCurenta, setPozaEntitateCurenta] = useState('')

  const populareListeStapan = async ({jwtToken}) => {
    setAnimale   (await getAllObiecte({jwtToken, apiEndpoint: `${api}/animale/stapan/getAllAnimaleStapan`}))
    setVizite    (await getAllObiecte({jwtToken, apiEndpoint: `${api}/vizite/stapan/getAllViziteStapan`}))
    setTratamente(await getAllObiecte({jwtToken, apiEndpoint: `${api}/tratamente/stapan/getAllTratamenteStapan`}))
    setProgramari(await getAllObiecte({jwtToken, apiEndpoint: `${api}/programari/stapan/getAllProgramariStapan`}))
  }

  const populareListeAngajat = async ({jwtToken}) => {
    setAngajati  (await getAllObiecte({jwtToken, apiEndpoint: `${api}/angajati/getAllAngajati`}))
    setStapani   (await getAllObiecte({jwtToken, apiEndpoint: `${api}/stapani/angajat/getAllStapani`}))
    setAnimale   (await getAllObiecte({jwtToken, apiEndpoint: `${api}/animale/angajat/getAllAnimale`}))
    setVizite    (await getAllObiecte({jwtToken, apiEndpoint: `${api}/vizite/angajat/getAllVizite`}))
    setTratamente(await getAllObiecte({jwtToken, apiEndpoint: `${api}/tratamente/angajat/getAllTratamente`}))
    setProgramari(await getAllObiecte({jwtToken, apiEndpoint: `${api}/programari/angajat/getAllProgramari`}))
  }

  useEffect(
    () => {
      if(authority === 'USER')
        populareListeStapan({jwtToken})
      else if(authority === 'ADMIN')
        populareListeAngajat({jwtToken})
    }, [jwtToken]
  ) 
  
  const [animalCurent,      setAnimalCurent]      = useState('')
  const [indexAnimalCurent, setIndexAnimalCurent] = useState(0)
  const [pozaAnimalCurent,  setPozaAnimalCurent]  = useState('')
  const [pozePaginaAnimale, setPozePaginaAnimale] = useState([]) 
  const [paginaAnimale,     setPaginaAnimale]     = useState([])


  useEffect(
    () => {
      console.log('aaaa')
      if(paginaAnimale.length !== 0){
        getPozePagina({
            caleFolderPoze: '/resources/poze_animale/', 
            poza: 'animal_default.png', 
            lista: paginaAnimale, 
            setListaPoze: setPozePaginaAnimale, 
            jwtToken, 
            api,
          }
        )
      }
    }, [paginaAnimale]
)


  const [viewDetaliiStapan, setViewDetaliiStapan] = useState(false)
  const [viewDetaliiAnimal, setViewDetaliiAnimal] = useState(false)
  


  return (
    <div className="container-app">
      <Navbar 
        api                     = {api}
        setViewAngajati         = {setViewAngajati}
        setViewStapani          = {setViewStapani}
        setViewAnimale          = {setViewAnimale}
        setViewVizite           = {setViewVizite}
        setViewTratamente       = {setViewTratamente}
        setViewProgramari       = {setViewProgramari}
        viewLoginRegister       = {viewLoginRegister}
        setViewLoginRegister    = {setViewLoginRegister}
        setViewDashboard        = {setViewDashboard}
        setViewDetaliiStapan    = {setViewDetaliiStapan}
        setViewDetaliiAnimal    = {setViewDetaliiAnimal}
        authority               = {authority}
        setAuthority            = {setAuthority}
        jwtToken                = {jwtToken}
        setJwtToken             = {setJwtToken}
      />
      {viewLoginRegister && (
      <LoginRegister
        api                     = {api}
        setViewLoginRegister    = {setViewLoginRegister}
        setViewDashboard        = {setViewDashboard}
        setJwtToken             = {setJwtToken}
        setUsername             = {setUsername}
        setAuthority            = {setAuthority}
        setUserConectat         = {setUserConectat}
        setPozaProfil           = {setPozaProfil}
      />)}
      {viewDashboard && (
      <Dashboard 
        username                = {username}
        authority               = {authority}
        userConectat            = {userConectat}
        pozaProfil              = {pozaProfil}
      />)}
      {viewAnimale && (
      <Animale 
        animale                 = {animale}
        viewAnimale             = {viewAnimale}
        setAnimalCurent         = {setAnimalCurent}
        setIndexAnimalCurent    = {setIndexAnimalCurent}
        pozePaginaAnimale       = {pozePaginaAnimale}
        setPozaAnimalCurent     = {setPozaAnimalCurent}
        setViewDetaliiAnimal    = {setViewDetaliiAnimal}
        paginaAnimale           = {paginaAnimale}
        setPaginaAnimale        = {setPaginaAnimale}
      />)}    
      {viewAngajati && (
      <Angajati
        angajati                = {angajati}
        viewAngajati            = {viewAngajati}
        api                     = {api}
        jwtToken                = {jwtToken}
      />)}
      {viewStapani && (
      <Stapani 
        stapani                 = {stapani}
        viewStapani             = {viewStapani}
        setListaEntitate        = {setListaEntitate}
        api                     = {api}
        jwtToken                = {jwtToken}
      />)}
      {viewVizite && (
      <Vizite 
        vizite                  = {vizite}
        viewVizite              = {viewVizite}
        api                     = {api}
        jwtToken                = {jwtToken}
      />)}
      {viewTratamente && (
      <Tratamente 
        tratamente              = {tratamente}
        viewTratamente          = {viewTratamente}
        api                     = {api}
        jwtToken                = {jwtToken}
      />)}
      {viewProgramari && (
      <Programari
        programari              = {programari}
        viewProgramari          = {viewProgramari}
        api                     = {api}
        jwtToken                = {jwtToken}
      />)}
      
      {viewDetaliiAnimal && (
      <ModalDetaliiEntitate
        paginaEntitate          = {paginaAnimale}
        setPaginaEntitate       = {setPaginaAnimale}
        numeEntitati            = {"animale"}
        animale                 = {animale}
        pozePagina              = {pozePaginaAnimale}
        setListaEntitati        = {setAnimale}
        setViewDetaliiEntitate  = {setViewDetaliiAnimal}
        entitateCurenta         = {animalCurent}
        indexEntitateCurenta    = {indexAnimalCurent}
        pozaEntitate            = {pozaAnimalCurent}
        setPozaEntitate         = {setPozaAnimalCurent}
        angajati                = {angajati}
        vizite                  = {vizite}
        programari              = {programari}
        tratamente              = {tratamente}
        api                     = {api}
        jwtToken                = {jwtToken}
      />)}

    </div>
  )
}
export default App;