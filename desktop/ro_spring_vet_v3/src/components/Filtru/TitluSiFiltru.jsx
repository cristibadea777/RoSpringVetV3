import "./TitluSiFiltru.css"

const TitluSiFiltru = ({titlu, functie, filtru}) => {
    return (
        <div className="containerTitluSiFiltru">
            <div className="containerTitlu"><p className="text">{titlu}</p></div>
            <div className="containerFiltru">
                <input className="inputFiltru" value={filtru} onChange={functie}/>
                <button className="butonFiltru">Caută</button>
            </div>
        </div>
    )
}
export default TitluSiFiltru