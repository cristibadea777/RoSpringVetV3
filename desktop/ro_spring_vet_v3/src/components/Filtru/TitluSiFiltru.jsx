import "./TitluSiFiltru.css"

const TitluSiFiltru = ({titlu, functie, filtru, viewProgramari, setTipProgramari, tipProgramari}) => {

    const handleChangeTipProgramari = (event) => {
        setTipProgramari(event.target.value)
    }

    return (
        <div className="containerTitluSiFiltru">
            <div className="containerTitlu"><p className="text">{titlu}</p></div>
            {viewProgramari && (
            <div className="containerAlegereTipProgramari">
                <div className="linieAlegereTipProgramari">
                    <label htmlFor="confirmate">Confirmate</label>
                    <input type="radio" id="confirmate" name="tip_programari" value={"Confirmate"} onChange={handleChangeTipProgramari} checked={tipProgramari==="Confirmate"}></input>
                </div>
                <div className="linieAlegereTipProgramari">
                    <label htmlFor="neconfirmate">Neconfirmate</label>
                    <input type="radio" id="neconfirmate" name="tip_programari" value={"Neconfirmate"} onChange={handleChangeTipProgramari} checked={tipProgramari==="Neconfirmate"}></input>
                </div>
            </div>)}
            <div className="containerFiltru">
                <label htmlFor="filtru" className="textLabel">Caută</label>
                <input id="filtru" className="inputFiltru" value={filtru} onChange={functie}/>
            </div>
        </div>
    )
}
export default TitluSiFiltru