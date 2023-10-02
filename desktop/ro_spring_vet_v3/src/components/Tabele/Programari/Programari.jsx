import { useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"

const Programari = ({programari, pozeAnimale, pozeStapani}) => {
    
    const [filtruProgramari, setFiltruProgramari] = useState('')

    const handleChangeFiltruProgramari = (event) => {
        setFiltruProgramari(event.target.value)
    }

    const handleShowModalProgramare = () => {

    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Programari"}
                filtru={filtruProgramari}
                functie={handleChangeFiltruProgramari}
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
                            <th>Stare</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programari.map((programare, index)=>(
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={pozeStapani[programare.stapanId.stapanId]} 
                                        height="55" width="55"
                                    />
                                    <img 
                                        src={pozeAnimale[programare.animalId.animalId]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{programare.dataProgramare}</td>
                                <td>{programare.animalId.nume}</td>
                                <td>{programare.stapanId.nume}</td>
                                <td>{programare.motiv}</td>
                                <td>{programare.stare}</td>
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
export default Programari