import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { editEntitate, salvareEntitate } from "../../AccesareAPI"
import "../ModalAdaugare.css"

const DetaliiVizita = ({animalCurent, vizitaCurenta, setVizitaCurenta, setViewDetaliiVizita, setViewDetaliiAnimal, api, jwtToken, vizite, setVizite, angajati, tratamente}) => {
    
    const handleClickInchidere = () => { setViewDetaliiVizita(false), setVizitaCurenta('') }

    const [vizitaId,        setVizitaId]        = useState('')
    const [motiv,           setMotiv]           = useState('')
    const [diagnostic,      setDiagnostic]      = useState('')
    const [angajatId,       setAngajatId]       = useState(vizitaCurenta.angajatId.angajatId)
    const [metodaTratament, setMetodaTratament] = useState('')
    const [dataInceput,     setDataInceput]     = useState(new Date().toISOString().split('T')[0])
    const [dataSfarsit,     setDataSfarsit]     = useState('')
    
    const handleChangeDiagnostic       = (event) => { setDiagnostic(event.target.value)      }
    const handleChangeMotiv            = (event) => { setMotiv(event.target.value)           }
    const handleChangeAngajatId        = (event) => { setAngajatId(event.target.value)       }  
    const handleChangeMetodaTratament  = (event) => { setMetodaTratament(event.target.value) }
    const handleChangeDataSfarsit      = (event) => { setDataSfarsit(event.target.value)     }

    const dataVizita = new Date().toISOString().split('T')[0]
    const animalId   = vizitaCurenta.animalId.animalId
    const stapanId   = vizitaCurenta.stapanId.stapanId

    const [viewRaspuns, setViewRaspuns] = useState('')
    const [textRaspuns, setTextRaspuns] = useState('')

    useEffect(
        () => {
            setVizitaId       (vizitaCurenta.vizitaId)
            setMotiv          (vizitaCurenta.motiv)
            setDiagnostic     (vizitaCurenta.diagnostic.diagnostic)
            setMetodaTratament(vizitaCurenta.tratament.metodaTratament)
            setAngajatId      (vizitaCurenta.angajatId.angajatId)
            setDataInceput    (vizitaCurenta.tratament.dataInceput)
            setDataSfarsit    (vizitaCurenta.tratament.dataSfarsit)
        }, [vizitaCurenta]
    )
    
    const handleClickEditeazaVizita = async () => {
        const apiEndpoint = api +  "/vizite/angajat/editVizita"
        cerere = {
            "vizitaId"          : vizitaId,
            "dataVizita"        : dataVizita,
            "angajatId"         : angajatId,
            "motiv"             : motiv,
            "diagnostic"        : diagnostic,
            "metodaTratament"   : metodaTratament,
            "dataInceput"       : dataInceput,
            "dataSfarsit"       : dataSfarsit,
        }
        const raspunsApi =  await editEntitate({jwtToken, apiEndpoint, cerere}) 
        if(raspunsApi.status === 200){
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect vizita
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Vizită editată",
            }
            setTextRaspuns(raspuns)
            //adaugat vizita si tratament in liste - la adaugare vizita noua
            vizitaCurenta ? setViewDetaliiVizita(false) : setViewVizitaNoua(false)
        }
        else{
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data, //la esec se returneaza mesajul de eroare de la server direct in data
            }
            setTextRaspuns(raspuns) 
        }
        setViewRaspuns(true)
    }

    return (
        <div className="modalTabele">
            <div className="modalAdaugare" style={{width: "80%", height:"80%"}}>
                <div className="baraModal">
                    <div id="stanga">  
                        {vizitaCurenta ? (
                            <p className="textTitluModal">{vizitaCurenta.animalId.nume} - vizită din data de - {vizitaCurenta.dataVizita}</p>
                        ) : (
                            <p className="textTitluModal">{animalCurent.nume} - Vizită nouă</p>
                        )} 
                    </div>    
                    <div id="dreapta"> 
                        <button className="butonInchidere" onClick={handleClickInchidere}>
                            <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />     
                        </button> 
                    </div>
                </div>

                <div className="containerAdaugare">
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <label htmlFor="motiv">Motiv</label>
                            <input id="motiv" value={motiv} onChange={handleChangeMotiv}></input>
                        </div>
                        <div className="containerLinieDreapta">
                            <label htmlFor="diagnostic">Diagnostic</label>
                            <textarea id="diagnostic" value={diagnostic} onChange={handleChangeDiagnostic}></textarea>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <label htmlFor="angajatId">Veterinar</label>
                            {vizitaCurenta ? (
                                <label>{vizitaCurenta.angajatId.nume}</label>
                            ) : (
                                <select onChange={handleChangeAngajatId}>
                                    {angajati.map((angajat, index) => (
                                            <option key={index} value={angajat.angajatId}>{angajat.nume}</option>
                                        ))}
                                </select>
                            )}
                        </div>
                        <div className="containerLinieDreapta">
                            <div className="containerLinieDreapta">
                                <label htmlFor="metodaTratament">Tratament</label>
                                <textarea id="metodaTratament" value={metodaTratament} onChange={handleChangeMetodaTratament}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                        </div>
                        <div className="containerLinieDreapta">
                            <label htmlFor="dataSfarsit">Tratament sfârșit</label>
                            <input type="date" id="dataSfarsit" value={dataSfarsit} onChange={handleChangeDataSfarsit}></input>
                        </div>
                    </div>
                    
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                        </div>
                        <div className="containerLinieDreapta" style={{justifyContent: "flex-end"}}>
                            {vizitaCurenta && (
                                <button onClick={() => {setViewDetaliiAnimal(true), setViewDetaliiVizita(false)}}>Vezi animal</button>
                            )}
                            <button onClick={handleClickEditeazaVizita}>{vizitaCurenta ? 'Editează' : 'Adaugă'}</button>
                        </div>
                    </div>

                    {(viewRaspuns && vizitaCurenta) && (
                        <div className="modal"> 
                            <div style={{width:"25%", height:"33%", backgroundColor:"#232B2B", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid white"}}>
                                <p className="raspunsApi" style={{color: (textRaspuns.status === 200) ? "green" : "red"}}> {textRaspuns.data} </p>
                                <button onClick={() => {setViewRaspuns(false)}}>OK</button>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}
export default DetaliiVizita