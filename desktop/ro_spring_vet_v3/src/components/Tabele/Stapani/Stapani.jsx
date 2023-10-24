import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import StapanNou from "./StapanNou"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"
import ModalDetaliiEntitate from "../DetaliiEntitate/ModalDetaliiEntitate"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Stapani = ({stapani, setStapani, viewStapani, setViewStapani, animale, setViewAnimale, vizite, programari, tratamente, api, jwtToken, entitateCurenta, setEntitateCurenta, viewDetaliiEntitate, setViewDetaliiEntitate, pozaEntitateCurenta, setPozaEntitateCurenta}) => {

    const [paginaStapani,   setPaginaStapani]   = useState([])
    const [pozePagina,      setPozePagina]      = useState([])
    
    useEffect(
        () => {
          if(paginaStapani.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_stapani/', 
                poza: 'stapan_default.png', 
                lista: paginaStapani, 
                setListaPoze: setPozePagina, 
                jwtToken, 
                api,
            })
          }
        }, [paginaStapani]
    )
    
    const [viewStapanNou,   setViewStapanNou] = useState(false)

    const [textFiltru,      setTextFiltru] = useState('')
    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const filtrareStapani = (stapani) => {
        return stapani.filter((stapan) => {
            const textCautat = textFiltru.toLowerCase()
            return(
                stapan.nume.toLowerCase().includes(textCautat) ||
                stapan.nrTelefon.toLowerCase().includes(textCautat) ||
                stapan.email.toLowerCase().includes(textCautat)
            )
        })
    }
    const stapaniFiltrati = filtrareStapani(stapani)

    const handleShowModalAnimal = (stapan, index) => {
        setEntitateCurenta(stapan)
        setViewDetaliiEntitate(true)
        setPozaEntitateCurenta(pozePagina[index])
    }

    return(
        <div className="containerPrincipal">

            {viewDetaliiEntitate && (
            <ModalDetaliiEntitate
                listaEntitate          = {stapani}
                setListaEntitate       = {setStapani}
                viewStapani            = {viewStapani}
                setViewStapani         = {setViewStapani}
                entitateCurenta        = {entitateCurenta}
                animale                = {animale}
                vizite                 = {vizite}
                programari             = {programari}
                tratamente             = {tratamente}
                pozaEntitateCurenta    = {pozaEntitateCurenta}
                setPozaEntitateCurenta = {setPozaEntitateCurenta}
                setEntitateCurenta     = {setEntitateCurenta}
                setViewAnimale         = {setViewAnimale}
                setViewDetaliiEntitate = {setViewDetaliiEntitate}
                api                    = {api}
                jwtToken               = {jwtToken}
            />)}
            
            {viewStapanNou && (
            <StapanNou 
                viewStapanNou    = {viewStapanNou}
                setViewStapanNou = {setViewStapanNou}
                api              = {api}
                jwtToken         = {jwtToken}
                stapani          = {stapani}
            />)}

            <TitluSiFiltru 
                titlu            = {"Stapani"}
                filtru           = {textFiltru}
                functie          = {handleChangeTextFiltru}
                viewStapani      = {viewStapani}
                setViewStapanNou = {setViewStapanNou}
            />

            <div className="containerTabel">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Imagine</th>
                            <th>Nume</th>
                            <th>Telefon</th>
                            <th>Email</th>
                            <th>Opțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginaStapani.map((stapan, index)=>(
                            <tr key={stapan.stapanId}>
                                <td>
                                    <img 
                                        src={pozePagina[index]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{stapan.nume}</td>
                                <td>{stapan.nrTelefon}</td>
                                <td>{stapan.email}</td>
                                <td>
                                    <div><button onClick={() => handleShowModalAnimal(stapan, index)}><FontAwesomeIcon icon={faBars} color="white"></FontAwesomeIcon></button></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>   

            <Pagini 
                viewTabel            = {viewStapani}
                listaObiecteFiltrate = {stapaniFiltrati}
                setPaginaTabel       = {setPaginaStapani}
                textFiltru           = {textFiltru}
            />
              
        </div>
    )
}
export default Stapani