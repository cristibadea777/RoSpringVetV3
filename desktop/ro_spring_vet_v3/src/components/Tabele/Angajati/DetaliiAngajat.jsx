import { useEffect, useState } from "react"
import { editEntitate, getPoza, salvarePoza } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import { BaraModalEntitate, ContainerInputPoza } from "../ComponenteModale"
import BaraTabelDetalii from "../DetaliiEntitate/BaraTabelDetalii"
import TabelDetaliiEntitate from "../DetaliiEntitate/TabelDetaliiEntitate"
import DetaliiAnimal from "../Animale/DetaliiAnimal"

const DetaliiAngajat = (
    {   
        angajatCurent, setViewDetaliiAngajat, angajati, setAngajati, api, jwtToken, vizite
    }) => {
    
    const handleClickInchidereOptiuniEntitate = () => { setViewDetaliiAngajat(false) }

    const [idEntitateCurenta,      setIdEntitateCurenta]      = useState('')
    const [numeEntitateCurenta,    setNumeEntitateCurenta]    = useState('')
    const [emailEntitateCurenta,   setEmailEntitateCurenta]   = useState('')
    const [telefonEntitateCurenta, setTelefonEntitateCurenta] = useState('')
    const [functieEntitateCurenta, setFunctieEntitateCurenta] = useState('')
    const [totalVizite,            setTotalVizite]            = useState('0')

    const [pozaAngajat,  setPozaAngajat] = useState('')
    const getPozaAngajat = async () => {
        let cale_poza = 'angajat_default.png'
        if(angajatCurent.imagine !== null){ cale_poza = angajatCurent.imagine }
        const apiEndpoint = api + '/resources/poze_angajati/' + cale_poza
        const poza = await getPoza({ jwtToken, apiEndpoint })
        setPozaAngajat(poza)
    }    
    
    const [listaTabel,             setListaTabel]             = useState([])
    const [optiune,                setOptiune]                = useState('')

    const [viziteEntitate,         setViziteEntitate]         = useState([])

    const [textRaspuns,            setTextRaspuns]            = useState('')
    const [viewRaspuns,            setViewRaspuns]            = useState(false)

    const [textFiltru,  setTextFiltru] = useState('')
    const handleChangeTextFiltru = (event) => {
        setTextFiltru(event.target.value)
    }

    const handleShowViziteEntitate     = () => { setListaTabel(viziteEntitate),     setOptiune('vizite')     }

    const butoaneBara = {
        butoaneAngajati: [
            { label: "Vizite",     functie: handleShowViziteEntitate     },
        ]
    }

    useEffect(
        () => {            
            if(angajatCurent){
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                let nrAnimale    = 0
                
                let v = []
                let t = []
                let p = []
                let a = []

                setIdEntitateCurenta     (angajatCurent.angajatId)
                setNumeEntitateCurenta   (angajatCurent.nume)
                setTelefonEntitateCurenta(angajatCurent.nrTelefon)
                setEmailEntitateCurenta  (angajatCurent.email)
                setFunctieEntitateCurenta(angajatCurent.functie)
                
                vizite && vizite.map((vizita) => { 
                    if(vizita.angajatId.angajatId === angajatCurent.angajatId){ nrVizite = nrVizite + 1, v.push(vizita) } 
                })

                //default pt angajati
                setOptiune('vizite')
                setListaTabel(v)

                setTotalVizite(nrVizite)

                setViziteEntitate(v)

                getPozaAngajat()

            }
        }, [angajatCurent, angajati]
    )
    
    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            const idEntitate = angajatCurent.angajatId
            const raspunsApi = await salvarePoza({api, poza, jwtToken, folder: "poze_angajati", idEntitate, entitate: "angajat"}) 
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data.raspuns
            }
            setTextRaspuns(raspuns)
            if(raspunsApi.status === 200){
                angajatCurent.imagine = raspunsApi.data.numePoza
                updateListaAngajati(angajatCurent)
            }  
        } catch(error){ setTextRaspuns("EROARE") }
        setViewRaspuns(true)
    }

    const updateListaAngajati = (angajatEditat) => {
        let angajatiEditati = [...angajati]        
        angajatiEditati.map((element, index) => {
            if(element.angajatId === idEntitateCurenta){
                angajatiEditati[index] = angajatEditat
            }
        })
        setAngajati(angajatiEditati)
    }

    const handleClickEditAngajat = async () => {
        const apiEndpoint = api + '/angajati/editAngajat'
        const cerere = {
            "angajatId"   :   idEntitateCurenta,        
            "nume"        :   numeEntitateCurenta,
            "nrTelefon"   :   telefonEntitateCurenta,
            "email"       :   emailEntitateCurenta,
            "functie"     :   functieEntitateCurenta,
        }
        const angajatEditat = {    
            ...angajatCurent,
            "nume"        :   numeEntitateCurenta,
            "nrTelefon"   :   telefonEntitateCurenta,
            "email"       :   emailEntitateCurenta,  
            "functie"     :   functieEntitateCurenta,       
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200){
            //update in lista angajati
            updateListaAngajati(angajatEditat)
            //update angajat curent in modal detalii animal
            angajatCurent.nume      = angajatEditat.nume
            angajatCurent.nrTelefon = angajatEditat.nrTelefon
            angajatCurent.email     = angajatEditat.email
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

            <div className="modalDetaliiEntitate" >
               <BaraModalEntitate 
                    titluModal             = {angajatCurent.nume}
                    functieInchindereModal = {handleClickInchidereOptiuniEntitate}
               />

               <div className="inputuriDetaliiEntitate">
                    <ContainerInputPoza 
                        pozaCurenta      = {pozaAngajat}
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
                            <button onClick={handleClickEditAngajat}>Editează</button>
                        </div>                          
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        <RowStatistica label={"Total Vizite"}        valoare={totalVizite}/>
                    </div>

                    <div className="inputuriTextDetaliiEntitate">
                        
                    </div>               
                </div>

                <div style={{width: "100%", height: "7%"}}>
                    <BaraTabelDetalii 
                        butoaneBara   = {butoaneBara.butoaneAngajati}
                        textFiltru    = {textFiltru}
                        functieFiltru = {handleChangeTextFiltru}
                    />
                </div>

                <TabelDetaliiEntitate 
                    listaTabel             = {listaTabel}
                    optiune                = {optiune} 
                    textFiltru             = {textFiltru}
                    viewTabel              = {angajatCurent}
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
export default DetaliiAngajat