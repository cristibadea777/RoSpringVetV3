import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { editEntitate, salvareEntitate } from "../../AccesareAPI"
import "../ModalAdaugare.css"

const Vizita = ({animalCurent, setViewVizitaNoua, setViewDetaliiVizita, setViewDetaliiAnimal, api, jwtToken, setTextRaspuns, setViewRaspuns, vizite, setVizite, angajati, tratamente, vizitaCurenta, setVizitaCurenta}) => {
    
    const handleClickInchidere = () => { vizitaCurenta ? (setViewDetaliiVizita(false), setVizitaCurenta('')) : setViewVizitaNoua(false) }

    const [vizitaId,        setVizitaId]        = useState('')
    const [motiv,           setMotiv]           = useState('')
    const [diagnostic,      setDiagnostic]      = useState('')
    const [angajatId,       setAngajatId]       = useState(vizitaCurenta ? vizitaCurenta.angajatId.angajatId : angajati[0].angajatId)
    const [metodaTratament, setMetodaTratament] = useState('')
    const [dataInceput,     setDataInceput]     = useState(new Date().toISOString().split('T')[0])
    const [dataSfarsit,     setDataSfarsit]     = useState('')
    
    const handleChangeDiagnostic       = (event) => { setDiagnostic(event.target.value)      }
    const handleChangeMotiv            = (event) => { setMotiv(event.target.value)           }
    const handleChangeAngajatId        = (event) => { setAngajatId(event.target.value)       }  
    const handleChangeMetodaTratament  = (event) => { setMetodaTratament(event.target.value) }
    const handleChangeDataSfarsit      = (event) => { setDataSfarsit(event.target.value)     }

    const dataVizita = new Date().toISOString().split('T')[0]
    const animalId   = animalCurent  ? animalCurent.animalId        : vizitaCurenta.animalId.animalId
    const stapanId   = animalCurent  ? animalCurent.stapan.stapanId : vizitaCurenta.stapanId.stapanId

    useEffect(
        () => {
            if(vizitaCurenta){
                setVizitaId       (vizitaCurenta.vizitaId)
                setMotiv          (vizitaCurenta.motiv)
                setDiagnostic     (vizitaCurenta.diagnostic.diagnostic)
                setMetodaTratament(vizitaCurenta.tratament.metodaTratament)
                setAngajatId      (vizitaCurenta.angajatId.angajatId)
                setDataInceput    (vizitaCurenta.tratament.dataInceput)
                setDataSfarsit    (vizitaCurenta.tratament.dataSfarsit)
            }
        }, [vizitaCurenta]
    )
    
    const handleClickAdaugaEditeazaVizita = async () => {
        let apiEndpoint = api
        let cerere = ''

        if(!vizitaCurenta){
            apiEndpoint = apiEndpoint + "/vizite/angajat/saveVizita"
            cerere = {
                "dataVizita"        : dataVizita,
                "animalId"          : animalId,
                "stapanId"          : stapanId,
                "angajatId"         : angajatId,
                "motiv"             : motiv,
                "diagnostic"        : diagnostic,
                "metodaTratament"   : metodaTratament,
                "dataInceput"       : dataInceput,
                "dataSfarsit"       : dataSfarsit,
            }
        }
        else{   
            console.log(vizitaCurenta)
            apiEndpoint = apiEndpoint +  "/vizite/angajat/editVizita"
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
        }
            
        const raspunsApi =  vizitaCurenta 
                         ?  await editEntitate({jwtToken, apiEndpoint, cerere}) 
                         :  await salvareEntitate({apiEndpoint, jwtToken, cerere})
        
        if(raspunsApi.status === 200){
            //pun mesajul de succes in data pt ca la succes se returneaza de la server nu mesaj, ci un obiect vizita
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : "Vizită adăugată",
            }
            setTextRaspuns(raspuns)
            //adaugat vizita si tratament in liste - la adaugare vizita noua
            if(!vizitaCurenta){
                const viziteEditate = [...vizite]
                viziteEditate.push(raspunsApi)
                tratamente.push(raspunsApi.data.tratament)
                setVizite(viziteEditate)
            }
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
                            <button onClick={handleClickAdaugaEditeazaVizita}>{vizitaCurenta ? 'Editează' : 'Adaugă'}</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Vizita