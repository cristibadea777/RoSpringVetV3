import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

import "./Pagini.css"

const Pagini = ({lista, viewTabel, listaObiecteFiltrate, setPaginaTabel, textFiltru, tipProgramari, optiune}) => {
    //tipProgramari - doar pt tabelul programari 
    
    const [itemsPerPage,        setItemsPerPage]        = useState(8)
    const [lowerBound,          setLowerBound]          = useState(0)
    const [paginaCurenta,       setPaginaCurenta]       = useState(1)

    const totalPagini = Math.ceil(listaObiecteFiltrate.length / itemsPerPage) //se recalculeaza de fiecare data cand itemsPerPage se schimba

    const handleClickPaginaInainte = () => {
        if( (lowerBound + itemsPerPage) < listaObiecteFiltrate.length){
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
        }, [optiune, viewTabel, tipProgramari, textFiltru]
    )

    useEffect(
        () => {            
            if(viewTabel){
                const upperBound = lowerBound + itemsPerPage
                setPaginaTabel(listaObiecteFiltrate.slice(lowerBound, upperBound)) 
            }
        }, [lista, viewTabel, lowerBound, itemsPerPage, tipProgramari, textFiltru] 
    )

    return(
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
    )
}
export default Pagini