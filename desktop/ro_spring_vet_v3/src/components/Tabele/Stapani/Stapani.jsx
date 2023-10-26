import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import StapanNou from "./StapanNou"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"
import ModalDetaliiEntitate from "../DetaliiEntitate/ModalDetaliiEntitate"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DetaliiStapan from "./DetaliiStapan"

const Stapani = ({stapani, setStapani, viewStapani, vizite, programari, tratamente, angajati, api, jwtToken}) => {

    const [viewStapanNou,   setViewStapanNou] = useState(false)

    const [viewDetaliiStapan,   setViewDetaliiStapan]   = useState('')
    const [stapanCurent,        setStapanCurent]        = useState('')

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

    const [paginaStapani,          setPaginaStapani]      = useState([])
    const [pozePaginaStapani,      setPozePaginaStapani]  = useState([])
    const updatePozePagina = () => {
        if(paginaStapani.length !== 0){
            getPozePagina({
                caleFolderPoze: '/resources/poze_stapani/', 
                poza:           'stapan_default.png', 
                lista:          paginaStapani, 
                setListaPoze:   setPozePaginaStapani, 
                jwtToken, 
                api,
            })
        }
    }
    useEffect( () => { updatePozePagina() }, [paginaStapani] )

    const handleShowModalStapan = (stapan, index) => {
        setStapanCurent(
            {
                "entitate"      : stapan,
                "pozaEntitate"  : pozePaginaStapani[index],
            }
        )
        setViewDetaliiStapan(true)
    }

    return(
        <div className="containerPrincipal">

            {viewDetaliiStapan && (
                <DetaliiStapan
                    stapanCurent            = {stapanCurent}
                    stapani                 = {stapani}
                    setStapani              = {setStapani}
                    animale                 = {animale}
                    setAnimale              = {setAnimale}
                    programari              = {programari}
                    tratamente              = {tratamente}
                    vizite                  = {vizite}
                    angajati                = {angajati}
                    setViewDetaliiStapan    = {setViewDetaliiStapan}
                    api                     = {api}
                    jwtToken                = {jwtToken}
                />
            )}
            
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
                                        src={pozePaginaStapani[index]} 
                                        height="55" width="55"
                                    />
                                </td>
                                <td>{stapan.nume}</td>
                                <td>{stapan.nrTelefon}</td>
                                <td>{stapan.email}</td>
                                <td>
                                    <div><button onClick={() => handleShowModalStapan(stapan, index)}><FontAwesomeIcon icon={faBars} color="white"></FontAwesomeIcon></button></div>
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