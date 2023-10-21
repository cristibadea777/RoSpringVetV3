import "../ModalDetaliiEntitate.css"
import { useEffect, useState } from "react"
import { editAnimal, salvarePoza } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import ProgramareNoua from "../Programari/ProgramareNoua";
import VizitaNoua from "../Vizite/VizitaNoua"
import { BaraModalEntitate, ContainerInputPoza } from "../ComponenteModale"


const DetaliiAnimal = (
    { animale, setAnimale, vizite, programari, angajati, tratamente, animalCurent, setAnimalCurent, pozeAnimale, api, jwtToken, pozaAnimalCurent, setPozaAnimalCurent }) => {
    
    const handleClickInchidereOptiuniAnimal = () => {
        setAnimalCurent(null)
    }

    const [idAnimalCurent,      setIdAnimalCurent]      = useState('')
    const [numeAnimalCurent,    setNumeAnimalCurent]    = useState('')
    const [rasaAnimalCurent,    setRasaAnimalCurent]    = useState('')
    const [specieAnimalCurent,  setSpecieAnimalCurent]  = useState('')
    const [totalVizite,         setTotalVizite]         = useState('0')
    const [programariViitoare,  setProgramariViitoare]  = useState('0')
    const [tratamenteActive,    setTratamenteActive]    = useState('0')
    const [raspuns,             setRaspuns]             = useState('')
    const [viewProgramareNoua,  setViewProgramareNoua]  = useState(false)
    const [viewVizitaNoua,      setViewVizitaNoua]      = useState(false)

    const optiune = ''
    
    useEffect(
        () => {
            if(animalCurent){
                setIdAnimalCurent    (animalCurent.animalId)
                setNumeAnimalCurent  (animalCurent.nume)
                setRasaAnimalCurent  (animalCurent.rasa)
                setSpecieAnimalCurent(animalCurent.specie)
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                vizite && vizite.map((vizita) => {
                    if(vizita.animalId.animalId === animalCurent.animalId) 
                        nrVizite = nrVizite + 1 
                })
                programari && programari.map((programare) => { 
                    if(programare.animalId.animalId === animalCurent.animalId && programare.stare === 'confirmata') 
                        nrProgramari = nrProgramari + 1 
                })
                tratamente && tratamente.map((tratament)  => { 
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
            
            let animaleEditate = [...animale]
            animaleEditate.map((animalLista, index) => {
                if(animalLista.animalId === idAnimalCurent){
                    animaleEditate[index] = animal
                }
            })

            setAnimale(animaleEditate)
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

    const RowStatistica = ({label, valoare}) => (
        <div className="linieStatistica">
            <div><p>{label}</p></div>
            <p>{valoare}</p>
        </div>
    )

    return(
        <div className="modalTabele">
            <div className="modalDetaliiEntitate">
               <BaraModalEntitate 
                    titluModal             = {animalCurent.nume}
                    functieInchindereModal = {handleClickInchidereOptiuniAnimal}
               />

               <div className="inputuriDetaliiEntitate">
                    <ContainerInputPoza 
                        pozaCurenta      = {pozaAnimalCurent}
                        handleChangePoza = {handleChangePoza}
                    />

                    <div className="inputuriTextDetaliiEntitate">
                        <div className="linieInput">
                            <label htmlFor="numeAnimalCurent">Nume</label>
                            <input id="numeAnimalCurent" value={numeAnimalCurent} onChange={(e) => {setNumeAnimalCurent(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <label htmlFor="specieAnimalCurent">Specie</label>
                            <input id="specieAnimalCurent" value={specieAnimalCurent} onChange={(e) => {setSpecieAnimalCurent(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <label htmlFor="rasaAnimalCurent">Rasă</label>
                            <input value={rasaAnimalCurent} onChange={(e) => {setRasaAnimalCurent(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <button onClick={handleClickEditAnimal}>Editează</button>
                        </div>                          
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        <RowStatistica label={"Total Vizite"} valoare={totalVizite}/>
                        <RowStatistica label={"Programări viitoare"} valoare={programariViitoare}/>
                        <RowStatistica label={"Tratamente active"} valoare={tratamenteActive}/>
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        <div className="linieInput">
                            <button onClick={()=>{setViewProgramareNoua(true)}}>Programare nouă</button>
                        </div>
                        <div className="linieInput">
                            <button>Vizită nouă</button>
                        </div>
                    </div>               
                </div>

                <div style={{height: "5%", width: "60%", display:"flex", alignItems: "center", justifyContent: "center"}}>
                        <p style={{color: (raspuns.status === 200) ? "green" : "red"}}> {raspuns.data} </p>
                </div>

            </div>

            {viewProgramareNoua && (
            <ProgramareNoua 
                animalCurent          = {animalCurent}
                setViewProgramareNoua = {setViewProgramareNoua}
                viewProgramareNoua    = {viewProgramareNoua}
                api                   = {api}
                jwtToken              = {jwtToken}
                raspuns               = {raspuns}
                setRaspuns            = {setRaspuns}
                programari            = {programari}
            />)}
            {viewVizitaNoua && (
            <VizitaNoua 
                viewVizitaNoua        = {viewVizitaNoua}
                animalCurent          = {animalCurent}
                setViewVizitaNoua     = {setViewVizitaNoua}
                api                   = {api}
                jwtToken              = {jwtToken}
                raspuns               = {raspuns}
                setRaspuns            = {setRaspuns}
                vizite                = {vizite}
                angajati              = {angajati}
                tratamente            = {tratamente}
            />
            )} 
        </div>
    )
}
export default DetaliiAnimal