const DetaliiProgramare = ({animalCurent, programareCurenta}) => {
 
    return(
        <div className="modalTabele">
            <div className="modalAdaugare" style={{width:"45%", height: "45%"}}>
                <div className="baraModal">
                    <div id="stanga">  
                        <p className="textTitluModal">Programare - {programareCurenta.dataProgramare} - {animalCurent.nume} - detalii</p> 
                    </div>    
                    <div id="dreapta"> 
                        <button className="butonInchidere" onClick={handleClickInchidere}>
                            <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />     
                        </button> 
                    </div>
                </div>

                <div className="containerAdaugare">
                    <div className="containerLinie">
                        <label htmlFor="dataAleasa">Dată</label>
                        <input type="datetime-local" id="dataAleasa" value={dataAleasa} onChange={handleChangeData} min={azi}></input>
                    </div>
                    
                    <div className="containerLinie">
                        <label htmlFor="motiv">Motiv</label>
                        <input id="motiv" value={motiv} onChange={handleChangeMotiv}></input>
                    </div>
                    
                    <div className="containerLinie" style={{justifyContent: "flex-end"}}>
                        <button onClick={handleClickAdaugaProgramare}>Editează</button>
                        <button>Anulează</button>
                    </div>
                </div>
                
            </div>
        </div>
    )

}
export default DetaliiProgramare