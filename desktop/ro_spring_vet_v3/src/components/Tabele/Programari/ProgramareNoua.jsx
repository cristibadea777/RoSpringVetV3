import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../ModalAdaugare.css"
import { useEffect, useState } from "react"
import { salvareProgramare } from "../../AccesareAPI"

const ProgramareNoua = ({ animalCurent, setViewProgramareNoua, viewProgramareNoua, api, jwtToken, setRaspuns, raspuns, programari }) => {
    
    useEffect(
        () => {
            if(viewProgramareNoua){ setRaspuns('') }
        }, [viewProgramareNoua]
    )

    const handleClickInchidere = () => {
        setViewProgramareNoua(false)
    }

    const handleChangeData = (event) => {
        setDataAleasa(event.target.value)
    }

    const handleChangeMotiv = (event) => {
        setMotiv(event.target.value)
    }

    const handleClickAdaugaProgramare = async () => {
        const apiEndpoint = api + "/programari/saveProgramare"
        const raspunsApi = await salvareProgramare(
            {
                jwtToken, 
                apiEndpoint, 
                idAnimalCurent: animalCurent.animalId, 
                idStapanCurent: animalCurent.stapan.stapanId,
                dataProgramare: dataAleasa.replace("T", " "),
                motiv         : motiv,
            }
        )
        if(raspunsApi.status === 200){
            //pt tag-ul <p> in OptiuniAnimal
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect programare
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Programare adăugată",
            }
            setRaspuns(raspuns)
            //obiectul programare din raspunsApi.data trebuie pus in lista de programari
            programari.push(raspunsApi.data)
        }
        else{
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data, //la esec se returneaza mesajul de eroare de la server
            }
            setRaspuns(raspuns)
        }
        setViewProgramareNoua(false)
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

                <div className="containerLinie">
                    <p className="textEroare">{raspuns.data}</p>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ProgramareNoua