import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { salvareVizita } from "../../AccesareAPI"

const VizitaNoua = ({animalCurent, setViewVizitaNoua, api, jwtToken, setRaspuns, raspuns, vizite, angajati}) => {
    
    const handleClickInchidere = () => {
        setViewVizitaNoua(false)
    }

    const [motiv,           setMotiv]           = useState('')
    const [diagnostic,      setDiagnostic]      = useState('')
    const [angajatId,       setAngajatId]       = useState(angajati[0].angajatId)
    const [metodaTratament, setMetodaTratament] = useState('')
    const [dataInceput,     setDataInceput]     = useState('')
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
        const raspunsApi = await salvareVizita(
            {   apiEndpoint, jwtToken, dataVizita, 
                motiv, diagnostic, animalId, 
                stapanId, angajatId, metodaTratament, 
                dataInceput, dataSfarsit
            }
        )
        if(raspunsApi.status === 200){
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect vizita
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Vizită adăugată",
            }
            setRaspuns(raspuns)
            vizite.push(raspunsApi.data)
            setViewVizitaNoua(false)
        }
        else{
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data, //la esec se returneaza mesajul de eroare de la server direct in data
            }
            setRaspuns(raspuns) 
        }
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
                        <div className="containerLinie" style={{display: "flex", flexDirection: "column", flex: "1", justifyContent: "flex-end", alignItems: "center"}}>
                            <div  style={{display: "flex", flexDirection: "row", width:"100%", alignItems: "center"}}>
                                <label htmlFor="dataInceput">Tratament început</label>
                                <input type="date" id="dataInceput" value={dataInceput} onChange={handleChangeDataInceput}></input>
                            </div>
                            <div  style={{display: "flex", flexDirection: "row", width:"100%", alignItems: "center"}}>
                                <label htmlFor="dataSfarsit">Tratament sfârșit</label>
                                <input type="date" id="dataSfarsit" value={dataSfarsit} onChange={handleChangeDataSfarsit}></input>
                            </div>
                        </div>
                    </div>
                    
                    <div className="containerLinie">
                        <button onClick={handleClickAdaugaVizita}>Adaugă</button>
                    </div>

                    <div className="containerLinie">
                        <p className="textEroare">{raspuns.data}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default VizitaNoua