import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"
import DetaliiTratament from "./DetaliiTratament"

const Tratamente = ({tratamente, viewTratamente, setTratamente, api, jwtToken, authority}) => {

    const [paginaTratamente, setPaginaTratamente] = useState([])
    const [pozePagina,       setPozePagina]       = useState([])
    useEffect(
        () => {
          if(paginaTratamente.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_animale/', 
                poza: 'animal_default.png', 
                lista: paginaTratamente, 
                setListaPoze: setPozePagina, 
                jwtToken, 
                api,
            })
          }
        }, [paginaTratamente]
    )

    const [textFiltru, setTextFiltru] = useState('')
    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const filtrareTratamente = () => {
        return tratamente.filter((tratament) => {
            const textCautat = textFiltru.toLowerCase()
            return(
                tratament.animalId.nume.toLowerCase().includes(textCautat) ||
                tratament.animalId.stapan.nume.toLowerCase().includes(textCautat) ||
                tratament.dataInceput.toLowerCase().includes(textCautat) ||
                tratament.dataSfarsit.toLowerCase().includes(textCautat) 
            )
        })
    }

    const tratamenteFiltrate = filtrareTratamente(tratamente)

    const [tratamentCurent,        setTratamentCurent]        = useState('')
    const [viewDetaliiTratament,   setViewDetaliiTratament]   = useState(false)
    const handleViewDetaliiTratament = (tratament) => {
        setTratamentCurent(tratament)
        setViewDetaliiTratament(true)
    }

    const [textRaspuns,            setTextRaspuns]            = useState('')
    const [viewRaspuns,            setViewRaspuns]            = useState(false)

    return(
        <div className="containerPrincipal">
            
            <TitluSiFiltru 
                titlu   = {"Tratamente"}
                filtru  = {textFiltru}
                functie = {handleChangeTextFiltru}
            />

            {viewDetaliiTratament && (
                <DetaliiTratament 
                    tratamente              = {tratamente}
                    setTratamente           = {setTratamente}
                    tratamentCurent         = {tratamentCurent}
                    setTextRaspuns          = {setTextRaspuns}
                    setViewRaspuns          = {setViewRaspuns}
                    setViewDetaliiTratament = {setViewDetaliiTratament}
                    api                     = {api}
                    jwtToken                = {jwtToken}
                    authority               = {authority}
                />
            )}

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Imagine</th>
                            <th>Animal</th>
                            <th>Stăpân</th>
                            <th>Dată începere</th>
                            <th>Dată sfârșit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tratamente && paginaTratamente.map((tratament, index)=>(
                            <tr key={index}>
                                <td><img src={pozePagina[index]} height="55" width="55"/></td>
                                <td>{tratament.animalId.nume}</td>
                                <td>{tratament.animalId.stapan.nume}</td>
                                <td>{tratament.dataInceput}</td>
                                <td>{tratament.dataSfarsit}</td>
                                <td>
                                    <div> <button className="butonIconita" onClick={() => handleViewDetaliiTratament(tratament)}><FontAwesomeIcon icon={faBars}/></button> </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagini 
                lista                   = {tratamente}
                viewTabel               = {viewTratamente}
                listaObiecteFiltrate    = {tratamenteFiltrate}
                setPaginaTabel          = {setPaginaTratamente}
                textFiltru              = {textFiltru}
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
export default Tratamente