import { useState, useEffect } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import "../Tabele.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"
import ModalDetaliiEntitate from "../DetaliiEntitate/ModalDetaliiEntitate"

const Animale = ( {animale, setAnimale, vizite, programari, tratamente, angajati, viewAnimale, api, jwtToken, entitateCurenta, setEntitateCurenta, viewDetaliiEntitate, setViewDetaliiEntitate, pozaEntitateCurenta, setPozaEntitateCurenta} ) => {

    const [paginaAnimale,   setPaginaAnimale]   = useState([])
    const [pozePagina,      setPozePagina]      = useState([])
    useEffect(
        () => {
          if(paginaAnimale.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_animale/', 
                poza: 'animal_default.png', 
                lista: paginaAnimale, 
                setListaPoze: setPozePagina, 
                jwtToken, 
                api,
            })
          }
        }, [paginaAnimale]
    )

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
        
    const handleShowModalAnimal = (animal, index) => {
        setEntitateCurenta(animal)
        setViewDetaliiEntitate(true)
        setPozaEntitateCurenta(pozePagina[index])
    }

    return(
        <div className="containerPrincipal">

            {viewDetaliiEntitate && (
            <ModalDetaliiEntitate
                listaEntitate          = {animale}
                setListaEntitate       = {setAnimale}
                viewAnimale            = {viewAnimale}
                entitateCurenta        = {entitateCurenta}
                vizite                 = {vizite}
                programari             = {programari}
                tratamente             = {tratamente}
                angajati               = {angajati}
                pozaEntitateCurenta    = {pozaEntitateCurenta}
                setPozaEntitateCurenta = {setPozaEntitateCurenta}
                setEntitateCurenta     = {setEntitateCurenta}
                setViewDetaliiEntitate = {setViewDetaliiEntitate}
                api                    = {api}
                jwtToken               = {jwtToken}
            />)}
            
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
                                <td>
                                    <img 
                                        src={pozePagina[index]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{animal.nume}</td>
                                <td>{animal.stapan.nume}</td>
                                <td>{animal.specie}</td>
                                <td>{animal.rasa}</td>
                                <td>
                                    <div><button onClick={() => handleShowModalAnimal(animal, index)}><FontAwesomeIcon icon={faBars} color="white"></FontAwesomeIcon></button></div>
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