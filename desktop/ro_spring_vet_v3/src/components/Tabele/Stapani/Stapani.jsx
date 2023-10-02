import { useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"

const Stapani = ({stapani, pozeStapani}) => {

    const [filtruStapani, setFiltruStapani] = useState('')

    const handleChangeFiltruStapani = (event) => {
        setFiltruStapani(event.target.value)
    }

    const handleShowModalVizita = () => {

    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Stapani"}
                filtru={filtruStapani}
                functie={handleChangeFiltruStapani}
            />

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Imagine</th>
                            <th>Nume</th>
                            <th>Telefon</th>
                            <th>Email</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stapani.map((stapan, index)=>(
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={pozeStapani[stapan.stapanId]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{stapan.nume}</td>
                                <td>{stapan.nrTelefon}</td>
                                <td>{stapan.email}</td>
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
export default Stapani