import { useState } from "react"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { editEntitate } from "../../AccesareAPI"

const DetaliiTratament = ({tratamente, setTratamente, tratamentCurent, setViewDetaliiTratament, setTextRaspuns, setViewRaspuns, api, jwtToken, authority}) => {

    const handleClickInchidere = () => { setViewDetaliiTratament(false) }
    
    const azi = new Date().toISOString().split('T')[0]
    const [dataAleasa,      setDataAleasa]      = useState(tratamentCurent.dataSfarsit)
    const [metodaTratament, setMetodaTratament] = useState(tratamentCurent.metodaTratament)

    const handleChangeData  = (event) => { setDataAleasa(event.target.value) }
    const handleChangeMetodaTratament = (event) => { setMetodaTratament(event.target.value)      }

    const updateListaTratamente = (tratamentEditat) => {
        let tratamenteEditate = [...tratamente]       
        tratamenteEditate.map((tratament, index) => {
            if(tratament.tratamentId === tratamentCurent.tratamentId){
                tratamenteEditate[index] = tratamentEditat
            }
        })        
        setTratamente(tratamenteEditate)
    }

    const handleClickEditeazaTratament = async () => {
        const apiEndpoint = api +  "/tratamente/editTratament"
        const cerere = {
            "tratamentId"       : tratamentCurent.tratamentId,
            "metodaTratament"   : metodaTratament,
            "dataSfarsit"       : dataAleasa
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200){
            setTextRaspuns(raspunsApi)
            const tratamentEditat = {
                ...tratamentCurent,
            }
            tratamentEditat.metodaTratament = metodaTratament
            tratamentEditat.dataTratament   = dataAleasa
            updateListaTratamente(tratamentEditat)
            setViewDetaliiTratament(false)
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
                        <p className="textTitluModal">{tratamentCurent.dataTratament} - {tratamentCurent.animalId.nume}</p> 
                    </div>    
                    <div id="dreapta"> 
                        <button className="butonInchidere" onClick={handleClickInchidere}>
                            <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />     
                        </button> 
                    </div>
                </div>

                <div className="containerAdaugare">
                    <div className="containerLinie">
                        <label htmlFor="dataAleasa">Dată sfarsit</label>
                        <input type="datetime-local" id="dataAleasa" value={dataAleasa} onChange={handleChangeData} min={azi}></input>
                    </div>
                    
                    <div className="containerLinie">
                        <label htmlFor="metodaTratament">Metoda tratamente</label>
                        <input id="metodaTratament" value={metodaTratament} onChange={handleChangeMetodaTratament}></input>
                    </div>

                    {authority === "ADMIN" && (
                    <div className="containerLinie" style={{justifyContent: "flex-end"}}>
                        <button onClick={handleClickEditeazaTratament}>Editează</button>
                    </div>
                    )}
                    
                </div>
                
            </div>
        </div>
    )

}
export default DetaliiTratament