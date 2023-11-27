import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../Tabele.css"
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"


const TabelDetaliiEntitate = ({listaTabel, optiune, textFiltru, viewTabel, handleShowModalAnimal, jwtToken, api, handleViewVizitaCurenta, handleViewProgramareCurenta}) => {
    
    const [paginaEntitate,          setPaginaEntitate]          = useState([])
    const [pozePaginaAnimaleStapan, setPozePaginaAnimaleStapan] = useState([])

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
            else if(optiune === 'animale'){
                return(
                    entitate.nume.toLowerCase().includes(textCautat) ||
                    entitate.stapan.nume.toLowerCase().includes(textCautat) ||
                    entitate.specie.toLowerCase().includes(textCautat) ||
                    entitate.rasa.toLowerCase().includes(textCautat)
                )
            }
        })
    }
    const entitatiFiltrate = filtrareEntitati(listaTabel)

    //luare poze pt animalele stapanului
    useEffect(
        () => {
            if(optiune === 'animale'){
                if(paginaEntitate.length !== 0){
                    getPozePagina({
                        caleFolderPoze: '/resources/poze_animale/', 
                        poza:           'animal_default.png', 
                        lista:          paginaEntitate, 
                        setListaPoze:   setPozePaginaAnimaleStapan, 
                        jwtToken, 
                        api,
                    })
                }
            }
        }, [paginaEntitate]
    )

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
                                <th>Opțiuni</th>
                            </tr>
                        ) : optiune === 'tratamente' ? (
                            <tr>
                                <th>Dată începere</th>
                                <th>Dată sfârșit</th>
                                <th>Opțiuni</th>
                            </tr>
                        ) : optiune === 'programari' ? (
                            <tr>
                                <th>Dată</th> 
                                <th>Motiv</th> 
                                <th>Stare</th> 
                                <th>Opțiuni</th>
                            </tr>
                        ) : optiune === 'animale' ? (
                            <tr>
                                <th>Poză</th> 
                                <th>Nume</th> 
                                <th>Specie</th> 
                                <th>Rasă</th>
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
                                    <td> <div> <button onClick={() => {handleViewVizitaCurenta(entitate)}} className="butonIconita"><FontAwesomeIcon icon={faSearch}/></button> </div> </td>
                                </tr>
                            ) : optiune === 'tratamente' ? (
                                <tr key={index}>
                                    <td>{entitate.dataInceput}</td>
                                    <td>{entitate.dataSfarsit}</td>
                                    <td><div><button className="butonIconita"><FontAwesomeIcon icon={faSearch}/></button></div></td>
                                </tr>
                            ) : optiune === 'programari' ? (
                                <tr key={index}>
                                    <td>{entitate.dataProgramare}</td>
                                    <td>{entitate.motiv}</td>
                                    <td>{entitate.stare}</td>
                                    <td> <div> <button onClick={() => {handleViewProgramareCurenta(entitate)}} className="butonIconita"><FontAwesomeIcon icon={faSearch}/></button> </div> </td>
                                </tr>
                            ) : optiune === 'animale' ? (
                                <tr key={index}>
                                    <td> 
                                        <img src={pozePaginaAnimaleStapan[index]} height="55" width="55"/> 
                                    </td>
                                    <td>{entitate.nume}</td>
                                    <td>{entitate.specie}</td>
                                    <td>{entitate.rasa}</td>
                                    <td>
                                        <div><button onClick={() => handleShowModalAnimal(entitate)}><FontAwesomeIcon icon={faBars} color="white"></FontAwesomeIcon></button></div>
                                    </td>
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
                optiune                 = {optiune}
            />
        </div>
        </>

    )
}
export default TabelDetaliiEntitate