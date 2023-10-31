import { useEffect, useState } from "react"
import "./Dashboard.css"
import { toBase64 } from "../Tabele/Utilities"
import { editEntitate, salvarePoza } from "../AccesareAPI"

const Dashboard = ( {username, authority, userConectat, pozaProfil, setPozaProfil, angajati, animale, tratamente, programari, vizite, setAngajati, api, jwtToken} ) => {
    //username     = email
    //authority    = ADMIN/USER (stapan/doctor)
    //userConectat = json al obiectului stapan/doctor

    const [idEntitateCurenta,      setIdEntitateCurenta]      = useState('')
    const [numeEntitateCurenta,    setNumeEntitateCurenta]    = useState('')
    const [emailEntitateCurenta,   setEmailEntitateCurenta]   = useState('')
    const [telefonEntitateCurenta, setTelefonEntitateCurenta] = useState('')
    const [functieEntitateCurenta, setFunctieEntitateCurenta] = useState('')
  
    const [totalVizite,            setTotalVizite]            = useState('0')
    const [programariViitoare,     setProgramariViitoare]     = useState('0')
    const [tratamenteActive,       setTratamenteActive]       = useState('0')
    const [totalAnimale,           setTotalAnimale]           = useState('0')

    useEffect(
        () => {            
            if(userConectat){
                let dataCurenta  = new Date()
                let nrVizite     = 0
                let nrProgramari = 0
                let nrTratamente = 0
                let nrAnimale    = 0

                setIdEntitateCurenta     ((authority === 'ADMIN') ? userConectat.angajatId : userConectat.stapanId)
                setNumeEntitateCurenta   (userConectat.nume)
                setTelefonEntitateCurenta(userConectat.nrTelefon)
                setEmailEntitateCurenta  (userConectat.email)
                
                nrProgramari = programari?.length
                nrTratamente = tratamente?.length
                nrAnimale = animale?.length
                if(authority === "ADMIN"){
                    setFunctieEntitateCurenta(userConectat.functie)
                    vizite && vizite.map((vizita) => { 
                        if(vizita.angajatId.angajatId === userConectat.angajatId){ nrVizite = nrVizite + 1 } 
                    })
                }
                else{ nrVizite  = vizite?.length }    
                
                setTotalVizite(nrVizite)
                setProgramariViitoare(nrProgramari)
                setTratamenteActive(nrTratamente)
                setTotalAnimale(nrAnimale)
            }
        }, [userConectat, vizite, animale, programari, tratamente]
    )

    const [textRaspuns,            setTextRaspuns]            = useState('')
    const [viewRaspuns,            setViewRaspuns]            = useState(false)

    const updateListaAngajati = (angajatEditat) => {
        let angajatiEdidati = [...angajati]
        angajatiEdidati.map((angajat, index) => {
            if(angajat.angajatId === angajatEditat.angajatId){
                angajatiEdidati[index] = angajatEditat
            }
        })
        setAngajati(angajatiEdidati)
    }

    const handleEditEntitate = () => {
        (authority === "ADMIN") ? handleEditAngajat() : handleEditStapan()
    }

    const handleEditStapan = async () => {
        const apiEndpoint = api + '/stapani/editStapan'
        const cerere = {
            "stapanId"    :   idEntitateCurenta,      
            "nume"        :   numeEntitateCurenta,
            "nrTelefon"   :   telefonEntitateCurenta,
            "email"       :   emailEntitateCurenta,
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        setTextRaspuns(raspunsApi)
        setViewRaspuns(true)
        if(raspunsApi.status === 200){
            //update in dashboard
            userConectat.nume       = numeEntitateCurenta
            userConectat.email      = emailEntitateCurenta
            userConectat.nrTelefon  = telefonEntitateCurenta
            userConectat.functie    = functieEntitateCurenta
        }
    }

    const handleEditAngajat = async () => {
        const apiEndpoint = api + '/angajati/editAngajat'
        const cerere = {
            "angajatId"   :   idEntitateCurenta,      
            "nume"        :   numeEntitateCurenta,
            "nrTelefon"   :   telefonEntitateCurenta,
            "email"       :   emailEntitateCurenta,
            "functie"     :   functieEntitateCurenta,
        }
        const angajatEditat = {    
            ...userConectat,
            "nume"        :   numeEntitateCurenta,
            "nrTelefon"   :   telefonEntitateCurenta,
            "email"       :   emailEntitateCurenta,         
            "functie"     :   functieEntitateCurenta,
        }
        const raspunsApi = await editEntitate({jwtToken, apiEndpoint, cerere})
        if(raspunsApi.status === 200){
            //update in dashboard
            userConectat.nume       = numeEntitateCurenta
            userConectat.email      = emailEntitateCurenta
            userConectat.nrTelefon  = telefonEntitateCurenta
            userConectat.functie    = functieEntitateCurenta
            //update lista angajati daca este admin (sa apara modificarile si in lista de angajati)
            if(authority === "ADMIN")
                updateListaAngajati(angajatEditat)
            
        }
        setTextRaspuns(raspunsApi)
        setViewRaspuns(true)
    }

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try {
            const poza       = await toBase64(file)
            const idEntitate = idEntitateCurenta
            const folder     = (authority === 'ADMIN') ? "poze_angajati"        : "poze_stapani"
            const entitate   = (authority === 'ADMIN') ? "angajat"              : "stapan"
            const raspunsApi = await salvarePoza({api, poza, jwtToken, folder, idEntitate, entitate})
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data.raspuns
            } 
            setPozaProfil(poza)
            setTextRaspuns(raspuns)   
            //pt angajati - update lista angajati
            if( authority === "ADMIN" && raspunsApi.status === 200){
                userConectat.imagine = raspunsApi.data.numePoza
                updateListaAngajati(userConectat)
            }          
        } catch (error) { setTextRaspuns("Eroare schimbare poză") }
        setViewRaspuns(true)
    }

    const RowStatistica = ({label, valoare}) => (
        <div className="linieStatistica">
            <div><p>{label}</p></div>
            <p>{valoare}</p>
        </div>
    )

    return(   
        <div className="containerDashboard">
            <div className="containerInputuriDashboard">
                <div className="containerInputPozaDashboard">

                    <div className="containerPozaDashboard">
                        <img src={pozaProfil} />
                        <div className="containerButonSchimbaPozaDashboard">
                            <label>
                                Schimbă poza
                                <input type="file" accept="image/*" style={{display: "none"}} onChange={handleChangePoza}></input>
                            </label>
                        </div>
                    </div>
               </div>


                <div className="containerInputSiStatisticiDashboard">
                    <div className="containerTextInputuriDashboard">
                        <div className="linieInputDashboard">
                            <label htmlFor="numeEntitateCurenta">Nume</label>
                            <input id="numeEntitateCurenta" value={numeEntitateCurenta} onChange={(e) => {setNumeEntitateCurenta(e.target.value)}}></input>
                        </div>

                        <div className="linieInputDashboard">
                            <label htmlFor="emailEntitateCurenta">Email</label>
                            <input value={emailEntitateCurenta} onChange={(e) => {setEmailEntitateCurenta(e.target.value)}}></input>
                        </div>

                        <div className="linieInputDashboard">
                            <label htmlFor="telefonEntitateCurenta">Telefon</label>
                            <input value={telefonEntitateCurenta} onChange={(e) => {setTelefonEntitateCurenta(e.target.value)}}></input>
                        </div>

                        {authority === "ADMIN" && (
                            <div className="linieInputDashboard">
                                <label htmlFor="functieEntitateCurenta">Funcție</label>
                                <input value={functieEntitateCurenta} onChange={(e) => {setFunctieEntitateCurenta(e.target.value)}}></input>
                            </div>
                        )}

                        <div className="linieInputDashboard">
                            <button onClick={handleEditEntitate}>Editează</button>
                        </div>
                    </div>

                    <div className="containerStatisticiDashboard">
                        <RowStatistica label={"Vizite efectuate"}    valoare={totalVizite}/>
                        <RowStatistica label={"Programări viitoare"} valoare={programariViitoare} />
                        <RowStatistica label={"Tratamente active"}   valoare={tratamenteActive}/>
                        <RowStatistica label={"Total animale"}       valoare={totalAnimale}/>
                    </div>            
                </div>
            </div>



            {viewRaspuns && (
                <div className="modalTabele"> 
                    <div style={{width:"25%", height:"33%", backgroundColor:"#232B2B", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid white"}}>
                        <p className="raspunsApi" style={{color: (textRaspuns.status === 200) ? "green" : "red"}}> {textRaspuns.data} </p>
                        <button onClick={() => {setViewRaspuns(false)}}>OK</button>
                    </div>
                </div>
            )}
            
        </div>

    )

}
export default Dashboard