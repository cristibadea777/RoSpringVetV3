import "../DetaliiEntitate/ModalDetaliiEntitate.css"
import { useEffect, useState } from "react"
import { editEntitate, getPoza, salvarePoza } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import ProgramareNoua from "../Programari/ProgramareNoua";
import VizitaNoua from "../Vizite/VizitaNoua"
import { BaraModalEntitate, ContainerInputPoza } from "../ComponenteModale";
import BaraTabelDetalii from "../DetaliiEntitate/BaraTabelDetalii";
import TabelDetaliiEntitate from "../DetaliiEntitate/TabelDetaliiEntitate";


const DetaliiAnimal = (
    {   
        animalCurent, animale, setAnimale, api, jwtToken, vizite, programari, tratamente, pozePagina, angajati, setViewDetaliiAnimal
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

    useEffect(
        () => {            
            if(animalCurent.entitate){
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                
                let v = []
                let t = []
                let p = []

                setIdAnimalCurent       (animalCurent.entitate.animalId)
                setNumeAnimalCurent     (animalCurent.entitate.nume)
                setRasaAnimalCurent     (animalCurent.entitate.rasa)
                setSpecieAnimalCurent   (animalCurent.entitate.specie)

                vizite && vizite.map((vizita) => { 
                    if(vizita.animalId.animalId === animalCurent.entitate.animalId){ nrVizite = nrVizite + 1, v.push(vizita) } 
                })
                programari && programari.map((programare) => { 
                    if(programare.animalId.animalId === animalCurent.entitate.animalId && programare.stare === 'confirmata'){ nrProgramari = nrProgramari + 1, p.push(programare) }
                })
                tratamente && tratamente.map((tratament)  => { 
                    const dataSfarsit = new Date(tratament.dataSfarsit)
                    if(tratament.animalId.animalId === animalCurent.entitate.animalId && dataSfarsit > dataCurenta){ nrTratamente = nrTratamente + 1, t.push(tratament) }  
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
            }
        }, [animalCurent]
    )

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            const idEntitate = animalCurent.entitate.animalId
            const raspunsApi = await salvarePoza({api, poza, jwtToken, folder: "poze_animale", idEntitate, entitate: "animal"}) 
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data.raspuns
            }
            setTextRaspuns(raspuns)
            setViewRaspuns(true)

            if(raspunsApi.status === 200){
                animalCurent.pozaEntitate = poza
                animalCurent.entitate.imagine = raspunsApi.data.numePoza
                updateListaAnimale(animalCurent.entitate)
                pozePagina[animalCurent.indexInPagina] = poza 
            }  
        } catch(error){ 
            console.log(error)
            setTextRaspuns("EROARE")
        }
    }

    const handleShowModalStapan = (animal) => {
        
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
        const entitate = {    
            ...animalCurent.entitate,
            "nume"   : numeAnimalCurent,
            "specie" : specieAnimalCurent,
            "rasa"   : rasaAnimalCurent,            
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200)
            updateListaAnimale(entitate)
        setTextRaspuns(raspunsApi)
        setViewRaspuns(true)
    }

    const RowStatistica = ({label, valoare}) => (
        <div className="linieStatistica">
            <div><p>{label}</p></div>
            <p>{valoare}</p>
        </div>
    )

    return(
        <div className="modalTabele"> 
            <div className="modalDetaliiEntitate" >
               <BaraModalEntitate 
                    titluModal             = {animalCurent.entitate.nume}
                    functieInchindereModal = {handleClickInchidereOptiuniEntitate}
               />

               <div className="inputuriDetaliiEntitate">
                    <ContainerInputPoza 
                        pozaCurenta      = {animalCurent.pozaEntitate}
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
                            <button onClick={() => {handleShowModalStapan(animalCurent.entitate)}}>Vezi stăpân</button>
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
                animalCurent          = {animalCurent.entitate}
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
                animalCurent          = {animalCurent.entitate}
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