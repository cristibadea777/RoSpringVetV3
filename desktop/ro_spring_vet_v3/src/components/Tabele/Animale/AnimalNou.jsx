import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import "../ModalAdaugare.css"
import "../Tabele.css"
import { getPoza, salvareEntitate } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"

const AnimalNou = ({stapan, setViewAnimalNou, animale, setAnimale, api, jwtToken}) => {
    
    const handleClickInchidere = () =>{ setViewAnimalNou(false) }

    const [textRaspuns, setTextRaspuns] = useState('')
    const [viewRaspuns, setViewRaspuns] = useState(false)
    const [nume,        setNume]        = useState('')
    const [specie,      setSpecie]      = useState('')
    const [rasa,        setRasa]        = useState('')
    const [pozaCurenta, setPozaCurenta] = useState('')

    const handleChangeNume      = (event) => { setNume(event.target.value)    } 
    const handleChangeSpecie    = (event) => { setSpecie(event.target.value) }
    const handleChangeRasa      = (event) => { setRasa(event.target.value)   }

    const getPozaDefault = async () => {
        const raspuns = await getPoza({ jwtToken, apiEndpoint: `${api}/resources/poze_animale/animal_default.png` })
        setPozaCurenta(raspuns)
    }
    useEffect(() => { getPozaDefault() }, [])

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            setPozaCurenta(poza)
        } catch(error){ setTextRaspuns("EROARE") }
    }
    
    const handleClickAdaugaAnimalNou = async () => {
        const cerere = {
            "stapanId"  : stapan.stapanId,
            "nume"      : nume,
            "specie"    : specie,
            "rasa"      : rasa,
            "imagine"   : pozaCurenta,
        }
        const apiEndpoint = api + "/animale/saveAnimal"
        const raspunsApi = await salvareEntitate( {jwtToken, apiEndpoint, cerere} )
        if(raspunsApi.status === 200){
            const raspuns = { 
                "status" : raspunsApi.status,
                "data"   : "Animal adăugat",
            }
            setTextRaspuns(raspuns) 
            //raspunsul de la server este animalul adaugat - pus in lista de animale si lista animalelor stapanului in modal detalii
            adaugaAnimal(raspunsApi.data)
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

    const adaugaAnimal = (animalNou) => {
        //push in lista de animale - lista de animale a stapanului se va recalcula si ea in useEffect
        const animaleEditate         = [...animale]
        animaleEditate.push(animalNou)
        setAnimale(animaleEditate)
    }

    return(
    <div className="modalTabele">
        <div className="modalAdaugare">
            <div className="baraModal">
                <div id="stanga">  
                    <p className="textTitluModal">Adaugă un animal nou</p> 
                </div>    
                <div id="dreapta"> 
                    <button className="butonInchidere" onClick={handleClickInchidere}>
                        <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />     
                    </button> 
                </div>
            </div>

            <div className="containerAdaugareInputuri">
                <div className="coloanaInputuri">
                    <div className="linieColoanaInput">
                        <label className="labelInputAdaugare" htmlFor="nume">Nume</label>
                        <input className="inputAdaugare" id="nume" value={nume} onChange={handleChangeNume}></input>
                    </div>
                    <div className="linieColoanaInput">
                        <label className="labelInputAdaugare" htmlFor="specie">Specie</label>
                        <input className="inputAdaugare" id="specie" value={specie} onChange={handleChangeSpecie}></input>
                    </div>
                    <div className="linieColoanaInput">
                        <label className="labelInputAdaugare" htmlFor="rasa">Rasa</label>
                        <input className="inputAdaugare" id="rasa" value={rasa} onChange={handleChangeRasa}></input>
                    </div>
                    <div className="linieColoanaInputButon">
                        <button onClick={handleClickAdaugaAnimalNou} className="butonAdauga">Adaugă</button>
                    </div>
                </div>
                <div className="coloanaPoza">
                    <div className="containerInputPozaModalAdauga">
                        <div className="containerPozaModalAdauga">
                            <img src={pozaCurenta} />
                        </div>
                        <div className="containerButonSchimbaPoza">
                            <label>
                                Schimbă poza
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{display: "none"}}
                                    onChange={handleChangePoza}
                                >
                                </input>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {viewRaspuns && (
            <div className="modal"> 
                <div style={{width:"25%", height:"33%", backgroundColor:"#232B2B", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid white"}}>
                    <p className="raspunsApi" style={{color: (textRaspuns.status === 200) ? "green" : "red"}}> {textRaspuns.data} </p>
                    <button onClick={() => {
                        setViewRaspuns(false)
                        if(textRaspuns.status === 200) 
                            setViewAnimalNou(false)
                    }}>OK</button>
                </div>
            </div>
        )}
    </div>
    )
}
export default AnimalNou