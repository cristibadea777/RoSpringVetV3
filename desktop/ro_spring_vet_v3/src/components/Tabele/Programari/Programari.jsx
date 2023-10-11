import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import Pagini from "../../Pagini/Pagini"


const Programari = ({programari, pozeAnimale, pozeStapani, viewProgramari}) => {
    
    const [textFiltru,          setTextFiltru]          = useState('')

    const [paginaProgramari,    setPaginaProgramari]    = useState([])

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

    const handleShowModalProgramare = () => {

    }

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
                                        src={pozeStapani[programare.stapanId.stapanId]} 
                                        height={"50vh"} width={"50vw"}
                                    />
                                    <img 
                                        src={pozeAnimale[programare.animalId.animalId]} 
                                        height={"50vh"} width={"50vw"}
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
            
            <Pagini
                viewTabel            = {viewProgramari}
                setPaginaTabel       = {setPaginaProgramari}
                listaObiecteFiltrate = {programariFiltrate}
                tipProgramari        = {tipProgramari}
                textFiltru           = {textFiltru}
            />

            
        </div>
    )
}
export default Programari