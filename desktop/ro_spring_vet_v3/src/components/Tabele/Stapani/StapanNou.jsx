import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import "../ModalAdaugare.css"
import "../Tabele.css"
import { getPoza, salvareEntitate } from "../../AccesareAPI"
import { toBase64 } from "../Utilities"
import { ContainerRaspuns } from "../ComponenteModale"

const StapanNou = ({setViewStapanNou, api, jwtToken, stapani, setStapani}) => {
    
    const handleClickInchidere = () =>{ setViewStapanNou(false) }

    const [textRaspuns, setTextRaspuns] = useState('')
    const [viewRaspuns, setViewRaspuns] = useState('')
    const [nume,        setNume]        = useState('')
    const [telefon,     setTelefon]     = useState('')
    const [email,       setEmail]       = useState('')
    const [parola,      setParola]      = useState('')
    const [pozaCurenta, setPozaCurenta] = useState('')

    const handleChangeNume      = (event) => { setNume(event.target.value)    } 
    const handleChangeTelefon   = (event) => { setTelefon(event.target.value) }
    const handleChangeEmail     = (event) => { setEmail(event.target.value)   }
    const handleChangeParola    = (event) => { setParola(event.target.value)  }

    const getPozaDefault = async () => {
        const raspuns = await getPoza({ jwtToken, apiEndpoint: `${api}/resources/poze_stapani/stapan_default.png` })
        setPozaCurenta(raspuns)
    }
    useEffect(() => { getPozaDefault() }, [])

    const handleChangePoza = async (evt) => {
        const file = evt.target.files[0]
        try{
            const poza       = await toBase64(file)
            setPozaCurenta(poza)
        } catch(error){ setTextRaspuns("EROARE") }
    }
    
    const handleClickAdaugaStapanNou = async () => {
        const cerere = {
            "nume"      : nume,
            "nrTelefon" : telefon,
            "email"     : email,
            "parola"    : parola,
            "imagine"   : pozaCurenta,
        }
        const apiEndpoint = api + "/stapani/angajat/saveStapan"
        const raspunsApi = await salvareEntitate( {jwtToken, apiEndpoint, cerere} )
        if(raspunsApi.status === 200){
            const raspuns = { //pt tag-ul <p> la reusita
                "status" : raspunsApi.status,
                "data"   : "Stăpân adăugat",
            }
            setTextRaspuns(raspuns) 
            //raspunsul de la server este stapanul adaugat - se adauga in lista
            adaugaStapan(raspunsApi.data)
        }
        else{
            const raspuns = {
                "status" : raspunsApi.status,
                "data"   : raspunsApi.data, //la esec se returneaza mesajul de eroare de la server
            }
            setTextRaspuns(raspuns)
        }
        setViewRaspuns(true)
    }

    const adaugaStapan = (stapanAdaugat) => {
        const stapaniEditati = [...stapani]
        stapaniEditati.push(stapanAdaugat)
        setStapani(stapaniEditati) 
    }

    return(
    <div className="modalTabele">
        <div className="modalAdaugare">
            <div className="baraModal">
                <div id="stanga">  
                    <p className="textTitluModal">Adaugă un stăpân nou</p> 
                </div>    
                <div id="dreapta"> 
                    <button className="butonInchidere" onClick={handleClickInchidere}>
                        <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />     
                    </button> 
                </div>
            </div>

            <div className="containerAdaugareInputuri">
                <div className="coloanaInputuri">
                    <div className="linieColoanaInput">
                        <label className="labelInputAdaugare" htmlFor="nume">Nume</label>
                        <input className="inputAdaugare" id="nume" value={nume} onChange={handleChangeNume}></input>
                    </div>
                    <div className="linieColoanaInput">
                        <label className="labelInputAdaugare" htmlFor="telefon">Telefon</label>
                        <input className="inputAdaugare" id="telefon" value={telefon} onChange={handleChangeTelefon}></input>
                    </div>
                    <div className="linieColoanaInput">
                        <label className="labelInputAdaugare" htmlFor="email">Email</label>
                        <input className="inputAdaugare" id="email" value={email} onChange={handleChangeEmail}></input>
                    </div>
                    <div className="linieColoanaInput">
                        <label className="labelInputAdaugare" htmlFor="parola">Parola</label>
                        <input type="password" className="inputAdaugare" id="parola" value={parola} onChange={handleChangeParola}></input>
                    </div>
                    <div className="linieColoanaInputButon">
                        <button onClick={handleClickAdaugaStapanNou} className="butonAdauga">Adaugă</button>
                    </div>
                </div>
                <div className="coloanaPoza">
                    <div className="containerInputPozaModalAdauga">
                        <div className="containerPozaModalAdauga">
                            <img src={pozaCurenta} />
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
                </div>
            </div>
        </div>

        {viewRaspuns && (
            <ContainerRaspuns 
                textRaspuns         = {textRaspuns}
                setViewRaspuns      = {setViewRaspuns}
                setViewEntitateNoua = {setViewStapanNou}
            />
        )}

    </div>
    )
}
export default StapanNou