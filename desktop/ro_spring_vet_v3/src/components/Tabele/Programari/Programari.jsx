import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Programari = ({programari, pozeAnimale, pozeStapani, viewProgramari}) => {
    
    const [textFiltru,          setTextFiltru]    = useState('')
    const [itemsPerPage,        setItemsPerPage]        = useState(8)
    const [lowerBound,          setLowerBound]          = useState(0)
    const [paginaProgramari,    setPaginaProgramari]    = useState([])
    const [paginaCurenta,       setPaginaCurenta]       = useState(1)
    const [tipProgramari,       setTipProgramari]       = useState('Confirmate')

    const filtrareProgramari = (programariNefiltrate) => {
        const programariFiltrate = programariNefiltrate.filter((programare) => {
            let returnValue = false
            //filtrare in functie de tipul ales 
            //daca tipul ales = confirmate, si programarea confirmata atunci se alege
            if(tipProgramari === "Confirmate"){
                if(programare.stare === "confirmata")
                    returnValue = true
                else 
                    return false
            }
            else if(tipProgramari === "Neconfirmate"){
                if(programare.stare === "neconfirmata")
                    returnValue = true
                else
                    return false
            }
            //daca textul de filtrare e gol, include tot
            if(textFiltru.trim() === ""){
                returnValue = true
            }
            //filtrare in functie de nume animal, nume stapan, data programare - o include daca textu cautat se regaseste in oricare
            const textCautat = textFiltru.toLowerCase()
            if( programare.animalId.nume.toLowerCase().includes(textCautat) || 
                programare.stapanId.nume.toLowerCase().includes(textCautat) || 
                programare.dataProgramare.toLowerCase().includes(textCautat) 
            ){ returnValue = true }
            else
                return false
            return returnValue
        })
        return programariFiltrate
    }

    const programariFiltrate = filtrareProgramari(programari) //se schimba de fiecare data cand programari se schimba
    
    const totalPagini = Math.ceil(programariFiltrate.length / itemsPerPage) //se recalculeaza de fiecare data cand itemsPerPage se schimba

    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const handleShowModalProgramare = () => {

    }

    const handleClickPaginaInainte = () => {
        if( (lowerBound + itemsPerPage) < programariFiltrate.length){
            setLowerBound(lowerBound + itemsPerPage)
            setPaginaCurenta(paginaCurenta + 1)
        }
    }

    const handleClickPaginaInapoi = () => {
        if(lowerBound > 0){
            setLowerBound(lowerBound - itemsPerPage)
            setPaginaCurenta(paginaCurenta - 1)
        }
    }

    const handleChangeItemsPerPage = (event) => {
        setItemsPerPage(Number(event.target.value))
        setLowerBound(0)
        setPaginaCurenta(1)
    }

    useEffect(
        () => {
            //reset paginilor
            setLowerBound(0)
            setPaginaCurenta(1)
        }, [viewProgramari, tipProgramari]
    )

    useEffect(
        () => {            
            if(viewProgramari){
                const upperBound = lowerBound + itemsPerPage
                setPaginaProgramari(programariFiltrate.slice(lowerBound, upperBound)) 
            }
        }, [viewProgramari, lowerBound, itemsPerPage, tipProgramari, textFiltru] 
    )

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

            <div className="containerPagini">
                <div className="linieContainerPagini">
                    <div className="containerItemsPerPage">
                        <label htmlFor="itemsPerPage">Elemente / Pagină</label>
                        <select value={itemsPerPage} id="itemsPerPage" className="dropdownItemsPerPage" onChange={handleChangeItemsPerPage}>
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <button onClick={handleClickPaginaInapoi}><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <button onClick={handleClickPaginaInainte}><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                <div className="linieContainerPagini">
                    <p>Pagina {paginaCurenta} / {totalPagini}</p>
                </div>
            </div>
            
        </div>
    )
}
export default Programari