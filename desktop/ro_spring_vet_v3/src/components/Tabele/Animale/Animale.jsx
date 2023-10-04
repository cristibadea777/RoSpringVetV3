import { useState, useEffect } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import "../Tabele.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
const Animale = ( {animale, pozeAnimale, setAnimalCurent} ) => {

    const [filtruAnimale, setFiltruAnimale] = useState('')

    const handleChangeFiltruAnimale = (event) => {
        setFiltruAnimale(event.target.value)
    }

    const handleShowModalAnimal = (animal) => {
        setAnimalCurent(animal)
    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Animale"}
                filtru={filtruAnimale}
                functie={handleChangeFiltruAnimale}
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
                        {animale.map((animal, index)=>(
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={pozeAnimale[animal.animalId]} 
                                        height="55" width="55"
                                    />
                                </td>
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
            
        </div>
    )
}
export default Animale