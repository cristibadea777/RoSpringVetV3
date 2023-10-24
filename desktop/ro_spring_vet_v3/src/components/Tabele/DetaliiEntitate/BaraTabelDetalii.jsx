import TitluSiFiltru from "../../Filtru/TitluSiFiltru"

const BaraTabelDetalii = ({butoaneBara, textFiltru, functieFiltru}) => {
    return(
        <div style={{height: "100%", backgroundColor:"#232B2B", display: "flex", flexDirection: "row"}}>
            <div style={{height: "100%", width: "50%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                {butoaneBara.map((butonBara, index) => (
                    <button key={index} style={{height: "fit-content", marginRight: "1%"}} onClick={butonBara.functie}>{butonBara.label}</button>
                ))}
            </div>
            <div style={{height: "100%", width: "50%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                <TitluSiFiltru 
                    titlu           = {''}
                    filtru          = {textFiltru}
                    functie         = {functieFiltru}
                />
            </div>  
        </div>
    )
}
export default BaraTabelDetalii