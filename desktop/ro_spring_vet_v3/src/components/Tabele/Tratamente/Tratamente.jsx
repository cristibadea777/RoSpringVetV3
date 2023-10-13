import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import Pagini from "../../Pagini/Pagini"

const Tratamente = ({tratamente, viewTratamente, pozeAnimale}) => {

    const [paginaTratamente, setPaginaTratamente] = useState([])
    
    const [textFiltru, setTextFiltru] = useState('')

    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const filtrareTratamente = () => {
        return tratamente.filter((tratament) => {
            const textCautat = textFiltru.toLowerCase()
            return(
                tratament.animalId.nume.toLowerCase().includes(textCautat) ||
                tratament.animalId.stapan.nume.toLowerCase().includes(textCautat) ||
                tratament.dataInceput.toLowerCase().includes(textCautat) ||
                tratament.dataSfarsit.toLowerCase().includes(textCautat) 
            )
        })
    }

    const tratamenteFiltrate = filtrareTratamente(tratamente)

    const handleShowModalTratament = () => {

    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu   = {"Tratamente"}
                filtru  = {textFiltru}
                functie = {handleChangeTextFiltru}
            />

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Imagine</th>
                            <th>Animal</th>
                            <th>Stăpân</th>
                            <th>Dată începere</th>
                            <th>Dată sfârșit</th>
                            <th>Detalii</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tratamente && paginaTratamente.map((tratament, index)=>(
                            <tr key={index}>
                                <td>
                                    <img src={pozeAnimale[tratament.animalId.animalId]} height="55" width="55"/>
                                </td>
                                <td>{tratament.animalId.nume}</td>
                                <td>{tratament.animalId.stapan.nume}</td>
                                <td>{tratament.dataInceput}</td>
                                <td>{tratament.dataSfarsit}</td>
                                <td>
                                    <div><button className="butonIconita"><FontAwesomeIcon icon={faSearch}/></button></div>
                                </td>
                                <td>
                                    <div><button>Opțiuni</button></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagini 
                viewTabel               = {viewTratamente}
                listaObiecteFiltrate    = {tratamenteFiltrate}
                setPaginaTabel          = {setPaginaTratamente}
                textFiltru              = {textFiltru}
            />
            
        </div>
    )
}
export default Tratamente