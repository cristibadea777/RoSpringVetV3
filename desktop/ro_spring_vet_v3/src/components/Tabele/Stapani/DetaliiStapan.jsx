import { useEffect, useState } from "react"
import { editEntitate, getPoza, salvarePoza } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import { BaraModalEntitate, ContainerInputPoza } from "../ComponenteModale"
import BaraTabelDetalii from "../DetaliiEntitate/BaraTabelDetalii"
import TabelDetaliiEntitate from "../DetaliiEntitate/TabelDetaliiEntitate"

const DetaliiStapan = (
    {   
        stapanCurent, setViewDetaliiStapan, animale, setAnimale, stapani, setStapani, api, jwtToken, vizite, programari, tratamente, angajati
    }) => {
    
    const handleClickInchidereOptiuniEntitate = () => { setViewDetaliiStapan(false) }

    const [idEntitateCurenta,      setIdEntitateCurenta]      = useState('')
    const [numeEntitateCurenta,    setNumeEntitateCurenta]    = useState('')
    const [emailEntitateCurenta,   setEmailEntitateCurenta]   = useState('')
    const [telefonEntitateCurenta, setTelefonEntitateCurenta] = useState('')
    const [totalVizite,            setTotalVizite]            = useState('0')
    const [programariViitoare,     setProgramariViitoare]     = useState('0')
    const [tratamenteActive,       setTratamenteActive]       = useState('0')
    const [totalAnimale,           setTotalAnimale]           = useState('0')
    

    ////const pt view Animal nou aici ...............\\



    ////


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
        butoaneStapani: [
            { label: "Vizite",     functie: handleShowViziteEntitate     },
            { label: "Tratamente", functie: handleShowTratamenteEntitate },
            { label: "Programari", functie: handleShowProgramariEntitate },
            { label: "Animale",    functie: handleShowAnimaleEntitate    }
        ]
    }

    useEffect(
        () => {            
            if(stapanCurent.entitate){
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                let nrAnimale    = 0
                
                let v = []
                let t = []
                let p = []
                let a = []

                setIdEntitateCurenta     (stapanCurent.entitate.stapanId)
                setNumeEntitateCurenta   (stapanCurent.entitate.nume)
                setTelefonEntitateCurenta(stapanCurent.entitate.nrTelefon)
                setEmailEntitateCurenta  (stapanCurent.entitate.email)
                vizite && vizite.map((vizita) => { 
                    if(vizita.stapanId.stapanId === stapanCurent.entitate.stapanId){ nrVizite = nrVizite + 1, v.push(vizita) } 
                })
                programari && programari.map((programare) => { 
                    if(programare.stapanId.stapanId === stapanCurent.entitate.animalId && programare.stare === 'confirmata'){ nrProgramari = nrProgramari + 1, p.push(programare) }
                })
                tratamente && tratamente.map((tratament)  => { 
                    const dataSfarsit = new Date(tratament.dataSfarsit)
                    if(tratament.animalId.stapan.stapanId === stapanCurent.entitate.stapanId && dataSfarsit > dataCurenta){ nrTratamente = nrTratamente + 1, t.push(tratament) }  
                })
                animale && animale.map((animal)  => { 
                    if(animal.stapan.stapanId === stapanCurent.entitate.stapanId){ nrAnimale = nrAnimale + 1, a.push(animal) }  
                })
                //default pt stapani
                setOptiune('animale')
                setListaTabel(a)

                setTotalVizite(nrVizite)
                setProgramariViitoare(nrProgramari)
                setTratamenteActive(nrTratamente)
                setTotalAnimale(nrAnimale)

                setViziteEntitate(v)
                setProgramariEntitate(p) 
                setTratamenteEntitate(t)
                setAnimaleEntitate(a)

            }
        }, [stapanCurent]
    )

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            const idEntitate = stapanCurent.entitate.stapanId
            const raspunsApi = await salvarePoza({api, poza, jwtToken, folder: "poze_stapani", idEntitate, entitate: "stapan"}) 
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data.raspuns
            }
            setTextRaspuns(raspuns)
            setViewRaspuns(true)

            if(raspunsApi.status === 200){
                stapanCurent.pozaEntitate = poza
                stapanCurent.entitate.imagine = raspunsApi.data.numePoza
                updateListaStapani(stapanCurent.entitate)
            }  
        } catch(error){ 
            console.log(error)
            setTextRaspuns("EROARE")
        }
    }



    const handleShowModalAnimal = (animal) => {
        setAnimalCurent(
            {
                "entitate"      : animal,
                "pozaEntitate"  : null,
            }
        )
        setViewDetaliiAnimal(true)
    }



    const updateListaStapani = (stapanEditat) => {
        let stapaniEditati = [...stapani]        
        stapaniEditati.map((element, index) => {
            if(element.stapanId === idEntitateCurenta){
                stapaniEditati[index] = stapanEditat
            }
        })
        setStapani(stapaniEditati)
    }


    const handleClickEditStapan = async () => {
        const apiEndpoint = api + '/stapani/editStapan'
        const cerere = {
            "stapanId"    :   idEntitateCurenta,        
            "nume"        :   numeEntitateCurenta,
            "nrTelefon"   :   telefonEntitateCurenta,
            "email"       :   emailEntitateCurenta,
        }
        const stapanEditat = {    
            ...stapanCurent.entitate,
            "nume"        :   numeEntitateCurenta,
            "nrTelefon"   :   telefonEntitateCurenta,
            "email"       :   emailEntitateCurenta,         
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200)
            updateListaStapani(stapanEditat)
        console.log(raspunsApi.status)
        console.log(raspunsApi)
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
                    titluModal             = {stapanCurent.entitate.nume}
                    functieInchindereModal = {handleClickInchidereOptiuniEntitate}
               />

               <div className="inputuriDetaliiEntitate">
                    <ContainerInputPoza 
                        pozaCurenta      = {stapanCurent.pozaEntitate}
                        handleChangePoza = {handleChangePoza}
                    />

                    <div className="inputuriTextDetaliiEntitate">
                        <div className="linieInput">
                            <label htmlFor="numeEntitateCurenta">Nume</label>
                            <input id="numeEntitateCurenta" value={numeEntitateCurenta} onChange={(e) => {setNumeEntitateCurenta(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <label htmlFor="emailEntitateCurenta">Email</label>
                            <input value={emailEntitateCurenta} onChange={(e) => {setEmailEntitateCurenta(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <label htmlFor="telefonEntitateCurenta">Telefon</label>
                            <input value={telefonEntitateCurenta} onChange={(e) => {setTelefonEntitateCurenta(e.target.value)}}></input>
                        </div>
                        <div className="linieInput">
                            <button onClick={handleClickEditStapan}>Editează</button>
                        </div>                          
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        <RowStatistica label={"Total Vizite"}        valoare={totalVizite}/>
                        <RowStatistica label={"Programări viitoare"} valoare={programariViitoare}/>
                        <RowStatistica label={"Tratamente active"}   valoare={tratamenteActive}/>                         
                        <RowStatistica label={"Total animale"}  valoare={totalAnimale}/>
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        {stapanCurent.tipEntitate === 'animal' && (
                        <>
                        <div className="linieInput">
                            <button onClick={() => {setViewProgramareNoua(true)}}>Programare nouă</button>
                        </div>
                        <div className="linieInput">
                            <button onClick={() => {setViewVizitaNoua(true)}}>Vizită nouă</button>
                        </div>
                        <div className="linieInput">
                            <button onClick={() => {handleShowModalStapan(stapanCurent.entitate)}}>Vezi stăpân</button>
                        </div>
                        </>)}
                    </div>               
                </div>

                <div style={{width: "100%", height: "7%"}}>
                    <BaraTabelDetalii 
                        butoaneBara   = {butoaneBara.butoaneStapani}
                        textFiltru    = {textFiltru}
                        functieFiltru = {handleChangeTextFiltru}
                    />
                </div>

                <TabelDetaliiEntitate 
                    listaTabel             = {listaTabel}
                    optiune                = {optiune} 
                    textFiltru             = {textFiltru}
                    viewTabel              = {stapanCurent}
                    setOptiune             = {setOptiune}
                    jwtToken               = {jwtToken}
                    api                    = {api}  
                />
            </div>
            
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
export default DetaliiStapan