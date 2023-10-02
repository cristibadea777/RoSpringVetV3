import { useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const Vizite = ({vizite}) => {
    
    const [filtruVizite, setFiltruVizite] = useState('')

    const handleChangeFiltruVizite = (event) => {
        setFiltruVizite(event.target.value)
    }

    const handleShowModalVizita = () => {

    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Vizite"}
                filtru={filtruVizite}
                functie={handleChangeFiltruVizite}
            />

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Dată</th>
                            <th>Animal</th>
                            <th>Stăpân</th>
                            <th>Motiv</th>
                            <th>Angajat</th>
                            <th>Diagnostic, Tratament</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vizite.map((vizita, index)=>(
                            <tr key={index}>
                                <td>{vizita.dataVizita}</td>
                                <td>{vizita.numeAnimal}</td>
                                <td>{vizita.numeStapan}</td>
                                <td>{vizita.motiv}</td>
                                <td>{vizita.numeAngajat}</td>
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
export default Vizite