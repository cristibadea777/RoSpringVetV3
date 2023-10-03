import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Animale.css"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

const OptiuniAnimal = ({animalCurent, setAnimalCurent, pozeAnimale}) => {
    
    const handleClickInchidere = () => {
        setAnimalCurent(null)
    }

    const [numeAnimalCurent,    setNumeAnimalCurent]    = useState('')
    const [rasaAnimalCurent,    setRasaAnimalCurent]    = useState('')
    const [specieAnimalCurent,  setSpecieAnimalCurent]  = useState('')

    useEffect(
        () => {
            if(animalCurent){
                setNumeAnimalCurent(animalCurent.nume)
                setRasaAnimalCurent(animalCurent.rasa)
                setSpecieAnimalCurent(animalCurent.specie)
            }
        }, [animalCurent]
    )

    return(
        <div className="modal">
            <div className="modalOptiuni">
                <div className="baraModalOptiuni">
                    <div id="stanga">  
                        <p className="textTitluModal">{animalCurent.nume} - Opțiuni</p> 
                    </div>
                    <div id="dreapta"> 
                        <button className="butonInchidere" onClick={handleClickInchidere}>
                            <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />
                        </button> 
                    </div>
                </div>
               <div className="modalOptiuniInputuri">
                    <div id="containerInputPoza">
                        <div className="containerPoza">
                            <img 
                                src={pozeAnimale[animalCurent.animalId]} 
                                height="70%" width="auto"
                            />
                        </div>
                        <div className="containerButonSchimbaPoza">
                            <button>Schimbă poza</button>
                        </div>
                    </div>
                    <div id="containerInputuriText">
                        <div className="linieInputuriModalOptiuni">
                            <input value={numeAnimalCurent} onChange={(e) => {setNumeAnimalCurent(e.target.value)}}></input>
                        </div>
                        <div className="linieInputuriModalOptiuni">
                            <input value={specieAnimalCurent} onChange={(e) => {setSpecieAnimalCurent(e.target.value)}}></input>
                        </div>
                        <div className="linieInputuriModalOptiuni">
                            <input value={rasaAnimalCurent} onChange={(e) => {setRasaAnimalCurent(e.target.value)}}></input>
                        </div>
                        <div className="linieInputuriModalOptiuni">
                            <div id="containerButonEdit">
                                
                            </div>
                        </div>
                    </div>
               </div>
               <div className="modalOptiuniButoane">
                    <select>
                        <option disabled selected>Adaugă</option>
                        <option>Programare nouă</option>
                        <option>Vizită nouă</option>
                    </select>
                    <select>
                        <option value={"Vezi"} disabled selected>Vezi</option>
                        <option>Stăpân</option>
                        <option>Vizite</option>
                        <option>Programări</option>
                        <option>Tratamente</option>
                    </select>
                    <button>Editează</button>
               </div>
               <div className="modalOptiuniEroare">
                    <p>aci erori</p>
               </div>
            </div>
        </div>
    )
}
export default OptiuniAnimal