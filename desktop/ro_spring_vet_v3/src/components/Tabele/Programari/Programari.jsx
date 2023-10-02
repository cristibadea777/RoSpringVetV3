import { useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"

const Programari = ({programari}) => {
    
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