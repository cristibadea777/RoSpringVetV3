import { useEffect, useState } from "react";
import "./App.css";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { getAllObiecte, getPoza } from "./components/LoginRegister/AccesareAPI";
import Animale from "./components/Tabele/Animale/Animale";
import Angajati from "./components/Tabele/Angajati/Angajati";
import Stapani from "./components/Tabele/Stapani/Stapani";
import Vizite from "./components/Tabele/Vizite/Vizite";
import Tratamente from "./components/Tabele/Tratamente/Tratamente";
import Programari from "./components/Tabele/Programari/Programari";

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

  const [stapani,           setStapani]           = useState([])
  const [angajati,          setAngajati]          = useState([])
  const [animale,           setAnimale]           = useState([])
  const [vizite,            setVizite]            = useState([])
  const [tratamente,        setTratamente]        = useState([])
  const [programari,        setProgramari]        = useState([])

  const [viewAngajati,      setViewAngajati]      = useState('')
  const [viewStapani,       setViewStapani]       = useState('')
  const [viewAnimale,       setViewAnimale]       = useState('')
  const [viewVizite,        setViewVizite]        = useState('')
  const [viewTratamente,    setViewTratamente]    = useState('')
  const [viewProgramari,    setViewProgramari]    = useState('')

  const [pozeAnimale,       setPozeAnimale]       = useState([])
  const [pozeAngajati,      setPozeAngajati]      = useState([])
  const [pozeStapani,       setPozeStapani]       = useState([])

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

  //cale folder poze, poza (prima oara default din folder), lista de elemente (animale, stapani, angajati)
  const getPoze = async ({caleFolderPoze, poza, lista, setListaPoze}) => {
    const poze = {}
    try {
      const chei = Object.keys(lista[0]) //luam cheile din primul element
      const cheieId = chei.find(key => key.includes('Id')) //luam numele cheii care contine 'Id' (animalId, stapanId, angajatId)
      lista.map(async (elementLista) => {
        if((elementLista.imagine !== null) && (elementLista.imagine !== ""))
          poza = elementLista.imagine
        const base64 = await getPoza({ jwtToken, apiEndpoint: `${api}${caleFolderPoze}${poza}` });
        poze[elementLista[cheieId]] = base64 //pe pozitia ID-ului elementului din lista punem poza
      })
      setListaPoze(poze);
    } catch (error) { console.error(error) }
  }
  
  useEffect(
    () => {
      if(authority === 'USER')
        populareListeStapan({jwtToken})
      else if(authority === 'ADMIN')
        populareListeAngajat({jwtToken})
    }, [jwtToken]
  ) 

  useEffect(
    () => {
      if(animale.length !== 0){
        getPoze({caleFolderPoze: '/resources/poze_animale/', poza: 'animal_default.png', lista: animale, setListaPoze: setPozeAnimale})
      }
    }, [animale]
  )

  useEffect(
    () => {
      if(angajati.length !== 0){
        getPoze({caleFolderPoze: '/resources/poze_angajati/', poza: 'angajat_default.png', lista: angajati, setListaPoze: setPozeAngajati})
      }
    }, [angajati]
  )

  useEffect(
    () => {
      if(stapani.length !== 0){
        getPoze({caleFolderPoze: '/resources/poze_stapani/', poza: 'stapan_default.png', lista: stapani, setListaPoze: setPozeStapani})
      }
    }, [stapani]
  )

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
      />)}
      {viewDashboard && (
      <Dashboard 
        username              = {username}
        authority             = {authority}
        userConectat          = {userConectat}
        pozaProfil            = {pozaProfil}
      />)}
      {viewAnimale && (
      <Animale 
        animale               = {animale} 
        pozeAnimale           = {pozeAnimale}
      />)}
      {viewAngajati && (
      <Angajati
        angajati              = {angajati}
        pozeAngajati          = {pozeAngajati}
      />)}
      {viewStapani && (
      <Stapani 
        stapani               = {stapani}
        pozeStapani           = {pozeStapani}
      />)}
      {viewVizite && (
      <Vizite 
        vizite                = {vizite}
        pozeAnimale           = {pozeAnimale}
        pozeStapani           = {pozeStapani}
        pozeAngajati          = {pozeAngajati}
      />)}
      {viewTratamente && (
      <Tratamente 
        tratamente            = {tratamente}
        pozeAnimale           = {pozeAnimale}
      />)}
      {viewProgramari && (
      <Programari
        programari            = {programari}
        pozeAnimale           = {pozeAnimale}
        pozeStapani           = {pozeStapani}
      />)}


    </div>
  )
}
export default App;
