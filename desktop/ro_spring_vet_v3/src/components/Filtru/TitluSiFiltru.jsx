import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./TitluSiFiltru.css"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const TitluSiFiltru = ({titlu, functie, filtru, viewProgramari, setTipProgramari, tipProgramari, viewStapani, setViewStapanNou, viewAngajati, setViewAngajatNou}) => {

    const handleChangeTipProgramari = (event) => { setTipProgramari(event.target.value) }

    const handleDeschideModalStapanNou  = () => { setViewStapanNou(true)  }

    const handleDeschideModalAngajatNou = () => { setViewAngajatNou(true) }

    return (
        <div className="containerTitluSiFiltru">
            <div className="containerTitlu"><p className="text">{titlu}</p></div>
            {viewStapani && (
                <div className="containerSecundarTitluFiltru">
                    <div>
                    <button onClick={handleDeschideModalStapanNou}><FontAwesomeIcon icon={faPlus} color="white"/> </button>
                    </div>
                </div>
            )}
            {viewProgramari && (
                <div className="containerSecundarTitluFiltru">
                    <label htmlFor="confirmate">Confirmate</label>
                    <input type="radio" id="confirmate" name="tip_programari" value={"Confirmate"} onChange={handleChangeTipProgramari} checked={tipProgramari==="Confirmate"}></input>
                    <label htmlFor="neconfirmate" style={{marginLeft: "10%"}}>Neconfirmate</label>
                    <input type="radio" id="neconfirmate" name="tip_programari" value={"Neconfirmate"} onChange={handleChangeTipProgramari} checked={tipProgramari==="Neconfirmate"}></input>
                </div>
            )}
            {viewAngajati && (
                <div className="containerSecundarTitluFiltru">
                    <div>
                    <button onClick={handleDeschideModalAngajatNou}><FontAwesomeIcon icon={faPlus} color="white"/> </button>
                    </div>
                </div>
            )}
            <div className="containerFiltru">
                <label htmlFor="filtru" className="textLabel">Caută</label>
                <input id="filtru" className="inputFiltru" value={filtru} onChange={functie}/>
            </div>
        </div>
    )
}
export default TitluSiFiltru