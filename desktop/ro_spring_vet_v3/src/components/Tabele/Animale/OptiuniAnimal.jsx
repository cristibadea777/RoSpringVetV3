import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../ModalOptiuni.css"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { editAnimal, salvarePoza } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import ProgramareNoua from "../Programari/ProgramareNoua";


const OptiuniAnimal = (
    { animale, vizite, programari, tratamente, animalCurent, setAnimalCurent, pozeAnimale, api, jwtToken }) => {
    
    const handleClickInchidereOptiuniAnimal = () => {
        setAnimalCurent(null)
    }

    const [idAnimalCurent,      setIdAnimalCurent]      = useState('')
    const [numeAnimalCurent,    setNumeAnimalCurent]    = useState('')
    const [rasaAnimalCurent,    setRasaAnimalCurent]    = useState('')
    const [specieAnimalCurent,  setSpecieAnimalCurent]  = useState('')
    const [pozaAnimalCurent,    setPozaAnimalCurent]    = useState('')
    const [totalVizite,         setTotalVizite]         = useState('0')
    const [programariViitoare,  setProgramariViitoare]  = useState('0')
    const [tratamenteActive,    setTratamenteActive]    = useState('0')
    const [raspuns,             setRaspuns]             = useState('')
    const [viewProgramareNoua,  setViewProgramareNoua]  = useState(false)

    const optiune = ''
    
    useEffect(
        () => {
            if(animalCurent){
                setIdAnimalCurent    (animalCurent.animalId)
                setNumeAnimalCurent  (animalCurent.nume)
                setRasaAnimalCurent  (animalCurent.rasa)
                setSpecieAnimalCurent(animalCurent.specie)
                setPozaAnimalCurent  (pozeAnimale[animalCurent.animalId])
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                vizite.map((vizita) => {
                    if(vizita.animalId.animalId === animalCurent.animalId) 
                        nrVizite = nrVizite + 1 
                })
                programari.map((programare) => { 
                    if(programare.animalId.animalId === animalCurent.animalId && programare.stare === 'confirmata') 
                        nrProgramari = nrProgramari + 1 
                })
                tratamente.map((tratament)  => { 
                    const dataSfarsit = new Date(tratament.dataSfarsit)
                    if(tratament.animalId.animalId === animalCurent.animalId && dataSfarsit > dataCurenta) 
                        nrTratamente = nrTratamente + 1 
                })
                setTotalVizite(nrVizite)
                setProgramariViitoare(nrProgramari)
                setTratamenteActive(nrTratamente)
            }
        }, [animalCurent]
    )

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            const idEntitate = animalCurent.animalId
            console.log(poza)
            setPozaAnimalCurent(poza)
            const raspunsApi = await salvarePoza({api, poza, jwtToken, folder: "poze_animale", idEntitate, entitate: "animal"}) 
            setRaspuns(raspunsApi)
            if(raspunsApi.status === 200)
                pozeAnimale[animalCurent.animalId] = poza
        } catch(error){ 
            setRaspuns("EROARE")
            console.log(error) 
        }
    }
    
    const handleClickEditAnimal = async () => {
        const apiEndpoint = api + '/animale/editAnimal'
        const raspunsApi = await editAnimal({jwtToken, apiEndpoint, idAnimalCurent, numeAnimalCurent, specieAnimalCurent, rasaAnimalCurent})
        
        if(raspunsApi.status === 200){
            const animal = {    
                ...animalCurent,
                "nume"   : numeAnimalCurent,
                "specie" : specieAnimalCurent,
                "rasa"   : rasaAnimalCurent,            
            }
            animale.map((animalLista, index) => {
                if(animalLista.animalId === idAnimalCurent){
                    animale[index] = animal
                }
            })
            setAnimalCurent(animal)    
        }
        setRaspuns(raspunsApi)
    }

    const handleChangeSelectVezi = (optiune) => { 
        switch (optiune) {
            case "stapan":
                break
            case "vizite":
                break
            case "programari":
                break
            case "tratamente":
                break
            default:
                break
        }
        
    }

    const handleChangeSelectAdauga = (event) => { 
        const optiune = event.target.value 
        switch (optiune) {
            case "programare_noua":
                setViewProgramareNoua(true)
                break;
            case "vizita_noua":

                break;
            default:
                break;
        }
    }

    const RowStatistica = ({label, valoare}) => (
        <div className="linieStatistici">
            <div className="statisticiStanga"><p>{label}</p></div>
            <div className="statisticiDreapta"><p>{valoare}</p></div>
        </div>
    )

    return(
        <div className="modal">
            <div className="modalOptiuni">
                <div className="baraModal">
                    <div id="stanga">  
                        <p className="textTitluModal">{animalCurent.nume} - Opțiuni</p> 
                    </div>
                    <div id="dreapta"> 
                        <button className="butonInchidere" onClick={handleClickInchidereOptiuniAnimal}>
                            <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />
                        </button> 
                    </div>
                </div>
               <div className="modalOptiuniInputuri">
                    <div id="containerInputPoza">
                        <div className="containerPoza">
                            <img src={pozaAnimalCurent} />
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
                                <button onClick={handleClickEditAnimal}>Editează</button>
                            </div>
                        </div>
                    </div>
               </div>
               <div className="modalOptiuniButoaneSiStatistici">
                    <div className="modalOptiuniButoane">
                            <div className="linieOptiuniButoane">
                                <div className="optiuniButoaneStanga">
                                    <p>Adaugă</p>
                                </div>
                                <select value={optiune} className="optiuniButoaneDreapta" onChange={handleChangeSelectAdauga}>
                                    <option> - </option>
                                    <option value={"programare_noua"}>Programare nouă</option>
                                    <option value={"vizita_noua"}>Vizită nouă</option>
                                </select>
                            </div>
                            <div className="linieOptiuniButoane">
                                <div className="optiuniButoaneStanga">
                                    <p>Vezi</p>
                                </div>
                                <select className="optiuniButoaneDreapta" onChange={handleChangeSelectVezi}>
                                    <option> - </option>
                                    <option value={"stapan"}>Stăpân</option>
                                    <option value={"vizite"}>Vizite</option>
                                    <option value={"programari"}>Programări</option>
                                    <option value={"tratamente"}>Tratamente</option>
                                </select>
                            </div>
                    </div>
                    <div className="modalOptiuniStatistici">
                        <RowStatistica label={"Total Vizite"} valoare={totalVizite}/>
                        <RowStatistica label={"Programări viitoare"} valoare={programariViitoare}/>
                        <RowStatistica label={"Tratamente active"} valoare={tratamenteActive}/>
                    </div>  
                    
               </div>
               <div className="modalOptiuniRaspuns">
                    <p style={{color: (raspuns.status === 200) ? "cyan" : "red"}}> {raspuns.data} </p>
               </div>
            </div>

            {viewProgramareNoua && (
            <ProgramareNoua 
                animalCurent          = {animalCurent}
                setViewProgramareNoua = {setViewProgramareNoua}
                api                   = {api}
                jwtToken              = {jwtToken}
                setRaspuns            = {setRaspuns}
                programari            = {programari}
            />)}
            
        </div>
    )
}
export default OptiuniAnimal