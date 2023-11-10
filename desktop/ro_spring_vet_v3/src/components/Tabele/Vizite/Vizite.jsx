import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"
import Vizita from "./Vizita"
import DetaliiAnimal from "../Animale/DetaliiAnimal"

const Vizite = ({vizite, viewVizite, setVizite, api, jwtToken, animale, setAnimale, stapani, setStapani, programari, setProgramari, tratamente, angajati}) => {

    const [paginaVizite, setPaginaVizite]  = useState([])
    const [pozePagina,   setPozePagina]    = useState([])
    useEffect(
        () => {
          if(paginaVizite.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_animale/', 
                poza: 'animal_default.png', 
                lista: paginaVizite, 
                setListaPoze: setPozePagina, 
                jwtToken, 
                api,
            })
          }
        }, [paginaVizite]
    )

    const [textFiltru, setTextFiltru] = useState('')

    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const filtrareVizite = (vizite) => {
        console.log(vizite)
        return vizite.filter((vizita) => {
            const textCautat = textFiltru.toLowerCase()
            return(
                vizita.animalId.nume.toLowerCase().includes(textCautat)  ||
                vizita.stapanId.nume.toLowerCase().includes(textCautat)  ||
                vizita.angajatId.nume.toLowerCase().includes(textCautat) ||
                vizita.motiv.toLowerCase().includes(textCautat)          ||
                vizita.dataVizita.toLowerCase().includes(textCautat) 
            )
        })
    }
    const viziteFiltrate = filtrareVizite(vizite)

    const [viewDetaliiVizita, setViewDetaliiVizita] = useState(false)
    const [vizitaCurenta,     setVizitaCurenta]     = useState(null)
    const handleViewVizitaCurenta = (vizita) => {
        setVizitaCurenta    (vizita)
        setViewDetaliiVizita(true)
    }

    const [viewDetaliiAnimal, setViewDetaliiAnimal] = useState(false)

    const [textRaspuns,            setTextRaspuns]            = useState('')
    const [viewRaspuns,            setViewRaspuns]            = useState(false)

    return(
        <div className="containerPrincipal">

            {viewDetaliiAnimal && (
                <DetaliiAnimal 
                    animalCurent            = {vizitaCurenta.animalId}
                    animale                 = {animale}
                    setAnimale              = {setAnimale}
                    stapani                 = {stapani}
                    setStapani              = {setStapani}
                    programari              = {programari}
                    tratamente              = {tratamente}
                    vizite                  = {vizite}
                    setVizite               = {setVizite}
                    setProgramari           = {setProgramari}
                    angajati                = {angajati}
                    setViewDetaliiAnimal    = {setViewDetaliiAnimal}
                    api                     = {api}
                    jwtToken                = {jwtToken}
                    viewButonStapan         = {true}
                />
            )}
            
            {viewDetaliiVizita && (
                <Vizita 
                    vizitaCurenta         = {vizitaCurenta}
                    animalCurent          = {vizitaCurenta.animalId}
                    vizite                = {vizite}
                    tratamente            = {tratamente}
                    setTextRaspuns        = {setTextRaspuns}
                    setViewRaspuns        = {setViewRaspuns}
                    setVizite             = {setVizite}
                    setVizitaCurenta      = {setVizitaCurenta}
                    setViewDetaliiVizita  = {setViewDetaliiVizita}
                    setViewDetaliiAnimal  = {setViewDetaliiAnimal}
                    api                   = {api}
                    jwtToken              = {jwtToken}
                />
            )}

            <TitluSiFiltru 
                titlu={"Vizite"}
                filtru={textFiltru}
                functie={handleChangeTextFiltru}
            />

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Imagine</th>
                            <th>Dată</th>
                            <th>Animal</th>
                            <th>Stăpân</th>
                            <th>Motiv</th>
                            <th>Angajat</th>
                            <th></th>
                        </tr>
                    </thead >
                    <tbody>
                        {paginaVizite.map((vizita, index)=>(
                            <tr key={index}>
                                <td>
                                    <img src={pozePagina[index]} height="55" width="55"/>
                                </td>
                                <td>{vizita.dataVizita}</td>
                                <td>{vizita.numeAnimal}</td>
                                <td>{vizita.numeStapan}</td>
                                <td>{vizita.motiv}</td>
                                <td>{vizita.numeAngajat}</td>
                                <td>
                                    <div> <button className="butonIconita" onClick={() => handleViewVizitaCurenta(vizita)}><FontAwesomeIcon icon={faSearch}/></button> </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagini 
                viewTabel             = {viewVizite}
                listaObiecteFiltrate  = {viziteFiltrate}
                setPaginaTabel        = {setPaginaVizite}
                textFiltru            = {textFiltru} 
            />
            
        </div>
    )
}
export default Vizite