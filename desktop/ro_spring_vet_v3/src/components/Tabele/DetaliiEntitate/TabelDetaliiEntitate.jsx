import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../Tabele.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import Pagini from "../../Pagini/Pagini"


const TabelDetaliiEntitate = ({listaTabel, optiune, entitateTabel, textFiltru, viewTabel}) => {

    const [paginaEntitate,  setPaginaEntitate] = useState([])

    const filtrareEntitati = (listaTabel) => {
        return listaTabel.filter((entitate) => {
            const textCautat = textFiltru.toLowerCase()
            
            if(optiune === 'vizite'){
                return(
                    entitate.angajatId.nume.toLowerCase().includes(textCautat) ||
                    entitate.motiv.toLowerCase().includes(textCautat) ||
                    entitate.dataVizita.toLowerCase().includes(textCautat) 
                )
            }
            else if(optiune === 'tratamente'){
                return(
                    entitate.dataInceput.toLowerCase().includes(textCautat) ||
                    entitate.dataSfarsit.toLowerCase().includes(textCautat) 
                )
            }
            else if(optiune === 'programari'){
                return(
                    entitate.dataProgramare.toLowerCase().includes(textCautat) ||
                    entitate.motiv.toLowerCase().includes(textCautat)
                )
            }

        })
    }
    const entitatiFiltrate = filtrareEntitati(listaTabel)

    return(
        <>
        <div style={{height: "35%"}}>
            <div className="containerTabel" style={{maxHeight: "100%"}}>
                <table className="tabel">
                    <thead>
                        {optiune === 'vizite' ? (
                            <tr>
                                <th>Dată</th>
                                <th>Motiv</th>
                                <th>Angajat</th>
                                <th>Detalii</th>
                            </tr>
                        ) : optiune === 'tratamente' ? (
                            <tr>
                                <th>Dată începere</th>
                                <th>Dată sfârșit</th>
                                <th>Detalii</th>
                                <th>Opțiuni</th>
                            </tr>
                        ) : optiune === 'programari' ? (
                            <tr>
                                <th>Dată</th> 
                                <th>Motiv</th> 
                                <th>Stare</th> 
                                <th>Opțiuni</th>
                            </tr>
                        ) : (
                            <></>
                        )}
                    </thead>
                    <tbody>
                        {paginaEntitate.map((entitate, index) => (
                            optiune === 'vizite' ? (
                                <tr key={index}>
                                    <td>{entitate.dataVizita}</td>
                                    <td>{entitate.motiv}</td>
                                    <td>{entitate.numeAngajat}</td>
                                    <td> <div> <button className="butonIconita"><FontAwesomeIcon icon={faSearch}/></button> </div> </td>
                                </tr>
                            ) : optiune === 'tratamente' ? (
                                <tr key={index}>
                                    <td>{entitate.dataInceput}</td>
                                    <td>{entitate.dataSfarsit}</td>
                                    <td><div><button className="butonIconita"><FontAwesomeIcon icon={faSearch}/></button></div></td>
                                    <td><div><button>Opțiuni</button></div></td>
                                </tr>
                            ) : optiune === 'programari' ? (
                                <tr key={index}>
                                    <td>{entitate.dataProgramare}</td>
                                    <td>{entitate.motiv}</td>
                                    <td>{entitate.stare}</td>
                                    <td><div><button>Opțiuni</button></div></td>
                                </tr>
                            ) : (
                                <></>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div style={{flex: 1}}>
            <Pagini 
                lista                   = {listaTabel}
                listaObiecteFiltrate    = {entitatiFiltrate}
                setPaginaTabel          = {setPaginaEntitate}
                textFiltru              = {textFiltru}
                viewTabel               = {viewTabel}
            />
        </div>
        </>

    )
}
export default TabelDetaliiEntitate