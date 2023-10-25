import "./ModalDetaliiEntitate.css"
import { useEffect, useState } from "react"
import { editEntitate, salvarePoza } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import ProgramareNoua from "../Programari/ProgramareNoua";
import VizitaNoua from "../Vizite/VizitaNoua"
import { BaraModalEntitate, ContainerInputPoza } from "../ComponenteModale"
import TabelDetaliiEntitate from "./TabelDetaliiEntitate";
import BaraTabelDetalii from "./BaraTabelDetalii";


const ModalDetaliiEntitate = (
    {   animale, stapani, angajati, vizite, programari, tratamente, api, jwtToken, pozePagina, indexEntitateCurenta,
        numeEntitati, setListaEntitati, pozaEntitate, setPozaEntitate, entitateCurenta, setViewDetaliiEntitate 
    }) => {
    
    const handleClickInchidereOptiuniEntitate = () => {
        setViewDetaliiEntitate(false) 
    }

    //campuri comune
    const [idEntitateCurenta,      setIdEntitateCurenta]      = useState('')
    const [numeEntitateCurenta,    setNumeEntitateCurenta]    = useState('')
    //campuri animale
    const [rasaAnimalCurent,       setRasaAnimalCurent]       = useState('')
    const [specieAnimalCurent,     setSpecieAnimalCurent]     = useState('')
    //campuri stapani, angajat
    const [emailEntitateCurenta,   setEmailEntitateCurenta]   = useState('')
    const [telefonEntitateCurenta, setTelefonEntitateCurenta] = useState('')
    //campuri angajati
    const [functieEntitateCurenta, setFunctieEntitateCurenta] = useState('')

    //statistici comune
    const [totalVizite,            setTotalVizite]            = useState('0')
    //statistici animale, stapani
    const [programariViitoare,     setProgramariViitoare]     = useState('0')
    const [tratamenteActive,       setTratamenteActive]       = useState('0')
    //statistici stapani
    const [totalAnimale,           setTotalAnimale]           = useState('0')

    //functii animale
    const [viewProgramareNoua,     setViewProgramareNoua]     = useState(false)
    const [viewVizitaNoua,         setViewVizitaNoua]         = useState(false)
    //functii stapani
    //view animal nou

    const [listaTabel,             setListaTabel]             = useState([])
    const [optiune,                setOptiune]                = useState('')

    const [viziteEntitate,         setViziteEntitate]         = useState([])
    const [tratamenteEntitate,     setTratamenteEntitate]     = useState([])
    const [programariEntitate,     setProgramariEntitate]     = useState([])
    const [animaleEntitate,        setAnimaleEntitate]        = useState([])    

    const [textRaspuns,            setTextRaspuns]            = useState('')
    const [viewRaspuns,            setViewRaspuns]            = useState(false)


    const [textFiltru,      setTextFiltru] = useState('')
    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const handleShowViziteEntitate     = () => { setListaTabel(viziteEntitate),     setOptiune('vizite')     }
    const handleShowTratamenteEntitate = () => { setListaTabel(tratamenteEntitate), setOptiune('tratamente') }
    const handleShowProgramariEntitate = () => { setListaTabel(programariEntitate), setOptiune('programari') }
    const handleShowAnimaleEntitate    = () => { setListaTabel(animaleEntitate),    setOptiune("animale")    }

    const butoaneBara = {
        butoaneAnimale: [
            { label: "Vizite",     functie: handleShowViziteEntitate     },
            { label: "Tratamente", functie: handleShowTratamenteEntitate },
            { label: "Programari", functie: handleShowProgramariEntitate }
        ],
        butoaneStapani: [
            { label: "Vizite",     functie: handleShowViziteEntitate     },
            { label: "Tratamente", functie: handleShowTratamenteEntitate },
            { label: "Programari", functie: handleShowProgramariEntitate },
            { label: "Animale",    functie: handleShowAnimaleEntitate    }
        ],
    }

    useEffect(
        () => {            
            if(entitateCurenta){
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                let nrAnimale    = 0
                
                let v = []
                let t = []
                let p = []
                let a = []

                if(numeEntitati === 'animale'){
                    setIdEntitateCurenta    (entitateCurenta.animalId)
                    setNumeEntitateCurenta  (entitateCurenta.nume)
                    setRasaAnimalCurent     (entitateCurenta.rasa)
                    setSpecieAnimalCurent   (entitateCurenta.specie)
                    vizite && vizite.map((vizita) => { 
                        if(vizita.animalId.animalId === entitateCurenta.animalId){ nrVizite = nrVizite + 1, v.push(vizita) } 
                    })
                    programari && programari.map((programare) => { 
                        if(programare.animalId.animalId === entitateCurenta.animalId && programare.stare === 'confirmata'){ nrProgramari = nrProgramari + 1, p.push(programare) }
                    })
                    tratamente && tratamente.map((tratament)  => { 
                        const dataSfarsit = new Date(tratament.dataSfarsit)
                        if(tratament.animalId.animalId === entitateCurenta.animalId && dataSfarsit > dataCurenta){ nrTratamente = nrTratamente + 1, t.push(tratament) }  
                    })
                    setOptiune('vizite'),
                    setListaTabel(v)
                }
                else if(numeEntitati === 'stapani'){
                    setIdEntitateCurenta     (entitateCurenta.stapanId)
                    setNumeEntitateCurenta   (entitateCurenta.nume)
                    setTelefonEntitateCurenta(entitateCurenta.nrTelefon)
                    setEmailEntitateCurenta  (entitateCurenta.email)
                    vizite && vizite.map((vizita) => { 
                        if(vizita.stapanId.stapanId === entitateCurenta.stapanId){ nrVizite = nrVizite + 1, v.push(vizita) } 
                    })
                    programari && programari.map((programare) => { 
                        if(programare.stapanId.stapanId === entitateCurenta.animalId && programare.stare === 'confirmata'){ nrProgramari = nrProgramari + 1, p.push(programare) }
                    })
                    tratamente && tratamente.map((tratament)  => { 
                        const dataSfarsit = new Date(tratament.dataSfarsit)
                        if(tratament.animalId.stapan.stapanId === entitateCurenta.stapanId && dataSfarsit > dataCurenta){ nrTratamente = nrTratamente + 1, t.push(tratament) }  
                    })
                    animale && animale.map((animal)  => { 
                        if(animal.stapan.stapanId === entitateCurenta.stapanId){ nrAnimale = nrAnimale + 1, a.push(animal) }  
                    })
                    setOptiune('animale')
                    setListaTabel(a)
                }

                setTotalVizite(nrVizite)
                setProgramariViitoare(nrProgramari)
                setTratamenteActive(nrTratamente)
                setTotalAnimale(nrAnimale)

                setViziteEntitate(v)
                setProgramariEntitate(p) 
                setTratamenteEntitate(t)
                setAnimaleEntitate(a)

            }
        }, [entitateCurenta]
    )

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            const idEntitate = entitateCurenta.animalId
            const raspunsApi = await salvarePoza({api, poza, jwtToken, folder: "poze_animale", idEntitate, entitate: "animal"}) 
            console.log(raspunsApi.status)
            if(raspunsApi.status === 200){
                setTextRaspuns(raspunsApi)
                setViewRaspuns(true)
                setPozaEntitate(poza)
                pozePagina[indexEntitateCurenta] = poza
            }  
        } catch(error){ 
            setTextRaspuns("EROARE")
        }
    }

    const updateListaAnimale = (entitate) => {
        let animaleEditate = [...animale]
        animaleEditate.map((animalLista, index) => {
            if(animalLista.animalId === idEntitateCurenta){
                animaleEditate[index] = entitate
            }
        })
        setListaEntitati(animaleEditate)
    }
    
    const updateListaStapani = (entitate) => {
        let stapaniEditati = [...stapani]
        stapaniEditati.map((stapanLista, index) => {
            if(stapanLista.stapanId === idEntitateCurenta){
                stapaniEditati[index] = entitate
            }
        })
        setListaEntitati(stapaniEditati)
    }

    const updateListaAngajati = () => {

    }


        //////aici de schimbat viewAnimale/viewStapan/....

            //////aici de schimbat viewAnimale/viewStapan/....

    const handleClickEditEntitate = async () => {
        let apiEndpoint = ''
        let cerere      = ''
        let entitate    = ''

        if(numeEntitati === 'animale'){
            apiEndpoint = api + '/animale/editAnimal'
            cerere = {
                "animalId"    :   idEntitateCurenta,        
                "nume"        :   numeEntitateCurenta,
                "specie"      :   specieAnimalCurent,
                "rasa"        :   rasaAnimalCurent,
            }
            entitate = {    
                ...entitateCurenta,
                "nume"   : numeEntitateCurenta,
                "specie" : specieAnimalCurent,
                "rasa"   : rasaAnimalCurent,            
            }
        }
        else if(numeEntitati === 'stapani'){

        }
        else if(numeEntitati === 'angajati'){

        }
        
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        


        //////aici de schimbat viewAnimale/viewStapan/....

                //////aici de schimbat viewAnimale/viewStapan/....

        if(raspunsApi.status === 200){
            let listaEditata = []
            if(numeEntitati === 'animale')
                updateListaAnimale(entitate)
            else if(numeEntitati === 'stapani')
                updateListaStapani(entitate)
            else if(numeEntitati === 'angajati')
                updateListaAngajati(entitate)
        }

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
            <div className="modalDetaliiEntitate">
               <BaraModalEntitate 
                    titluModal             = {entitateCurenta.nume}
                    functieInchindereModal = {handleClickInchidereOptiuniEntitate}
               />

               <div className="inputuriDetaliiEntitate">
                    <ContainerInputPoza 
                        pozaCurenta      = {pozaEntitate}
                        handleChangePoza = {handleChangePoza}
                    />

                    <div className="inputuriTextDetaliiEntitate">
                        
                        <div className="linieInput">
                            <label htmlFor="numeEntitateCurenta">Nume</label>
                            <input id="numeEntitateCurenta" value={numeEntitateCurenta} onChange={(e) => {setNumeEntitateCurenta(e.target.value)}}></input>
                        </div>

                        {(numeEntitati === 'animale') && (
                        <>
                        <div className="linieInput">
                            <label htmlFor="specieAnimalCurent">Specie</label>
                            <input id="specieAnimalCurent" value={specieAnimalCurent} onChange={(e) => {setSpecieAnimalCurent(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <label htmlFor="rasaAnimalCurent">Rasă</label>
                            <input value={rasaAnimalCurent} onChange={(e) => {setRasaAnimalCurent(e.target.value)}}></input>
                        </div>
                        </>)}

                        {(numeEntitati === 'stapani' || numeEntitati === 'angajati') && (
                        <>
                        <div className="linieInput">
                            <label htmlFor="emailEntitateCurenta">Email</label>
                            <input value={emailEntitateCurenta} onChange={(e) => {setEmailEntitateCurenta(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <label htmlFor="telefonEntitateCurenta">Telefon</label>
                            <input value={telefonEntitateCurenta} onChange={(e) => {setTelefonEntitateCurenta(e.target.value)}}></input>
                        </div>
                        </>)}

                        {numeEntitati === 'angajati' && (
                        <>
                        <div className="linieInput">
                            <label htmlFor="functieEntitateCurenta">Functie</label>
                            <input value={functieEntitateCurenta} onChange={(e) => {setFunctieEntitateCurenta(e.target.value)}}></input>
                        </div>
                        </>)}

                        <div className="linieInput">
                            <button onClick={handleClickEditEntitate}>Editează</button>
                        </div>                          
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        <RowStatistica label={"Total Vizite"}        valoare={totalVizite}/>
                        {(numeEntitati === 'animale' || numeEntitati === 'stapani') && (
                        <>
                        <RowStatistica label={"Programări viitoare"} valoare={programariViitoare}/>
                        <RowStatistica label={"Tratamente active"}   valoare={tratamenteActive}/>
                        </>)}   
                        {numeEntitati === 'stapani' && (
                        <RowStatistica label={"Total animale"}        valoare={totalAnimale}/>
                        )}
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        {numeEntitati === 'animale' && (
                        <>
                        <div className="linieInput">
                            <button onClick={() => {setViewProgramareNoua(true)}}>Programare nouă</button>
                        </div>
                        <div className="linieInput">
                            <button onClick={() => {setViewVizitaNoua(true)}}>Vizită nouă</button>
                        </div>
                        <div className="linieInput">
                            <button>Vezi stăpân</button>
                        </div>
                        </>)}
                    </div>               
                </div>

                <div style={{width: "100%", height: "7%"}}>
                    <BaraTabelDetalii 
                        butoaneBara = {
                            (numeEntitati === 'animale') ? butoaneBara.butoaneAnimale : 
                            (numeEntitati === 'stapani')  ? butoaneBara.butoaneStapani : 
                            butoaneBara.butoaneAngajati
                        }
                        textFiltru          = {textFiltru}
                        functieFiltru       = {handleChangeTextFiltru}
                    />
                </div>

                <TabelDetaliiEntitate 
                    listaTabel             = {listaTabel}
                    optiune                = {optiune} 
                    textFiltru             = {textFiltru}
                    viewTabel              = {entitateCurenta}
                    setOptiune             = {setOptiune}
                    jwtToken               = {jwtToken}
                    api                    = {api}  
                />

            </div>

            {viewProgramareNoua && (
            <ProgramareNoua 
                animalCurent          = {entitateCurenta}
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
                animalCurent          = {entitateCurenta}
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
export default ModalDetaliiEntitate