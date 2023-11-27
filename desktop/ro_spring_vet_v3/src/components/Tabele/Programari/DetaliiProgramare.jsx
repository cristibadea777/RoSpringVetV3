import { useState } from "react"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { deleteEntitate, editEntitate } from "../../AccesareAPI"

const DetaliiProgramare = ({programari, setProgramari, programareCurenta, setViewDetaliiProgramare, setTextRaspuns, setViewRaspuns, api, jwtToken, authority}) => {

    const handleClickInchidere = () => { setViewDetaliiProgramare(false) }
    
    const azi = new Date().toISOString().split('T')[0]
    const [dataAleasa, setDataAleasa]   = useState(programareCurenta.dataProgramare)
    const [motiv,      setMotiv]        = useState(programareCurenta.motiv)
    const [stare,      setStare]        = useState(programareCurenta.stare)

    const handleChangeData  = (event) => { setDataAleasa(event.target.value) }
    const handleChangeMotiv = (event) => { setMotiv(event.target.value)      }

    const updateListaProgramari = (programareEditata) => {
        let programariEditate = [...programari]       
        programariEditate.map((programare, index) => {
            if(programare.programareId === programareCurenta.programareId){
                programariEditate[index] = programareEditata
            }
        })        
        setProgramari(programariEditate)
    }

    const anuleazaProgramarea = async () => {
        //sterge programarea din db
        const apiEndpoint = api +  "/programari/deleteProgramare"
        const cerere = {
            "programareId"   : programareCurenta.programareId,
            "dataProgramare" : programareCurenta.dataProgramare,
            "motiv"          : programareCurenta.motiv,
            "stare"          : programareCurenta.stare,
            "stapanId"       : programareCurenta.stapanId.stapanId,
            "animalId"       : programareCurenta.animalId.animalId,
        }
        const raspunsApi = await deleteEntitate({jwtToken, apiEndpoint, cerere})
        const raspuns = {
            "status" : 200,
            "data"   : raspunsApi,
        }
        setTextRaspuns(raspuns)
        setViewRaspuns(true)
        handleClickInchidere()
        //sterge programarea din lista
        setProgramari((prevProgramari) => prevProgramari.filter((programare) => programare !== programareCurenta))
    }

    const handleClickEditeazaProgramare = async () => {
        const apiEndpoint = api +  "/programari/editProgramare"
        const cerere = {
            "programareId"   : programareCurenta.programareId,
            "dataProgramare" : dataAleasa.replace("T", " "),
            "motiv"          : motiv,
            "stare"          : stare,
            "stapanId"       : programareCurenta.stapanId.stapanId,
            "animalId"       : programareCurenta.animalId.animalId,
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200){
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect programare
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Programare adăugată",
            }
            setTextRaspuns(raspuns)
            const programareEditata = {
                ...programareCurenta,
            }
            programareEditata.motiv          = motiv
            programareEditata.dataProgramare = dataAleasa
            programareEditata.stare          = raspunsApi.data.stare
            updateListaProgramari(programareEditata)
            setViewDetaliiProgramare(false)
        }
        else{
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data, //la esec se returneaza mesajul de eroare de la server
            }
            setTextRaspuns(raspuns)
        }
        setViewRaspuns(true)
    }

    return(
        <div className="modalTabele">
            <div className="modalAdaugare" style={{width:"45%", height: "45%"}}>
                <div className="baraModal">
                    <div id="stanga">  
                        <p className="textTitluModal">{programareCurenta.dataProgramare} - {programareCurenta.animalId.nume}</p> 
                    </div>    
                    <div id="dreapta"> 
                        <button className="butonInchidere" onClick={handleClickInchidere}>
                            <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />     
                        </button> 
                    </div>
                </div>

                <div className="containerAdaugare">
                    <div className="containerLinie">
                        <label htmlFor="dataAleasa">Dată</label>
                        <input type="datetime-local" id="dataAleasa" value={dataAleasa} onChange={handleChangeData} min={azi}></input>
                    </div>
                    
                    <div className="containerLinie">
                        <label htmlFor="motiv">Motiv</label>
                        <input id="motiv" value={motiv} onChange={handleChangeMotiv}></input>
                    </div>
                    
                    <div className="containerLinie" style={{justifyContent: "flex-end"}}>
                        <button onClick={handleClickEditeazaProgramare}>Editează</button>
                        {programareCurenta.stare === "confirmata" ? (
                            <button onClick={anuleazaProgramarea} style={{backgroundColor: "red", marginLeft: "7%"}}>Anulează programarea</button>
                        ) : (
                            <>
                            {authority === "ADMIN" && (
                                <button onClick={handleClickEditeazaProgramare} style={{backgroundColor: "green", marginLeft: "7%"}}>Confirmă programarea</button>
                            )}
                            </>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    )

}
export default DetaliiProgramare