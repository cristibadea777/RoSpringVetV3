import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"

const Angajati = ({angajati, viewAngajati, api, jwtToken}) => {

    const [textFiltru, setTextFiltru] = useState('')
    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const filtrareAngajati = (angajati) => {
        return angajati.filter((angajat) => {
            const textCautat = textFiltru.toLowerCase()
            return(
                angajat.nume.toLowerCase().includes(textCautat) ||
                angajat.nrTelefon.toLowerCase().includes(textCautat) ||
                angajat.email.toLowerCase().includes(textCautat)
            )
        })
    }
    const angajatiFiltrati = filtrareAngajati(angajati)

    const [paginaAngajati,  setPaginaAngajati]  = useState('')
    const [pozePagina,      setPozePagina]      = useState([])
    useEffect(
        () => {
          if(paginaAngajati.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_angajati/', 
                poza: 'angajat_default.png', 
                lista: paginaAngajati, 
                setListaPoze: setPozePagina, 
                jwtToken, 
                api,
            })
          }
        }, [paginaAngajati]
    )

    const handleShowModalAngajat = () => {

    }

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Angajati"}
                filtru={textFiltru}
                functie={handleChangeTextFiltru}
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
                                        src={pozePagina[index]} 
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

            
            <Pagini 
                viewTabel             = {viewAngajati}
                listaObiecteFiltrate  = {angajatiFiltrati}
                setPaginaTabel        = {setPaginaAngajati}
                textFiltru            = {textFiltru} 
            />
            
        </div>
    )
}
export default Angajati