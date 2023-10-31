import "../DetaliiEntitate/ModalDetaliiEntitate.css"
import { useEffect, useState } from "react"
import { editEntitate, getEntitate, getPoza, salvarePoza } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import ProgramareNoua from "../Programari/ProgramareNoua";
import VizitaNoua from "../Vizite/VizitaNoua"
import { BaraModalEntitate, ContainerInputPoza } from "../ComponenteModale";
import BaraTabelDetalii from "../DetaliiEntitate/BaraTabelDetalii";
import TabelDetaliiEntitate from "../DetaliiEntitate/TabelDetaliiEntitate";
import DetaliiStapan from "../Stapani/DetaliiStapan";

const DetaliiAnimal = (
    {   
        animalCurent, animale, setAnimale, stapani, setStapani, api, jwtToken, vizite, programari, tratamente, angajati, setViewDetaliiAnimal
    }) => {
    
    const handleClickInchidereOptiuniEntitate = () => { setViewDetaliiAnimal(false) }

    const [idAnimalCurent,          setIdAnimalCurent]        = useState('')
    const [numeAnimalCurent,        setNumeAnimalCurent]      = useState('')
    const [rasaAnimalCurent,       setRasaAnimalCurent]       = useState('')
    const [specieAnimalCurent,     setSpecieAnimalCurent]     = useState('')
 
    const [totalVizite,            setTotalVizite]            = useState('0')
    const [programariViitoare,     setProgramariViitoare]     = useState('0')
    const [tratamenteActive,       setTratamenteActive]       = useState('0')

    const [viewProgramareNoua,     setViewProgramareNoua]     = useState(false)
    const [viewVizitaNoua,         setViewVizitaNoua]         = useState(false)

    const [listaTabel,             setListaTabel]             = useState([])
    const [optiune,                setOptiune]                = useState('')

    const [viziteEntitate,         setViziteEntitate]         = useState([])
    const [tratamenteEntitate,     setTratamenteEntitate]     = useState([])
    const [programariEntitate,     setProgramariEntitate]     = useState([])

    const [textRaspuns,            setTextRaspuns]            = useState('')
    const [viewRaspuns,            setViewRaspuns]            = useState(false)

    const [pozaAnimal,  setPozaAnimal] = useState('')
    const getPozaAnimal = async () => {
        let cale_poza = 'animal_default.png'
        if(animalCurent.imagine !== null){ cale_poza = animalCurent.imagine }
        const apiEndpoint = api + '/resources/poze_animale/' + cale_poza
        const poza = await getPoza({ jwtToken, apiEndpoint })
        setPozaAnimal(poza)
    }    
    
    const [textFiltru,      setTextFiltru] = useState('')
    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const handleShowViziteEntitate     = () => { setListaTabel(viziteEntitate),     setOptiune('vizite')     }
    const handleShowTratamenteEntitate = () => { setListaTabel(tratamenteEntitate), setOptiune('tratamente') }
    const handleShowProgramariEntitate = () => { setListaTabel(programariEntitate), setOptiune('programari') }

    const butoaneBara = {
        butoaneAnimale: [
            { label: "Vizite",     functie: handleShowViziteEntitate     },
            { label: "Tratamente", functie: handleShowTratamenteEntitate },
            { label: "Programari", functie: handleShowProgramariEntitate }
        ],
    }

    const [stapan,      setStapan    ] = useState('')
    const getStapan = async () => {
        const apiEndpoint = api + '/stapani/getStapan' + '?stapanId=' + animalCurent.stapan.stapanId
        const stapan = await getEntitate({ jwtToken, apiEndpoint }) 
        setStapan(stapan)
    }

    useEffect(
        () => {            
            if(animalCurent){
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                
                let v = []
                let t = []
                let p = []

                setIdAnimalCurent       (animalCurent.animalId)
                setNumeAnimalCurent     (animalCurent.nume)
                setRasaAnimalCurent     (animalCurent.rasa)
                setSpecieAnimalCurent   (animalCurent.specie)

                vizite && vizite.map((vizita) => { 
                    if(vizita.animalId.animalId === animalCurent.animalId){ nrVizite = nrVizite + 1, v.push(vizita) } 
                })
                programari && programari.map((programare) => { 
                    if(programare.animalId.animalId === animalCurent.animalId && programare.stare === 'confirmata'){ nrProgramari = nrProgramari + 1, p.push(programare) }
                })
                tratamente && tratamente.map((tratament)  => { 
                    const dataSfarsit = new Date(tratament.dataSfarsit)
                    if(tratament.animalId.animalId === animalCurent.animalId && dataSfarsit > dataCurenta){ nrTratamente = nrTratamente + 1, t.push(tratament) }  
                })
                //default pt animale
                setOptiune('vizite'),
                setListaTabel(v)

                setTotalVizite(nrVizite)
                setProgramariViitoare(nrProgramari)
                setTratamenteActive(nrTratamente)

                setViziteEntitate(v)
                setProgramariEntitate(p) 
                setTratamenteEntitate(t)

                getPozaAnimal()

                getStapan()                                    
            }
        }, [animalCurent, animale]
    )

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            const idEntitate = animalCurent.animalId
            const raspunsApi = await salvarePoza({api, poza, jwtToken, folder: "poze_animale", idEntitate, entitate: "animal"}) 
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data.raspuns
            }
            setTextRaspuns(raspuns)
            if(raspunsApi.status === 200){
                animalCurent.imagine = raspunsApi.data.numePoza
                updateListaAnimale(animalCurent)
                getPozaAnimal()
            }  
        } catch(error){  setTextRaspuns("EROARE") }
        setViewRaspuns(true)
    }

    const updateListaAnimale = (animalEditat) => {
        let animaleEditate = [...animale]        
        animaleEditate.map((animal, index) => {
            if(animal.animalId === idAnimalCurent){
                animaleEditate[index] = animalEditat
            }
        })
        setAnimale(animaleEditate)
    }

    const handleClickEditEntitate = async () => {
        const apiEndpoint = api + '/animale/editAnimal'
        const cerere = {
            "animalId"    :   idAnimalCurent,        
            "nume"        :   numeAnimalCurent,
            "specie"      :   specieAnimalCurent,
            "rasa"        :   rasaAnimalCurent,
        }
        const animalEditat = {    
            ...animalCurent,
            "nume"   : numeAnimalCurent,
            "specie" : specieAnimalCurent,
            "rasa"   : rasaAnimalCurent,            
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200)
            updateListaAnimale(animalEditat)
        setTextRaspuns(raspunsApi)
        setViewRaspuns(true)
    }

    const RowStatistica = ({label, valoare}) => (
        <div className="linieStatistica">
            <div><p>{label}</p></div>
            <p>{valoare}</p>
        </div>
    )

    const [viewDetaliiStapan,   setViewDetaliiStapan] = useState(false)
    const handleShowModalStapan = () => {
        setViewDetaliiStapan(true)
    }

    return(
        <div className="modalTabele"> 
            {viewDetaliiStapan&&(
                <DetaliiStapan 
                    stapanCurent         = {stapan}
                    setViewDetaliiStapan = {setViewDetaliiStapan}
                    animale              = {animale}
                    setAnimale           = {setAnimale}
                    stapani              = {stapani}
                    setStapani           = {setStapani}
                    api                  = {api}
                    jwtToken             = {jwtToken}
                    vizite               = {vizite}
                    programari           = {programari}
                    tratamente           = {tratamente}
                    angajati             = {angajati}
                />
            )}
        
            <div className="modalDetaliiEntitate" >
               <BaraModalEntitate 
                    titluModal             = {animalCurent.nume}
                    functieInchindereModal = {handleClickInchidereOptiuniEntitate}
               />

               <div className="inputuriDetaliiEntitate">
                    <ContainerInputPoza 
                        pozaCurenta      = {pozaAnimal}
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
                            <button onClick={handleClickEditEntitate}>Editează</button>
                        </div>                          
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        <RowStatistica label={"Total Vizite"}        valoare={totalVizite}/>
                        <RowStatistica label={"Programări viitoare"} valoare={programariViitoare}/>
                        <RowStatistica label={"Tratamente active"}   valoare={tratamenteActive}/>
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        <div className="linieInput">
                            <button onClick={() => {setViewProgramareNoua(true)}}>Programare nouă</button>
                        </div>
                        <div className="linieInput">
                            <button onClick={() => {setViewVizitaNoua(true)}}>Vizită nouă</button>
                        </div>
                        <div className="linieInput">
                            <button onClick={() => {handleShowModalStapan(animalCurent)}}>Vezi stăpân</button>
                        </div>
                    </div>               
                </div>

                <div style={{width: "100%", height: "7%"}}>
                    <BaraTabelDetalii 
                        butoaneBara         = {butoaneBara.butoaneAnimale}
                        textFiltru          = {textFiltru}
                        functieFiltru       = {handleChangeTextFiltru}
                    />
                </div>

                <TabelDetaliiEntitate 
                    listaTabel             = {listaTabel}
                    optiune                = {optiune} 
                    textFiltru             = {textFiltru}
                    viewTabel              = {animalCurent}
                    setOptiune             = {setOptiune}
                    jwtToken               = {jwtToken}
                    api                    = {api}  
                />
            </div>

            {viewProgramareNoua && (
            <ProgramareNoua 
                animalCurent          = {animalCurent}
                setViewProgramareNoua = {setViewProgramareNoua}
                viewProgramareNoua    = {viewProgramareNoua}
                api                   = {api}
                jwtToken              = {jwtToken}
                setTextRaspuns        = {setTextRaspuns}
                setViewRaspuns        = {setViewRaspuns}
                programari            = {programari}
            />)}
            {viewVizitaNoua && (
            <VizitaNoua 
                viewVizitaNoua        = {viewVizitaNoua}
                animalCurent          = {animalCurent}
                setViewVizitaNoua     = {setViewVizitaNoua}
                api                   = {api}
                jwtToken              = {jwtToken}
                setTextRaspuns        = {setTextRaspuns}    
                setViewRaspuns        = {setViewRaspuns}    
                vizite                = {vizite}
                angajati              = {angajati}
                tratamente            = {tratamente}
            />
            )} 

            {viewRaspuns && (
                <div className="modal"> 
                    <div style={{width:"25%", height:"33%", backgroundColor:"#232B2B", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid white"}}>
                        <p className="raspunsApi" style={{color: (textRaspuns.status === 200) ? "green" : "red"}}> {textRaspuns.data} </p>
                        <button onClick={() => {setViewRaspuns(false)}}>OK</button>
                    </div>
                </div>
            )}

        </div>
    )
}
export default DetaliiAnimal