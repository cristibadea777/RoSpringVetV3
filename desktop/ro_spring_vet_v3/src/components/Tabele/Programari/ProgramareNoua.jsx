import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../ModalAdaugare.css"
import { useEffect, useState } from "react"
import { salvareEntitate } from "../../AccesareAPI"

const ProgramareNoua = ({ animalCurent, setViewProgramareNoua, api, jwtToken, setTextRaspuns, setViewRaspuns, programari }) => {
    
    const handleClickInchidere = () => { setViewProgramareNoua(false) }

    const handleChangeData  = (event) => { setDataAleasa(event.target.value) }
    const handleChangeMotiv = (event) => { setMotiv(event.target.value)      }

    const handleClickAdaugaProgramare = async () => {
        const apiEndpoint = api + "/programari/saveProgramare"
        const cerere = {
            "dataProgramare" : dataAleasa.replace("T", " "),
            "motiv"          : motiv,
            "stapanId"       : animalCurent.stapan.stapanId,
            "animalId"       : animalCurent.animalId,
        }
        const raspunsApi = await salvareEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200){
            //pt tag-ul <p> in OptiuniAnimal
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect programare
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Programare adăugată",
            }
            setTextRaspuns(raspuns)
            //obiectul programare din raspunsApi.data trebuie pus in lista de programari
            programari.push(raspunsApi.data)
            setViewProgramareNoua(false)
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

    const [dataAleasa, setDataAleasa]   = useState(new Date().toISOString().split('T')[0])
    const [motiv,      setMotiv]        = useState('')

    const azi = new Date().toISOString().split('T')[0]

    return (
    <div className="modalSecundar">
        <div className="modalAdaugare">
            <div className="baraModal">
                <div id="stanga">  
                    <p className="textTitluModal">{animalCurent.nume} - Programare nouă</p> 
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
                
                <div className="containerLinie">
                    <button onClick={handleClickAdaugaProgramare}>Adaugă</button>
                </div>

            </div>
        </div>
    </div>
    )
}
export default ProgramareNoua