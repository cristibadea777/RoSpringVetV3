import { useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"

const Angajati = ({angajati, pozeAngajati}) => {

    const [filtruAngajati, setFiltruAngajati] = useState('')

    const handleChangeFiltruAngajati = (event) => {
        setFiltruAngajati(event.target.value)
    }

    const handleShowModalAngajat = () => {

    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Angajati"}
                filtru={filtruAngajati}
                functie={handleChangeFiltruAngajati}
            />

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Imagine</th>
                            <th>Nume</th>
                            <th>Funcție</th>
                            <th>Telefon</th>
                            <th>Email</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {angajati.map((angajat, index)=>(
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={pozeAngajati[angajat.angajatId]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{angajat.nume}</td>
                                <td>{angajat.functie}</td>
                                <td>{angajat.nrTelefon}</td>
                                <td>{angajat.email}</td>
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
export default Angajati