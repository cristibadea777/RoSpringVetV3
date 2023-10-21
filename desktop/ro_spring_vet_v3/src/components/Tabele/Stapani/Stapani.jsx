import { useEffect, useState } from "react"
import TitluSiFiltru from "../../Filtru/TitluSiFiltru"
import StapanNou from "./StapanNou"
import Pagini from "../../Pagini/Pagini"
import { getPozePagina } from "../../AccesareAPI"

const Stapani = ({stapani, viewStapani, api, jwtToken}) => {

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

    return(
        <div className="containerPrincipal">
            
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
                                    <div><button>Opțiuni</button></div>
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