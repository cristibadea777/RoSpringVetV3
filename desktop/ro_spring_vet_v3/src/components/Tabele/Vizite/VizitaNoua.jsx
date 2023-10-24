import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { salvareEntitate } from "../../AccesareAPI"

const VizitaNoua = ({animalCurent, setViewVizitaNoua, api, jwtToken, setTextRaspuns, setViewRaspuns, vizite, angajati, tratamente}) => {
    
    const handleClickInchidere = () => {
        setViewVizitaNoua(false)
    }

    const [motiv,           setMotiv]           = useState('')
    const [diagnostic,      setDiagnostic]      = useState('')
    const [angajatId,       setAngajatId]       = useState(angajati[0].angajatId)
    const [metodaTratament, setMetodaTratament] = useState('')
    const [dataInceput,     setDataInceput]     = useState(new Date().toISOString().split('T')[0])
    const [dataSfarsit,     setDataSfarsit]     = useState('')
    
    const handleChangeDiagnostic       = (event) => { setDiagnostic(event.target.value)      }
    const handleChangeMotiv            = (event) => { setMotiv(event.target.value)           }
    const handleChangeAngajatId        = (event) => { setAngajatId(event.target.value)       }  
    const handleChangeMetodaTratament  = (event) => { setMetodaTratament(event.target.value) }
    const handleChangeDataInceput      = (event) => { setDataInceput(event.target.value)     }
    const handleChangeDataSfarsit      = (event) => { setDataSfarsit(event.target.value)     }

    const dataVizita = new Date().toISOString().split('T')[0]
    const animalId   = animalCurent.animalId
    const stapanId   = animalCurent.stapan.stapanId
    
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
            "dataInceput"       : dataInceput,
            "dataSfarsit"       : dataSfarsit,
        }
        const raspunsApi = await salvareEntitate({apiEndpoint, jwtToken, cerere})
        if(raspunsApi.status === 200){
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect vizita
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Vizită adăugată",
            }
            setTextRaspuns(raspuns)
            //adaugat vizita si tratament in liste
            vizite.push(raspunsApi.data)
            tratamente.push(raspunsApi.data.tratament)
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

    return (
        <div className="modalSecundar">
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
                                {
                                    angajati.map((angajat, index) => (
                                        <option key={index} value={angajat.angajatId}>{angajat.nume}</option>
                                    ))
                                }
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
                        <button onClick={handleClickAdaugaVizita}>Adaugă</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default VizitaNoua