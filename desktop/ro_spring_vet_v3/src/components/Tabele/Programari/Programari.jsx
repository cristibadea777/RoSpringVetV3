import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Programari = ({programari, pozeAnimale, pozeStapani, viewProgramari}) => {
    
    const [filtruProgramari,    setFiltruProgramari]    = useState('')
    const [itemsPerPage,        setItemsPerPage]        = useState(8)
    const [lowerBound,          setLowerBound]          = useState(0)
    const [paginaProgramari,    setPaginaProgramari]    = useState([])
    const [paginaCurenta,       setPaginaCurenta]       = useState(1)
    
    const totalPagini = Math.ceil(programari.length / itemsPerPage)


    const handleChangeFiltruProgramari = (event) => {
        setFiltruProgramari(event.target.value)
    }

    const handleShowModalProgramare = () => {

    }

    const handleClickPaginaInainte = () => {
        if( (lowerBound + itemsPerPage) < programari.length){
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
            console.log(itemsPerPage)
            const upperBound = lowerBound + itemsPerPage
            if(viewProgramari){
                setPaginaProgramari(programari.slice(lowerBound, upperBound)) 
            }
        }, [viewProgramari, lowerBound, itemsPerPage]
    )

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu={"Programări"}
                filtru={filtruProgramari}
                functie={handleChangeFiltruProgramari}
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