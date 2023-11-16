import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { salvareEntitate } from "../../AccesareAPI"
import "../ModalAdaugare.css"

const VizitaNoua = ({animalCurent, setViewVizitaNoua, setTextRaspuns, setViewRaspuns, vizite, setVizite, angajati, tratamente, api, jwtToken}) => {

    const handleClickInchidere = () => { setViewVizitaNoua(false) }

    const [motiv,           setMotiv]           = useState('')
    const [diagnostic,      setDiagnostic]      = useState('')
    const [metodaTratament, setMetodaTratament] = useState('')
    const [dataSfarsit,     setDataSfarsit]     = useState('')
    const dataVizita = new Date().toISOString().split('T')[0]
    const animalId   = animalCurent.animalId        
    const stapanId   = animalCurent.stapan.stapanId 
    const [angajatId,   setAngajatId]           = useState('')

    const handleChangeDiagnostic       = (event) => { setDiagnostic(event.target.value)      }
    const handleChangeMotiv            = (event) => { setMotiv(event.target.value)           }
    const handleChangeAngajatId        = (event) => { setAngajatId(event.target.value)       }  
    const handleChangeMetodaTratament  = (event) => { setMetodaTratament(event.target.value) }
    const handleChangeDataSfarsit      = (event) => { setDataSfarsit(event.target.value)     }
    
    const handleClickAdaugaVizita = async () => {
        
        const apiEndpoint = api + "/vizite/angajat/saveVizita"
        
        const cerere = {
            "dataVizita"        : dataVizita,
            "animalId"          : animalId,
            "stapanId"          : stapanId,
            "angajatId"         : angajatId,
            "motiv"             : motiv,
            "diagnostic"        : diagnostic,
            "metodaTratament"   : metodaTratament,
            "dataInceput"       : dataVizita,
            "dataSfarsit"       : dataSfarsit,
        }

        const raspunsApi =  await salvareEntitate({apiEndpoint, jwtToken, cerere})

        if(raspunsApi.status === 200){
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect vizita
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Vizită adăugată",
            }
            setTextRaspuns(raspuns)
            //adaugat vizita si tratament in liste 
            const viziteEditate = [...vizite]
            viziteEditate.push(raspunsApi.data)
            tratamente.push(raspunsApi.data.tratament)
            setVizite(viziteEditate)
            setViewVizitaNoua(false)
        }
        else{
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data, //la esec se returneaza mesajul de eroare de la server direct in data
            }
            setTextRaspuns(raspuns) 
        }
        setViewRaspuns(true)
    }

    return(
        <div className="modalTabele">
            <div className="modalAdaugare" style={{width: "80%", height:"80%"}}>
                <div className="baraModal">
                    <div id="stanga">  
                        <p className="textTitluModal">{animalCurent.nume} - Vizită nouă</p>
                    </div>    
                    <div id="dreapta"> 
                        <button className="butonInchidere" onClick={handleClickInchidere}>
                            <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />     
                        </button> 
                    </div>
                </div>

                <div className="containerAdaugare">
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <label htmlFor="motiv">Motiv</label>
                            <input id="motiv" value={motiv} onChange={handleChangeMotiv}></input>
                        </div>
                        <div className="containerLinieDreapta">
                            <label htmlFor="diagnostic">Diagnostic</label>
                            <textarea id="diagnostic" value={diagnostic} onChange={handleChangeDiagnostic}></textarea>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <label htmlFor="angajatId">Veterinar</label>
                            <select onChange={handleChangeAngajatId}>
                                <option value={0}>{''}</option>
                                {angajati.map((angajat, index) => (
                                    <option key={index} value={angajat.angajatId}>{angajat.nume}</option>
                                ))}
                            </select>
                        </div>
                        <div className="containerLinieDreapta">
                            <div className="containerLinieDreapta">
                                <label htmlFor="metodaTratament">Tratament</label>
                                <textarea id="metodaTratament" value={metodaTratament} onChange={handleChangeMetodaTratament}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                        </div>
                        <div className="containerLinieDreapta">
                            <label htmlFor="dataSfarsit">Tratament sfârșit</label>
                            <input type="date" id="dataSfarsit" value={dataSfarsit} onChange={handleChangeDataSfarsit}></input>
                        </div>
                    </div>
                    
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                        </div>
                        <div className="containerLinieDreapta" style={{justifyContent: "flex-end"}}>
                            <button onClick={handleClickAdaugaVizita}>Adaugă</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )

}
export default VizitaNoua