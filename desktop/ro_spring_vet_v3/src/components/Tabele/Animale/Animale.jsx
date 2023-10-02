import { useState, useEffect } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import "../Tabele.css"
const Animale = ( {animale, pozeAnimale} ) => {

    const [filtruAnimale, setFiltruAnimale] = useState('')

    const handleChangeFiltruAnimale = (event) => {
        setFiltruAnimale(event.target.value)
    }

    const handleShowModalAnimal = () => {

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
                                        src={pozeAnimale[index]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{animal.nume}</td>
                                <td>{animal.stapan.nume}</td>
                                <td>{animal.specie}</td>
                                <td>{animal.rasa}</td>
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
export default Animale