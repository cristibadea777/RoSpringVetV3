import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "../Tabele.css"
const StapanNou = ({setViewStapanNou, api, jwtToken}) => {
    
    const handleClickInchidere = () =>{
        setViewStapanNou(false)
    }

    const [raspuns, setRaspuns] = useState('')
    const [nume,    setNume]    = useState('')
    const [telefon, setTelefon] = useState('')
    const [email,   setEmail]   = useState('')
    const [parola,  setParola]  = useState('')

    const handleChangeNume      = (event) => { setNume(event.target.value)    } 
    const handleChangeTelefon   = (event) => { setTelefon(event.target.value) }
    const handleChangeEmail     = (event) => { setEmail(event.target.value)   }
    const handleChangeParola    = (event) => { setParola(event.target.value)  }

    const handleClickAdaugaStapanNou = () => {
        
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
                </div>
                <div className="coloanaPoza"></div>
            </div>
        </div>
    </div>
    )
}
export default StapanNou