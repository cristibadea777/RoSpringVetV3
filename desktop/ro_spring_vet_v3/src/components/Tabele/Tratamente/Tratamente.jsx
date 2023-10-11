import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"

const Tratamente = ({tratamente, pozeAnimale}) => {
    
    const [filtruTratamente, setFiltruTratamente] = useState('')

    const handleChangeFiltruTratamente = (event) => {
        setFiltruTratamente(event.target.value)
    }

    const handleShowModalTratament = () => {

    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Tratamente Active"}
                filtru={filtruTratamente}
                functie={handleChangeFiltruTratamente}
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
                            <th>Metodă tratament</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tratamente && tratamente.map((tratament, index)=>(
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={pozeAnimale[tratament.animalId.animalId]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{tratament.animalId.nume}</td>
                                <td>{tratament.animalId.stapan.nume}</td>
                                <td>{tratament.dataInceput}</td>
                                <td>{tratament.dataSfarsit}</td>
                                <td className="tdButon">
                                    <button className="butonIconita"><FontAwesomeIcon icon={faSearch}/></button>
                                </td>
                                <td>
                                    <div><button>Opțiuni</button></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
export default Tratamente