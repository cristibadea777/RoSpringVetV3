import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import DetaliiProgramare from "./DetaliiProgramare"


const Programari = ({programari, setProgramari, viewProgramari, api, jwtToken, authority}) => {

    const [textFiltru,          setTextFiltru]          = useState('')

    const [paginaProgramari,    setPaginaProgramari]    = useState([])
    const [pozePagina,          setPozePagina]          = useState([])
    useEffect(
        () => {
          if(paginaProgramari.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_animale/', 
                poza: 'animal_default.png', 
                lista: paginaProgramari, 
                setListaPoze: setPozePagina, 
                jwtToken, 
                api,
            })
          }
        }, [paginaProgramari]
    )

    const [tipProgramari,       setTipProgramari]       = useState('Confirmate')

    const filtrareProgramari = (programariNefiltrate) => {
        const programariFiltrate = programariNefiltrate.filter((programare) => {
            let returnValue = false
            //filtrare in functie de tipul ales 
            //daca tipul ales = confirmate, si programarea confirmata atunci se alege
            if(tipProgramari === "Confirmate"){
                if(programare.stare === "confirmata") returnValue = true
                else  return false
            }
            else if(tipProgramari === "Neconfirmate"){
                if(programare.stare === "neconfirmata") returnValue = true
                else return false
            }
            //daca textul de filtrare e gol, include tot 
            if(textFiltru.trim() === "") return true 
            //filtrare in functie de nume animal, nume stapan, data programare - o include daca textu cautat se regaseste in oricare
            const textCautat = textFiltru.toLowerCase()
            if( programare.animalId.nume.toLowerCase().includes(textCautat)  || 
                programare.stapanId.nume.toLowerCase().includes(textCautat)  || 
                programare.dataProgramare.toLowerCase().includes(textCautat) ||
                programare.motiv.toLowerCase().includes(textCautat)
            ) returnValue = true 
            else return false    
            return returnValue
        })
        return programariFiltrate
    }

    const programariFiltrate = filtrareProgramari(programari) //se schimba de fiecare data cand programari se schimba

    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const [programareCurenta,       setProgramareCurenta]       = useState('')
    const [viewDetaliiProgramare,   setViewDetaliiProgramare]   = useState(false)
    const handleViewDetaliiProgramare = (programare) => {
        setProgramareCurenta(programare)
        setViewDetaliiProgramare(true)
    }

    const [textRaspuns,            setTextRaspuns]            = useState('')
    const [viewRaspuns,            setViewRaspuns]            = useState(false)

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu            = {"Programări"}
                filtru           = {textFiltru}
                functie          = {handleChangeTextFiltru}
                viewProgramari   = {viewProgramari}
                setTipProgramari = {setTipProgramari}
                tipProgramari    = {tipProgramari}
            />

            {viewDetaliiProgramare && (
                <DetaliiProgramare 
                    programari                = {programari}
                    setProgramari             = {setProgramari}
                    programareCurenta         = {programareCurenta}
                    setViewDetaliiProgramare  = {setViewDetaliiProgramare}
                    setTextRaspuns            = {setTextRaspuns}
                    setViewRaspuns            = {setViewRaspuns}
                    api                       = {api}
                    jwtToken                  = {jwtToken}
                    authority                 = {authority}
                />
            )}

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
                        {paginaProgramari.map((programare, index)=>(
                            <tr key={index}>
                                <td>
                                    <img 
                                        src={pozePagina[index]} 
                                        height={"50vh"} width={"50vw"}
                                    />
                                </td>
                                <td>{programare.dataProgramare}</td>
                                <td>{programare.animalId.nume}</td>
                                <td>{programare.stapanId.nume}</td>
                                <td>{programare.motiv}</td>
                                <td>{programare.stare}</td>
                                <td>
                                    <div> <button className="butonIconita" onClick={() => handleViewDetaliiProgramare(programare)}><FontAwesomeIcon icon={faBars}/></button> </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Pagini
                lista                = {programari}
                viewTabel            = {viewProgramari}
                setPaginaTabel       = {setPaginaProgramari}
                listaObiecteFiltrate = {programariFiltrate}
                tipProgramari        = {tipProgramari}
                textFiltru           = {textFiltru}
            />

            {(viewRaspuns) && (
            <div className="modal"> 
                <div style={{width:"25%", height:"33%", backgroundColor:"#232B2B", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid white"}}>
                    <p className="raspunsApi" style={{color: (textRaspuns.status === 200) ? "green" : "red"}}> {textRaspuns.data} </p>
                    <button onClick={() => {setViewRaspuns(false)}}>OK</button>
                </div>
            </div>
            )}

            
        </div>
    )
}
export default Programari