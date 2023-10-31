import { useState, useEffect } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import "../Tabele.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import Pagini from "../../Pagini/Pagini"
import DetaliiAnimal from "./DetaliiAnimal"
import { getPozePagina } from "../../AccesareAPI"

const Animale = ( {animale, setAnimale, stapani, setStapani, viewAnimale, vizite, programari, tratamente, angajati, api, jwtToken} ) => {

    const [viewDetaliiAnimal,   setViewDetaliiAnimal]   = useState('')
    const [animalCurent,        setAnimalCurent]        = useState('')

    const [textFiltru,      setTextFiltru] = useState('')
    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const filtrareAnimale = (animale) => {
        return animale.filter((animal) => {
            const textCautat = textFiltru.toLowerCase()
            return(
                animal.nume.toLowerCase().includes(textCautat) ||
                animal.rasa.toLowerCase().includes(textCautat) ||
                animal.specie.toLowerCase().includes(textCautat) ||
                animal.stapan.nume.toLowerCase().includes(textCautat)
            )
        })
    }
    const animaleFiltrate = filtrareAnimale(animale)

    const [pozePaginaAnimale, setPozePaginaAnimale] = useState([]) 
    const [paginaAnimale,     setPaginaAnimale]     = useState([])
    const updatePozePagina = () => {
        if(paginaAnimale.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_animale/', 
                poza:           'animal_default.png', 
                lista:          paginaAnimale, 
                setListaPoze:   setPozePaginaAnimale, 
                jwtToken, 
                api,
            })
        }
    }
    useEffect( () => { updatePozePagina() }, [paginaAnimale] )
    
    const handleShowModalAnimal = (animal) => {
        setAnimalCurent(animal)
        setViewDetaliiAnimal(true)
    }

    return(
        <div className="containerPrincipal">

            {viewDetaliiAnimal && (
                <DetaliiAnimal 
                    animalCurent            = {animalCurent}
                    animale                 = {animale}
                    setAnimale              = {setAnimale}
                    stapani                 = {stapani}
                    setStapani              = {setStapani}
                    programari              = {programari}
                    tratamente              = {tratamente}
                    vizite                  = {vizite}
                    angajati                = {angajati}
                    setViewDetaliiAnimal    = {setViewDetaliiAnimal}
                    api                     = {api}
                    jwtToken                = {jwtToken}
                />
            )}
            
            <TitluSiFiltru 
                titlu={"Animale"}
                filtru={textFiltru}
                functie={handleChangeTextFiltru}
            />

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Imagine</th>
                            <th>Nume</th>
                            <th>Stăpân</th>
                            <th>Specie</th>
                            <th>Rasă</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginaAnimale.map((animal, index)=>(
                            <tr key={index}>
                                <td><img src={pozePaginaAnimale[index]} height="55" width="55"/></td>
                                <td>{animal.nume}</td>
                                <td>{animal.stapan.nume}</td>
                                <td>{animal.specie}</td>
                                <td>{animal.rasa}</td>
                                <td>
                                    <div><button onClick={() => handleShowModalAnimal(animal)}><FontAwesomeIcon icon={faBars} color="white"></FontAwesomeIcon></button></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagini 
                lista                = {animale} 
                viewTabel            = {viewAnimale}
                listaObiecteFiltrate = {animaleFiltrate}
                setPaginaTabel       = {setPaginaAnimale}
                textFiltru           = {textFiltru}
            />
            
        </div>
    )
}
export default Animale